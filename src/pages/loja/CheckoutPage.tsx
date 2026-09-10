import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Truck } from "lucide-react";
import SEO from "@/components/SEO";
import LojaLayout from "@/components/loja/LojaLayout";
import ShippingCalculator from "@/components/loja/ShippingCalculator";
import MercadoPagoCheckout from "@/components/loja/MercadoPagoCheckout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/loja/useAuth";
import { useCart } from "@/lib/loja/cart";
import { brl, formatCep } from "@/lib/loja/pricing";
import { getSavedCep, isCepComplete, lookupCep, saveCep } from "@/lib/loja/cep";
import { normalizeCep, type QuoteOption, type QuoteResult } from "@/lib/loja/shipping";

interface CreatedOrder {
  order_number: string;
  email: string;
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  deliveryLabel: string;
  addressLabel: string;
  document: string;
}


const CheckoutPage = () => {
  const { items, subtotal, maxProductionDays, clear } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    cep: localStorage.getItem("mercury-loja-cep") ?? "",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    notes: "",
  });
  const [delivery, setDelivery] = useState<"shipping" | "local">("shipping");
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [selectedOption, setSelectedOption] = useState<QuoteOption | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number; freeShipping: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<CreatedOrder | null>(null);


  useEffect(() => {
    if (user) setForm((f) => ({ ...f, email: f.email || user.email || "" }));
  }, [user]);

  const lookupCep = async (value: string) => {
    const digits = onlyDigits(value);
    if (digits.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) return;
      setForm((f) => ({
        ...f,
        street: data.logradouro || f.street,
        district: data.bairro || f.district,
        city: data.localidade || f.city,
        state: data.uf || f.state,
      }));
    } catch {
      /* o cliente pode preencher manualmente */
    }
  };

  // Endereço alterado invalida a cotação anterior.
  const quotedCep = quote ? normalizeCep(localStorage.getItem("mercury-loja-cep") ?? "") : "";
  const cepMismatch =
    delivery === "shipping" && !!quote && normalizeCep(form.cep) !== quotedCep && normalizeCep(form.cep).length === 8;

  const shippingCost = delivery === "local" || coupon?.freeShipping ? 0 : selectedOption?.price ?? 0;
  const discount = coupon?.discount ?? 0;
  const total = Math.max(0, subtotal - discount) + shippingCost;

  const applyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    const { data } = await supabase
      .from("coupons")
      .select("code,discount_type,discount_value,free_shipping,min_order_total,valid_from,valid_until,max_uses,used_count,active")
      .eq("code", code)
      .eq("active", true)
      .maybeSingle();

    const now = new Date();
    const invalid =
      !data ||
      subtotal < Number(data.min_order_total || 0) ||
      (data.valid_from && new Date(data.valid_from) > now) ||
      (data.valid_until && new Date(data.valid_until) < now) ||
      (data.max_uses != null && data.used_count >= data.max_uses);

    if (invalid) {
      setCoupon(null);
      toast({ title: "Cupom inválido", description: "Verifique o código ou as condições de uso.", variant: "destructive" });
      return;
    }

    const value =
      data.discount_type === "percent"
        ? (subtotal * Number(data.discount_value)) / 100
        : Number(data.discount_value);
    setCoupon({ code: data.code, discount: Math.min(value, subtotal), freeShipping: data.free_shipping });
    toast({ title: "Cupom aplicado", description: data.code });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!form.name.trim() || !form.email.trim()) {
      toast({ title: "Dados incompletos", description: "Informe nome e e-mail.", variant: "destructive" });
      return;
    }
    if (delivery === "shipping") {
      if (!form.cep || !form.street || !form.city || !form.state) {
        toast({ title: "Endereço incompleto", description: "Preencha o endereço de entrega.", variant: "destructive" });
        return;
      }
      if (!quote || !selectedOption || cepMismatch) {
        toast({
          title: "Escolha a entrega",
          description: "Calcule o frete para o CEP informado e selecione uma opção.",
          variant: "destructive",
        });
        return;
      }
    }
    if (delivery === "local" && !form.street.trim()) {
      toast({ title: "Endereço incompleto", description: "Informe o endereço da entrega em Anápolis.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-order", {
        body: {
          customer: { name: form.name, email: form.email, phone: form.phone, document: form.document },
          address: {
            postal_code: form.cep,
            street: form.street,
            number: form.number,
            complement: form.complement,
            district: form.district,
            city: form.city,
            state: form.state,
          },
          delivery_method: delivery,
          quote_id: delivery === "shipping" ? quote?.quote_id : null,
          shipping_service_id: delivery === "shipping" ? selectedOption?.serviceId : null,
          coupon_code: coupon?.code ?? null,
          payment_method: "pix",
          notes: form.notes,
          items: items.map((i) => ({
            product_id: i.productId,
            quantity: i.quantity,
            customization: i.customization,
          })),
        },
      });

      if (error) {
        const ctx = (error as { context?: Response }).context;
        let message = "Tente novamente.";
        if (ctx && typeof ctx.json === "function") {
          try {
            const body = await ctx.json();
            if (body?.message) message = body.message;
          } catch {
            /* mensagem padrão */
          }
        }
        throw new Error(message);
      }
      if (!data?.order_number) throw new Error(data?.message ?? "Tente novamente.");

      clear();
      setCreated({
        order_number: data.order_number,
        email: form.email.trim(),
        total: Number(data.total ?? total),
        subtotal: Number(data.subtotal ?? subtotal),
        discount: Number(data.discount ?? discount),
        shipping: Number(data.shipping_cost ?? shippingCost),
        deliveryLabel:
          delivery === "local"
            ? "Entrega grátis em Anápolis/GO"
            : `${selectedOption?.carrier ?? ""} ${selectedOption?.service ?? ""}`.trim(),
        addressLabel: [form.street, form.number, form.district, form.city, form.state].filter(Boolean).join(", "),
        document: form.document,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (err) {
      toast({
        title: "Não foi possível finalizar",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (created) {
    return (
      <LojaLayout>
        <SEO title="Pagamento | Mercury Loja" description="Pagamento do seu pedido na Mercury Loja." canonical="/loja/checkout" noindex />
        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-2xl">
          <h1 className="font-heading text-2xl font-bold mb-5">Pagamento</h1>
          <MercadoPagoCheckout
            orderNumber={created.order_number}
            email={created.email}
            total={created.total}
            document={created.document}
            deliveryLabel={created.deliveryLabel}
            addressLabel={created.addressLabel}
            subtotal={created.subtotal}
            discount={created.discount}
            shipping={created.shipping}
          />
        </div>
      </LojaLayout>
    );
  }

  if (items.length === 0) {

    return (
      <LojaLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Seu carrinho está vazio.</p>
          <Link to="/loja/catalogo" className="text-primary hover:underline mt-3 inline-block">
            Ver produtos
          </Link>
        </div>
      </LojaLayout>
    );
  }

  const input = "w-full h-10 px-3 rounded bg-secondary border border-border text-sm";

  return (
    <LojaLayout>
      <SEO title="Checkout | Mercury Loja" description="Finalize seu pedido na Mercury Loja." canonical="/loja/checkout" noindex />

      <form onSubmit={submit} className="container mx-auto px-4 lg:px-8 py-8 grid lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-5">
          <h1 className="font-heading text-2xl font-bold">Finalizar compra</h1>

          {!user && (
            <div className="rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground">
              Você pode comprar sem criar conta.{" "}
              <Link to="/loja/conta" className="text-primary hover:underline">
                Entrar ou criar conta
              </Link>{" "}
              facilita o acompanhamento dos pedidos.
            </div>
          )}

          <section className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="font-semibold text-sm">Seus dados</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input className={input} placeholder="Nome completo *" maxLength={120} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className={input} type="email" placeholder="E-mail *" maxLength={200} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className={input} placeholder="WhatsApp" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className={input} placeholder="CPF / CNPJ" maxLength={20} value={form.document} onChange={(e) => setForm({ ...form, document: e.target.value })} />
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="font-semibold text-sm">Entrega</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDelivery("shipping")}
                className={`flex items-center gap-2 h-11 px-3 rounded border text-sm ${delivery === "shipping" ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
              >
                <Truck className="h-4 w-4" /> Receber em casa
              </button>
              <button
                type="button"
                onClick={() => {
                  setDelivery("local");
                  setSelectedOption(null);
                }}
                className={`flex items-center gap-2 h-11 px-3 rounded border text-sm ${delivery === "local" ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
              >
                <MapPin className="h-4 w-4" /> Entrega grátis em Anápolis/GO
              </button>
            </div>

            {delivery === "shipping" ? (
              <div className="space-y-3">
                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    className={input}
                    placeholder="CEP *"
                    inputMode="numeric"
                    value={form.cep}
                    onChange={(e) => {
                      setForm({ ...form, cep: formatCep(e.target.value) });
                      setQuote(null);
                      setSelectedOption(null);
                    }}
                    onBlur={(e) => lookupCep(e.target.value)}
                  />
                  <input className={`${input} sm:col-span-2`} placeholder="Rua *" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
                  <input className={input} placeholder="Número" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
                  <input className={input} placeholder="Complemento" value={form.complement} onChange={(e) => setForm({ ...form, complement: e.target.value })} />
                  <input className={input} placeholder="Bairro" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
                  <input className={`${input} sm:col-span-2`} placeholder="Cidade *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  <input className={input} placeholder="UF *" maxLength={2} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value.toUpperCase() })} />
                </div>

                <ShippingCalculator
                  title="Calcular entrega"
                  selectable
                  items={items.map((i) => ({ product_id: i.productId, quantity: i.quantity }))}
                  initialCep={form.cep}
                  selectedServiceId={selectedOption?.serviceId ?? null}
                  onQuote={setQuote}
                  onSelect={setSelectedOption}
                  onCepChange={(cep) => {
                    setForm((f) => ({ ...f, cep }));
                    lookupCep(cep);
                  }}
                />

                {cepMismatch && (
                  <p className="text-[11px] text-destructive">
                    O CEP do endereço mudou. Calcule a entrega novamente antes de finalizar.
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Entregamos gratuitamente em Anápolis/GO. Informe o endereço para a nossa equipe combinar a entrega.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <input className={`${input} sm:col-span-2`} placeholder="Rua *" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
                  <input className={input} placeholder="Número" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
                  <input className={input} placeholder="Bairro" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
                  <input className={`${input} sm:col-span-2`} placeholder="Complemento / ponto de referência" value={form.complement} onChange={(e) => setForm({ ...form, complement: e.target.value })} />
                  <input
                    className={input}
                    placeholder="CEP"
                    inputMode="numeric"
                    value={form.cep}
                    onChange={(e) => setForm({ ...form, cep: formatCep(e.target.value) })}
                  />
                  <div className="sm:col-span-2 flex items-center gap-2 h-10 px-3 rounded bg-secondary border border-border text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" /> Anápolis / GO · frete grátis
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="font-semibold text-sm">Pagamento</div>
            <p className="text-[11px] text-muted-foreground">
              Na próxima etapa você escolhe entre PIX ou cartão de crédito, sem sair do site.
            </p>

            <textarea
              rows={3}
              placeholder="Observações do pedido (opcional)"
              maxLength={500}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full px-3 py-2 rounded bg-secondary border border-border text-sm"
            />
          </section>
        </div>

        <aside className="rounded-lg border border-border bg-card p-4 h-fit lg:sticky lg:top-40">
          <div className="font-semibold mb-3">Resumo do pedido</div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {items.map((i) => (
              <div key={i.key} className="flex justify-between text-sm gap-2">
                <span className="text-muted-foreground line-clamp-1">
                  {i.quantity}x {i.name}
                </span>
                <span>{brl(i.unitPrice * i.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Cupom"
              className="flex-1 h-10 px-3 rounded bg-secondary border border-border text-sm"
            />
            <button type="button" onClick={applyCoupon} className="h-10 px-3 rounded border border-border text-sm">
              Aplicar
            </button>
          </div>

          <div className="border-t border-border mt-4 pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{brl(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-primary">
                <span>Desconto</span>
                <span>-{brl(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Frete {selectedOption ? `· ${selectedOption.carrier} ${selectedOption.service}` : ""}
              </span>
              <span>{delivery === "local" ? "Grátis" : shippingCost ? brl(shippingCost) : "—"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total</span>
              <span className="text-primary">{brl(total)}</span>
            </div>
            {delivery === "shipping" && selectedOption && (
              <div className="text-[11px] text-muted-foreground pt-1">
                Produção até {quote?.production_days ?? maxProductionDays} dia(s) úteis + entrega em{" "}
                {selectedOption.daysMin}–{selectedOption.daysMax} dia(s) úteis.
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-11 mt-4 rounded-md bg-primary text-primary-foreground font-bold hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Enviando..." : "Confirmar pedido"}
          </button>
        </aside>
      </form>
    </LojaLayout>
  );
};

export default CheckoutPage;
