import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";
import whatsappLogo from "@/assets/whatsapp-logo.png";

const WA_LINK = "https://wa.me/556295643201?text=Estou%20vindo%20do%20site%2C%20preciso%20de%20ajuda";

const Suporte = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 bg-background pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-primary font-heading font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
              Suporte Mercury
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Conecte-se <span className="text-primary">conosco</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mb-10 sm:mb-14 leading-relaxed max-w-md mx-auto">
              Escolha o canal de sua preferência para falar com nossa equipe. Estamos prontos para ajudar.
            </p>

            <div className="flex flex-col gap-4 max-w-xs mx-auto">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-heading font-bold text-base py-6 hover:scale-105 transition-all gap-3"
                >
                  <img src={whatsappLogo} alt="WhatsApp" className="h-6 w-6 rounded-full object-cover" />
                  WhatsApp
                </Button>
              </a>

              <a href="https://www.instagram.com/mercurygestora" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 text-white font-heading font-bold text-base py-6 hover:scale-105 transition-all gap-3"
                >
                  <Instagram size={22} />
                  Instagram
                </Button>
              </a>

              <a href="mailto:contato@mercurygestora.com.br">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-primary text-primary font-heading font-bold text-base py-6 hover:bg-primary/10 hover:scale-105 transition-all gap-3"
                >
                  <Mail size={22} />
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
