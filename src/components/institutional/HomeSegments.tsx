import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { segmentDetails } from "./data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { trackInstitutionalEvent, WHATSAPP_URL } from "./config";

const HomeSegments = () => (
  <section id="segmentos" className="bg-institutional-light py-16 sm:py-24">
    <div className="institutional-container">
      <Reveal>
        <SectionHeading
          eyebrow="ESPECIALIZAÇÃO DE MERCADO"
          title="Cada mercado tem seus desafios. Nós entendemos os seus."
          description="Desenvolvemos estratégias e soluções considerando a realidade de cada segmento, seus consumidores, suas operações e suas oportunidades de crescimento."
        />
      </Reveal>
      <div className="mt-12">
        {segmentDetails.map((segment, index) => (
          <Reveal key={segment.slug}>
            <article className="grid items-center gap-7 border-t border-institutional-line py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
              <figure className={index % 2 ? "lg:order-2" : ""}>
                <div className={`${segment.slug === "glp" ? "aspect-square" : "aspect-[16/10]"} overflow-hidden rounded-sm bg-institutional-graphite`}>
                  <img src={segment.image} alt={segment.imageAlt} loading="lazy" className="institutional-photo h-full w-full object-cover" />
                </div>
                {segment.imageIsIllustrative && <figcaption className="mt-2 text-xs text-institutional-muted">Fotografia ilustrativa do segmento.</figcaption>}
              </figure>
              <div className={index % 2 ? "lg:order-1" : ""}>
                <p className="institutional-eyebrow text-institutional-muted">MERCURY / {segment.shortName.toUpperCase()}</p>
                <h3 className="institutional-title mt-4 text-4xl text-institutional-black sm:text-5xl">{segment.name}</h3>
                <p className="mt-5 max-w-lg text-lg leading-8 text-institutional-muted">{segment.description}</p>
                <Link
                  to={`/segmentos/${segment.slug}`}
                  onClick={() => trackInstitutionalEvent("ViewContent", `Interesse em ${segment.name}`)}
                  className="institutional-button mt-7 border-institutional-black/25 text-institutional-black hover:bg-institutional-black hover:text-institutional-white"
                >
                  Conheça a {segment.name} <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="border-t border-institutional-line pt-7 text-sm text-institutional-muted">
        Sua empresa atua em outro segmento?{" "}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackInstitutionalEvent("Contact", "Outro segmento")}
          className="inline-flex items-center gap-1 text-institutional-black underline decoration-institutional-yellow decoration-2 underline-offset-4"
        >
          Converse com nossa equipe <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  </section>
);

export default HomeSegments;
