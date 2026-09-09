import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { mpFetch, mpWebhookSecret } from "../_shared/payments/mercado-pago.ts";
import { syncOrderFromMpOrder } from "../_shared/payments/sync-order.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

async function validSignature(req: Request, dataId: string) {
  const secret = mpWebhookSecret();
  if (!secret) return false;

  const signature = req.headers.get("x-signature") ?? "";
  const requestId = req.headers.get("x-request-id") ?? "";
  const parts = Object.fromEntries(
    signature.split(",").map((p) => {
      const [k, ...v] = p.split("=");
      return [k.trim(), v.join("=").trim()];
    }),
  ) as Record<string, string>;

  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${ts};`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(manifest));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex === v1.toLowerCase();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const payload = await req.json().catch(() => ({} as Record<string, unknown>));
    const data = (payload.data ?? {}) as { id?: string };
    const resourceId = String(data.id ?? url.searchParams.get("data.id") ?? payload.id ?? "");
    const topic = String(payload.type ?? payload.topic ?? url.searchParams.get("topic") ?? "");

    if (!resourceId) return json({ received: true, ignored: "missing_resource_id" });

    if (!(await validSignature(req, resourceId))) {
      console.error("mercado-pago-webhook invalid signature", resourceId);
      return json({ error: "invalid_signature" }, 401);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    // Idempotência: o mesmo evento pode chegar várias vezes.
    const eventId = `${topic}:${resourceId}:${req.headers.get("x-request-id") ?? ""}`;
    const { error: dupError } = await supabase
      .from("payment_webhook_events")
      .insert({ provider: "mercado_pago", event_id: eventId, resource_id: resourceId, topic, payload });
    if (dupError) {
      if (String(dupError.code) === "23505") return json({ received: true, duplicated: true });
      console.error("webhook log error", dupError.message);
    }

    // A verdade vem da API, nunca do corpo da notificação.
    let mpOrder: Record<string, unknown> | null = null;
    const isPaymentTopic = topic.includes("payment");

    if (isPaymentTopic) {
      const { status, data: pay } = await mpFetch(`/v1/payments/${resourceId}`);
      if (status < 400) {
        const orderId = (pay as { order?: { id?: string } }).order?.id;
        if (orderId) {
          const r = await mpFetch(`/v1/orders/${orderId}`);
          if (r.status < 400) mpOrder = r.data;
        }
        if (!mpOrder) {
          // Fallback: monta uma estrutura equivalente a partir do pagamento.
          mpOrder = {
            id: (pay as { order?: { id?: string } }).order?.id ?? null,
            external_reference: (pay as { external_reference?: string }).external_reference,
            status: (pay as { status?: string }).status,
            total_amount: (pay as { transaction_amount?: number }).transaction_amount,
            transactions: { payments: [pay] },
          };
        }
      }
    } else {
      const { status, data: ord } = await mpFetch(`/v1/orders/${resourceId}`);
      if (status < 400) mpOrder = ord;
    }

    if (!mpOrder) return json({ received: true, ignored: "resource_not_found" });

    const result = await syncOrderFromMpOrder(supabase, mpOrder);
    await supabase
      .from("payment_webhook_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("provider", "mercado_pago")
      .eq("event_id", eventId);

    return json({ received: true, updated: result.updated });
  } catch (err) {
    console.error("mercado-pago-webhook error", err instanceof Error ? err.message : String(err));
    return json({ received: true }, 200);
  }
});
