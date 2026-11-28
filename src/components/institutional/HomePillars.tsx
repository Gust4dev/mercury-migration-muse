import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { trackInstitutionalEvent } from "./config";

const pillars = [
  { number: "01", title: "Marketing e aquisição de clientes", benefit: "Seja encontrado por novos clientes.", description: "Ajudamos sua empresa a ser encontrada por quem está procurando seus produtos e serviços, transformando presença digital em novas oportunidades comerciais.", services: "Google Ads · Meta Ads · Perfil da Empresa no Google · Estratégia de aquisição · Presença digital", href: "/solucoes/gestao-de-trafego" },
  { number: "02", title: "Tecnologia e automação", benefit: "Simplifique sua operação.", description: "Desenvolvemos e implementamos tecnologias que simplificam processos, agilizam o atendimento e aumentam a eficiência operacional.", services: "Atendimento inteligente · Automação de WhatsApp · CRM · Integrações · Mercury Nexus®", href: "/solucoes/automacao" },
  { number: "03", title: "Inteligência comercial", benefit: "Venda mais para quem já conhece sua empresa.", description: "Ajudamos empresas a aproveitar melhor sua carteira de clientes, identificar oportunidades e tomar decisões comerciais com base em informações reais.", services: "Remarketing · Recuperação de clientes · Recorrência de compras · Análise de dados · Organização comercial", href: "/solucoes/inteligencia-comercial" },
];
const HomePillars = () => <section id="pilares" className="bg-institutional-white py-16 sm:py-20"><div className="institutional-container">
  <Reveal><SectionHeading eyebrow="O QUE FAZEMOS" title="Da conquista do cliente à próxima venda." description="Estratégia, relacionamento e tecnologia trabalhando juntos em cada etapa da sua operação comercial." /></Reveal>
  <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">{pillars.map((pillar) => <Reveal key={pillar.number}><article className="flex h-full flex-col">
    <p className="text-lg text-institutional-muted">{pillar.number} <span className="ml-3 inline-block h-1 w-12 bg-institutional-yellow align-middle" /></p>
    <p className="mt-5 text-base text-institutional-muted">{pillar.title}</p>
    <h3 className="mt-3 text-3xl leading-tight text-institutional-black">{pillar.benefit}</h3>
    <p className="mt-5 text-lg leading-8 text-institutional-muted">{pillar.description}</p>
    <p className="mt-5 text-base leading-7 text-institutional-muted">{pillar.services}</p>
    <Link to={pillar.href} onClick={() => trackInstitutionalEvent("ViewContent", `Pilar ${pillar.title}`)} className="institutional-button mt-6 self-start border-institutional-black/25 text-institutional-black hover:bg-institutional-black hover:text-institutional-white">Conhecer soluções <ArrowRight size={17} /></Link>
  </article></Reveal>)}</div>
</div></section>;
export default HomePillars;
