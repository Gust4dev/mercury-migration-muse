import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Coupon {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  free_shipping: boolean;
  min_order_total: number;
  max_uses: number | null;
  used_count: number;
  valid_until: string | null;
  active: boolean;
}

const empty = {
  code: "",
  discount_type: "percent",
  discount_value: 10,
  free_shipping: false,
  min_order_total: 0,
  max_uses: "",
  valid_until: "",
  active: true,
};

const AdminCupons = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Coupon[]>([]);
  const [form, setForm] = useState({ ...empty });

  const load = async () => {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    setRows((data as Coupon[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("coupons").insert({
      code: form.code.trim().toUpperCase(),
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
      free_shipping: form.free_shipping,
      min_order_total: Number(form.min_order_total),
      max_uses: form.max_uses ? Number(form.max_uses) : null,
      valid_until: form.valid_until ? new Date(form.valid_until).toISOString() : null,
      active: form.active,
    });
    if (error) toast({ title: "Erro ao criar cupom", description: error.message, variant: "destructive" });
    else {
      setForm({ ...empty });
      toast({ title: "Cupom criado" });
      load();
    }
  };

  const toggle = async (c: Coupon) => {
    await supabase.from("coupons").update({ active: !c.active }).eq("id", c.id);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("coupons").delete().eq("id", id);
    load();
  };

  const input = "h-10 px-3 rounded bg-secondary border border-border text-sm w-full";

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Cupons</h1>

      <form onSubmit={save} className="rounded-lg border border-border bg-card p-4 grid sm:grid-cols-3 gap-3">
        <input className={input} placeholder="Código *" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
        <select className={input} value={form.discount_type} onChange={(e) => setForm({ ...form, discount_type: e.target.value })} aria-label="Tipo de desconto">
          <option value="percent">Percentual (%)</option>
          <option value="fixed">Valor fixo (R$)</option>
        </select>
        <input className={input} type="number" step="0.01" placeholder="Valor" value={form.discount_value} onChange={(e) => setForm({ ...form, discount_value: Number(e.target.value) })} />
        <input className={input} type="number" step="0.01" placeholder="Pedido mínimo" value={form.min_order_total} onChange={(e) => setForm({ ...form, min_order_total: Number(e.target.value) })} />
        <input className={input} type="number" placeholder="Usos máximos" value={form.max_uses} onChange={(e) => setForm({ ...form, max_uses: e.target.value })} />
        <input className={input} type="date" value={form.valid_until} onChange={(e) => setForm({ ...form, valid_until: e.target.value })} aria-label="Válido até" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.free_shipping} onChange={(e) => setForm({ ...form, free_shipping: e.target.checked })} className="accent-[hsl(var(--primary))]" />
          Frete grátis
        </label>
        <button className="h-10 px-5 rounded bg-primary text-primary-foreground font-bold text-sm sm:col-span-2">Criar cupom</button>
      </form>

      <div className="rounded-lg border border-border bg-card divide-y divide-border">
        {rows.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-3 p-3">
            <div>
              <div className="font-semibold text-sm">{c.code}</div>
              <div className="text-xs text-muted-foreground">
                {c.discount_type === "percent" ? `${c.discount_value}%` : `R$ ${c.discount_value}`}
                {c.free_shipping && " · frete grátis"} · usos {c.used_count}
                {c.max_uses ? `/${c.max_uses}` : ""}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toggle(c)} className="text-xs text-primary">
                {c.active ? "Desativar" : "Ativar"}
              </button>
              <button onClick={() => remove(c.id)} className="text-muted-foreground hover:text-destructive" aria-label="Excluir cupom">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="p-4 text-sm text-muted-foreground">Nenhum cupom cadastrado.</div>}
      </div>
    </div>
  );
};

export default AdminCupons;
