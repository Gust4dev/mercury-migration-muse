import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";
import whatsappLogo from "@/assets/whatsapp-logo.png";

const WA_LINK = "https://wa.me/556293618627?text=Estou%20vindo%20do%20Site,%20preciso%20de%20ajuda";

const Suporte = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Suporte Mercury Gestora",
    url: "https://mercurygestora.com.br/suporte",
    description: "Canais oficiais de contato e suporte da Mercury Gestora: WhatsApp, Instagram e e-mail.",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Suporte e Contato — Fale com a Mercury Gestora"
        description="Entre em contato com a Mercury Gestora pelo WhatsApp, Instagram ou e-mail. Suporte rápido para sua jornada de automação comercial e IA."
        canonical="/suporte"
        keywords="contato Mercury Gestora, suporte, WhatsApp, atendimento, fale conosco"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="flex-1 bg-background pt-20 sm:pt-32 pb-10 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-4 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-primary font-heading font-semibold text-[11px] sm:text-sm uppercase tracking-[0.2em] mb-2 sm:mb-3 animate-fade-in-up">
              Suporte Mercury
            </p>
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-6 animate-fade-in-up animation-delay-200">
              Conecte-se <span className="text-primary">conosco</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-base mb-6 sm:mb-14 leading-relaxed max-w-md mx-auto animate-fade-in-up animation-delay-400">
              Escolha o canal de sua preferência para falar com nossa equipe. Estamos prontos para ajudar.
            </p>

            <div className="flex flex-col gap-3 sm:gap-4 max-w-xs mx-auto animate-fade-in-up animation-delay-600">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-heading font-bold text-sm sm:text-base py-5 sm:py-6 hover:scale-105 transition-all gap-2.5 sm:gap-3 active:scale-95"
                >
                  <img src={whatsappLogo} alt="WhatsApp" className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover" />
                  WhatsApp
                </Button>
              </a>

              <a href="https://www.instagram.com/mercurygestora?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 text-white font-heading font-bold text-sm sm:text-base py-5 sm:py-6 hover:scale-105 transition-all gap-2.5 sm:gap-3 active:scale-95"
                >
                  <Instagram size={20} />
                  Instagram
                </Button>
              </a>

              <a href="mailto:contato@mercurygestora.com.br">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-primary text-primary font-heading font-bold text-xs sm:text-base py-5 sm:py-6 hover:bg-primary/10 hover:scale-105 transition-all gap-2 sm:gap-3 active:scale-95"
                >
                  <Mail size={18} />
                  contato@mercurygestora.com.br
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Suporte;
