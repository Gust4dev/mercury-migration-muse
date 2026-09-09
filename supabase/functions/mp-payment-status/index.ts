import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { mpFetch } from "../_shared/payments/mercado-pago.ts";
import { syncOrderFromMpOrder } from "../_shared/payments/sync-order.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

// Consulta leve de status usada pela página de aguardo do PIX.
// A fonte oficial de atualização continua sendo o webhook.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const orderNumber = String(body?.order_number ?? "").trim().toUpperCase();
    const email = String(body?.email ?? "").trim().toLowerCase();
    if (!orderNumber || !email) return json({ error: "invalid_request" }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: order } = await supabase
      .from("orders")
      .select("id,order_number,customer_email,payment_status,status,mercado_pago_order_id,total")
      .eq("order_number", orderNumber)
      .maybeSingle();

    if (!order || String(order.customer_email).toLowerCase() !== email) return json({ error: "order_not_found" }, 404);

    let paymentStatus = order.payment_status;
    let orderStatus = order.status;

    if (order.payment_status !== "approved" && order.mercado_pago_order_id) {
      const { status, data } = await mpFetch(`/v1/orders/${order.mercado_pago_order_id}`);
      if (status < 400) {
        const r = await syncOrderFromMpOrder(supabase, data, { orderId: order.id });
        paymentStatus = r.paymentStatus ?? paymentStatus;
        const { data: fresh } = await supabase.from("orders").select("status").eq("id", order.id).maybeSingle();
        orderStatus = fresh?.status ?? orderStatus;
      }
    }

    return json({ payment_status: paymentStatus, order_status: orderStatus, total: Number(order.total) });
  } catch (err) {
    console.error("mp-payment-status error", err instanceof Error ? err.message : String(err));
    return json({ error: "unexpected" }, 500);
  }
});
