import { verifiedCases } from "./authority";
import SectionHeading from "./SectionHeading";

const RealCases = ({ segment }: { segment?: string }) => {
  const cases = verifiedCases.filter((item) => item.approved && (!segment || item.segment === segment));
  if (!cases.length) return null;
  return <section className="bg-institutional-light py-16 sm:py-20"><div className="institutional-container">
    <SectionHeading eyebrow="CASES E RESULTADOS" title="Trabalho real. Resultados documentados." />
    <div className="mt-10 space-y-12">{cases.map((item) => <article key={`${item.company}-${item.period}`}>
      <h3 className="text-3xl">{item.company}</h3><p className="mt-2 text-sm text-institutional-muted">{item.segment} · {item.period}</p>
      <div className="mt-6 grid gap-8 md:grid-cols-3">{[["Desafio", item.challenge], ["Estratégia", item.strategy], ["Resultados", item.results]].map(([label, text]) => <div key={label}><h4 className="text-xl">{label}</h4><p className="mt-3 leading-7 text-institutional-muted">{text}</p></div>)}</div>
      <dl className="mt-8 flex flex-wrap gap-8">{item.metrics.map((metric) => <div key={metric.label}><dd className="text-3xl">{metric.value}</dd><dt className="mt-2 text-institutional-muted">{metric.label}</dt></div>)}</dl>
      <div className="mt-8 grid gap-5 md:grid-cols-2">{item.photos.map((photo) => <img key={photo.image} src={photo.image} alt={photo.alt} className="aspect-[4/3] w-full rounded-2xl object-cover" loading="lazy" />)}</div>
      {item.authorizedTestimonial && <blockquote className="mt-8 max-w-3xl text-xl leading-8">“{item.authorizedTestimonial}”</blockquote>}
    </article>)}</div>
  </div></section>;
};

export default RealCases;