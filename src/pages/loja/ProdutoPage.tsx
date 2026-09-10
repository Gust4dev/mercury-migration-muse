import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ImageIcon, Minus, Plus, ShieldCheck, Star } from "lucide-react";
import SEO from "@/components/SEO";
import LojaLayout from "@/components/loja/LojaLayout";
import ShippingCalculator from "@/components/loja/ShippingCalculator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/loja/cart";
import { brl, unitPriceFor } from "@/lib/loja/pricing";
import { fetchApprovedReviews, fetchProductBySlug } from "@/lib/loja/queries";
import {
  basePriceWithVariants,
  missingRequiredVariant,
  sortVariants,
  variantImages,
  type ProductVariant,
  type VariantOption,
} from "@/lib/loja/variants";


type Product = Awaited<ReturnType<typeof fetchProductBySlug>>;

const ProdutoPage = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product>(null);
  const [reviews, setReviews] = useState<Awaited<ReturnType<typeof fetchApprovedReviews>>>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [custom, setCustom] = useState<Record<string, string>>({});
  /** variantId -> optionId escolhido */
  const [selection, setSelection] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchProductBySlug(slug)
      .then(async (p) => {
        setProduct(p);
        setQty(1);
        setCustom({});
        setSelection({});
        setActiveImage(0);
        if (p) setReviews(await fetchApprovedReviews(p.id));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const variants = useMemo(
    () => sortVariants(product?.product_variants as ProductVariant[] | undefined),
    [product],
  );

  const selectedOptions = useMemo(
    () =>
      variants
        .map((v) => v.product_variant_options.find((o) => o.id === selection[v.id]))
        .filter(Boolean) as VariantOption[],
    [variants, selection],
  );

  const baseImages = useMemo(
    () => [...((product?.product_images as { url: string; alt: string | null; sort_order: number }[]) || [])].sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
    [product],
  );

  // Imagens da opção escolhida; sem imagens específicas, mantém as do produto.
  const images = useMemo(() => {
    const specific = variantImages(selectedOptions);
    return specific.length
      ? specific.map((url, i) => ({ url, alt: null as string | null, sort_order: i }))
      : baseImages;
  }, [selectedOptions, baseImages]);

  useEffect(() => {
    setActiveImage(0);
  }, [images]);

  const tiers = useMemo(
    () =>
      [...((product?.quantity_pricing as { min_qty: number; max_qty: number | null; unit_price: number }[]) || [])].sort(
        (a, b) => a.min_qty - b.min_qty,
      ),
    [product],
  );

  const fields = useMemo(
    () =>
      [...((product?.customization_fields as {
        id: string;
        label: string;
        field_key: string;
        field_type: string;
        help_text: string | null;
        required: boolean;
        options: unknown;
        sort_order: number;
      }[]) || [])].sort((a, b) => a.sort_order - b.sort_order),
    [product],
  );

  if (loading) {
    return (
      <LojaLayout>
        <div className="container mx-auto px-4 py-20 text-muted-foreground">Carregando produto...</div>
      </LojaLayout>
    );
  }

  if (!product) {
    return (
      <LojaLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-2xl font-bold">Produto não encontrado</h1>
          <Link to="/loja/catalogo" className="text-primary hover:underline mt-3 inline-block">
            Voltar ao catálogo
          </Link>
        </div>
      </LojaLayout>
    );
  }

  // Preço base já com as variações escolhidas; a faixa por quantidade continua valendo.
  const variantBase = basePriceWithVariants(Number(product.price), selectedOptions);
  const variantExtra = variantBase - Number(product.price);
  const unit = Math.max(0, unitPriceFor(Number(product.price), tiers, qty) + variantExtra);
  const total = unit * qty;
  const pixDiscount = Number(product.pix_discount_percent || 0);
  const pendingVariant = missingRequiredVariant(variants, selection);

  const selectedVariantList = variants
    .filter((v) => selection[v.id])
    .map((v) => {
      const option = v.product_variant_options.find((o) => o.id === selection[v.id])!;
      return { variantId: v.id, variant: v.name, optionId: option.id, option: option.label };
    });

  const handleAdd = () => {
    if (pendingVariant) {
      toast({ title: "Escolha uma opção", description: `Selecione: ${pendingVariant}`, variant: "destructive" });
      return;
    }
    for (const f of fields) {
      if (f.required && !custom[f.field_key]?.trim()) {
        toast({ title: "Personalização incompleta", description: `Preencha: ${f.label}`, variant: "destructive" });
        return;
      }
    }
    const optionWeight = selectedOptions.map((o) => o.weight_g).filter((w) => w != null && Number(w) > 0) as number[];
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: images[0]?.url ?? null,
      quantity: qty,
      basePrice: Number(product.price),
      unitPrice: unit,
      productionDays: Number(product.production_days || 0),
      requiresArtwork: !!product.customizable,
      weightGrams: optionWeight.length ? Math.max(...optionWeight) : Number(product.weight_g || 100),
      customization: custom,
      variants: selectedVariantList,
    });
    toast({ title: "Adicionado ao carrinho", description: `${qty}x ${product.name}` });
  };


  return (
    <LojaLayout>
      <SEO
        title={`${product.seo_title || product.name} | Mercury Loja`}
        description={
          product.seo_description ||
          product.short_description ||
          `${product.name} personalizado para sua empresa. Compre na Mercury Loja com produção sob medida.`
        }
        canonical={`/loja/produto/${product.slug}`}
        ogType="product"
        ogImage={images[0]?.url}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.short_description || product.description || product.name,
          image: images.map((i) => i.url),
          sku: product.sku || product.id,
          brand: { "@type": "Brand", name: "Mercury Gestora" },
          offers: {
            "@type": "Offer",
            price: Number(product.price).toFixed(2),
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: `https://mercurygestora.com.br/loja/produto/${product.slug}`,
          },
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 py-6">
        <nav className="text-xs text-muted-foreground mb-4">
          <Link to="/loja" className="hover:text-primary">
            Loja
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square rounded-xl border border-border bg-secondary overflow-hidden flex items-center justify-center">
              {images[activeImage] ? (
                <img
                  src={images[activeImage].url}
                  alt={images[activeImage].alt || product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={img.url + i}
                    onClick={() => setActiveImage(i)}
                    className={`h-16 w-16 rounded border overflow-hidden shrink-0 ${
                      i === activeImage ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={img.url} alt={img.alt || product.name} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold">{product.name}</h1>
            {product.reviews_count > 0 && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                {Number(product.rating).toFixed(1)} · {product.reviews_count} avaliação(ões)
              </div>
            )}
            {product.short_description && (
              <p className="text-muted-foreground mt-3">{product.short_description}</p>
            )}

            <div className="mt-5">
              <div className="text-3xl font-heading font-bold text-primary">{brl(unit)}</div>
              {pixDiscount > 0 && (
                <div className="text-sm text-muted-foreground">
                  {brl(unit * (1 - pixDiscount / 100))} no PIX ({pixDiscount}% de desconto)
                </div>
              )}
              <div className="text-sm text-muted-foreground">Total: {brl(total)}</div>
            </div>

            {tiers.length > 0 && (
              <div className="mt-4 rounded-lg border border-border bg-card p-3">
                <div className="text-sm font-semibold mb-2">Quanto mais, mais barato</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {tiers.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setQty(t.min_qty)}
                      className="rounded border border-border px-2 py-1.5 text-left hover:border-primary/60"
                    >
                      <div className="text-muted-foreground">
                        {t.min_qty}
                        {t.max_qty ? `–${t.max_qty}` : "+"} un.
                      </div>
                      <div className="font-bold text-primary">{brl(Number(t.unit_price))}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {variants.length > 0 && (
              <div className="mt-5 space-y-4">
                {variants.map((v) => (
                  <div key={v.id}>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      {v.name} {v.required && <span className="text-primary">*</span>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {v.product_variant_options.map((o) => {
                        const active = selection[v.id] === o.id;
                        return (
                          <button
                            key={o.id}
                            type="button"
                            disabled={!o.available}
                            onClick={() => setSelection((s) => ({ ...s, [v.id]: o.id }))}
                            className={`px-4 h-11 rounded-md border text-sm transition-colors ${
                              active
                                ? "border-primary text-primary bg-primary/10 font-semibold"
                                : "border-border text-foreground hover:border-primary/60"
                            } ${o.available ? "" : "opacity-40 cursor-not-allowed line-through"}`}
                          >
                            {o.label}
                            {Number(o.price_delta) > 0 && o.price_override == null && (
                              <span className="ml-1 text-[11px] text-muted-foreground">
                                +{brl(Number(o.price_delta))}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {pendingVariant && (
                  <p className="text-xs text-primary">Escolha uma opção de “{pendingVariant}” para continuar.</p>
                )}
              </div>
            )}

            {fields.length > 0 && (
              <div className="mt-5 rounded-lg border border-border bg-card p-4 space-y-3">
                <div className="font-semibold text-sm">Personalização</div>
                {fields.map((f) => {
                  const opts = Array.isArray(f.options) ? (f.options as string[]) : [];
                  return (
                    <div key={f.id}>
                      <label className="block text-xs text-muted-foreground mb-1">
                        {f.label} {f.required && <span className="text-primary">*</span>}
                      </label>
                      {f.field_type === "select" && opts.length > 0 ? (
                        <select
                          value={custom[f.field_key] ?? ""}
                          onChange={(e) => setCustom((c) => ({ ...c, [f.field_key]: e.target.value }))}
                          className="w-full h-10 px-3 rounded bg-secondary border border-border text-sm"
                        >
                          <option value="">Selecione</option>
                          {opts.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : f.field_type === "textarea" ? (
                        <textarea
                          rows={3}
                          maxLength={500}
                          value={custom[f.field_key] ?? ""}
                          onChange={(e) => setCustom((c) => ({ ...c, [f.field_key]: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-secondary border border-border text-sm"
                        />
                      ) : (
                        <input
                          type={f.field_type === "color" ? "text" : "text"}
                          maxLength={200}
                          value={custom[f.field_key] ?? ""}
                          onChange={(e) => setCustom((c) => ({ ...c, [f.field_key]: e.target.value }))}
                          className="w-full h-10 px-3 rounded bg-secondary border border-border text-sm"
                        />
                      )}
                      {f.help_text && <div className="text-[11px] text-muted-foreground mt-1">{f.help_text}</div>}
                    </div>
                  );
                })}
                <div className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  Enviaremos a arte para sua aprovação antes de iniciar a produção.
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center border border-border rounded-md">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 grid place-items-center" aria-label="Diminuir quantidade">
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value.replace(/\D/g, "")) || 1))}
                  className="w-14 h-11 bg-transparent text-center text-sm"
                  aria-label="Quantidade"
                />
                <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 grid place-items-center" aria-label="Aumentar quantidade">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={!!pendingVariant}
                className="flex-1 h-11 rounded-md bg-primary text-primary-foreground font-bold hover:opacity-90 disabled:opacity-50"
              >
                {pendingVariant ? `Escolha: ${pendingVariant}` : "Adicionar ao carrinho"}
              </button>
            </div>

            <div className="mt-5">
              <ShippingCalculator
                items={[
                  {
                    product_id: product.id,
                    quantity: qty,
                    variant_option_ids: pendingVariant ? [] : selectedOptions.map((o) => o.id),
                  },
                ]}
                title="Frete e prazo de entrega"
              />
            </div>

          </div>
        </div>

        {product.description && (
          <section className="mt-10 max-w-3xl">
            <h2 className="font-heading text-xl font-bold mb-3">Descrição</h2>
            <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
          </section>
        )}

        {reviews.length > 0 && (
          <section className="mt-10 max-w-3xl">
            <h2 className="font-heading text-xl font-bold mb-3">Avaliações</h2>
            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    {r.author_name || "Cliente"}
                    <span className="flex items-center gap-0.5 text-primary">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary" />
                      ))}
                    </span>
                  </div>
                  {r.comment && <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 flex flex-wrap gap-4 text-xs text-muted-foreground">
          {["Produção sob medida", "Aprovação de arte", "Entrega grátis em Anápolis/GO", "Frete para todo o Brasil"].map(
            (t) => (
              <span key={t} className="inline-flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-primary" /> {t}
              </span>
            ),
          )}
        </div>
      </div>
    </LojaLayout>
  );
};

export default ProdutoPage;
