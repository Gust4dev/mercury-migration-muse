import { useEffect, useRef, useState } from "react";
import { ArrowRight, TrendingUp, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: TrendingUp,
    title: "Vendi.Mais®",
    desc: "Sistema completo de gestão comercial com atração cirúrgica, filtragem inteligente e dados acionáveis. Escale suas vendas com previsibilidade.",
    link: "/vendimais",
    highlights: ["Atração Cirúrgica", "Filtragem por IA", "Dados em Tempo Real"],
    sectors: ["Marketing", "Comercial", "Vendas"],
  },
  {
    icon: Search,
    title: "Analisa.PraMim",
    desc: "Análise profunda do seu negócio com diagnósticos precisos e planos de ação personalizados para acelerar resultados.",
    link: "/analisa-pra-mim",
    highlights: ["Diagnóstico Completo", "Plano de Ação", "Acompanhamento"],
    sectors: ["RH", "Recrutamento", "Seleção"],
  },
];

const SolutionsOverview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-secondary py-20" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            O que fazemos
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Soluções <span className="text-primary">mais contratadas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estas são nossas soluções mais populares — mas não são as únicas. Cada empresa tem necessidades específicas, e criamos ferramentas sob medida para cada desafio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {solutions.map((sol, idx) => (
            <div
              key={sol.title}
              className={`bg-card rounded-2xl border border-border p-8 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + idx * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <sol.icon className="text-primary" size={28} />
                </div>
                <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                  <Tag className="text-primary" size={12} />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    {sol.sectors.join(" · ")}
                  </span>
                </div>
              </div>

              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{sol.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{sol.desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {sol.highlights.map((h) => (
                  <span key={h} className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {h}
                  </span>
                ))}
              </div>

              <Link to={sol.link}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-heading font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  Conhecer solução
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsOverview;
