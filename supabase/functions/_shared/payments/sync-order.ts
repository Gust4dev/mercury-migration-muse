// Sincroniza um pedido interno da Mercury com o resultado do Mercado Pago.
// Usado tanto pela criação do pagamento quanto pelo webhook (idempotente).

import { extractPayment, mpEnvironment, toPaymentStatus } from "./mercado-pago.ts";

// deno-lint-ignore no-explicit-any
type Client = any;

export async function syncOrderFromMpOrder(
  supabase: Client,
  mpOrder: Record<string, unknown>,
  opts: { idempotencyKey?: string; orderId?: string } = {},
) {
  const p = extractPayment(mpOrder);

  let orderId = opts.orderId ?? null;
  let order: Record<string, unknown> | null = null;

  if (!orderId && p.externalReference) {
    const { data } = await supabase
      .from("orders")
      .select("id,order_number,status,payment_status,requires_artwork,total,paid_at")
      .eq("order_number", p.externalReference)
      .maybeSingle();
    order = data ?? null;
    orderId = data?.id ?? null;
  } else if (orderId) {
    const { data } = await supabase
      .from("orders")
      .select("id,order_number,status,payment_status,requires_artwork,total,paid_at")
      .eq("id", orderId)
      .maybeSingle();
    order = data ?? null;
  }
  if (!orderId || !order) return { updated: false, payment: p };

  const paymentStatus = toPaymentStatus(p.status);
  const approved = paymentStatus === "approved";

  // ---------- Tentativa de pagamento (payments) ----------
  const attempt = {
    order_id: orderId,
    provider: "mercado_pago",
    provider_payment_id: p.paymentId,
    mercado_pago_order_id: p.mpOrderId || null,
    method: p.methodId,
    amount: p.amount || Number(order.total ?? 0),
    status: paymentStatus,
    status_detail: p.statusDetail || null,
    installments: p.installments,
    card_last_four: p.cardLastFour,
    card_brand: p.methodType === "credit_card" ? p.methodId : null,
    external_reference: p.externalReference || null,
    paid_at: approved ? new Date().toISOString() : null,
    expires_at: p.expiresAt,
    qr_code: p.qrCode,
    qr_code_base64: p.qrCodeBase64,
    environment: mpEnvironment(),
    raw: mpOrder,
    updated_at: new Date().toISOString(),
  };

  let existingId: string | null = null;
  if (p.mpOrderId) {
    const { data } = await supabase
      .from("payments")
      .select("id,paid_at")
      .eq("mercado_pago_order_id", p.mpOrderId)
      .maybeSingle();
    existingId = data?.id ?? null;
    if (data?.paid_at) attempt.paid_at = data.paid_at;
  }

  if (existingId) {
    await supabase.from("payments").update(attempt).eq("id", existingId);
  } else {
    await supabase.from("payments").insert({ ...attempt, idempotency_key: opts.idempotencyKey ?? null });
  }

  // ---------- Pedido ----------
  const patch: Record<string, unknown> = {
    payment_status: paymentStatus,
    payment_status_detail: p.statusDetail || null,
    mercado_pago_order_id: p.mpOrderId || null,
  };
  if (p.methodId) patch.payment_method = p.methodType === "credit_card" ? "card" : p.methodId;

  const alreadyPaid = order.payment_status === "approved";
  if (approved && !alreadyPaid) {
    patch.paid_at = order.paid_at ?? new Date().toISOString();
    if (order.status === "awaiting_payment") {
      patch.status = order.requires_artwork ? "awaiting_artwork" : "in_production";
    }
  }

  await supabase.from("orders").update(patch).eq("id", orderId);

  return { updated: true, payment: p, paymentStatus, orderNumber: order.order_number as string };
}
