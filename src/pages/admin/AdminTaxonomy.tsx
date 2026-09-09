import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Row {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  active: boolean;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const empty = { id: "", name: "", slug: "", description: "", sort_order: 0, active: true };

const AdminTaxonomy = ({ table, title }: { table: "categories" | "segments"; title: string }) => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [editing, setEditing] = useState(false);

  const load = async () => {
    const { data } = await supabase.from(table).select("id,name,slug,description,sort_order,active").order("sort_order");
    setRows((data as Row[]) ?? []);
  };

  useEffect(() => {
    load();
    setForm({ ...empty });
    setEditing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      slug: (form.slug || slugify(form.name)).trim(),
      description: form.description || null,
      sort_order: Number(form.sort_order) || 0,
      active: form.active,
    };
    const { error } = editing
      ? await supabase.from(table).update(payload).eq("id", form.id)
      : await supabase.from(table).insert(payload);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Atualizado" : "Criado" });
    setForm({ ...empty });
    setEditing(false);
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    else load();
  };

  const input = "w-full h-10 px-3 rounded bg-secondary border border-border text-sm";

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">{title}</h1>

      <form onSubmit={save} className="rounded-lg border border-border bg-card p-4 grid sm:grid-cols-2 gap-3">
        <input className={input} placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className={input} placeholder="Slug (opcional)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <input className={`${input} sm:col-span-2`} placeholder="Descrição" value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className={input} type="number" placeholder="Ordem" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-[hsl(var(--primary))]" />
          Ativo
        </label>
        <div className="sm:col-span-2 flex gap-2">
          <button className="h-10 px-4 rounded bg-primary text-primary-foreground font-bold text-sm inline-flex items-center gap-1">
            <Plus className="h-4 w-4" /> {editing ? "Salvar alterações" : "Adicionar"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setForm({ ...empty });
                setEditing(false);
              }}
              className="h-10 px-4 rounded border border-border text-sm"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="rounded-lg border border-border bg-card divide-y divide-border">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-3 p-3">
            <div className="min-w-0">
              <div className="text-sm font-medium">
                {r.name} {!r.active && <span className="text-xs text-muted-foreground">(inativo)</span>}
              </div>
              <div className="text-xs text-muted-foreground truncate">/{r.slug}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => {
                  setForm({ ...r, description: r.description ?? "" });
                  setEditing(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-muted-foreground hover:text-primary"
                aria-label="Editar"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(r.id)} className="text-muted-foreground hover:text-destructive" aria-label="Excluir">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="p-4 text-sm text-muted-foreground">Nenhum registro ainda.</div>}
      </div>
    </div>
  );
};

export default AdminTaxonomy;
