import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { brl } from "@/lib/loja/pricing";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, products: 0, pending: 0 });
  const [recent, setRecent] = useState<
    { id: string; order_number: string; customer_name: string; total: number; status: string; created_at: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      const [{ data: orders }, { count: products }] = await Promise.all([
        supabase.from("orders").select("id,order_number,customer_name,total,status,created_at").order("created_at", { ascending: false }),
        supabase.from("products").select("id", { count: "exact", head: true }),
      ]);
      const list = orders ?? [];
      setStats({
        orders: list.length,
        revenue: list.filter((o) => o.status !== "cancelled").reduce((s, o) => s + Number(o.total), 0),
        products: products ?? 0,
        pending: list.filter((o) => o.status === "awaiting_payment").length,
      });
      setRecent(list.slice(0, 10));
    })();
  }, []);

  const cards = [
    { label: "Pedidos", value: String(stats.orders) },
    { label: "Faturamento", value: brl(stats.revenue) },
    { label: "Produtos", value: String(stats.products) },
    { label: "Aguardando pagamento", value: String(stats.pending) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground">{c.label}</div>
            <div className="font-heading text-xl font-bold text-primary mt-1">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-sm">Pedidos recentes</span>
          <Link to="/admin/pedidos" className="text-xs text-primary hover:underline">
            Ver todos
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum pedido ainda.</p>
        ) : (
          <div className="space-y-2">
            {recent.map((o) => (
              <div key={o.id} className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0">
                <div>
                  <div className="font-medium">{o.order_number}</div>
                  <div className="text-xs text-muted-foreground">{o.customer_name}</div>
                </div>
                <div className="text-right">
                  <div>{brl(Number(o.total))}</div>
                  <div className="text-xs text-muted-foreground">{o.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
