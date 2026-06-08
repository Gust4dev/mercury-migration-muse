import { ArrowRight, Megaphone, Bot, Users, Repeat, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WA_LINK = "https://wa.me/556293618627?text=Estou%20vindo%20do%20Site,%20preciso%20de%20ajuda";

const indicators = [
  { icon: Megaphone, label: "Gestão de Tráfego" },
  { icon: Bot, label: "Atendimento IA" },
  { icon: Users, label: "CRM Integrado" },
  { icon: Repeat, label: "Remarketing" },
  { icon: Workflow, label: "Automação Comercial" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] sm:min-h-screen flex items-center bg-background pt-14 sm:pt-16 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-48 sm:w-80 h-48 sm:h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />

      <div className="container mx-auto px-4 sm:px-4 lg:px-8 py-8 sm:py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
          <p className="text-primary font-heading font-semibold text-[11px] sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-6 animate-fade-in-up animation-delay-100">
            Mercury Gestora
          </p>

          <h1 className="font-heading text-[26px] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up animation-delay-200">
            Tecnologia, estratégia e automação para fazer sua empresa{" "}
            <span className="text-primary">vender mais</span>
          </h1>

          <p className="text-muted-foreground text-[13px] leading-relaxed sm:text-lg md:text-xl max-w-2xl mb-5 sm:mb-7 animate-fade-in-up animation-delay-400 mx-auto md:mx-0">
            A Mercury Gestora combina gestão de tráfego, Inteligência Artificial, CRM,
            automação, dados e consultoria estratégica para construir operações comerciais
            mais eficientes e escaláveis.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-9 animate-fade-in-up animation-delay-500 justify-center md:justify-start">
            {indicators.map((i) => (
              <span
                key={i.label}
                className="inline-flex items-center gap-1.5 bg-card/60 border border-primary/20 text-foreground text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full"
              >
                <i.icon className="text-primary" size={12} />
                {i.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-600 justify-center md:justify-start">
            <Link to="/vendimais" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-heading font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] w-full animate-glow-pulse active:scale-95"
              >
                Conhecer o Vendi.Mais
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>

            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary font-heading font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:bg-primary/10 hover:scale-105 transition-all w-full active:scale-95"
              >
                Falar com especialista
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
