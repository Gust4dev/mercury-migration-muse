import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WA_LINK = "https://wa.me/556295643201?text=Estou%20vindo%20do%20site%2C%20preciso%20de%20ajuda%C2%AE";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center bg-background pt-14 sm:pt-16 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-48 sm:w-80 h-48 sm:h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />

      <div className="container mx-auto px-5 sm:px-4 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
          <div className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-[9px] sm:text-[11px] font-heading font-extrabold uppercase tracking-[0.12em] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-5 animate-fade-in-up shadow-[0_0_16px_rgba(255,215,0,0.25)]">
            <span className="text-xs sm:text-sm">🔥</span>
            Produto destaque — Solução mais contratada
          </div>
          <p className="text-primary font-heading font-semibold text-[11px] sm:text-sm uppercase tracking-[0.2em] mb-4 sm:mb-6 animate-fade-in-up animation-delay-100">
            Mercury Gestora — Vendi.Mais®
          </p>

          <h1 className="font-heading text-[28px] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up animation-delay-200">
            A gestão comercial que{" "}
            <span className="text-primary">transforma dados</span> em{" "}
            <span className="text-primary">vendas reais</span>
          </h1>

          <p className="text-muted-foreground text-sm sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-10 leading-relaxed animate-fade-in-up animation-delay-400 mx-auto md:mx-0">
            Chega de achismo. Nossa tecnologia une atração cirúrgica, filtragem inteligente
            e dados acionáveis para escalar suas vendas com previsibilidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animation-delay-600 justify-center md:justify-start">
            <Link to="/vendi-mais" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-heading font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] w-full animate-glow-pulse active:scale-95"
              >
                Quero ver uma demonstração
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>

            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary font-heading font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:bg-primary/10 hover:scale-105 transition-all w-full active:scale-95"
              >
                Falar com um especialista
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
