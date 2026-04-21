import Navbar from "@/components/Navbar";
import Pillars from "@/components/Pillars";
import Highlight from "@/components/Highlight";
import VendiMaisFlowchart from "@/components/VendiMaisFlowchart";
import BlogSection from "@/components/BlogSection";
import Qualification from "@/components/Qualification";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WA_LINK = "https://wa.me/556293618627?text=Estou%20vindo%20do%20Site,%20preciso%20de%20ajuda";

const VendiMais = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Vendi.Mais®",
      brand: { "@type": "Brand", name: "Mercury Gestora" },
      description:
        "Plataforma de gestão comercial com IA, automação de WhatsApp, filtragem inteligente de leads e dashboards acionáveis para escalar vendas de PMEs.",
      category: "Software de Automação Comercial",
      url: "https://mercurygestora.com.br/vendi-mais",
      offers: {
        "@type": "Offer",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: "https://mercurygestora.com.br/vendi-mais",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://mercurygestora.com.br/" },
        { "@type": "ListItem", position: 2, name: "Vendi.Mais", item: "https://mercurygestora.com.br/vendi-mais" },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Vendi.Mais® — Gestão Comercial com IA e Automação de WhatsApp | Mercury Gestora"
        description="Vendi.Mais® transforma dados em vendas reais: bots de WhatsApp com IA, filtragem inteligente de leads, dashboards acionáveis e previsibilidade comercial para PMEs."
        canonical="/vendi-mais"
        keywords="Vendi.Mais, gestão comercial, automação de vendas, bot WhatsApp IA, chatbot vendas, qualificação de leads, dashboard de vendas, CRM, automação comercial PMEs"
        ogType="product"
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-background pt-18 sm:pt-28 pb-10 sm:pb-20 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-48 sm:w-96 h-48 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -left-20 w-36 sm:w-48 h-36 sm:h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="container mx-auto px-4 sm:px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary text-primary-foreground text-[9px] sm:text-xs font-heading font-extrabold uppercase tracking-[0.12em] sm:tracking-[0.15em] px-2.5 sm:px-4 py-1 sm:py-2 rounded-full mb-3 sm:mb-6 animate-fade-in-up shadow-[0_0_20px_rgba(255,215,0,0.25)]">
              <span className="text-xs sm:text-base">🔥</span>
              Produto destaque — Solução mais contratada
            </div>
            <p className="text-muted-foreground font-heading font-semibold text-[10px] sm:text-sm uppercase tracking-[0.2em] mb-2 sm:mb-4 animate-fade-in-up animation-delay-200">
              Mercury Gestora — Vendi.Mais®
            </p>
            <h1 className="font-heading text-[24px] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-6 animate-fade-in-up animation-delay-200">
              A gestão comercial que <span className="text-primary">transforma dados</span> em vendas reais
            </h1>
            <p className="text-muted-foreground text-[13px] sm:text-lg md:text-xl max-w-2xl mb-5 sm:mb-8 leading-relaxed animate-fade-in-up animation-delay-400 mx-auto md:mx-0">
              Chega de achismo. Nossa tecnologia une atração cirúrgica, filtragem inteligente e dados acionáveis para escalar suas vendas com previsibilidade.
            </p>
            <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground font-heading font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:bg-primary/90 hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] w-full animate-glow-pulse active:scale-95"
                >
                  Quero ver uma demonstração
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </a>
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

      {/* Bot Farmácia Demo */}
      <section className="bg-secondary py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-heading font-semibold text-[10px] sm:text-sm uppercase tracking-[0.2em] mb-2 sm:mb-4">
              Caso Real — Bot Farmácia
            </p>
            <h2 className="font-heading text-lg sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-4">
              Atendimento <span className="text-primary">híbrido com IA</span> + Cards nativos Meta
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base max-w-2xl mx-auto mb-4 sm:mb-8 leading-relaxed">
              Bot inteligente que combina inteligência artificial com cards nativos da Meta para uma experiência única.
            </p>
            <div className="block sm:hidden rounded-xl overflow-hidden border border-border shadow-xl mx-auto max-w-sm">
              <video className="w-full pointer-events-none" autoPlay muted loop playsInline>
                <source src="/videos/bot-farmacia-mobile.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="hidden sm:block rounded-2xl overflow-hidden border border-border shadow-xl max-w-lg md:max-w-2xl mx-auto">
              <video className="w-full pointer-events-none" autoPlay muted loop playsInline>
                <source src="/videos/bot-farmacia.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Bot Distribuidora de Gás */}
      <section className="bg-background py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-heading font-semibold text-[10px] sm:text-sm uppercase tracking-[0.2em] mb-2 sm:mb-4">
              Caso Real — Distribuidora de Gás
            </p>
            <h2 className="font-heading text-lg sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-4">
              Atendimento <span className="text-primary">100% IA Mercury</span> — 24h por dia, 7 dias por semana
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base max-w-2xl mx-auto mb-4 sm:mb-8 leading-relaxed">
              IA própria Mercury. Entende áudio, salva dados, informa preços e finaliza o pedido automaticamente.
            </p>
            <div className="block sm:hidden rounded-xl overflow-hidden border border-border shadow-xl mx-auto max-w-sm">
              <video className="w-full pointer-events-none" autoPlay muted loop playsInline>
                <source src="/videos/bot-gas-mobile.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="hidden sm:block rounded-2xl overflow-hidden border border-border shadow-xl max-w-lg md:max-w-2xl mx-auto">
              <video className="w-full pointer-events-none" autoPlay muted loop playsInline>
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
