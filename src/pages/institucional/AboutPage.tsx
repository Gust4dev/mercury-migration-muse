import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import InstitutionalLayout from "@/components/institutional/InstitutionalLayout";
import PageHero from "@/components/institutional/PageHero";
import InstitutionalCta from "@/components/institutional/InstitutionalCta";
import Reveal from "@/components/institutional/Reveal";
import mercuryLogo from "@/assets/mercury-logo.png";
import { trackInstitutionalEvent, WHATSAPP_URL } from "@/components/institutional/config";

const brands = [
  ["Mercury Gestora", "Estratégia, marketing, tecnologia, inteligência comercial e execução das soluções."],
  ["Mercury Nexus®", "Plataforma tecnológica proprietária para atendimento, automação, relacionamento e inteligência comercial."],
  ["Vendi.Mais®", "Solução comercial integrada que combina aquisição de clientes, atendimento, relacionamento e tecnologia."],
  ["Mercury GLP, Farma e Auto", "Verticais especializadas nas realidades de revendas de gás, farmácias e negócios automotivos."],
  ["Creatto", "Desenvolvimento de produtos, fabricação e impressão 3D, com comercialização pela Mercury Loja."],
];

const AboutPage = () => (
  <>
    <SEO
      title="Sobre a Mercury Gestora | Marketing e Tecnologia"
      description="Conheça a Mercury Gestora, sua atuação em marketing, tecnologia e inteligência comercial e as marcas que fazem parte da empresa."
      canonical="/sobre"
      keywords="Mercury Gestora, sobre a Mercury, empresa de tecnologia e marketing, Mercury Nexus, Vendi.Mais, Creatto"
    />
    <InstitutionalLayout>
      <PageHero
        eyebrow="QUEM SOMOS"
        title="Tecnologia feita por pessoas. Estratégia construída para negócios reais."
        description="A Mercury Gestora nasceu com o propósito de aproximar empresas das oportunidades proporcionadas pela tecnologia."
      >
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("Contact", "Página sobre a Mercury")} className="institutional-button bg-institutional-yellow text-institutional-black">Fale com nossa equipe <ArrowUpRight size={17} /></a>
      </PageHero>

      <section className="bg-institutional-white py-16 sm:py-24">
        <div className="institutional-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="border-l-4 border-institutional-yellow pl-7">
              <img src={mercuryLogo} alt="" className="h-16 w-auto" />
              <p className="mt-8 text-2xl leading-snug text-institutional-black">Estratégia, tecnologia própria e execução operacional no mesmo trabalho.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-lg leading-8 text-institutional-muted">
              <p>Combinamos conhecimento de mercado, desenvolvimento tecnológico, marketing e inteligência comercial para construir soluções que fazem sentido na realidade de cada negócio.</p>
              <p>Acreditamos que tecnologia precisa simplificar operações, estratégia precisa gerar oportunidades e resultados precisam ser acompanhados de forma transparente.</p>
              <p>Mais do que fornecer ferramentas, trabalhamos ao lado das empresas na construção de operações comerciais mais eficientes.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-institutional-light py-16 sm:py-24">
        <div className="institutional-container">
          <p className="institutional-eyebrow text-institutional-muted">ARQUITETURA DE MARCAS</p>
          <h2 className="institutional-title mt-4 max-w-3xl text-4xl sm:text-5xl">Uma empresa, diferentes frentes de atuação.</h2>
          <div className="mt-12 border-t border-institutional-line">
            {brands.map(([name, text], index) => (
              <article key={name} className="grid gap-3 border-b border-institutional-line py-6 md:grid-cols-[0.35fr_0.65fr] md:gap-10">
                <h3 className="text-2xl text-institutional-black">{name}</h3>
                <p className="max-w-2xl leading-7 text-institutional-muted">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link to="/solucoes" className="text-institutional-black underline decoration-institutional-yellow decoration-2 underline-offset-8">Conhecer soluções</Link>
            <Link to="/segmentos" className="text-institutional-black underline decoration-institutional-yellow decoration-2 underline-offset-8">Explorar segmentos</Link>
            <Link to="/creatto" className="text-institutional-black underline decoration-institutional-yellow decoration-2 underline-offset-8">Conhecer a Creatto</Link>
          </div>
        </div>
      </section>
      <InstitutionalCta />
    </InstitutionalLayout>
  </>
);

export default AboutPage;
