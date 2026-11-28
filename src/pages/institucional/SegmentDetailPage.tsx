import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import InstitutionalLayout from "@/components/institutional/InstitutionalLayout";
import PageHero from "@/components/institutional/PageHero";
import InstitutionalCta from "@/components/institutional/InstitutionalCta";
import Reveal from "@/components/institutional/Reveal";
import { getSegment } from "@/components/institutional/data";
import { trackInstitutionalEvent, WHATSAPP_URL } from "@/components/institutional/config";

const SegmentDetailPage = () => {
  const { slug } = useParams();
  const segment = getSegment(slug);
  if (!segment) return <Navigate to="/segmentos" replace />;

  return (
    <>
      <SEO
        title={`${segment.name} | Soluções para ${segment.shortName === "GLP" ? "Revendas de Gás" : segment.shortName === "Farma" ? "Farmácias" : "Setor Automotivo"}`}
        description={segment.description}
        canonical={`/segmentos/${segment.slug}`}
        keywords={`${segment.name}, ${segment.audiences.join(", ")}, marketing, tecnologia, inteligência comercial`}
      />
      <InstitutionalLayout>
        <PageHero
          eyebrow={`SEGMENTOS / ${segment.shortName.toUpperCase()}`}
          title={segment.title}
          description={segment.description}
          image={segment.image}
          imageAlt={segment.imageAlt}
          imageCaption="Fotografia ilustrativa do segmento; não representa cliente ou operação da Mercury."
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("Contact", `Interesse em ${segment.name}`)} className="institutional-button bg-institutional-yellow text-institutional-black">
            Converse com nossa equipe <ArrowUpRight size={17} />
          </a>
        </PageHero>

        <section className="bg-institutional-white py-16 sm:py-24">
          <div className="institutional-container grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <p className="institutional-eyebrow text-institutional-muted">NOSSA ATUAÇÃO</p>
                <h2 className="institutional-title mt-4 text-3xl sm:text-4xl">Soluções pensadas para a rotina do seu mercado.</h2>
                <p className="mt-5 text-lg leading-8 text-institutional-muted">{segment.introduction}</p>
                <div className="mt-7 border-t border-institutional-line pt-5">
                  <h3 className="text-xl text-institutional-black">Para quem trabalhamos</h3>
                  <ul className="mt-4 space-y-2 text-institutional-muted">{segment.audiences.map((item) => <li key={item}>— {item}</li>)}</ul>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <h2 className="text-2xl text-institutional-black">Desafios que ajudamos a enfrentar</h2>
                <ul className="mt-5 border-t border-institutional-line">
                  {segment.challenges.map((challenge, index) => (
                    <li key={challenge} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-institutional-line py-5 text-lg text-institutional-black/75">
                      <span className="text-xs text-institutional-muted">0{index + 1}</span>{challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-institutional-light py-16 sm:py-20">
          <div className="institutional-container grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
            <h2 className="institutional-title text-3xl sm:text-4xl">Marketing, tecnologia e relacionamento no mesmo plano.</h2>
            <ul className="border-t border-institutional-line">
              {segment.solutions.map((solution) => <li key={solution} className="border-b border-institutional-line py-4 text-lg text-institutional-black/75">{solution}</li>)}
            </ul>
          </div>
          {segment.slug === "glp" && (
            <div className="institutional-container mt-10 border-t border-institutional-line pt-8">
              <p className="max-w-2xl text-institutional-muted">Conheça também a Comunidade GLP Brasil, nossa iniciativa de conexão e compartilhamento de conhecimento entre profissionais do setor.</p>
              <Link to="/comunidade" className="mt-5 inline-flex items-center gap-2 text-institutional-black underline decoration-institutional-yellow decoration-2 underline-offset-8">Conhecer a comunidade <ArrowRight size={16} /></Link>
            </div>
          )}
        </section>
        <InstitutionalCta title={`Qual é o próximo passo da sua ${segment.shortName === "GLP" ? "revenda" : segment.shortName === "Farma" ? "farmácia" : "empresa"}?`} description={segment.description} />
      </InstitutionalLayout>
    </>
  );
};

export default SegmentDetailPage;
