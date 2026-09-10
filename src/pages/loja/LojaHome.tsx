import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Store } from "lucide-react";
import SEO from "@/components/SEO";
import LojaLayout from "@/components/loja/LojaLayout";
import ProductCard from "@/components/loja/ProductCard";
import { fetchCategories, fetchProducts, fetchSegments, type ProductListItem } from "@/lib/loja/queries";

const LojaHome = () => {
  const [featured, setFeatured] = useState<ProductListItem[]>([]);
  const [newest, setNewest] = useState<ProductListItem[]>([]);
  const [bestSellers, setBestSellers] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<Awaited<ReturnType<typeof fetchCategories>>>([]);
  const [segments, setSegments] = useState<Awaited<ReturnType<typeof fetchSegments>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchProducts({ sort: "relevance", limit: 8 }),
      fetchProducts({ sort: "newest", limit: 8 }),
      fetchProducts({ sort: "best_sellers", limit: 8 }),
      fetchCategories(),
      fetchSegments(),
    ])
      .then(([f, n, b, c, s]) => {
        setFeatured(f);
        setNewest(n);
        setBestSellers(b);
        setCategories(c);
        setSegments(s);
      })
      .finally(() => setLoading(false));
  }, []);

  const Section = ({ title, to, products }: { title: string; to: string; products: ProductListItem[] }) =>
    products.length === 0 ? null : (
      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-heading text-xl sm:text-2xl font-bold">{title}</h2>
          <Link to={to} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            Ver todos <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    );

  return (
    <LojaLayout>
      <SEO
        title="Mercury Loja | Produtos personalizados para empresas"
        description="Placas NFC, QR Code, brindes corporativos, comunicação visual e materiais personalizados com a marca da sua empresa. Compre online na Mercury Loja."
        canonical="/loja"
        keywords="loja mercury, placas nfc, qr code avaliação google, brindes personalizados, comunicação visual, materiais personalizados empresa"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Mercury Loja",
          url: "https://mercurygestora.com.br/loja",
        }}
      />

      <section className="border-b border-border bg-gradient-to-b from-[hsl(0_0%_7%)] to-background">
        <div className="container mx-auto px-4 lg:px-8 py-10 sm:py-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-primary border border-primary/40 rounded-full px-3 py-1">
            <Store className="h-3.5 w-3.5" /> MERCURY LOJA
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 max-w-3xl">
            Produtos que fazem sua marca ser lembrada.
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Placas NFC e QR Code, brindes corporativos, comunicação visual e materiais personalizados com o logo,
            as cores e os dados da sua empresa.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/loja/catalogo"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
            >
              Ver catálogo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/loja/pedido"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-md border border-border font-medium hover:border-primary/60 transition-colors"
            >
              Acompanhar pedido
            </Link>
          </div>

        </div>
      </section>

      {categories.length > 0 && (
        <section className="container mx-auto px-4 lg:px-8 py-8">
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-4">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/loja/categoria/${c.slug}`}
                className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 transition-colors"
              >
                <div className="font-semibold text-sm">{c.name}</div>
                {c.description && (
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      <Section title="Destaques" to="/loja/catalogo" products={featured} />
      <Section title="Mais vendidos" to="/loja/catalogo?sort=best_sellers" products={bestSellers} />
      <Section title="Novidades" to="/loja/catalogo?sort=newest" products={newest} />

      {segments.length > 0 && (
        <section className="container mx-auto px-4 lg:px-8 py-8">
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-4">Soluções por segmento</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {segments.map((s) => (
              <Link
                key={s.id}
                to={`/loja/segmento/${s.slug}`}
                className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 transition-colors text-sm font-medium"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {!loading && featured.length === 0 && (
        <div className="container mx-auto px-4 lg:px-8 py-16 text-center text-muted-foreground">
          O catálogo está sendo preparado. Em breve os primeiros produtos aparecem aqui.
        </div>
      )}
    </LojaLayout>
  );
};

export default LojaHome;
