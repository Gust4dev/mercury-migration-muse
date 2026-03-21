import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background pt-16">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="max-w-3xl">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6">
            Mercury Gestora — Vendi.Mais®
          </p>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            A gestão comercial que{" "}
            <span className="text-primary">transforma dados</span> em{" "}
            <span className="text-primary">vendas reais</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Chega de achismo. Nossa tecnologia une atração cirúrgica, filtragem inteligente
            e dados acionáveis para escalar suas vendas com previsibilidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-heading font-bold text-base px-8 py-6 hover:bg-primary/90 transition-all"
            >
              Quero ver uma demonstração
              <ArrowRight className="ml-2" size={18} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary font-heading font-bold text-base px-8 py-6 hover:bg-primary/10"
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
