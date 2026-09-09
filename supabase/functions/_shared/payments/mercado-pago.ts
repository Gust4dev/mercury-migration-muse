// Cliente backend do Mercado Pago (PRODUÇÃO). O Access Token NUNCA sai daqui.

export const mpEnvironment = () => (Deno.env.get("PAYMENT_ENVIRONMENT") ?? "production").toLowerCase();

const env = (name: string) => (Deno.env.get(name) ?? "").trim();

export const mpAccessToken = () => env("MERCADO_PAGO_ACCESS_TOKEN");
export const mpPublicKey = () => env("MERCADO_PAGO_PUBLIC_KEY");
export const mpWebhookSecret = () => env("MERCADO_PAGO_WEBHOOK_SECRET");

const BASE = "https://api.mercadopago.com";

export async function mpFetch(
  path: string,
  init: { method?: string; body?: unknown; idempotencyKey?: string } = {},
): Promise<{ status: number; data: Record<string, unknown> }> {
  const token = mpAccessToken();
  if (!token) throw new Error("missing_mercado_pago_access_token");

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  if (init.idempotencyKey) headers["X-Idempotency-Key"] = init.idempotencyKey;

  const res = await fetch(`${BASE}${path}`, {
    method: init.method ?? "GET",
    headers,
    body: init.body ? JSON.stringify(init.body) : undefined,
  });

  const text = await res.text();
  let data: Record<string, unknown> = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  return { status: res.status, data };
}

export const money = (v: number) => v.toFixed(2);

// ---------- Mapeamento de status ----------

export const MP_TO_PAYMENT_STATUS: Record<string, string> = {
  approved: "approved",
  accredited: "approved",
  processed: "approved",
  authorized: "in_process",
  pending: "pending",
  action_required: "pending",
  in_process: "in_process",
  in_mediation: "in_process",
  rejected: "rejected",
  cancelled: "cancelled",
  canceled: "cancelled",
  expired: "cancelled",
  refunded: "refunded",
  charged_back: "refunded",
};

export const toPaymentStatus = (mpStatus?: string | null) =>
  MP_TO_PAYMENT_STATUS[String(mpStatus ?? "").toLowerCase()] ?? "pending";

/** Extrai o primeiro pagamento da Order do Mercado Pago. */
export function extractPayment(order: Record<string, unknown>) {
  const transactions = (order.transactions ?? {}) as { payments?: Record<string, unknown>[] };
  const payment = (transactions.payments ?? [])[0] ?? {};
  const pm = (payment.payment_method ?? {}) as Record<string, unknown>;
  return {
    mpOrderId: String(order.id ?? ""),
    externalReference: String(order.external_reference ?? ""),
    paymentId: payment.id ? String(payment.id) : null,
    status: String(payment.status ?? order.status ?? "pending"),
    statusDetail: String(payment.status_detail ?? order.status_detail ?? ""),
    methodId: pm.id ? String(pm.id) : null,
    methodType: pm.type ? String(pm.type) : null,
    installments: pm.installments ? Number(pm.installments) : null,
    cardLastFour: (() => {
      const card = (pm.card ?? (payment as Record<string, unknown>).card) as Record<string, unknown> | undefined;
      const v = card?.last_four_digits ?? card?.last_four;
      return v ? String(v) : null;
    })(),
    qrCode: pm.qr_code ? String(pm.qr_code) : null,
    qrCodeBase64: pm.qr_code_base64 ? String(pm.qr_code_base64) : null,
    ticketUrl: pm.ticket_url ? String(pm.ticket_url) : null,
    expiresAt: order.expiration_time
      ? String(order.expiration_time)
      : payment.date_of_expiration
        ? String(payment.date_of_expiration)
        : null,
    amount: Number(payment.amount ?? order.total_amount ?? 0),
  };
}
