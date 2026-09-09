import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock, Package, Truck } from "lucide-react";
import SEO from "@/components/SEO";
import LojaLayout from "@/components/loja/LojaLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brl } from "@/lib/loja/pricing";

interface OrderRow {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string | null;
  customer_name: string;
  customer_email: string;
  delivery_method: string;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_cost: number;
  subtotal: number;
  discount_total: number;
  total: number;
  tracking_code: string | null;
  production_days: number;
  created_at: string;
}

interface ItemRow {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  customization: Record<string, string> | null;
}

const STEPS = [
  { key: "awaiting_payment", label: "Aguardando pagamento", icon: Clock },
  { key: "in_production", label: "Em produção", icon: Package },
  { key: "shipped", label: "Enviado", icon: Truck },
  { key: "delivered", label: "Concluído", icon: CheckCircle2 },
];

const STATUS_LABEL: Record<string, string> = {
  awaiting_payment: "Aguardando pagamento",
  paid: "Pagamento confirmado",
  awaiting_artwork: "Aguardando aprovação de arte",
  in_production: "Em produção",
  ready_for_pickup: "Pronto para entrega",
  shipped: "Enviado",
  delivered: "Concluído",
  cancelled: "Cancelado",
};

const PedidoPage = () => {
  const [params, setParams] = useSearchParams();
  const { toast } = useToast();
  const [numero, setNumero] = useState(params.get("numero") ?? "");
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [items, setItems] = useState<ItemRow[]>([]);
  const [approvals, setApprovals] = useState<
    { id: string; preview_url: string; version: number; status: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const load = async (n: string, e: string) => {
    if (!n.trim() || !e.trim()) return;
    setLoading(true);
    const { data, error } = await supabase.rpc("get_order_public", {
      _order_number: n.trim(),
      _email: e.trim(),
    });
    setLoading(false);
    if (error || !data) {
      setOrder(null);
      setItems([]);
      toast({ title: "Pedido não encontrado", description: "Confira o número e o e-mail usados na compra.", variant: "destructive" });
      return;
    }
    const parsed = data as unknown as { order: OrderRow; items: ItemRow[] };
    setOrder(parsed.order);
    setItems(parsed.items ?? []);
    const { data: ap } = await supabase
      .from("artwork_approvals")
      .select("id,preview_url,version,status")
      .eq("order_id", parsed.order.id)
      .order("version");
    setApprovals(ap ?? []);
  };

  useEffect(() => {
    const n = params.get("numero");
    const e = params.get("email");
    if (n && e) load(n, e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setParams({ numero, email }, { replace: true });
    load(numero, email);
  };

  const currentStep = order
    ? Math.max(
        0,
        STEPS.findIndex((s) =>
          order.status === "paid" || order.status === "awaiting_artwork" ? s.key === "in_production" : s.key === order.status,
        ),
      )
    : 0;

  return (
    <LojaLayout>
      <SEO
        title="Acompanhar pedido | Mercury Loja"
        description="Acompanhe o status do seu pedido na Mercury Loja usando o número do pedido e o e-mail da compra."
        canonical="/loja/pedido"
        noindex
      />

      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-3xl">
        <h1 className="font-heading text-2xl font-bold">Acompanhar pedido</h1>

        <form onSubmit={submit} className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 mt-4">
          <input
            value={numero}
            onChange={(e) => setNumero(e.target.value.toUpperCase())}
            placeholder="Número do pedido"
            className="h-10 px-3 rounded bg-secondary border border-border text-sm"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="E-mail da compra"
            className="h-10 px-3 rounded bg-secondary border border-border text-sm"
          />
          <button className="h-10 px-5 rounded bg-primary text-primary-foreground font-bold text-sm">Buscar</button>
        </form>

        {loading && <p className="text-muted-foreground mt-6">Buscando pedido...</p>}

        {order && (
          <div className="mt-8 space-y-5">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-muted-foreground">Pedido</div>
                  <div className="font-heading text-xl font-bold">{order.order_number}</div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/15 text-primary font-semibold">
                  {STATUS_LABEL[order.status] ?? order.status}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-5">
                {STEPS.map((s, i) => (
                  <div key={s.key} className="flex-1 text-center">
                    <s.icon className={`h-5 w-5 mx-auto ${i <= currentStep ? "text-primary" : "text-muted-foreground"}`} />
                    <div className={`text-[10px] mt-1 ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {order.tracking_code && (
                <div className="text-sm mt-4">
                  Código de rastreio: <span className="font-semibold text-primary">{order.tracking_code}</span>
                </div>
              )}
            </div>

            {approvals.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="font-semibold text-sm mb-3">Aprovação de arte</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {approvals.map((a) => (
                    <div key={a.id} className="rounded border border-border overflow-hidden">
                      <img src={a.preview_url} alt={`Prévia da arte versão ${a.version}`} className="w-full object-cover" />
                      <div className="p-2 text-xs flex items-center justify-between">
                        <span>Versão {a.version}</span>
                        <span className="text-primary">{a.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Para aprovar ou pedir ajustes, responda o contato da nossa equipe.
                </p>
              </div>
            )}

            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-semibold text-sm mb-3">Itens</div>
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                  <div>
                    <div>
                      {i.quantity}x {i.product_name}
                    </div>
                    {i.customization && Object.keys(i.customization).length > 0 && (
                      <div className="text-[11px] text-muted-foreground">
                        {Object.entries(i.customization)
                          .filter(([, v]) => v)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" · ")}
                      </div>
                    )}
                  </div>
                  <div>{brl(Number(i.line_total))}</div>
                </div>
              ))}
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{brl(Number(order.subtotal))}</span>
                </div>
                {Number(order.discount_total) > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Desconto</span>
                    <span>-{brl(Number(order.discount_total))}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>{order.delivery_method === "local" ? "Entrega em Anápolis" : "Frete"}</span>
                  <span>{brl(Number(order.shipping_cost))}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">{brl(Number(order.total))}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LojaLayout>
  );
};

export default PedidoPage;
