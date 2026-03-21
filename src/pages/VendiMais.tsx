import Navbar from "@/components/Navbar";
import Pillars from "@/components/Pillars";
import Highlight from "@/components/Highlight";
import BlogSection from "@/components/BlogSection";
import Qualification from "@/components/Qualification";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const VendiMais = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-background pt-28 pb-20 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-4 animate-fade-in-up">
              Solução Mercury
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up animation-delay-200">
              <span className="text-primary">Vendi.Mais®</span> — O sistema que
              transforma gestão comercial em receita previsível
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 leading-relaxed animate-fade-in-up animation-delay-400">
              Três pilares funcionando simultaneamente para atrair, filtrar e
              converter com dados reais. Sem achismo. Sem desperdício.
            </p>
            <div className="animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-heading font-bold text-base px-8 py-6 hover:bg-primary/90 hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
              >
                Quero ver uma demonstração
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Pillars />
      <Highlight />
      <BlogSection />
      <Qualification />
      <Footer />
    </div>
  );
};

export default VendiMais;
