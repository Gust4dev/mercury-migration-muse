import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const MAX_ATTEMPTS = 8;
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

type Lead = { id: string; protocol: string; revenda: string; whatsapp: string; cidade: string; estado: string; bandeira: string; vendas_mensais: string; sheets_attempts: number };

const fmtPhone = (d: string) => d.length === 11 ? `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}` : `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;

async function sendOnce(url: string, key: string, lead: Lead): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chave: key, revenda: lead.revenda, numero: fmtPhone(lead.whatsapp), cidade: lead.cidade,
        estado: lead.estado, companhia: lead.bandeira, vendas_mes: lead.vendas_mensais,
      }),
    });
    const text = await res.text();
    let data: Record<string, unknown> | null = null;
    try { data = JSON.parse(text); } catch { /* não-JSON */ }
    if (!data) return { ok: false, error: `HTTP ${res.status}: resposta não é JSON` };
    if (data.sucesso === true) return { ok: true };
    const msg = String(data.mensagem ?? data.message ?? data.erro ?? data.error ?? "");
    if (data.duplicado === true || /duplic|já cadastrad|ja cadastrad|existe/i.test(msg)) return { ok: true };
    return { ok: false, error: `HTTP ${res.status}: ${msg || "sucesso=false"}`.slice(0, 300) };
  } catch (e) {
    return { ok: false, error: `Falha de rede: ${(e as Error).message}`.slice(0, 300) };
  }
}

async function syncLead(db: ReturnType<typeof createClient>, url: string, key: string, lead: Lead) {
  let result = { ok: false, error: "" } as { ok: boolean; error?: string };
  let attempts = lead.sheets_attempts;
  for (let i = 0; i < 3; i++) {
    attempts++;
    result = await sendOnce(url, key, lead);
    if (result.ok) break;
    await new Promise((r) => setTimeout(r, 800 * (i + 1)));
  }
  await db.from("comunidade_leads").update(result.ok
    ? { sheets_status: "sincronizado", sheets_attempts: attempts, sheets_last_error: null, sheets_synced_at: new Date().toISOString() }
    : { sheets_status: "falhou", sheets_attempts: attempts, sheets_last_error: result.error ?? null }
  ).eq("id", lead.id);
  if (!result.ok) console.error(`Sheets sync falhou para ${lead.protocol}: ${result.error}`);
  return result.ok;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const url = Deno.env.get("GOOGLE_SHEETS_WEBHOOK_URL");
  const key = Deno.env.get("GOOGLE_SHEETS_API_KEY");
  if (!url || !key) return json({ error: "not_configured" }, 503);

  let protocol = "";
  try { protocol = String((await req.json())?.protocol ?? ""); } catch { /* vazio */ }
  if (protocol && !/^GLP-[A-F0-9]{8}$/.test(protocol)) return json({ error: "invalid_protocol" }, 400);

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const cols = "id, protocol, revenda, whatsapp, cidade, estado, bandeira, vendas_mensais, sheets_attempts";

  let synced: boolean | null = null;
  if (protocol) {
    const { data } = await db.from("comunidade_leads").select(cols).eq("protocol", protocol).maybeSingle();
    if (data) synced = await syncLead(db, url, key, data as Lead);
  }

  // Novas tentativas: reenvia cadastros pendentes ou que falharam antes.
  const { data: pending } = await db.from("comunidade_leads").select(cols)
    .neq("sheets_status", "sincronizado").lt("sheets_attempts", MAX_ATTEMPTS)
    .neq("protocol", protocol || "-").order("created_at").limit(5);
  for (const lead of (pending ?? []) as Lead[]) await syncLead(db, url, key, lead);

  return json({ synced });
});
