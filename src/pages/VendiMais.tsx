import Navbar from "@/components/Navbar";
import Pillars from "@/components/Pillars";
import Highlight from "@/components/Highlight";
import VendiMaisFlowchart from "@/components/VendiMaisFlowchart";
import BlogSection from "@/components/BlogSection";
import Qualification from "@/components/Qualification";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WA_LINK = "https://wa.me/556295643201?text=Estou%20vindo%20do%20site%2C%20preciso%20de%20ajuda%20sobre%20o%20Vendi.Mais%C2%AE";

const VendiMais = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-background pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-[11px] sm:text-xs font-heading font-extrabold uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-5 sm:mb-6 animate-fade-in-up shadow-[0_0_20px_rgba(255,215,0,0.25)]">
              <span className="text-base">🔥</span>
              Produto destaque — Solução mais contratada
            </div>
            <p className="text-muted-foreground font-heading font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4 animate-fade-in-up animation-delay-200">
              Mercury Gestora — Vendi.Mais®
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6 animate-fade-in-up animation-delay-200">
              A gestão comercial que <span className="text-primary">transforma dados</span> em vendas reais
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mb-6 sm:mb-8 leading-relaxed animate-fade-in-up animation-delay-400 mx-auto md:mx-0">
              Chega de achismo. Nossa tecnologia une atração cirúrgica, filtragem inteligente e dados acionáveis para escalar suas vendas com previsibilidade.
            </p>
            <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground font-heading font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:bg-primary/90 hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] w-full"
                >
                  Quero ver uma demonstração
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary font-heading font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:bg-primary/10 hover:scale-105 transition-all w-full"
                >
                  Falar com um especialista
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bot Farmácia Demo */}
      <section className="bg-secondary py-12 sm:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-heading font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
              Caso Real — Bot Farmácia
            </p>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 px-2">
              Atendimento <span className="text-primary">híbrido com IA</span> +
              Cards nativos Meta
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              O ápice da tecnologia de atendimento no WhatsApp. Bot inteligente
              que combina inteligência artificial com cards nativos da Meta para
              uma experiência única.
            </p>
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl max-w-sm sm:max-w-lg md:max-w-2xl mx-auto">
              <video
                className="w-full pointer-events-none"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/bot-farmacia.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Bot Distribuidora de Gás */}
      <section className="bg-background py-12 sm:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-heading font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
              Caso Real — Distribuidora de Gás
            </p>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 px-2">
              Atendimento{" "}
              <span className="text-primary">100% IA Mercury</span> — 24h por
              dia, 7 dias por semana
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              IA própria Mercury. Atendimento rápido, sem passos desnecessários.
              Entende áudio, salva dados, informa preços e finaliza o pedido
              automaticamente. O pedido chega direto no WhatsApp da
              distribuidora e na plataforma Mercury Nexus®.
            </p>
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl max-w-sm sm:max-w-lg md:max-w-2xl mx-auto">
              <video
                className="w-full pointer-events-none"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/bot-gas.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <Pillars />
      <Highlight />
      <VendiMaisFlowchart />
      <BlogSection />
      <Qualification />
      <Footer />
    </div>
  );
};

export default VendiMais;
