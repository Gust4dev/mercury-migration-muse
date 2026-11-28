import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import InstitutionalLayout from "@/components/institutional/InstitutionalLayout";
import PageHero from "@/components/institutional/PageHero";
import InstitutionalCta from "@/components/institutional/InstitutionalCta";
import Reveal from "@/components/institutional/Reveal";
import { segmentDetails } from "@/components/institutional/data";
import { trackInstitutionalEvent } from "@/components/institutional/config";

const SegmentsPage = () => (
  <>
    <SEO
      title="Segmentos de Atuação | Mercury Gestora"
      description="Soluções especializadas da Mercury para revendas de gás, farmácias, drogarias e negócios do setor automotivo."
      canonical="/segmentos"
      keywords="Mercury GLP, Mercury Farma, Mercury Auto, marketing para revenda de gás, marketing para farmácias, marketing automotivo"
    />
    <InstitutionalLayout>
      <PageHero
        eyebrow="ESPECIALIZAÇÃO DE MERCADO"
        title="Cada mercado tem seus desafios. Nós entendemos os seus."
        description="Desenvolvemos estratégias e soluções considerando a realidade de cada segmento, seus consumidores, suas operações e suas oportunidades de crescimento."
      />
      <section className="bg-institutional-light py-16 sm:py-24">
        <div className="institutional-container">
          {segmentDetails.map((segment, index) => (
            <Reveal key={segment.slug}>
              <article className="grid items-center gap-8 border-t border-institutional-line py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
                <figure className={index % 2 ? "lg:order-2" : ""}>
                  <div className="aspect-[16/10] overflow-hidden rounded-sm">
                    <img src={segment.image} alt={segment.imageAlt} loading="lazy" className="institutional-photo h-full w-full object-cover" />
                  </div>
                  <figcaption className="mt-2 text-xs text-institutional-muted">Fotografia ilustrativa do segmento.</figcaption>
                </figure>
                <div className={index % 2 ? "lg:order-1" : ""}>
                  <p className="institutional-eyebrow text-institutional-muted">VERTICAL DE ATUAÇÃO</p>
                  <h2 className="institutional-title mt-4 text-4xl sm:text-5xl">{segment.name}</h2>
                  <p className="mt-5 text-lg leading-8 text-institutional-muted">{segment.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-institutional-black/70">
                    {segment.audiences.map((audience) => <li key={audience}>— {audience}</li>)}
                  </ul>
                  <Link to={`/segmentos/${segment.slug}`} onClick={() => trackInstitutionalEvent("ViewContent", `Página de segmentos: ${segment.name}`)} className="institutional-button mt-7 bg-institutional-black text-institutional-white">
                    Conheça a {segment.name} <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <InstitutionalCta title="Sua empresa atua em outro segmento?" description="Converse com nossa equipe. Vamos entender seu mercado, sua operação e as oportunidades que fazem sentido para o seu negócio." />
    </InstitutionalLayout>
  </>
);

export default SegmentsPage;
