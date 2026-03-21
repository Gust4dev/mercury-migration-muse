import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background pt-16 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />

      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="max-w-3xl">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6 animate-fade-in-up">
            Mercury Gestora — Vendi.Mais®
          </p>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up animation-delay-200">
            A gestão comercial que{" "}
            <span className="text-primary">transforma dados</span> em{" "}
            <span className="text-primary">vendas reais</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-fade-in-up animation-delay-400">
            Chega de achismo. Nossa tecnologia une atração cirúrgica, filtragem inteligente
            e dados acionáveis para escalar suas vendas com previsibilidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-heading font-bold text-base px-8 py-6 hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
            >
              Quero ver uma demonstração
              <ArrowRight className="ml-2" size={18} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary font-heading font-bold text-base px-8 py-6 hover:bg-primary/10 hover:scale-105 transition-all"
            >
              Falar com um especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
