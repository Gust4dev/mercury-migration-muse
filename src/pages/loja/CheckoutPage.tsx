import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, MapPin, QrCode, Truck } from "lucide-react";
import SEO from "@/components/SEO";
import LojaLayout from "@/components/loja/LojaLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/loja/useAuth";
import { useCart } from "@/lib/loja/cart";
import { brl, estimateShipping, formatCep, onlyDigits, orderNumber, type ShippingOption } from "@/lib/loja/pricing";

const CheckoutPage = () => {
  const { items, subtotal, totalWeight, maxProductionDays, clear } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null);
  const [payment, setPayment] = useState<"pix" | "card" | "boleto">("pix");
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number; freeShipping: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, email: f.email || user.email || "" }));
  }, [user]);

  useEffect(() => {
    if (delivery !== "shipping") {
      setSelectedOption(null);
      return;
    }
    const opts = estimateShipping(form.cep, totalWeight);
    setOptions(opts);
    setSelectedOption((prev) => opts.find((o) => o.id === prev?.id) ?? opts[0] ?? null);
  }, [form.cep, totalWeight, delivery]);

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
      /* estimativa manual */
    }
  };

  const shippingCost = delivery === "pickup" || coupon?.freeShipping ? 0 : selectedOption?.price ?? 0;
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
    if (delivery === "shipping" && (!form.cep || !form.street || !form.city || !form.state)) {
      toast({ title: "Endereço incompleto", description: "Preencha o endereço de entrega.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const number = orderNumber();
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          order_number: number,
          user_id: user?.id ?? null,
          customer_name: form.name.trim(),
          customer_email: form.email.trim().toLowerCase(),
          customer_phone: form.phone,
          customer_document: form.document,
          delivery_method: delivery,
          pickup_location_id: delivery === "pickup" ? pickupId || null : null,
          shipping_postal_code: delivery === "shipping" ? form.cep : null,
          shipping_street: delivery === "shipping" ? form.street : null,
          shipping_number: delivery === "shipping" ? form.number : null,
          shipping_complement: delivery === "shipping" ? form.complement : null,
          shipping_district: delivery === "shipping" ? form.district : null,
          shipping_city: delivery === "shipping" ? form.city : null,
          shipping_state: delivery === "shipping" ? form.state : null,
          shipping_carrier: delivery === "shipping" ? selectedOption?.carrier ?? null : null,
          shipping_service: delivery === "shipping" ? selectedOption?.service ?? null : null,
          shipping_cost: shippingCost,
          shipping_days_min: selectedOption?.daysMin ?? null,
          shipping_days_max: selectedOption?.daysMax ?? null,
          production_days: maxProductionDays,
          subtotal,
          discount_total: discount,
          coupon_code: coupon?.code ?? null,
          total,
          payment_method: payment,
          payment_status: "pending",
          status: "awaiting_payment",
          requires_artwork: items.some((i) => i.requiresArtwork),
          notes: form.notes,
        })
        .select("id,order_number")
        .single();

      if (error) throw error;

      const { error: itemsError } = await supabase.from("order_items").insert(
        items.map((i) => ({
          order_id: order.id,
          product_id: i.productId,
          product_name: i.name,
          product_slug: i.slug,
          product_image: i.image,
          quantity: i.quantity,
          unit_price: i.unitPrice,
          base_price: i.basePrice,
          line_total: i.unitPrice * i.quantity,
          production_days: i.productionDays,
          customization: i.customization,
          requires_artwork: i.requiresArtwork,
        })),
      );
      if (itemsError) throw itemsError;

      clear();
      navigate(`/loja/pedido?numero=${order.order_number}&email=${encodeURIComponent(form.email.trim())}`);
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
                onClick={() => setDelivery("pickup")}
                disabled={pickups.length === 0}
                className={`flex items-center gap-2 h-11 px-3 rounded border text-sm disabled:opacity-40 ${delivery === "pickup" ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
              >
                <Store className="h-4 w-4" /> Retirar no local
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
                    onChange={(e) => setForm({ ...form, cep: formatCep(e.target.value) })}
                    onBlur={(e) => lookupCep(e.target.value)}
                  />
                  <input className={`${input} sm:col-span-2`} placeholder="Rua *" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
                  <input className={input} placeholder="Número" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
                  <input className={input} placeholder="Complemento" value={form.complement} onChange={(e) => setForm({ ...form, complement: e.target.value })} />
                  <input className={input} placeholder="Bairro" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
                  <input className={`${input} sm:col-span-2`} placeholder="Cidade *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  <input className={input} placeholder="UF *" maxLength={2} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value.toUpperCase() })} />
                </div>

                {options.length > 0 && (
                  <div className="space-y-2">
                    {options.map((o) => (
                      <label
                        key={o.id}
                        className={`flex items-center justify-between gap-3 p-3 rounded border cursor-pointer text-sm ${selectedOption?.id === o.id ? "border-primary" : "border-border"}`}
                      >
                        <span className="flex items-center gap-2">
                          <input type="radio" checked={selectedOption?.id === o.id} onChange={() => setSelectedOption(o)} className="accent-[hsl(var(--primary))]" />
                          {o.service} · {o.daysMin}–{o.daysMax} dias úteis
                        </span>
                        <span className="font-semibold">{brl(o.price)}</span>
                      </label>
                    ))}
                    <p className="text-[11px] text-muted-foreground">
                      Frete estimado. A cotação definitiva com a transportadora é confirmada antes do envio.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {pickups.map((p) => (
                  <label
                    key={p.id}
                    className={`flex items-start gap-2 p-3 rounded border cursor-pointer text-sm ${pickupId === p.id ? "border-primary" : "border-border"}`}
                  >
                    <input type="radio" checked={pickupId === p.id} onChange={() => setPickupId(p.id)} className="accent-[hsl(var(--primary))] mt-1" />
                    <span>
                      <span className="font-medium flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" /> {p.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">{p.address}</span>
                      {p.opening_hours && <span className="block text-xs text-muted-foreground">{p.opening_hours}</span>}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="font-semibold text-sm">Pagamento</div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { id: "pix" as const, label: "PIX", icon: QrCode },
                { id: "card" as const, label: "Cartão", icon: CreditCard },
                { id: "boleto" as const, label: "Boleto", icon: CreditCard },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayment(m.id)}
                  className={`flex items-center gap-2 h-11 px-3 rounded border text-sm ${payment === m.id ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
                >
                  <m.icon className="h-4 w-4" /> {m.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">
              O pedido é registrado e nossa equipe envia as instruções de pagamento. A integração automática com o
              gateway pode ser ativada a qualquer momento.
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
              <span className="text-muted-foreground">Frete</span>
              <span>{delivery === "pickup" ? "Retirada" : shippingCost ? brl(shippingCost) : "—"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total</span>
              <span className="text-primary">{brl(total)}</span>
            </div>
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
