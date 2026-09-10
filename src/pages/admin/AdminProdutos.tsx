import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brl } from "@/lib/loja/pricing";
import { uploadLojaImage } from "@/lib/loja/upload";

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  active: boolean;
  featured: boolean;
}

interface Tier { min_qty: number; max_qty: number | null; unit_price: number }
interface Field { label: string; field_key: string; field_type: string; required: boolean; options: string; help_text: string }
interface ImageRow { url: string; alt: string }

interface VariantOptionForm {
  label: string;
  price_delta: number;
  price_override: string;
  available: boolean;
  weight_g: string;
  width_cm: string;
  height_cm: string;
  length_cm: string;
  image_urls: string[];
}
interface VariantForm {
  name: string;
  required: boolean;
  options: VariantOptionForm[];
}

const emptyOption = (): VariantOptionForm => ({
  label: "",
  price_delta: 0,
  price_override: "",
  available: true,
  weight_g: "",
  width_cm: "",
  height_cm: "",
  length_cm: "",
  image_urls: [],
});

const emptyForm = {
  id: "",
  name: "",
  slug: "",
  sku: "",
  short_description: "",
  description: "",
  price: 0,
  compare_at_price: "",
  pix_discount_percent: 0,
  stock: 0,
  made_to_order: true,
  production_days: 3,
  weight_g: 200,
  height_cm: 2,
  width_cm: 10,
  length_cm: 10,
  customizable: false,
  active: true,
  featured: false,
  best_seller: false,
  is_new: true,
  on_sale: false,
  seo_title: "",
  seo_description: "",
};

const AdminProdutos = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [images, setImages] = useState<ImageRow[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [variantGroups, setVariantGroups] = useState<VariantForm[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [segments, setSegments] = useState<{ id: string; name: string }[]>([]);
  const [selCats, setSelCats] = useState<string[]>([]);
  const [selSegs, setSelSegs] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("products")
      .select("id,name,slug,price,stock,active,featured")
      .order("created_at", { ascending: false });
    setRows((data as ProductRow[]) ?? []);
  };

  useEffect(() => {
    load();
    supabase.from("categories").select("id,name").order("sort_order").then(({ data }) => setCategories(data ?? []));
    supabase.from("segments").select("id,name").order("sort_order").then(({ data }) => setSegments(data ?? []));
  }, []);

  const openNew = () => {
    setForm({ ...emptyForm });
    setImages([]);
    setTiers([]);
    setFields([]);
    setVariantGroups([]);
    setSelCats([]);
    setSelSegs([]);
    setOpen(true);
  };

  const openEdit = async (id: string) => {
    const { data } = await supabase
      .from("products")
      .select(
        "*,product_images(url,alt,sort_order),quantity_pricing(min_qty,max_qty,unit_price),customization_fields(label,field_key,field_type,required,options,help_text,sort_order),product_variants(name,required,sort_order,product_variant_options(label,price_delta,price_override,available,weight_g,width_cm,height_cm,length_cm,image_urls,sort_order)),product_categories(category_id),product_segments(segment_id)",
      )
      .eq("id", id)
      .maybeSingle();
    if (!data) return;
    const p = data as Record<string, unknown>;
    setForm({
      ...emptyForm,
      ...(p as typeof emptyForm),
      compare_at_price: p.compare_at_price != null ? String(p.compare_at_price) : "",
      short_description: (p.short_description as string) ?? "",
      description: (p.description as string) ?? "",
      sku: (p.sku as string) ?? "",
      seo_title: (p.seo_title as string) ?? "",
      seo_description: (p.seo_description as string) ?? "",
    });
    setImages(((p.product_images as { url: string; alt: string | null }[]) ?? []).map((i) => ({ url: i.url, alt: i.alt ?? "" })));
    setTiers((p.quantity_pricing as Tier[]) ?? []);
    setFields(
      ((p.customization_fields as { label: string; field_key: string; field_type: string; required: boolean; options: unknown; help_text: string | null }[]) ?? []).map((f) => ({
        label: f.label,
        field_key: f.field_key,
        field_type: f.field_type,
        required: f.required,
        options: Array.isArray(f.options) ? (f.options as string[]).join(", ") : "",
        help_text: f.help_text ?? "",
      })),
    );
    setVariantGroups(
      [...((p.product_variants as {
        name: string;
        required: boolean;
        sort_order: number;
        product_variant_options: {
          label: string;
          price_delta: number;
          price_override: number | null;
          available: boolean;
          weight_g: number | null;
          width_cm: number | null;
          height_cm: number | null;
          length_cm: number | null;
          image_urls: string[] | null;
          sort_order: number;
        }[];
      }[]) ?? [])]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((v) => ({
          name: v.name,
          required: v.required,
          options: [...(v.product_variant_options ?? [])]
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((o) => ({
              label: o.label,
              price_delta: Number(o.price_delta || 0),
              price_override: o.price_override != null ? String(o.price_override) : "",
              available: o.available,
              weight_g: o.weight_g != null ? String(o.weight_g) : "",
              width_cm: o.width_cm != null ? String(o.width_cm) : "",
              height_cm: o.height_cm != null ? String(o.height_cm) : "",
              length_cm: o.length_cm != null ? String(o.length_cm) : "",
              image_urls: o.image_urls ?? [],
            })),
        })),
    );
    setSelCats(((p.product_categories as { category_id: string }[]) ?? []).map((c) => c.category_id));
    setSelSegs(((p.product_segments as { segment_id: string }[]) ?? []).map((s) => s.segment_id));
    setOpen(true);
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const { url } = await uploadLojaImage(file);
        setImages((prev) => [...prev, { url, alt: "" }]);
      }
    } catch (err) {
      toast({ title: "Erro no upload", description: err instanceof Error ? err.message : "Tente novamente.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    // Sem peso e medidas reais o frete não pode ser calculado.
    if (
      form.active &&
      (Number(form.weight_g) <= 0 ||
        Number(form.height_cm) <= 0 ||
        Number(form.width_cm) <= 0 ||
        Number(form.length_cm) <= 0)
    ) {
      toast({
        title: "Dados de envio faltando",
        description: "Informe peso (g) e altura, largura e comprimento (cm) da embalagem para publicar o produto.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {

      const payload = {
        name: form.name.trim(),
        slug: (form.slug || slugify(form.name)).trim(),
        sku: form.sku || null,
        short_description: form.short_description || null,
        description: form.description || null,
        price: Number(form.price) || 0,
        compare_at_price: form.compare_at_price ? Number(form.compare_at_price) : null,
        pix_discount_percent: Number(form.pix_discount_percent) || 0,
        stock: Number(form.stock) || 0,
        made_to_order: form.made_to_order,
        production_days: Number(form.production_days) || 0,
        weight_g: Number(form.weight_g) || 100,
        height_cm: Number(form.height_cm) || 1,
        width_cm: Number(form.width_cm) || 1,
        length_cm: Number(form.length_cm) || 1,
        customizable: form.customizable,
        active: form.active,
        featured: form.featured,
        best_seller: form.best_seller,
        is_new: form.is_new,
        on_sale: form.on_sale,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
      };

      let productId = form.id;
      if (productId) {
        const { error } = await supabase.from("products").update(payload).eq("id", productId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("products").insert(payload).select("id").single();
        if (error) throw error;
        productId = data.id;
      }

      await Promise.all([
        supabase.from("product_images").delete().eq("product_id", productId),
        supabase.from("quantity_pricing").delete().eq("product_id", productId),
        supabase.from("customization_fields").delete().eq("product_id", productId),
        supabase.from("product_categories").delete().eq("product_id", productId),
        supabase.from("product_segments").delete().eq("product_id", productId),
      ]);

      const inserts: Promise<unknown>[] = [];
      if (images.length)
        inserts.push(
          Promise.resolve(
            supabase.from("product_images").insert(images.map((im, i) => ({ product_id: productId, url: im.url, alt: im.alt || null, sort_order: i }))),
          ),
        );
      if (tiers.length)
        inserts.push(
          Promise.resolve(
            supabase.from("quantity_pricing").insert(
              tiers.map((t) => ({ product_id: productId, min_qty: Number(t.min_qty), max_qty: t.max_qty ? Number(t.max_qty) : null, unit_price: Number(t.unit_price) })),
            ),
          ),
        );
      if (fields.length)
        inserts.push(
          Promise.resolve(
            supabase.from("customization_fields").insert(
              fields.map((f, i) => ({
                product_id: productId,
                label: f.label,
                field_key: f.field_key || slugify(f.label),
                field_type: f.field_type,
                required: f.required,
                help_text: f.help_text || null,
                options: f.options ? f.options.split(",").map((o) => o.trim()).filter(Boolean) : null,
                sort_order: i,
              })),
            ),
          ),
        );
      if (selCats.length)
        inserts.push(Promise.resolve(supabase.from("product_categories").insert(selCats.map((c) => ({ product_id: productId, category_id: c })))));
      if (selSegs.length)
        inserts.push(Promise.resolve(supabase.from("product_segments").insert(selSegs.map((s) => ({ product_id: productId, segment_id: s })))));

      await Promise.all(inserts);

      toast({ title: "Produto salvo" });
      setOpen(false);
      load();
    } catch (err) {
      toast({ title: "Erro ao salvar", description: err instanceof Error ? err.message : "Tente novamente.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    else load();
  };

  const input = "w-full h-10 px-3 rounded bg-secondary border border-border text-sm";
  const lbl = "block text-xs text-muted-foreground mb-1";
  const chip = (active: boolean) =>
    `text-xs px-3 py-1.5 rounded-full border ${active ? "border-primary text-primary" : "border-border text-muted-foreground"}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Produtos</h1>
        <button onClick={openNew} className="h-10 px-4 rounded bg-primary text-primary-foreground font-bold text-sm inline-flex items-center gap-1">
          <Plus className="h-4 w-4" /> Novo produto
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card divide-y divide-border">
        {rows.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 p-3">
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">
                {p.name} {!p.active && <span className="text-xs text-muted-foreground">(inativo)</span>}
              </div>
              <div className="text-xs text-muted-foreground">
                {brl(Number(p.price))} · estoque {p.stock}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(p.id)} className="text-muted-foreground hover:text-primary" aria-label="Editar produto">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(p.id)} className="text-muted-foreground hover:text-destructive" aria-label="Excluir produto">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="p-4 text-sm text-muted-foreground">Nenhum produto cadastrado.</div>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto p-3 sm:p-6">
          <form onSubmit={save} className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-4 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold">{form.id ? "Editar produto" : "Novo produto"}</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fechar">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className={lbl}>Nome do produto *</span>
                <input className={input} placeholder="Ex.: Placa NFC personalizada" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </label>
              <label className="block">
                <span className={lbl}>Slug (link da página) — opcional</span>
                <input className={input} placeholder="gerado automaticamente" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              </label>
              <label className="block sm:col-span-2">
                <span className={lbl}>Resumo curto</span>
                <input className={input} placeholder="Frase que aparece na vitrine" value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
              </label>
              <label className="block sm:col-span-2">
                <span className={lbl}>Descrição completa</span>
                <textarea rows={4} className="w-full px-3 py-2 rounded bg-secondary border border-border text-sm" placeholder="Detalhes do produto" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </label>
              <label className="block">
                <span className={lbl}>Preço de venda (R$) *</span>
                <input className={input} type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
              </label>
              <label className="block">
                <span className={lbl}>Preço comparativo (R$) — “de”</span>
                <input className={input} type="number" step="0.01" placeholder="opcional" value={form.compare_at_price} onChange={(e) => setForm({ ...form, compare_at_price: e.target.value })} />
              </label>
              <label className="block">
                <span className={lbl}>Desconto no PIX (%)</span>
                <input className={input} type="number" value={form.pix_discount_percent} onChange={(e) => setForm({ ...form, pix_discount_percent: Number(e.target.value) })} />
              </label>
              <label className="block">
                <span className={lbl}>Estoque (unidades)</span>
                <input className={input} type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
              </label>
              <label className="block">
                <span className={lbl}>Prazo de produção (dias)</span>
                <input className={input} type="number" value={form.production_days} onChange={(e) => setForm({ ...form, production_days: Number(e.target.value) })} />
              </label>
              <label className="block">
                <span className={lbl}>Código interno (SKU)</span>
                <input className={input} placeholder="opcional" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
              </label>
              <label className="block">
                <span className={lbl}>Peso (gramas)</span>
                <input className={input} type="number" value={form.weight_g} onChange={(e) => setForm({ ...form, weight_g: Number(e.target.value) })} />
              </label>
              <div>
                <span className={lbl}>Medidas da embalagem (cm)</span>
                <div className="grid grid-cols-3 gap-2">
                  <label className="block">
                    <span className="text-[10px] text-muted-foreground">Altura</span>
                    <input className={input} type="number" value={form.height_cm} onChange={(e) => setForm({ ...form, height_cm: Number(e.target.value) })} />
                  </label>
                  <label className="block">
                    <span className="text-[10px] text-muted-foreground">Largura</span>
                    <input className={input} type="number" value={form.width_cm} onChange={(e) => setForm({ ...form, width_cm: Number(e.target.value) })} />
                  </label>
                  <label className="block">
                    <span className="text-[10px] text-muted-foreground">Comprimento</span>
                    <input className={input} type="number" value={form.length_cm} onChange={(e) => setForm({ ...form, length_cm: Number(e.target.value) })} />
                  </label>
                </div>
              </div>
              <label className="block">
                <span className={lbl}>Título para o Google (SEO)</span>
                <input className={input} placeholder="opcional" value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} />
              </label>
              <label className="block">
                <span className={lbl}>Descrição para o Google (SEO)</span>
                <input className={input} placeholder="opcional" value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} />
              </label>
            </div>


            <div className="flex flex-wrap gap-3 text-sm">
              {([
                ["active", "Ativo"],
                ["featured", "Destaque"],
                ["best_seller", "Mais vendido"],
                ["is_new", "Novidade"],
                ["on_sale", "Em oferta"],
                ["customizable", "Personalizável"],
                ["made_to_order", "Sob encomenda"],
              ] as const).map(([key, label]) => (
                <label key={key} className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={form[key] as boolean}
                    onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                    className="accent-[hsl(var(--primary))]"
                  />
                  {label}
                </label>
              ))}
            </div>

            <div>
              <div className="font-semibold text-sm mb-2">Categorias</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelCats((p) => (p.includes(c.id) ? p.filter((x) => x !== c.id) : [...p, c.id]))}
                    className={chip(selCats.includes(c.id))}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <div className="font-semibold text-sm mt-4 mb-2">Segmentos</div>
              <div className="flex flex-wrap gap-2">
                {segments.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelSegs((p) => (p.includes(s.id) ? p.filter((x) => x !== s.id) : [...p, s.id]))}
                    className={chip(selSegs.includes(s.id))}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-semibold text-sm mb-2">Imagens</div>
              <label className="inline-flex items-center gap-2 h-10 px-4 rounded border border-border text-sm cursor-pointer">
                <Upload className="h-4 w-4" /> {uploading ? "Enviando..." : "Enviar imagens"}
                <input type="file" accept="image/*" multiple hidden onChange={(e) => handleUpload(e.target.files)} />
              </label>
              <div className="flex flex-wrap gap-2 mt-3">
                {images.map((im, i) => (
                  <div key={im.url} className="relative h-20 w-20 rounded overflow-hidden border border-border">
                    <img src={im.url} alt={im.alt || "Imagem do produto"} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages((p) => p.filter((_, idx) => idx !== i))}
                      className="absolute top-0.5 right-0.5 bg-black/70 rounded-full p-0.5"
                      aria-label="Remover imagem"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">Preço progressivo</span>
                <button type="button" onClick={() => setTiers([...tiers, { min_qty: 10, max_qty: null, unit_price: Number(form.price) }])} className="text-xs text-primary">
                  + faixa
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">Defina preços menores por unidade conforme a quantidade comprada.</p>
              {tiers.map((t, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 mb-2 items-end">
                  <label className="block">
                    <span className={lbl}>Quantidade mínima</span>
                    <input className={input} type="number" value={t.min_qty} onChange={(e) => setTiers(tiers.map((x, ix) => (ix === i ? { ...x, min_qty: Number(e.target.value) } : x)))} />
                  </label>
                  <label className="block">
                    <span className={lbl}>Quantidade máxima</span>
                    <input className={input} type="number" placeholder="sem limite" value={t.max_qty ?? ""} onChange={(e) => setTiers(tiers.map((x, ix) => (ix === i ? { ...x, max_qty: e.target.value ? Number(e.target.value) : null } : x)))} />
                  </label>
                  <label className="block">
                    <span className={lbl}>Preço por unidade (R$)</span>
                    <input className={input} type="number" step="0.01" value={t.unit_price} onChange={(e) => setTiers(tiers.map((x, ix) => (ix === i ? { ...x, unit_price: Number(e.target.value) } : x)))} />
                  </label>

                  <button type="button" onClick={() => setTiers(tiers.filter((_, ix) => ix !== i))} className="text-muted-foreground hover:text-destructive" aria-label="Remover faixa">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">Campos de personalização</span>
                <button type="button" onClick={() => setFields([...fields, { label: "", field_key: "", field_type: "text", required: false, options: "", help_text: "" }])} className="text-xs text-primary">
                  + campo
                </button>
              </div>
              {fields.map((f, i) => (
                <div key={i} className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 mb-2 items-center">
                  <input className={input} placeholder="Rótulo (ex.: Nome na placa)" value={f.label} onChange={(e) => setFields(fields.map((x, ix) => (ix === i ? { ...x, label: e.target.value } : x)))} />
                  <select className={input} value={f.field_type} onChange={(e) => setFields(fields.map((x, ix) => (ix === i ? { ...x, field_type: e.target.value } : x)))}>
                    <option value="text">Texto</option>
                    <option value="textarea">Texto longo</option>
                    <option value="select">Lista de opções</option>
                    <option value="color">Cor</option>
                    <option value="url">Link / QR Code</option>
                  </select>
                  <button type="button" onClick={() => setFields(fields.filter((_, ix) => ix !== i))} className="text-muted-foreground hover:text-destructive" aria-label="Remover campo">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {f.field_type === "select" && (
                    <input className={`${input} sm:col-span-3`} placeholder="Opções separadas por vírgula" value={f.options} onChange={(e) => setFields(fields.map((x, ix) => (ix === i ? { ...x, options: e.target.value } : x)))} />
                  )}
                  <label className="flex items-center gap-1.5 text-xs sm:col-span-3">
                    <input type="checkbox" checked={f.required} onChange={(e) => setFields(fields.map((x, ix) => (ix === i ? { ...x, required: e.target.checked } : x)))} className="accent-[hsl(var(--primary))]" />
                    Obrigatório
                  </label>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button disabled={saving} className="h-11 px-6 rounded bg-primary text-primary-foreground font-bold disabled:opacity-60">
                {saving ? "Salvando..." : "Salvar produto"}
              </button>
              <button type="button" onClick={() => setOpen(false)} className="h-11 px-6 rounded border border-border">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProdutos;
