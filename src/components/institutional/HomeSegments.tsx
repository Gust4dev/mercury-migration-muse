import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { segmentDetails } from "./data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { trackInstitutionalEvent, WHATSAPP_URL } from "./config";

const HomeSegments = () => <section id="segmentos" className="bg-institutional-light py-16 sm:py-20"><div className="institutional-container">
  <Reveal><SectionHeading eyebrow="ESPECIALIZAÇÃO DE MERCADO" title="Cada mercado tem seus desafios. Nós entendemos os seus." description="Conhecimento da sua realidade para conectar estratégias, consumidores e oportunidades de crescimento." /></Reveal>
  <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6 xl:gap-8">{segmentDetails.map((segment) => <Reveal key={segment.slug}><article className="flex h-full flex-col">
    <Link to={`/segmentos/${segment.slug}`} aria-label={`Conheça a ${segment.name}`} className="block aspect-square overflow-hidden rounded-2xl"><img src={segment.image} alt={segment.imageAlt} loading="lazy" className="h-full w-full object-cover" /></Link>
    {segment.imageIsIllustrative && <p className="mt-2 text-sm text-institutional-muted">Fotografia ilustrativa do segmento.</p>}
    <div className="mt-6 flex min-h-16 items-center gap-4">{segment.logo && <img src={segment.logo} alt={`Logotipo oficial ${segment.name}`} loading="lazy" className="h-16 w-16 shrink-0 rounded-2xl object-cover" />}<h3 className="institutional-title text-3xl text-institutional-black">{segment.name}</h3></div>
    <p className="mt-4 flex-1 text-lg leading-8 text-institutional-muted">{segment.summary}</p>
    <Link to={`/segmentos/${segment.slug}`} onClick={() => trackInstitutionalEvent("ViewContent", `Interesse em ${segment.name}`)} className="institutional-button mt-6 self-start border-institutional-black/25 text-institutional-black hover:bg-institutional-black hover:text-institutional-white">Conheça o segmento <ArrowRight size={17} /></Link>
  </article></Reveal>)}</div>
  <p className="mt-10 text-base text-institutional-muted">Sua empresa atua em outro segmento? <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("Contact", "Outro segmento")} className="inline-flex items-center gap-1 text-institutional-black underline decoration-institutional-yellow decoration-2 underline-offset-4">Converse com nossa equipe <ArrowUpRight size={15} /></a></p>
</div></section>;
export default HomeSegments;
