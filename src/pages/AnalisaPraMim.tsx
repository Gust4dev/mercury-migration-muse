import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnalisaPraMim = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative bg-background pt-28 pb-20 min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse-slow" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-4 animate-fade-in-up">
              Solução Mercury
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up animation-delay-200">
              <span className="text-primary">Analisa.PraMim</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed animate-fade-in-up animation-delay-400">
              Em breve teremos mais detalhes sobre essa solução.
              Enquanto isso, fale com nosso time para saber como podemos
              ajudar o seu negócio.
            </p>
            <div className="animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-heading font-bold text-base px-8 py-6 hover:bg-primary/90 hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
              >
                Falar com um especialista
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnalisaPraMim;
