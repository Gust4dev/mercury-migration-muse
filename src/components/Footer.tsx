import { Link } from "react-router-dom";
import mercuryLogo from "@/assets/mercury-logo.png";
import whatsappLogo from "@/assets/whatsapp-logo.png";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-mercury-dark border-t border-border py-10 sm:py-14">
      <div className="container mx-auto px-5 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <img src={mercuryLogo} alt="Mercury Gestora" className="h-10 sm:h-12 w-auto" />
              <span className="font-heading text-lg sm:text-xl font-bold text-white">Mercury Gestora</span>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground text-center md:text-left max-w-xs">
              O braço de automação, tecnologia e dados que faltava pro seu negócio.
            </p>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              CNPJ: 50.884.134/0001-90
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start gap-2.5 sm:gap-3">
            <h4 className="font-heading font-bold text-foreground text-sm mb-1">Soluções</h4>
            <Link to="/vendimais" className="text-sm text-muted-foreground hover:text-primary transition-colors active:text-primary">
              Vendi.Mais®
            </Link>
            <Link to="/suporte" className="text-sm text-muted-foreground hover:text-primary transition-colors active:text-primary">
              Suporte
            </Link>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col items-center md:items-end gap-3 sm:gap-4">
            <h4 className="font-heading font-bold text-foreground text-sm mb-1">Fale conosco</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">contato@mercurygestora.com.br</p>

            <div className="flex items-center gap-3 mt-1 sm:mt-2">
              <a
                href="https://wa.me/556293618627?text=Estou%20vindo%20do%20Site,%20preciso%20de%20ajuda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all overflow-hidden active:scale-95"
              >
                <img src={whatsappLogo} alt="WhatsApp" className="h-full w-full object-cover rounded-full" />
              </a>
              <a
                href="https://www.instagram.com/mercurygestora?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all active:scale-95"
              >
                <Instagram className="text-muted-foreground" size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 sm:mt-10 pt-5 sm:pt-6 text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mercury Gestora. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
