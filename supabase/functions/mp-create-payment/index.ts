import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { money, mpEnvironment, mpFetch } from "../_shared/payments/mercado-pago.ts";
import { syncOrderFromMpOrder } from "../_shared/payments/sync-order.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const digits = (v: unknown) => String(v ?? "").replace(/\D/g, "");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const orderNumber = String(body?.order_number ?? "").trim().toUpperCase();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const method = body?.method === "card" ? "card" : "pix";
    const idempotencyKey = String(body?.idempotency_key ?? "").trim() || crypto.randomUUID();

    if (!orderNumber || !email) return json({ error: "invalid_request", message: "Pedido não identificado." }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    // ---------- Fonte de verdade: o pedido gravado no banco ----------
    const { data: order } = await supabase
      .from("orders")
      .select("id,order_number,customer_name,customer_email,customer_document,total,payment_status,status,requires_artwork")
      .eq("order_number", orderNumber)
      .maybeSingle();

    if (!order || String(order.customer_email).toLowerCase() !== email) {
      return json({ error: "order_not_found", message: "Pedido não encontrado." }, 404);
    }
    if (order.payment_status === "approved") {
      return json({ error: "already_paid", message: "Este pedido já está pago.", payment_status: "approved" }, 409);
    }

    const amount = Number(order.total);
    if (!(amount > 0)) return json({ error: "invalid_amount", message: "Valor do pedido inválido." }, 400);

    // Evita cobranças duplicadas por clique duplo / refresh.
    const { data: reused } = await supabase
      .from("payments")
      .select("id,status,qr_code,qr_code_base64,expires_at,mercado_pago_order_id,provider_payment_id,status_detail")
      .eq("idempotency_key", idempotencyKey)
      .maybeSingle();
    if (reused) {
      return json({
        payment_status: reused.status,
        status_detail: reused.status_detail,
        mercado_pago_order_id: reused.mercado_pago_order_id,
        payment_id: reused.provider_payment_id,
        qr_code: reused.qr_code,
        qr_code_base64: reused.qr_code_base64,
        expires_at: reused.expires_at,
        reused: true,
      });
    }

    const payerDoc = digits(body?.payer?.document ?? order.customer_document);
    const payerName = String(order.customer_name ?? "").trim();
    const [firstName, ...rest] = payerName.split(/\s+/);

    const payer: Record<string, unknown> = { email: order.customer_email };
    if (firstName) payer.first_name = firstName;
    if (rest.length) payer.last_name = rest.join(" ");
    if (payerDoc.length === 11 || payerDoc.length === 14) {
      payer.identification = { type: payerDoc.length === 11 ? "CPF" : "CNPJ", number: payerDoc };
    }

    const paymentBlock: Record<string, unknown> =
      method === "pix"
        ? {
            amount: money(amount),
            payment_method: { id: "pix", type: "bank_transfer" },
          }
        : {
            amount: money(amount),
            payment_method: {
              id: String(body?.payment_method_id ?? ""),
              type: "credit_card",
              token: String(body?.token ?? ""),
              installments: Math.max(1, Number(body?.installments ?? 1)),
              statement_descriptor: "MERCURY",
            },
          };

    if (method === "card" && (!body?.token || !body?.payment_method_id)) {
      return json({ error: "invalid_card", message: "Não foi possível validar os dados do cartão." }, 400);
    }

    const payload = {
      type: "online",
      processing_mode: "automatic",
      external_reference: order.order_number,
      total_amount: money(amount),
      description: `Pedido ${order.order_number} - Mercury Loja`,
      payer,
      transactions: { payments: [paymentBlock] },
    };

    const { status, data } = await mpFetch("/v1/orders", {
      method: "POST",
      body: payload,
      idempotencyKey,
    });

    if (status >= 400) {
      console.error("mp order error", status, JSON.stringify(data).slice(0, 800));
      await supabase.from("payments").insert({
        order_id: order.id,
        provider: "mercado_pago",
        method,
        amount,
        status: "rejected",
        status_detail: String((data as { message?: string }).message ?? "mp_error"),
        idempotency_key: idempotencyKey,
        environment: mpEnvironment(),
        external_reference: order.order_number,
        raw: data,
      });
      return json(
        {
          error: "payment_failed",
          message:
            method === "card"
              ? "Não foi possível aprovar este pagamento. Verifique os dados do cartão ou tente outro cartão."
              : "Não foi possível gerar o PIX agora. Tente novamente em instantes.",
        },
        402,
      );
    }

    const result = await syncOrderFromMpOrder(supabase, data, { idempotencyKey, orderId: order.id });
    const p = result.payment;

    return json({
      order_number: order.order_number,
      total: amount,
      payment_status: result.paymentStatus,
      status_detail: p.statusDetail,
      mercado_pago_order_id: p.mpOrderId,
      payment_id: p.paymentId,
      qr_code: p.qrCode,
      qr_code_base64: p.qrCodeBase64,
      ticket_url: p.ticketUrl,
      expires_at: p.expiresAt,
      installments: p.installments,
      card_last_four: p.cardLastFour,
    });
  } catch (err) {
    console.error("mp-create-payment error", err instanceof Error ? err.message : String(err));
    return json({ error: "unexpected", message: "Não foi possível processar o pagamento. Tente novamente." }, 500);
  }
});
