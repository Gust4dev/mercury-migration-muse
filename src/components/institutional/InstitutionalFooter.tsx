import { ArrowUpRight, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import mercuryLogo from "@/assets/mercury-logo.png";
import { CONTACT_EMAIL, INSTAGRAM_URL, NEXUS_URL, trackInstitutionalEvent, WHATSAPP_URL } from "./config";

const columns = [
  {
    title: "Soluções",
    links: [
      ["Gestão de Tráfego", "/solucoes/gestao-de-trafego"],
      ["Presença Digital", "/solucoes/presenca-digital"],
      ["Atendimento e Automação", "/solucoes/automacao"],
      ["Inteligência Comercial", "/solucoes/inteligencia-comercial"],
      ["Vendi.Mais®", "/vendimais"],
    ],
  },
  {
    title: "Segmentos",
    links: [
      ["Mercury GLP", "/segmentos/glp"],
      ["Mercury Farma", "/segmentos/farma"],
      ["Mercury Auto", "/segmentos/auto"],
    ],
  },
  {
    title: "Tecnologia e produtos",
    links: [
      ["Mercury Nexus®", "/tecnologia"],
      ["Creatto", "/creatto"],
      ["Loja virtual", "/loja"],
    ],
  },
  {
    title: "Institucional",
    links: [
      ["Sobre nós", "/sobre"],
      ["Comunidades", "/comunidade"],
      ["Suporte", "/suporte"],
      ["Contato", "/contato"],
      ["Política de Privacidade", "/privacidade"],
    ],
  },
];

const InstitutionalFooter = () => (
  <footer className="bg-institutional-black pb-8 pt-14 text-institutional-white sm:pt-20">
    <div className="institutional-container">
      <div className="grid gap-12 border-b border-institutional-white/10 pb-12 lg:grid-cols-[1.35fr_2.65fr] lg:gap-16">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={mercuryLogo} alt="" className="h-10 w-auto" />
            <span className="text-xl text-institutional-white">Mercury Gestora</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-institutional-white/55">
            Marketing, tecnologia e inteligência comercial para empresas que querem conquistar clientes, melhorar operações e crescer.
          </p>
          <div className="mt-6 space-y-2 text-sm text-institutional-white/65">
            <a href={`mailto:${CONTACT_EMAIL}`} className="block hover:text-institutional-yellow">{CONTACT_EMAIL}</a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackInstitutionalEvent("Contact", "WhatsApp no rodapé institucional")}
              className="inline-flex items-center gap-1 hover:text-institutional-yellow"
            >
              WhatsApp comercial <ArrowUpRight size={14} />
            </a>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Mercury Gestora"
            className="mt-5 inline-flex h-11 w-11 items-center justify-center border border-institutional-white/15 text-institutional-white/65 transition-colors hover:border-institutional-yellow hover:text-institutional-yellow"
          >
            <Instagram size={19} />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm text-institutional-white">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link to={href} className="text-sm leading-5 text-institutional-white/50 transition-colors hover:text-institutional-yellow">
                      {label}
                    </Link>
                  </li>
                ))}
                {column.title === "Tecnologia e produtos" && (
                  <li>
                    <a
                      href={NEXUS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackInstitutionalEvent("ViewContent", "Acessar plataforma no rodapé")}
                      className="inline-flex items-center gap-1 text-sm text-institutional-white hover:text-institutional-yellow"
                    >
                      Acessar plataforma <ArrowUpRight size={12} />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 text-xs text-institutional-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>CNPJ: 50.884.134/0001-90</p>
        <p>© {new Date().getFullYear()} Mercury Gestora. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

export default InstitutionalFooter;
