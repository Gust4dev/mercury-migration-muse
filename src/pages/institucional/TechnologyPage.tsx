import { ArrowUpRight } from "lucide-react";
import SEO from "@/components/SEO";
import InstitutionalLayout from "@/components/institutional/InstitutionalLayout";
import PageHero from "@/components/institutional/PageHero";
import InstitutionalCta from "@/components/institutional/InstitutionalCta";
import NexusVideo from "@/components/institutional/NexusVideo";
import Reveal from "@/components/institutional/Reveal";
import { NEXUS_URL, trackInstitutionalEvent, WHATSAPP_URL } from "@/components/institutional/config";

const features = [
  ["Atendimento inteligente", "Organização de conversas e fluxos para tornar o atendimento mais ágil e consistente."],
  ["CRM integrado", "Contatos, histórico e oportunidades reunidos para apoiar o trabalho comercial."],
  ["Remarketing", "Ações de relacionamento para dar continuidade ao contato com clientes e oportunidades."],
  ["Automação comercial", "Fluxos que reduzem tarefas repetitivas e conectam etapas da operação."],
  ["Análise de dados", "Informações e indicadores para acompanhar a operação e apoiar decisões."],
  ["Integrações", "Conexões com outras ferramentas para reduzir informações espalhadas."],
];

const TechnologyPage = () => (
  <>
    <SEO
      title="Mercury Nexus® | Tecnologia Proprietária Mercury"
      description="Conheça a Mercury Nexus®, plataforma proprietária da Mercury para atendimento, CRM, automação, relacionamento e inteligência comercial."
      canonical="/tecnologia"
      keywords="Mercury Nexus, plataforma de atendimento, CRM, automação comercial, remarketing, tecnologia proprietária Mercury"
    />
    <InstitutionalLayout>
      <PageHero
        eyebrow="TECNOLOGIA PROPRIETÁRIA"
        title={<>Sua operação comercial conectada em uma única plataforma. <span className="block pt-4 text-institutional-white">Mercury Nexus®</span></>}
        description="Desenvolvida pela Mercury, a Nexus reúne ferramentas de atendimento, relacionamento, automação e inteligência comercial para ajudar empresas a organizar suas operações e aproveitar melhor suas oportunidades de venda."
      >
        <a href={NEXUS_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("ViewContent", "Acessar Nexus na página de tecnologia")} className="institutional-button bg-institutional-yellow text-institutional-black">
          Acessar plataforma <ArrowUpRight size={17} />
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("Contact", "Demonstração Mercury Nexus")} className="institutional-button border-institutional-white/25 text-institutional-white">
          Fale com nossa equipe
        </a>
      </PageHero>

      <section className="bg-institutional-graphite py-14 text-institutional-white sm:py-20">
        <div className="institutional-container">
          <Reveal>
            <div className="overflow-hidden rounded-sm border border-institutional-white/15"><NexusVideo eager /></div>
            <p className="mt-3 text-xs text-institutional-white/40">Captura real da plataforma Mercury Nexus®, sem dados ou telas fictícias.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-institutional-white py-16 sm:py-24">
        <div className="institutional-container">
          <p className="institutional-eyebrow text-institutional-muted">UMA PLATAFORMA, DIFERENTES ROTINAS</p>
          <h2 className="institutional-title mt-4 max-w-3xl text-4xl sm:text-5xl">Tecnologia própria a serviço da operação comercial.</h2>
          <div className="mt-12 grid border-t border-institutional-line md:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, text], index) => (
              <article key={title} className="border-b border-institutional-line py-7 md:px-7 md:odd:border-r lg:border-r lg:first:pl-0 lg:[&:nth-child(3n)]:border-r-0">
                <p className="text-xs text-institutional-muted">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-2xl text-institutional-black">{title}</h3>
                <p className="mt-3 leading-7 text-institutional-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <InstitutionalCta title="Veja como a Mercury Nexus® pode fazer parte da sua operação." description="Converse com nossa equipe sobre atendimento, relacionamento, automação e organização comercial." />
    </InstitutionalLayout>
  </>
);

export default TechnologyPage;
