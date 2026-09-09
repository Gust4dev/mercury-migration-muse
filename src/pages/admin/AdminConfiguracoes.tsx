import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Pickup {
  id: string;
  name: string;
  address: string;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  opening_hours: string | null;
  ready_in_days: number;
  active: boolean;
}

const empty = { name: "", address: "", city: "", state: "", postal_code: "", opening_hours: "", ready_in_days: 2 };

const AdminConfiguracoes = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Pickup[]>([]);
  const [form, setForm] = useState({ ...empty });

  const load = async () => {
    const { data } = await supabase.from("pickup_locations").select("*").order("created_at");
    setRows((data as Pickup[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("pickup_locations").insert({
      name: form.name,
      address: form.address,
      city: form.city || null,
      state: form.state || null,
      postal_code: form.postal_code || null,
      opening_hours: form.opening_hours || null,
      ready_in_days: Number(form.ready_in_days) || 1,
      active: true,
    });
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else {
      setForm({ ...empty });
      load();
      toast({ title: "Ponto de retirada criado" });
    }
  };

  const toggle = async (p: Pickup) => {
    await supabase.from("pickup_locations").update({ active: !p.active }).eq("id", p.id);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("pickup_locations").delete().eq("id", id);
    load();
  };

  const input = "h-10 px-3 rounded bg-secondary border border-border text-sm w-full";

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Configurações</h1>

      <section className="space-y-3">
        <h2 className="font-semibold">Pontos de retirada</h2>
        <form onSubmit={save} className="rounded-lg border border-border bg-card p-4 grid sm:grid-cols-3 gap-3">
          <input className={input} placeholder="Nome *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className={`${input} sm:col-span-2`} placeholder="Endereço *" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
          <input className={input} placeholder="Cidade" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <input className={input} placeholder="UF" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          <input className={input} placeholder="CEP" value={form.postal_code} onChange={(e) => setForm({ ...form, postal_code: e.target.value })} />
          <input className={`${input} sm:col-span-2`} placeholder="Horário de funcionamento" value={form.opening_hours} onChange={(e) => setForm({ ...form, opening_hours: e.target.value })} />
          <input className={input} type="number" placeholder="Pronto em (dias)" value={form.ready_in_days} onChange={(e) => setForm({ ...form, ready_in_days: Number(e.target.value) })} />
          <button className="h-10 px-5 rounded bg-primary text-primary-foreground font-bold text-sm">Adicionar</button>
        </form>

        <div className="rounded-lg border border-border bg-card divide-y divide-border">
          {rows.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-3 p-3">
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">
                  {p.address} · pronto em {p.ready_in_days} dias
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => toggle(p)} className="text-xs text-primary">
                  {p.active ? "Desativar" : "Ativar"}
                </button>
                <button onClick={() => remove(p.id)} className="text-muted-foreground hover:text-destructive" aria-label="Excluir ponto">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {rows.length === 0 && <div className="p-4 text-sm text-muted-foreground">Nenhum ponto cadastrado.</div>}
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground space-y-1">
        <h2 className="font-semibold text-foreground">Pagamentos e frete</h2>
        <p>A estrutura está pronta: os pedidos já registram método de pagamento, status e valores de frete.</p>
        <p>A cobrança real e a cotação oficial de transportadora serão ativadas quando as integrações forem conectadas.</p>
      </section>
    </div>
  );
};

export default AdminConfiguracoes;
