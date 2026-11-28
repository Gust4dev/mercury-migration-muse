import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import mercuryLogo from "@/assets/mercury-logo.png";
import { NEXUS_URL, trackInstitutionalEvent, WHATSAPP_URL } from "./config";

interface NavChild {
  label: string;
  href: string;
  external?: boolean;
}

interface NavGroup {
  label: string;
  href: string;
  children: NavChild[];
}

const solutionLinks: NavChild[] = [
  { label: "Gestão de Tráfego", href: "/solucoes/gestao-de-trafego" },
  { label: "Presença Digital", href: "/solucoes/presenca-digital" },
  { label: "Atendimento e Automação", href: "/solucoes/automacao" },
  { label: "Inteligência Comercial", href: "/solucoes/inteligencia-comercial" },
  { label: "Vendi.Mais®", href: "/vendimais" },
];

const segmentLinks: NavChild[] = [
  { label: "Mercury GLP", href: "/segmentos/glp" },
  { label: "Mercury Farma", href: "/segmentos/farma" },
  { label: "Mercury Auto", href: "/segmentos/auto" },
];

const aboutLinks: NavChild[] = [
  { label: "Conheça a Mercury", href: "/sobre" },
  { label: "Comunidades", href: "/comunidade" },
  { label: "Creatto", href: "/creatto" },
];

const groups: NavGroup[] = [
  { label: "Soluções", href: "/solucoes", children: solutionLinks },
  { label: "Segmentos", href: "/segmentos", children: segmentLinks },
  { label: "Sobre nós", href: "/sobre", children: aboutLinks },
];

const InstitutionalNavbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setDropdown(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const contactClick = () => trackInstitutionalEvent("Contact", "Menu fale com nossa equipe");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-institutional-white/10 bg-institutional-black/[0.97] text-institutional-white">
      <div className="institutional-container flex h-[76px] items-center justify-between gap-5">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Mercury Gestora — Início">
          <img src={mercuryLogo} alt="" className="h-11 w-auto" />
          <span className="text-xl text-institutional-white">Mercury Gestora</span>
        </Link>

        <nav className="hidden items-center gap-2 xl:flex" aria-label="Navegação principal">
          <Link to="/" className="px-3 py-2 text-sm text-institutional-white/85 transition-colors hover:text-institutional-white">Início</Link>
          {groups.slice(0, 2).map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setDropdown(group.label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <Button variant="ghost"
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm text-institutional-white/85 transition-colors hover:text-institutional-white"
                aria-expanded={dropdown === group.label}
                onClick={() => setDropdown(dropdown === group.label ? null : group.label)}
              >
                {group.label}<ChevronDown size={14} className={dropdown === group.label ? "rotate-180 transition-transform" : "transition-transform"} />
              </Button>
              {dropdown === group.label && (
                <div className="absolute left-0 top-full w-72 pt-2">
                  <div className="border border-institutional-white/10 bg-institutional-graphite p-2 shadow-2xl">
                    <Link to={group.href} className="block border-b border-institutional-white/10 px-4 py-3 text-sm text-institutional-yellow hover:bg-institutional-white/5">
                      Visão geral
                    </Link>
                    {group.children.map((child) => (
                      <Link key={child.href} to={child.href} className="block px-4 py-3 text-sm text-institutional-white/75 hover:bg-institutional-white/5 hover:text-institutional-white">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link to="/tecnologia" className="px-3 py-2 text-sm text-institutional-white/85 transition-colors hover:text-institutional-white">Tecnologia</Link>
          <div className="relative" onMouseEnter={() => setDropdown("Sobre nós")} onMouseLeave={() => setDropdown(null)}>
            <Button variant="ghost"
              type="button"
              className="flex items-center gap-1 px-3 py-2 text-sm text-institutional-white/85 transition-colors hover:text-institutional-white"
              aria-expanded={dropdown === "Sobre nós"}
              onClick={() => setDropdown(dropdown === "Sobre nós" ? null : "Sobre nós")}
            >
              Sobre nós<ChevronDown size={14} className={dropdown === "Sobre nós" ? "rotate-180 transition-transform" : "transition-transform"} />
            </Button>
            {dropdown === "Sobre nós" && (
              <div className="absolute left-0 top-full w-64 pt-2">
                <div className="border border-institutional-white/10 bg-institutional-graphite p-2 shadow-2xl">
                  {aboutLinks.map((child) => (
                    <Link key={child.href} to={child.href} className="block px-4 py-3 text-sm text-institutional-white/75 hover:bg-institutional-white/5 hover:text-institutional-white">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link to="/loja" className="px-3 py-2 text-sm text-institutional-white/85 transition-colors hover:text-institutional-white">Loja</Link>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link to="/suporte" className="text-sm text-institutional-white/55 hover:text-institutional-white">Suporte</Link>
          <a
            href={NEXUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackInstitutionalEvent("ViewContent", "Acessar Mercury Nexus pelo menu")}
            className="flex items-center gap-1 text-sm text-institutional-white hover:text-institutional-yellow"
          >
            Acessar Nexus® <ArrowUpRight size={14} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={contactClick}
            className="institutional-button min-h-10 bg-institutional-yellow px-4 py-2 text-sm text-institutional-black hover:bg-institutional-yellow/85"
          >
            Fale com nossa equipe
          </a>
        </div>

        <Button variant="ghost"
          type="button"
          className="p-2 text-institutional-white xl:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </Button>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[76px] overflow-y-auto bg-institutional-black px-5 pb-10 pt-5 xl:hidden">
          <nav className="mx-auto max-w-xl" aria-label="Navegação para celular">
            <Link to="/" className="block border-b border-institutional-white/10 py-4 text-xl">Início</Link>
            {groups.map((group) => (
              <div key={group.label} className="border-b border-institutional-white/10 py-2">
                <div className="flex items-center justify-between">
                  <Link to={group.href} className="flex-1 py-3 text-xl">{group.label}</Link>
                  <Button variant="ghost"
                    type="button"
                    className="p-3 text-institutional-white/65"
                    aria-label={`${mobileGroup === group.label ? "Recolher" : "Abrir"} ${group.label}`}
                    aria-expanded={mobileGroup === group.label}
                    onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                  >
                    <ChevronDown size={20} className={mobileGroup === group.label ? "rotate-180 transition-transform" : "transition-transform"} />
                  </Button>
                </div>
                {mobileGroup === group.label && (
                  <div className="pb-3 pl-3">
                    {group.children.map((child) => (
                      <Link key={child.href} to={child.href} className="block py-2.5 text-base text-institutional-white/60">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/tecnologia" className="block border-b border-institutional-white/10 py-4 text-xl">Tecnologia</Link>
            <Link to="/loja" className="block border-b border-institutional-white/10 py-4 text-xl">Loja</Link>
            <Link to="/suporte" className="block border-b border-institutional-white/10 py-4 text-xl">Suporte</Link>
            <a
              href={NEXUS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackInstitutionalEvent("ViewContent", "Acessar Mercury Nexus pelo menu mobile")}
              className="flex items-center justify-between border-b border-institutional-white/10 py-4 text-lg text-institutional-white"
            >
              Acessar Mercury Nexus® <ArrowUpRight size={18} />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={contactClick}
              className="institutional-button mt-6 w-full bg-institutional-yellow text-institutional-black"
            >
              Fale com nossa equipe
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default InstitutionalNavbar;
