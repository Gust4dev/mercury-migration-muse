import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  "Gestão de Tráfego",
  "Atendimento IA",
  "CRM",
  "Automação",
  "Remarketing",
  "Analytics",
  "Recuperação de Clientes",
  "Gestão Comercial",
];

const VendiMaisHighlight = () => {
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
    <section className="relative bg-background py-16 sm:py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-4 lg:px-8 relative z-10">
        <div className={`max-w-5xl mx-auto bg-card/60 backdrop-blur-sm border-2 border-primary/30 rounded-3xl p-6 sm:p-12 shadow-[0_0_60px_rgba(255,215,0,0.15)] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-[10px] sm:text-xs font-heading font-extrabold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4 sm:mb-5">
              <Sparkles size={12} /> Solução principal
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Conheça o <span className="text-primary">Vendi.Mais®</span>
            </h2>
            <p className="font-heading text-base sm:text-xl text-foreground/90 font-semibold mb-4 sm:mb-5">
              Muito mais que um chatbot. Muito mais que um CRM.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              O Vendi.Mais reúne tudo o que uma empresa precisa para vender mais em uma única
              operação integrada. Através dele sua empresa pode atrair clientes, atender
              automaticamente, organizar negociações, recuperar vendas perdidas e acompanhar
              resultados em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
            {features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 bg-background/60 border border-primary/20 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-semibold text-foreground"
              >
                <Check className="text-primary shrink-0" size={14} />
                {f}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/vendimais" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-heading font-bold text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] w-full animate-glow-pulse"
              >
                Conhecer o Vendi.Mais
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendiMaisHighlight;
