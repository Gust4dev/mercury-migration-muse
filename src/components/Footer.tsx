import { Link } from "react-router-dom";
import mercuryLogo from "@/assets/mercury-logo.png";
import whatsappLogo from "@/assets/whatsapp-logo.png";
import tiktokLogo from "@/assets/tiktok-logo.png";
import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-mercury-dark border-t border-border py-14">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <img src={mercuryLogo} alt="Mercury Gestora" className="h-12 w-auto" />
              <span className="font-heading text-xl font-bold text-white">Mercury Gestora</span>
            </div>
            <p className="text-xs text-muted-foreground text-center md:text-left max-w-xs">
              O braço de automação, tecnologia e dados que faltava pro seu negócio.
            </p>
            <p className="text-xs text-muted-foreground">
              CNPJ: 50.884.134/0001-90
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="font-heading font-bold text-foreground text-sm mb-1">Soluções</h4>
            <Link to="/vendimais" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Vendi.Mais®
            </Link>
            <Link to="/analisa-pra-mim" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Analisa.PraMim
            </Link>
            <a href="#suporte" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Suporte
            </a>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h4 className="font-heading font-bold text-foreground text-sm mb-1">Fale conosco</h4>
            <p className="text-sm text-muted-foreground">contato@mercurygestora.com.br</p>

            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://api.whatsapp.com/send/?phone=556295643201&text=Estou+vindo+do+site%2C+preciso+de+ajuda&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all"
              >
                <img src={whatsappLogo} alt="WhatsApp" className="h-5 w-5 object-contain" />
              </a>
              <a
                href="https://www.instagram.com/mercurygestora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all"
              >
                <Instagram className="text-muted-foreground" size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@mercurygestora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all"
              >
                <img src={tiktokLogo} alt="TikTok" className="h-5 w-5 object-contain rounded-sm" />
              </a>
              <a
                href="https://www.linkedin.com/company/mercurygestora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all"
              >
                <Linkedin className="text-muted-foreground" size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mercury Gestora. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
