import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, ShoppingCart, User, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/loja/cart";
import { fetchCategories } from "@/lib/loja/queries";

const LojaLayout = ({ children }: { children: React.ReactNode }) => {
  const { count } = useCart();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [term, setTerm] = useState(params.get("q") ?? "");
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);

  useEffect(() => {
    fetchCategories().then((c) => setCategories(c.map((x) => ({ name: x.name, slug: x.slug }))));
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/loja/catalogo?q=${encodeURIComponent(term.trim())}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="h-14 sm:h-16" />

      <div className="sticky top-14 sm:top-16 z-40 border-b border-border bg-[hsl(0_0%_6%)]/95 backdrop-blur">
        <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center gap-3">
          <Link to="/loja" className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="font-heading font-bold text-lg text-primary">Loja</span>
          </Link>

          <form onSubmit={submit} className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Buscar produtos, brindes, placas NFC..."
              aria-label="Buscar produtos na loja"
              className="w-full h-10 pl-9 pr-3 rounded-full bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
            />
          </form>

          <Link
            to="/loja/pedido"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Package className="h-4 w-4" /> Meu pedido
          </Link>
          <Link
            to="/loja/conta"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            aria-label="Minha conta"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/loja/carrinho"
            className="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-foreground text-background text-[11px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>

        {categories.length > 0 && (
          <div className="container mx-auto px-4 lg:px-8 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/loja/categoria/${c.slug}`}
                className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default LojaLayout;
