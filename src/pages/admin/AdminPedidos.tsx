import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brl } from "@/lib/loja/pricing";
import { uploadLojaImage } from "@/lib/loja/upload";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_document: string | null;
  status: string;
  payment_status: string;
  payment_method: string | null;
  delivery_method: string;
  shipping_postal_code: string | null;
  shipping_street: string | null;
  shipping_number: string | null;
  shipping_complement: string | null;
  shipping_district: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_cost: number;
  shipping_carrier: string | null;
  shipping_service: string | null;
  subtotal: number;
  discount_total: number;
  coupon_code: string | null;
  production_days: number;
  notes: string | null;
  total: number;
  tracking_code: string | null;
  requires_artwork: boolean;
  created_at: string;
  mercado_pago_order_id: string | null;
  payment_status_detail: string | null;
  paid_at: string | null;
}

interface PaymentRow {
  id: string;
  provider: string | null;
  method: string | null;
  status: string;
  status_detail: string | null;
  amount: number;
  installments: number | null;
  card_last_four: string | null;
  card_brand: string | null;
  mercado_pago_order_id: string | null;
  provider_payment_id: string | null;
  paid_at: string | null;
  created_at: string;
}

interface Item {
  id: string;
  order_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  customization: Record<string, string> | null;
  variants: { variant: string; option: string }[] | null;
}

const PAYMENT_LABEL: Record<string, string> = {
  pending: "Aguardando pagamento",
  approved: "Pagamento aprovado",
  rejected: "Pagamento recusado",
  cancelled: "Pagamento cancelado",
  refunded: "Pagamento reembolsado",
  in_process: "Pagamento em análise",
};


const STATUSES = [
  "awaiting_payment",
  "paid",
  "awaiting_artwork",
  "in_production",
  "ready_for_pickup",
  "shipped",
  "delivered",
  "cancelled",
];

const LABEL: Record<string, string> = {
  awaiting_payment: "Aguardando pagamento",
  paid: "Pago",
  awaiting_artwork: "Aguardando aprovação de arte",
  in_production: "Em produção",
  ready_for_pickup: "Pronto para entrega",
  shipped: "Enviado",
  delivered: "Concluído",
  cancelled: "Cancelado",
};

const AdminPedidos = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Record<string, Item[]>>({});
  const [payments, setPayments] = useState<Record<string, PaymentRow[]>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as Order[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (id: string) => {
    setExpanded(expanded === id ? null : id);
    if (!items[id]) {
      const { data } = await supabase.from("order_items").select("*").eq("order_id", id);
      setItems((p) => ({ ...p, [id]: (data as Item[]) ?? [] }));
    }
    if (!payments[id]) {
      const { data } = await supabase
        .from("payments")
        .select("*")
        .eq("order_id", id)
        .order("created_at", { ascending: false });
      setPayments((p) => ({ ...p, [id]: (data as PaymentRow[]) ?? [] }));
    }
  };


  const removeOrder = async (o: Order) => {
    if (!window.confirm(`Excluir o pedido ${o.order_number}? Essa ação não pode ser desfeita.`)) return;
    const { error } = await supabase.rpc("admin_delete_order", { _order_id: o.id });
    if (error) toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    else {
      setOrders((p) => p.filter((x) => x.id !== o.id));
      toast({ title: "Pedido excluído" });
    }
  };

  const update = async (id: string, patch: Partial<Order>) => {
    const { error } = await supabase.from("orders").update(patch).eq("id", id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else {
      setOrders((p) => p.map((o) => (o.id === id ? { ...o, ...patch } : o)));
      toast({ title: "Pedido atualizado" });
    }
  };

  const sendArtwork = async (orderId: string, file: File | null) => {
    if (!file) return;
    try {
      const { url } = await uploadLojaImage(file, "artes");
      const { count } = await supabase
        .from("artwork_approvals")
        .select("id", { count: "exact", head: true })
        .eq("order_id", orderId);
      const { error } = await supabase
        .from("artwork_approvals")
        .insert({ order_id: orderId, preview_url: url, version: (count ?? 0) + 1, status: "pending" });
      if (error) throw error;
      await update(orderId, { status: "awaiting_artwork" });
      toast({ title: "Arte enviada para aprovação" });
    } catch (err) {
      toast({ title: "Erro ao enviar arte", description: err instanceof Error ? err.message : "", variant: "destructive" });
    }
  };

  const visible = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const input = "h-9 px-2 rounded bg-secondary border border-border text-sm";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="font-heading text-2xl font-bold">Pedidos</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className={input} aria-label="Filtrar por status">
          <option value="all">Todos</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {LABEL[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {visible.map((o) => (
          <div key={o.id} className="rounded-lg border border-border bg-card">
            <button onClick={() => toggle(o.id)} className="w-full text-left p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-sm">{o.order_number}</div>
                <div className="text-xs text-muted-foreground">
                  {o.customer_name} · {o.customer_email}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{brl(Number(o.total))}</div>
                <div className="text-xs text-muted-foreground">{LABEL[o.status] ?? o.status}</div>
                <div className="text-[11px] text-muted-foreground">
                  {o.payment_method === "card" ? "Cartão" : o.payment_method === "pix" ? "PIX" : o.payment_method ?? "-"} ·{" "}
                  {PAYMENT_LABEL[o.payment_status] ?? o.payment_status}
                  {o.paid_at ? ` · ${new Date(o.paid_at).toLocaleDateString("pt-BR")}` : ""}
                </div>
              </div>

            </button>

            {expanded === o.id && (
              <div className="border-t border-border p-4 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Cliente</div>
                    <div>{o.customer_name}</div>
                    <div>{o.customer_email}</div>
                    <div>Telefone: {o.customer_phone || "-"}</div>
                    <div>CPF/CNPJ: {o.customer_document || "-"}</div>
                    <div className="text-xs text-muted-foreground">
                      Pedido feito em {new Date(o.created_at).toLocaleString("pt-BR")}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                      {o.delivery_method === "local" ? "Entrega grátis em Anápolis/GO" : "Endereço de entrega"}
                    </div>
                    <div>
                      {[o.shipping_street, o.shipping_number].filter(Boolean).join(", ") || "-"}
                      {o.shipping_complement ? ` - ${o.shipping_complement}` : ""}
                    </div>
                    <div>{[o.shipping_district, o.shipping_city, o.shipping_state].filter(Boolean).join(" · ") || "-"}</div>
                    <div>CEP: {o.shipping_postal_code || "-"}</div>
                    {o.delivery_method !== "local" && (
                      <div className="text-xs text-muted-foreground">
                        Frete: {o.shipping_carrier ?? "-"} {o.shipping_service ?? ""} · {brl(Number(o.shipping_cost))}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">Produção: {o.production_days} dia(s)</div>
                  </div>
                </div>

                {o.notes && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Observações: </span>
                    {o.notes}
                  </div>
                )}

                <div className="text-sm space-y-1">
                  {(items[o.id] ?? []).map((i) => (
                    <div key={i.id} className="flex justify-between gap-3">
                      <div>
                        <div>
                          {i.quantity}x {i.product_name}
                        </div>
                        {Array.isArray(i.variants) && i.variants.length > 0 && (
                          <div className="text-[11px] text-primary">
                            {i.variants.map((v) => `${v.variant}: ${v.option}`).join(" · ")}
                          </div>
                        )}
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
                </div>

                <div className="rounded border border-border/60 p-3 space-y-1 text-sm">
                  <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Pagamento</div>
                  <div>Método: {o.payment_method === "card" ? "Cartão de crédito" : o.payment_method === "pix" ? "PIX" : o.payment_method ?? "-"}</div>
                  <div>
                    Status: {PAYMENT_LABEL[o.payment_status] ?? o.payment_status}
                    {o.payment_status_detail ? ` (${o.payment_status_detail})` : ""}
                  </div>
                  <div className="text-xs text-muted-foreground">Mercado Pago Order: {o.mercado_pago_order_id ?? "-"}</div>
                  <div className="text-xs text-muted-foreground">
                    Pago em: {o.paid_at ? new Date(o.paid_at).toLocaleString("pt-BR") : "-"}
                  </div>
                  {(payments[o.id] ?? []).map((p) => (
                    <div key={p.id} className="text-xs text-muted-foreground border-t border-border/40 pt-1">
                      Tentativa {new Date(p.created_at).toLocaleString("pt-BR")} · {p.method ?? "-"} ·{" "}
                      {PAYMENT_LABEL[p.status] ?? p.status}
                      {p.status_detail ? ` (${p.status_detail})` : ""} · {brl(Number(p.amount))}
                      {p.installments ? ` · ${p.installments}x` : ""}
                      {p.card_last_four ? ` · **** ${p.card_last_four}` : ""}
                      {p.provider_payment_id ? ` · transação ${p.provider_payment_id}` : ""}
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <select value={o.status} onChange={(e) => update(o.id, { status: e.target.value })} className={input} aria-label="Status do pedido">
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {LABEL[s]}
                      </option>
                    ))}
                  </select>
                  <select value={o.payment_status} onChange={(e) => update(o.id, { payment_status: e.target.value })} className={input} aria-label="Status do pagamento">
                    {["pending", "in_process", "approved", "rejected", "cancelled", "refunded"].map((s) => (
                      <option key={s} value={s}>
                        {PAYMENT_LABEL[s] ?? s}
                      </option>
                    ))}
                  </select>

                  <input
                    className={input}
                    placeholder="Código de rastreio"
                    defaultValue={o.tracking_code ?? ""}
                    onBlur={(e) => update(o.id, { tracking_code: e.target.value })}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 h-9 px-3 rounded border border-border text-sm cursor-pointer">
                    Enviar arte para aprovação
                    <input type="file" accept="image/*" hidden onChange={(e) => sendArtwork(o.id, e.target.files?.[0] ?? null)} />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeOrder(o)}
                    className="inline-flex items-center gap-2 h-9 px-3 rounded border border-destructive/50 text-destructive text-sm hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" /> Excluir pedido
                  </button>
                </div>

                <div className="text-sm space-y-1 border-t border-border/50 pt-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{brl(Number(o.subtotal))}</span>
                  </div>
                  {Number(o.discount_total) > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Desconto {o.coupon_code ? `(${o.coupon_code})` : ""}</span>
                      <span>-{brl(Number(o.discount_total))}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span>{brl(Number(o.shipping_cost))}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total · Pagamento: {o.payment_method ?? "-"}</span>
                    <span className="text-primary">{brl(Number(o.total))}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {visible.length === 0 && <div className="text-sm text-muted-foreground">Nenhum pedido encontrado.</div>}
      </div>
    </div>
  );
};

export default AdminPedidos;
