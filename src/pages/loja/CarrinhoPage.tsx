import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImageIcon, Minus, Plus, Trash2 } from "lucide-react";
import SEO from "@/components/SEO";
import LojaLayout from "@/components/loja/LojaLayout";
import { useCart } from "@/lib/loja/cart";
import { brl, estimateShipping, formatCep, unitPriceFor, type ShippingOption } from "@/lib/loja/pricing";
import { supabase } from "@/integrations/supabase/client";

const CarrinhoPage = () => {
  const { items, subtotal, totalWeight, maxProductionDays, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [cep, setCep] = useState(localStorage.getItem("mercury-loja-cep") ?? "");
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [tiersByProduct, setTiersByProduct] = useState<
    Record<string, { min_qty: number; max_qty: number | null; unit_price: number }[]>
  >({});

  useEffect(() => {
    const ids = items.map((i) => i.productId);
    if (ids.length === 0) return;
    supabase
      .from("quantity_pricing")
      .select("product_id,min_qty,max_qty,unit_price")
      .in("product_id", ids)
      .then(({ data }) => {
        const map: Record<string, { min_qty: number; max_qty: number | null; unit_price: number }[]> = {};
        (data ?? []).forEach((t) => {
          map[t.product_id] = [...(map[t.product_id] ?? []), t];
        });
        setTiersByProduct(map);
      });
  }, [items.length]);

  const changeQty = (key: string, productId: string, basePrice: number, quantity: number) => {
    const price = unitPriceFor(basePrice, tiersByProduct[productId] ?? [], quantity);
    updateQuantity(key, quantity, price);
  };

  const calc = () => {
    localStorage.setItem("mercury-loja-cep", cep);
    setOptions(estimateShipping(cep, totalWeight));
  };

  return (
    <LojaLayout>
      <SEO
        title="Carrinho | Mercury Loja"
        description="Revise os produtos personalizados do seu pedido na Mercury Loja."
        canonical="/loja/carrinho"
        noindex
      />

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="font-heading text-2xl font-bold mb-6">Seu carrinho</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Seu carrinho está vazio.</p>
            <Link
              to="/loja/catalogo"
              className="inline-block mt-4 h-11 px-6 leading-[2.75rem] rounded-md bg-primary text-primary-foreground font-bold"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3 rounded-lg border border-border bg-card p-3">
                  <div className="h-20 w-20 rounded bg-secondary overflow-hidden grid place-items-center shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/loja/produto/${item.slug}`} className="text-sm font-medium hover:text-primary">
                      {item.name}
                    </Link>
                    {Object.entries(item.customization || {}).filter(([, v]) => v).length > 0 && (
                      <ul className="text-[11px] text-muted-foreground mt-1 space-y-0.5">
                        {Object.entries(item.customization)
                          .filter(([, v]) => v)
                          .map(([k, v]) => (
                            <li key={k}>
                              {k}: {v}
                            </li>
                          ))}
                      </ul>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-border rounded">
                        <button
                          onClick={() => changeQty(item.key, item.productId, item.basePrice, item.quantity - 1)}
                          className="h-8 w-8 grid place-items-center"
                          aria-label="Diminuir"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => changeQty(item.key, item.productId, item.basePrice, item.quantity + 1)}
                          className="h-8 w-8 grid place-items-center"
                          aria-label="Aumentar"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Remover item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{brl(item.unitPrice * item.quantity)}</div>
                    <div className="text-[11px] text-muted-foreground">{brl(item.unitPrice)} un.</div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-lg border border-border bg-card p-4 h-fit lg:sticky lg:top-40">
              <div className="font-semibold mb-3">Resumo</div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{brl(subtotal)}</span>
              </div>
              <div className="mt-4">
                <label className="text-xs text-muted-foreground">Estimar frete</label>
                <div className="flex gap-2 mt-1">
                  <input
                    value={cep}
                    onChange={(e) => setCep(formatCep(e.target.value))}
                    placeholder="00000-000"
                    inputMode="numeric"
                    className="flex-1 h-10 px-3 rounded bg-secondary border border-border text-sm"
                  />
                  <button onClick={calc} className="h-10 px-3 rounded border border-border text-sm">
                    Calcular
                  </button>
                </div>
                {options.map((o) => (
                  <div key={o.id} className="flex justify-between text-xs mt-2 text-muted-foreground">
                    <span>
                      {o.service} · {o.daysMin}–{o.daysMax} dias
                    </span>
                    <span>{brl(o.price)}</span>
                  </div>
                ))}
              </div>
              {maxProductionDays > 0 && (
                <div className="text-[11px] text-muted-foreground mt-3">
                  Produção estimada: {maxProductionDays} dia(s) úteis antes do envio.
                </div>
              )}
              <button
                onClick={() => navigate("/loja/checkout")}
                className="w-full h-11 mt-4 rounded-md bg-primary text-primary-foreground font-bold hover:opacity-90"
              >
                Finalizar compra
              </button>
              <Link
                to="/loja/catalogo"
                className="block text-center text-sm text-muted-foreground hover:text-foreground mt-3"
              >
                Continuar comprando
              </Link>
            </aside>
          </div>
        )}
      </div>
    </LojaLayout>
  );
};

export default CarrinhoPage;
