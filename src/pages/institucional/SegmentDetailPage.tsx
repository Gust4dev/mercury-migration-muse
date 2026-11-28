import { ArrowUpRight } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import InstitutionalLayout from "@/components/institutional/InstitutionalLayout";
import PageHero from "@/components/institutional/PageHero";
import InstitutionalCta from "@/components/institutional/InstitutionalCta";
import HomeCommunity from "@/components/institutional/HomeCommunity";
import ClientGallery from "@/components/institutional/ClientGallery";
import RealCases from "@/components/institutional/RealCases";
import Reveal from "@/components/institutional/Reveal";
import { getSegment } from "@/components/institutional/data";
import { trackInstitutionalEvent, WHATSAPP_URL } from "@/components/institutional/config";

const SegmentDetailPage = () => {
  const { slug } = useParams();
  const segment = getSegment(slug);
  if (!segment) return <Navigate to="/segmentos" replace />;
  return <>
    <SEO title={`${segment.name} | Soluções para ${segment.shortName === "GLP" ? "Revendas de Gás" : segment.shortName === "Farma" ? "Farmácias" : "Setor Automotivo"}`} description={segment.description} canonical={`/segmentos/${segment.slug}`} keywords={`${segment.name}, ${segment.audiences.join(", ")}, marketing, tecnologia, inteligência comercial`} />
    <InstitutionalLayout>
      <PageHero eyebrow={`SEGMENTOS / ${segment.name.toUpperCase()}`} title={segment.title} description={segment.description} logo={segment.logo} image={segment.image} imageAlt={segment.imageAlt} squareImage imageCaption={segment.imageIsIllustrative ? "Fotografia ilustrativa do segmento; não representa cliente ou operação da Mercury." : undefined}>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("Contact", `Interesse em ${segment.name}`)} className="institutional-button bg-institutional-yellow text-institutional-black">Converse com nossa equipe <ArrowUpRight size={17} /></a>
      </PageHero>
      <section className="bg-institutional-white py-16 sm:py-20"><div className="institutional-container grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal><div><p className="institutional-eyebrow text-institutional-muted">CONHECIMENTO DO SEU MERCADO</p><h2 className="institutional-title mt-5 text-3xl sm:text-4xl">{segment.slug === "glp" ? "Da busca por gás à próxima entrega." : segment.slug === "farma" ? "Proximidade, conveniência e confiança." : "Da pesquisa de uma peça ao retorno do cliente."}</h2><p className="mt-5 text-lg leading-8 text-institutional-muted">{segment.introduction}</p></div></Reveal>
        <Reveal delay={100}><div><h3 className="text-2xl">Para quem trabalhamos</h3><ul className="mt-5 space-y-4 text-lg leading-8 text-institutional-muted">{segment.audiences.map((audience) => <li key={audience} className="flex items-start gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-institutional-yellow" />{audience}</li>)}</ul></div></Reveal>
      </div></section>
      <section className="bg-institutional-light py-16 sm:py-20"><div className="institutional-container">
        <p className="institutional-eyebrow text-institutional-muted">ESTRATÉGIA APLICADA À SUA OPERAÇÃO</p>
        <h2 className="institutional-title mt-5 max-w-4xl text-4xl sm:text-5xl">{segment.slug === "glp" ? "Sua revenda presente em cada etapa do pedido." : segment.slug === "farma" ? "Uma farmácia mais próxima de quem vive ao redor." : "Orçamentos bem atendidos. Relacionamentos que continuam."}</h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">{segment.approach.map((item, index) => <Reveal key={item.title}><article><p className="text-lg text-institutional-muted">0{index + 1}</p><h3 className="mt-4 text-3xl leading-tight">{item.title}</h3><p className="mt-5 text-lg leading-8 text-institutional-muted">{item.text}</p><ul className="mt-5 space-y-3 text-base text-institutional-black">{item.services.map((service) => <li key={service} className="flex items-start gap-3"><span className="mt-2.5 h-1 w-4 shrink-0 bg-institutional-yellow" />{service}</li>)}</ul></article></Reveal>)}</div>
        {segment.slug === "farma" && <p className="mt-10 max-w-4xl text-base leading-7 text-institutional-muted">A comunicação e as campanhas são planejadas respeitando as restrições legais e regulatórias aplicáveis à publicidade farmacêutica, incluindo as normas da Anvisa e as políticas dos canais utilizados. Não estimulamos a automedicação nem prometemos resultados terapêuticos.</p>}
      </div></section>
      <ClientGallery segment={segment.slug} />
      <RealCases segment={segment.slug} />
      {segment.slug === "glp" && <HomeCommunity />}
      <InstitutionalCta title={`Qual é o próximo passo da sua ${segment.shortName === "GLP" ? "revenda" : segment.shortName === "Farma" ? "farmácia" : "empresa"}?`} description={segment.description} />
    </InstitutionalLayout>
  </>;
};
export default SegmentDetailPage;
