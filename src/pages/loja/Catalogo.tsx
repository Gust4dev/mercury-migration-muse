import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import SEO from "@/components/SEO";
import LojaLayout from "@/components/loja/LojaLayout";
import ProductCard from "@/components/loja/ProductCard";
import {
  fetchCategories,
  fetchProducts,
  fetchSegments,
  type CatalogFilters,
  type ProductListItem,
} from "@/lib/loja/queries";

type Mode = "catalogo" | "categoria" | "segmento";

const Catalogo = ({ mode = "catalogo" }: { mode?: Mode }) => {
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<Awaited<ReturnType<typeof fetchCategories>>>([]);
  const [segments, setSegments] = useState<Awaited<ReturnType<typeof fetchSegments>>>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const search = params.get("q") ?? "";
  const sort = (params.get("sort") as CatalogFilters["sort"]) ?? "relevance";
  const minPrice = params.get("min") ? Number(params.get("min")) : undefined;
  const maxPrice = params.get("max") ? Number(params.get("max")) : undefined;
  const customizableOnly = params.get("perso") === "1";
  const categorySlug = mode === "categoria" ? slug : params.get("categoria") ?? undefined;
  const segmentSlug = mode === "segmento" ? slug : params.get("segmento") ?? undefined;

  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchSegments().then(setSegments);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts({ search, sort, minPrice, maxPrice, customizableOnly, categorySlug, segmentSlug })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [search, sort, minPrice, maxPrice, customizableOnly, categorySlug, segmentSlug]);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === "") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const title = useMemo(() => {
    if (mode === "categoria") return categories.find((c) => c.slug === slug)?.name ?? "Categoria";
    if (mode === "segmento") return segments.find((s) => s.slug === slug)?.name ?? "Segmento";
    if (search) return `Resultados para "${search}"`;
    return "Todos os produtos";
  }, [mode, slug, categories, segments, search]);

  const canonical =
    mode === "categoria" ? `/loja/categoria/${slug}` : mode === "segmento" ? `/loja/segmento/${slug}` : "/loja/catalogo";

  const Filters = (
    <div className="space-y-6">
      <div>
        <div className="font-semibold text-sm mb-2">Categorias</div>
        <div className="space-y-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setParam("categoria", categorySlug === c.slug ? null : c.slug)}
              className={`block text-left text-sm w-full px-2 py-1 rounded ${
                categorySlug === c.slug ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="font-semibold text-sm mb-2">Segmentos</div>
        <div className="space-y-1">
          {segments.map((s) => (
            <button
              key={s.id}
              onClick={() => setParam("segmento", segmentSlug === s.slug ? null : s.slug)}
              className={`block text-left text-sm w-full px-2 py-1 rounded ${
                segmentSlug === s.slug ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="font-semibold text-sm mb-2">Preço</div>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Mín"
            defaultValue={minPrice ?? ""}
            onBlur={(e) => setParam("min", e.target.value)}
            className="w-full h-9 px-2 rounded bg-secondary border border-border text-sm"
          />
          <input
            type="number"
            placeholder="Máx"
            defaultValue={maxPrice ?? ""}
            onBlur={(e) => setParam("max", e.target.value)}
            className="w-full h-9 px-2 rounded bg-secondary border border-border text-sm"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={customizableOnly}
          onChange={(e) => setParam("perso", e.target.checked ? "1" : null)}
          className="accent-[hsl(var(--primary))]"
        />
        Apenas personalizáveis
      </label>
    </div>
  );

  return (
    <LojaLayout>
      <SEO
        title={`${title} | Mercury Loja`}
        description={`${title} na Mercury Loja: produtos personalizados para empresas, com produção sob medida, frete calculado e aprovação de arte.`}
        canonical={canonical}
      />

      <div className="container mx-auto px-4 lg:px-8 py-6">
        <h1 className="font-heading text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {loading ? "Carregando produtos..." : `${products.length} produto(s) encontrado(s)`}
        </p>

        <div className="flex gap-6 mt-6">
          <aside className="hidden lg:block w-60 shrink-0">{Filters}</aside>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-4">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 text-sm px-3 h-9 rounded border border-border"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filtros
              </button>
              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value)}
                className="h-9 px-2 rounded bg-secondary border border-border text-sm ml-auto"
                aria-label="Ordenar produtos"
              >
                <option value="relevance">Mais relevantes</option>
                <option value="best_sellers">Mais vendidos</option>
                <option value="newest">Novidades</option>
                <option value="price_asc">Menor preço</option>
                <option value="price_desc">Maior preço</option>
              </select>
            </div>

            {products.length === 0 && !loading ? (
              <div className="text-muted-foreground py-16 text-center">
                Nenhum produto encontrado com esses filtros.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {filtersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background p-5 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="font-heading font-bold text-lg">Filtros</span>
            <button onClick={() => setFiltersOpen(false)} aria-label="Fechar filtros">
              <X className="h-5 w-5" />
            </button>
          </div>
          {Filters}
          <button
            onClick={() => setFiltersOpen(false)}
            className="mt-6 w-full h-11 rounded bg-primary text-primary-foreground font-bold"
          >
            Ver resultados
          </button>
        </div>
      )}
    </LojaLayout>
  );
};

export default Catalogo;
