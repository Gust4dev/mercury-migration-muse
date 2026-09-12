// Catálogo de serviços de frete (Correios, Jadlog e Loggi) para o painel administrativo.
// Somente administradores autenticados. O token do Melhor Envio permanece no backend.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { listServices, MelhorEnvioError } from "../_shared/shipping/melhor-envio.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "unauthorized" }, 401);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: userData } = await admin.auth.getUser(authHeader.replace("Bearer ", ""));
    const userId = userData.user?.id;
    if (!userId) return json({ error: "unauthorized" }, 401);

    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin");
    if (!roles?.length) return json({ error: "forbidden" }, 403);

    let services;
    try {
      services = await listServices();
    } catch (err) {
      const code = err instanceof MelhorEnvioError ? err.message : "provider_error";
      console.error("shipping-services provider failure", code);
      return json(
        {
          error: code === "missing_token" ? "not_configured" : "provider_unavailable",
          message: "Não foi possível carregar os serviços das transportadoras agora.",
        },
        503,
      );
    }

    const { data: settings } = await admin
      .from("shipping_settings")
      .select("disabled_services")
      .eq("id", 1)
      .maybeSingle();

    return json({
      services,
      disabled_services: ((settings?.disabled_services as string[] | null) ?? []).map(String),
    });
  } catch (err) {
    console.error("shipping-services error", err instanceof Error ? err.message : String(err));
    return json({ error: "unexpected" }, 500);
  }
});
