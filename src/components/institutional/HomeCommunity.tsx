import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { trackInstitutionalEvent } from "./config";

const topics = ["Troca de experiências entre revendedores", "Informações sobre o mercado", "Estratégias comerciais", "Conteúdos especializados", "Workshops e aprendizado", "Conexões entre empresários de diferentes regiões"];

const HomeCommunity = () => (
  <section className="bg-institutional-light py-16 sm:py-24">
    <div className="institutional-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <Reveal>
        <div>
          <img src="/comunidade/comunidade-glp.png" alt="Comunidade GLP Brasil" loading="lazy" className="h-20 w-20 rounded-full object-cover" />
          <SectionHeading
            className="mt-6"
            eyebrow="CONEXÕES E CONHECIMENTO"
            title="Conectamos empresas, conhecimento e oportunidades."
            description="Além de desenvolver soluções de marketing e tecnologia, a Mercury promove conexões entre empresários, compartilhamento de experiências e acesso a informações relevantes para o desenvolvimento de diferentes mercados."
          />
          <p className="mt-5 max-w-xl text-base leading-7 text-institutional-black/75">
            A Comunidade GLP Brasil é uma iniciativa voltada exclusivamente para revendedores e profissionais do setor de GLP.
          </p>
          <Link
            to="/comunidade"
            onClick={() => trackInstitutionalEvent("ViewContent", "Conhecer Comunidade GLP Brasil")}
            className="institutional-button mt-7 bg-institutional-black text-institutional-white hover:bg-institutional-graphite"
          >
            Conheça nossa comunidade <ArrowRight size={17} />
          </Link>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <ul className="border-t border-institutional-line">
          {topics.map((topic, index) => (
            <li key={topic} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-institutional-line py-5 text-base text-institutional-black/75 sm:text-lg">
              <span className="text-xs text-institutional-muted">{String(index + 1).padStart(2, "0")}</span>{topic}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default HomeCommunity;
