import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import NexusVideo from "./NexusVideo";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { NEXUS_URL, trackInstitutionalEvent } from "./config";

const features = ["Atendimento inteligente", "CRM integrado", "Remarketing", "Automação comercial", "Gestão de conversas", "Análise de dados", "Indicadores de desempenho", "Integrações"];

const HomeNexus = () => (
  <section id="nexus" className="bg-institutional-black py-16 text-institutional-white sm:py-24">
    <div className="institutional-container">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <SectionHeading
            dark
            eyebrow="TECNOLOGIA PROPRIETÁRIA"
            title="Sua operação comercial conectada em uma única plataforma."
            description="Desenvolvida pela Mercury, a Nexus reúne ferramentas de atendimento, relacionamento, automação e inteligência comercial para ajudar empresas a organizar suas operações e aproveitar melhor suas oportunidades de venda."
          />
          <p className="text-3xl text-institutional-white lg:justify-self-end lg:pb-2">Mercury Nexus®</p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
        <Reveal>
          <figure>
            <div className="overflow-hidden rounded-sm border border-institutional-white/15">
              <NexusVideo />
            </div>
            <figcaption className="mt-3 text-xs text-institutional-white/40">Captura real da plataforma Mercury Nexus®.</figcaption>
          </figure>
        </Reveal>
        <Reveal delay={100}>
          <ul className="border-t border-institutional-white/15">
            {features.map((feature, index) => (
              <li key={feature} className="flex items-center gap-4 border-b border-institutional-white/15 py-3.5 text-sm text-institutional-white/75">
                <span className="text-xs text-institutional-yellow">{String(index + 1).padStart(2, "0")}</span>{feature}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3">
            <Link
              to="/tecnologia"
              onClick={() => trackInstitutionalEvent("ViewContent", "Conhecer Mercury Nexus")}
              className="institutional-button bg-institutional-yellow text-institutional-black hover:bg-institutional-yellow/85"
            >
              Conheça a Mercury Nexus® <ArrowRight size={17} />
            </Link>
            <a
              href={NEXUS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackInstitutionalEvent("ViewContent", "Acessar plataforma Mercury Nexus")}
              className="institutional-button border-institutional-white/25 text-institutional-white hover:border-institutional-white/60"
            >
              Acessar plataforma <ArrowUpRight size={17} />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default HomeNexus;
