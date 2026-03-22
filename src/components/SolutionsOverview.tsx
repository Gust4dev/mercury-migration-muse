import { useEffect, useRef, useState } from "react";
import { ArrowRight, TrendingUp, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ticoMascot from "@/assets/tico-mascot.png";

const solutions = [
  {
    icon: TrendingUp,
    title: "Vendi.Mais®",
    desc: "Sistema completo de gestão comercial com atração cirúrgica, filtragem inteligente e dados acionáveis.",
    link: "/vendimais",
    highlights: ["Atração Cirúrgica", "Filtragem por IA", "Dados em Tempo Real"],
    sectors: ["Marketing", "Comercial", "Vendas"],
    mascot: null,
  },
  {
    icon: Search,
    title: "Analisa.PraMim",
    desc: "Análise profunda com diagnósticos precisos e planos de ação personalizados para acelerar resultados.",
    link: "/analisa-pra-mim",
    highlights: ["Diagnóstico Completo", "Plano de Ação", "Acompanhamento"],
    sectors: ["RH", "Recrutamento", "Seleção"],
    mascot: ticoMascot,
  },
];

const SolutionsOverview = () => {
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
    <section className="bg-secondary py-14 sm:py-20" ref={ref}>
      <div className="container mx-auto px-5 sm:px-4 lg:px-8">
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-heading font-semibold text-[11px] sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
            O que fazemos
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Soluções <span className="text-primary">mais contratadas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
            Estas são nossas soluções mais populares — mas não são as únicas. Cada empresa tem necessidades específicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-4xl mx-auto">
          {solutions.map((sol, idx) => (
            <div
              key={sol.title}
              className={`relative bg-card rounded-2xl border border-border p-5 sm:p-8 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 group overflow-hidden active:scale-[0.99] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + idx * 150}ms` }}
            >
              {sol.mascot && (
                <img
                  src={sol.mascot}
                  alt="Tico"
                  className="hidden sm:block absolute -bottom-2 -right-2 h-28 w-28 object-contain opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                />
              )}

              <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <sol.icon className="text-primary" size={24} />
                </div>
                <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-2.5 sm:px-3 py-1">
                  <Tag className="text-primary shrink-0" size={10} />
                  <span className="text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-wider">
                    {sol.sectors.join(" · ")}
                  </span>
                </div>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">{sol.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 sm:mb-6 leading-relaxed relative z-10">{sol.desc}</p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                {sol.highlights.map((h) => (
                  <span key={h} className="text-[10px] sm:text-xs font-medium bg-primary/10 text-primary px-2.5 sm:px-3 py-1 rounded-full">
                    {h}
                  </span>
                ))}
              </div>

              <Link to={sol.link}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-heading font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all relative z-10 w-full sm:w-auto active:scale-95">
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
