import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { mpEnvironment, mpPublicKey } from "../_shared/payments/mercado-pago.ts";

// Devolve apenas dados públicos da integração (Public Key + ambiente).
Deno.serve((req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const publicKey = mpPublicKey();
  return new Response(
    JSON.stringify({ public_key: publicKey, environment: mpEnvironment(), configured: !!publicKey }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
