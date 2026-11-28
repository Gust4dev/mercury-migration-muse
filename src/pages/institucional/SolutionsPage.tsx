import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import InstitutionalLayout from "@/components/institutional/InstitutionalLayout";
import PageHero from "@/components/institutional/PageHero";
import InstitutionalCta from "@/components/institutional/InstitutionalCta";
import Reveal from "@/components/institutional/Reveal";
import { solutionDetails } from "@/components/institutional/data";
import { trackInstitutionalEvent, WHATSAPP_URL } from "@/components/institutional/config";

const SolutionsPage = () => (
  <>
    <SEO
      title="Soluções em Marketing e Tecnologia | Mercury Gestora"
      description="Conheça as soluções da Mercury em aquisição de clientes, presença digital, atendimento, automação e inteligência comercial."
      canonical="/solucoes"
      keywords="soluções de marketing, gestão de tráfego, presença digital, automação comercial, inteligência comercial, Mercury Gestora"
    />
    <InstitutionalLayout>
      <PageHero
        eyebrow="NOSSAS SOLUÇÕES"
        title="Da conquista do cliente à próxima venda."
        description="Estratégia, tecnologia e execução comercial conectadas para ajudar sua empresa a conquistar clientes, melhorar o atendimento e operar com mais eficiência."
      >
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("Contact", "Página de soluções")} className="institutional-button bg-institutional-yellow text-institutional-black">
          Converse com nossa equipe <ArrowUpRight size={17} />
        </a>
      </PageHero>

      <section className="bg-institutional-white py-16 sm:py-24">
        <div className="institutional-container">
          <div className="border-t border-institutional-line">
            {solutionDetails.map((solution, index) => (
              <Reveal key={solution.slug}>
                <article className="grid gap-6 border-b border-institutional-line py-10 lg:grid-cols-[0.1fr_0.5fr_0.4fr] lg:gap-12">
                  <p className="text-sm text-institutional-muted">{String(index + 1).padStart(2, "0")}</p>
                  <div>
                    <h2 className="text-3xl text-institutional-black sm:text-4xl">{solution.name}</h2>
                    <p className="mt-4 text-lg leading-8 text-institutional-muted">{solution.description}</p>
                  </div>
                  <div className="flex flex-col justify-between gap-6">
                    <ul className="space-y-2 text-sm text-institutional-black/70">
                      {solution.services.slice(0, 4).map((service) => <li key={service} className="border-b border-institutional-line/70 pb-2">{service}</li>)}
                    </ul>
                    <Link to={`/solucoes/${solution.slug}`} onClick={() => trackInstitutionalEvent("ViewContent", `Solução ${solution.name}`)} className="inline-flex items-center gap-2 self-start text-sm text-institutional-black underline decoration-institutional-yellow decoration-2 underline-offset-8">
                      Ver solução <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-institutional-light py-12">
        <div className="institutional-container flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="institutional-eyebrow text-institutional-muted">OPERAÇÃO COMERCIAL INTEGRADA</p>
            <h2 className="mt-3 text-3xl text-institutional-black">Vendi.Mais®</h2>
            <p className="mt-2 max-w-2xl text-institutional-muted">Aquisição, atendimento, relacionamento e tecnologia reunidos em uma estratégia completa para vender mais.</p>
          </div>
          <Link to="/vendimais" className="institutional-button shrink-0 bg-institutional-black text-institutional-white">Conheça o Vendi.Mais® <ArrowRight size={17} /></Link>
        </div>
      </section>
      <InstitutionalCta />
    </InstitutionalLayout>
  </>
);

export default SolutionsPage;
