import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const WA_LINK = "https://wa.me/556293618627?text=Estou%20vindo%20do%20Site,%20preciso%20de%20ajuda";

const articles = [
  {
    title: "Como gerar 650 leads qualificados por mês sem aumentar a verba",
    category: "Estratégia",
    readTime: "5 min",
  },
  {
    title: "O erro que 90% das empresas cometem na gestão comercial",
    category: "Gestão",
    readTime: "4 min",
  },
  {
    title: "Dados vs Achismo: por que sua equipe de vendas está perdendo dinheiro",
    category: "Dados",
    readTime: "6 min",
  },
];

const BlogSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background py-12 sm:py-20" ref={ref}>
      <div className="container mx-auto px-5 sm:px-4 lg:px-8">
        <div className={`text-center mb-6 sm:mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-heading font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:bg-primary/90 mb-5 sm:mb-8 hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] w-full sm:w-auto animate-glow-pulse active:scale-95"
            >
              Quero ver como funciona pra mim!!
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </a>

          <h2 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Conteúdos que <span className="text-primary">vendem</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-xs sm:text-base">
            Artigos, insights e estratégias direto do nosso time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {articles.map((article, idx) => (
            <div
              key={article.title}
              className={`bg-card rounded-xl border border-border p-4 sm:p-6 hover:border-primary/40 transition-all duration-500 group cursor-pointer hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + idx * 150}ms` }}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-4">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">
                  {article.category}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">• {article.readTime}</span>
              </div>
              <h3 className="font-heading text-sm sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
