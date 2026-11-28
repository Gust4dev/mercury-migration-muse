import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { trackInstitutionalEvent } from "./config";

const pillars = [
  {
    number: "01",
    title: "Marketing e aquisição de clientes",
    description: "Ajudamos sua empresa a ser encontrada por quem está procurando seus produtos e serviços, transformando presença digital em novas oportunidades comerciais.",
    services: ["Google Ads", "Meta Ads", "Perfil da Empresa no Google", "Estratégia de aquisição", "Presença digital"],
    href: "/solucoes/gestao-de-trafego",
  },
  {
    number: "02",
    title: "Tecnologia e automação",
    description: "Desenvolvemos e implementamos tecnologias que simplificam processos, agilizam o atendimento e aumentam a eficiência operacional.",
    services: ["Atendimento inteligente", "Automação de WhatsApp", "CRM", "Integrações", "Mercury Nexus®"],
    href: "/solucoes/automacao",
  },
  {
    number: "03",
    title: "Inteligência comercial",
    description: "Ajudamos empresas a aproveitar melhor sua carteira de clientes, identificar oportunidades e tomar decisões comerciais com base em informações reais.",
    services: ["Remarketing", "Recuperação de clientes", "Recorrência de compras", "Análise de dados", "Organização comercial"],
    href: "/solucoes/inteligencia-comercial",
  },
];

const HomePillars = () => (
  <section id="pilares" className="bg-institutional-white py-16 sm:py-24">
    <div className="institutional-container">
      <Reveal>
        <SectionHeading
          eyebrow="O QUE FAZEMOS"
          title="Da conquista do cliente à próxima venda."
          description="A Mercury atua em diferentes etapas da operação comercial, conectando estratégias de aquisição, relacionamento e tecnologia para ajudar empresas a vender mais e operar melhor."
        />
      </Reveal>
      <div className="mt-12 border-t border-institutional-line">
        {pillars.map((pillar) => (
          <Reveal key={pillar.number}>
            <article className="grid gap-6 border-b border-institutional-line py-9 lg:grid-cols-[0.12fr_0.38fr_0.5fr] lg:gap-10 lg:py-12">
              <p className="text-sm text-institutional-muted">{pillar.number}</p>
              <div>
                <h3 className="text-2xl leading-tight text-institutional-black sm:text-3xl">{pillar.title}</h3>
                <p className="mt-4 text-base leading-7 text-institutional-muted">{pillar.description}</p>
              </div>
              <div className="flex flex-col justify-between gap-6">
                <ul className="grid gap-x-5 gap-y-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {pillar.services.map((service) => (
                    <li key={service} className="border-b border-institutional-line/70 py-2 text-sm text-institutional-black/75">{service}</li>
                  ))}
                </ul>
                <Link
                  to={pillar.href}
                  onClick={() => trackInstitutionalEvent("ViewContent", `Pilar ${pillar.title}`)}
                  className="inline-flex items-center gap-2 self-start text-sm text-institutional-black underline decoration-institutional-yellow decoration-2 underline-offset-8 hover:text-institutional-muted"
                >
                  Conhecer soluções <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default HomePillars;
