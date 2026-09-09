import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Copy, CreditCard, Loader2, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brl, onlyDigits } from "@/lib/loja/pricing";
import { getMp, PAYMENT_STATUS_LABEL } from "@/lib/loja/mercadopago";

interface Props {
  orderNumber: string;
  email: string;
  total: number;
  document?: string;
  deliveryLabel: string;
  addressLabel: string;
  subtotal: number;
  discount: number;
  shipping: number;
}

interface PixData {
  qr_code: string | null;
  qr_code_base64: string | null;
  expires_at: string | null;
}

interface Installment {
  installments: number;
  recommended_message: string;
  installment_amount: number;
}

const invokeMessage = async (error: unknown, fallback: string) => {
  const ctx = (error as { context?: Response })?.context;
  if (ctx && typeof ctx.json === "function") {
    try {
      const body = await ctx.json();
      if (body?.message) return String(body.message);
    } catch {
      /* usa o fallback */
    }
  }
  return fallback;
};

const MercadoPagoCheckout = ({
  orderNumber,
  email,
  total,
  document: payerDocument,
  deliveryLabel,
  addressLabel,
  subtotal,
  discount,
  shipping,
}: Props) => {
  const { toast } = useToast();
  const [method, setMethod] = useState<"pix" | "card" | null>(null);
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<PixData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("pending");
  const idempotencyRef = useRef<string>(crypto.randomUUID());

  // ---------- Cartão ----------
  const [card, setCard] = useState({
    number: "",
    holder: "",
    month: "",
    year: "",
    cvv: "",
    doc: payerDocument ?? "",
  });
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  const bin = useMemo(() => onlyDigits(card.number).slice(0, 8), [card.number]);

  useEffect(() => {
    if (method !== "card" || bin.length < 6) {
      setInstallments([]);
      setPaymentMethodId(null);
      return;
    }
    let active = true;
    (async () => {
      try {
        const mp = await getMp();
        const methods = await mp.getPaymentMethods({ bin });
        const credit = methods.results.find((m) => m.payment_type_id === "credit_card") ?? methods.results[0];
        if (!active) return;
        setPaymentMethodId(credit?.id ?? null);
        const list = await mp.getInstallments({ amount: total.toFixed(2), bin, paymentTypeId: "credit_card" });
        if (!active) return;
        setInstallments((list?.[0]?.payer_costs ?? []) as Installment[]);
        setSelectedInstallment(1);
      } catch {
        if (active) setInstallments([]);
      }
    })();
    return () => {
      active = false;
    };
  }, [bin, method, total]);

  // ---------- Polling leve enquanto o cliente estiver na página ----------
  useEffect(() => {
    if (!pix || paymentStatus === "approved") return;
    const timer = setInterval(async () => {
      const { data } = await supabase.functions.invoke("mp-payment-status", {
        body: { order_number: orderNumber, email },
      });
      if (data?.payment_status) setPaymentStatus(data.payment_status);
    }, 6000);
    return () => clearInterval(timer);
  }, [pix, paymentStatus, orderNumber, email]);

  const payWithPix = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("mp-create-payment", {
        body: {
          order_number: orderNumber,
          email,
          method: "pix",
          idempotency_key: idempotencyRef.current,
          payer: { document: card.doc || payerDocument },
        },
      });
      if (error) throw new Error(await invokeMessage(error, "Não foi possível gerar o PIX."));
      setPix({ qr_code: data.qr_code, qr_code_base64: data.qr_code_base64, expires_at: data.expires_at });
      setPaymentStatus(data.payment_status ?? "pending");
    } catch (err) {
      toast({
        title: "Pagamento",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "destructive",
      });
      idempotencyRef.current = crypto.randomUUID();
    } finally {
      setLoading(false);
    }
  };

  const payWithCard = async () => {
    if (!paymentMethodId) {
      toast({ title: "Cartão", description: "Confira o número do cartão.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const mp = await getMp();
      const token = await mp.createCardToken({
        cardNumber: onlyDigits(card.number),
        cardholderName: card.holder,
        cardExpirationMonth: card.month,
        cardExpirationYear: card.year.length === 2 ? `20${card.year}` : card.year,
        securityCode: card.cvv,
        identificationType: onlyDigits(card.doc).length > 11 ? "CNPJ" : "CPF",
        identificationNumber: onlyDigits(card.doc),
      });

      const { data, error } = await supabase.functions.invoke("mp-create-payment", {
        body: {
          order_number: orderNumber,
          email,
          method: "card",
          token: token.id,
          payment_method_id: paymentMethodId,
          installments: selectedInstallment,
          idempotency_key: idempotencyRef.current,
          payer: { document: card.doc },
        },
      });
      if (error) {
        throw new Error(
          await invokeMessage(
            error,
            "Não foi possível aprovar este pagamento. Verifique os dados do cartão ou tente outro cartão.",
          ),
        );
      }
      setPaymentStatus(data.payment_status ?? "pending");
      if (data.payment_status !== "approved") {
        idempotencyRef.current = crypto.randomUUID();
        if (data.payment_status === "rejected") {
          toast({
            title: "Pagamento recusado",
            description: "Verifique os dados do cartão ou tente outro cartão.",
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      idempotencyRef.current = crypto.randomUUID();
      toast({
        title: "Pagamento",
        description:
          err instanceof Error
            ? err.message
            : "Não foi possível aprovar este pagamento. Verifique os dados do cartão ou tente outro cartão.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyPix = async () => {
    if (!pix?.qr_code) return;
    await navigator.clipboard.writeText(pix.qr_code);
    toast({ title: "Código copiado" });
  };

  const input = "w-full h-10 px-3 rounded bg-secondary border border-border text-sm";

  if (paymentStatus === "approved") {
    return (
      <div className="rounded-lg border border-primary/40 bg-card p-6 text-center space-y-3">
        <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
        <h2 className="font-heading text-xl font-bold">Pedido confirmado</h2>
        <div className="text-sm text-muted-foreground space-y-1">
          <div>
            Pedido: <span className="text-foreground font-semibold">{orderNumber}</span>
          </div>
          <div>Pagamento: aprovado</div>
          <div>Entrega: {deliveryLabel}</div>
          <div>
            Total: <span className="text-primary font-bold">{brl(total)}</span>
          </div>
        </div>
        <Link
          to={`/loja/pedido?numero=${orderNumber}&email=${encodeURIComponent(email)}`}
          className="inline-flex h-11 items-center px-6 rounded-md bg-primary text-primary-foreground font-bold"
        >
          Acompanhar pedido
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-border bg-card p-4 text-sm space-y-1">
        <div className="font-semibold">Resumo</div>
        <div className="flex justify-between text-muted-foreground">
          <span>Produtos</span>
          <span>{brl(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-primary">
            <span>Desconto</span>
            <span>-{brl(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-muted-foreground">
          <span>Frete</span>
          <span>{shipping ? brl(shipping) : "Grátis"}</span>
        </div>
        <div className="flex justify-between font-bold pt-1">
          <span>Total</span>
          <span className="text-primary">{brl(total)}</span>
        </div>
        <div className="pt-2 text-xs text-muted-foreground">
          <div>Pedido: {orderNumber}</div>
          <div>Entrega: {deliveryLabel}</div>
          <div>Endereço: {addressLabel}</div>
        </div>
      </div>

      {!pix && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <div className="font-semibold text-sm uppercase tracking-wide">Como deseja pagar?</div>
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod("pix")}
              className={`flex items-center gap-2 h-11 px-3 rounded border text-sm ${method === "pix" ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
            >
              <QrCode className="h-4 w-4" /> PIX
            </button>
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={`flex items-center gap-2 h-11 px-3 rounded border text-sm ${method === "card" ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
            >
              <CreditCard className="h-4 w-4" /> Cartão de crédito
            </button>
          </div>

          {method === "pix" && (
            <button
              type="button"
              onClick={payWithPix}
              disabled={loading}
              className="w-full h-11 rounded-md bg-primary text-primary-foreground font-bold disabled:opacity-60"
            >
              {loading ? "Gerando PIX..." : `Gerar PIX de ${brl(total)}`}
            </button>
          )}

          {method === "card" && (
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  className={`${input} sm:col-span-2`}
                  placeholder="Número do cartão"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                />
                <input
                  className={`${input} sm:col-span-2`}
                  placeholder="Nome impresso no cartão"
                  autoComplete="cc-name"
                  value={card.holder}
                  onChange={(e) => setCard({ ...card, holder: e.target.value.toUpperCase() })}
                />
                <input
                  className={input}
                  placeholder="Mês (MM)"
                  inputMode="numeric"
                  maxLength={2}
                  value={card.month}
                  onChange={(e) => setCard({ ...card, month: onlyDigits(e.target.value) })}
                />
                <input
                  className={input}
                  placeholder="Ano (AAAA)"
                  inputMode="numeric"
                  maxLength={4}
                  value={card.year}
                  onChange={(e) => setCard({ ...card, year: onlyDigits(e.target.value) })}
                />
                <input
                  className={input}
                  placeholder="CVV"
                  inputMode="numeric"
                  maxLength={4}
                  value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: onlyDigits(e.target.value) })}
                />
                <input
                  className={input}
                  placeholder="CPF do titular"
                  inputMode="numeric"
                  value={card.doc}
                  onChange={(e) => setCard({ ...card, doc: e.target.value })}
                />
              </div>

              {installments.length > 0 && (
                <select
                  aria-label="Parcelas"
                  className={input}
                  value={selectedInstallment}
                  onChange={(e) => setSelectedInstallment(Number(e.target.value))}
                >
                  {installments.map((i) => (
                    <option key={i.installments} value={i.installments}>
                      {i.recommended_message ?? `${i.installments}x de ${brl(i.installment_amount)}`}
                    </option>
                  ))}
                </select>
              )}

              <div className="text-xs text-muted-foreground">
                Total {brl(total)} ·{" "}
                {installments.find((i) => i.installments === selectedInstallment)?.recommended_message ??
                  `1x de ${brl(total)}`}
              </div>

              <button
                type="button"
                onClick={payWithCard}
                disabled={loading}
                className="w-full h-11 rounded-md bg-primary text-primary-foreground font-bold disabled:opacity-60"
              >
                {loading ? "Processando..." : `Pagar ${brl(total)}`}
              </button>
              <p className="text-[11px] text-muted-foreground">
                Os dados do cartão são enviados com segurança direto para o Mercado Pago. A Mercury não armazena número
                completo nem CVV.
              </p>
            </div>
          )}
        </div>
      )}

      {pix && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3 text-center">
          <div className="font-semibold">PIX</div>
          <div className="text-2xl font-bold text-primary">{brl(total)}</div>
          {pix.qr_code_base64 && (
            <img
              src={`data:image/png;base64,${pix.qr_code_base64}`}
              alt={`QR Code PIX do pedido ${orderNumber}`}
              className="mx-auto w-56 h-56 bg-white rounded p-2"
            />
          )}
          {pix.qr_code && (
            <>
              <textarea
                readOnly
                rows={3}
                value={pix.qr_code}
                aria-label="Código PIX copia e cola"
                className="w-full px-3 py-2 rounded bg-secondary border border-border text-[11px] break-all"
              />
              <button
                type="button"
                onClick={copyPix}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-primary text-primary-foreground font-bold"
              >
                <Copy className="h-4 w-4" /> Copiar código PIX
              </button>
            </>
          )}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> {PAYMENT_STATUS_LABEL[paymentStatus] ?? "Aguardando pagamento"}
          </div>
          <p className="text-xs text-muted-foreground">Após o pagamento, a confirmação acontece automaticamente.</p>
          {pix.expires_at && (
            <p className="text-[11px] text-muted-foreground">
              Válido até {new Date(pix.expires_at).toLocaleString("pt-BR")}
            </p>
          )}
          <Link
            to={`/loja/pedido?numero=${orderNumber}&email=${encodeURIComponent(email)}`}
            className="inline-block text-sm text-primary hover:underline"
          >
            Acompanhar pedido
          </Link>
        </div>
      )}

      {paymentStatus === "rejected" && !pix && (
        <p className="text-sm text-destructive">
          Não foi possível aprovar este pagamento. Verifique os dados do cartão ou tente outro cartão.
        </p>
      )}
    </div>
  );
};

export default MercadoPagoCheckout;
