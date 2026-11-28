import { Link } from "react-router-dom";
import { clientRecords } from "./authority";
import SectionHeading from "./SectionHeading";

const ClientGallery = ({ segment }: { segment: string }) => {
  const clients = clientRecords.filter((client) => client.segment === segment && client.photos.length > 0);
  if (!clients.length) return null;
  return <section className="bg-institutional-white py-16 sm:py-20"><div className="institutional-container">
    <SectionHeading eyebrow="NOSSA EXPERIÊNCIA NO MERCADO" title="Empresas que confiam no nosso trabalho." description="Conheça algumas das empresas que fazem parte da nossa trajetória e utilizam nossas soluções de marketing, tecnologia e inteligência comercial." />
    <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => <article key={`${client.segment}-${client.operation}`} className={clients.length === 1 ? "md:col-span-2" : ""}>
        <div className="grid gap-3">{client.photos.map((photo) => <figure key={photo.image}><img src={photo.image} alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />{photo.caption && <figcaption className="mt-2 text-sm text-institutional-muted">{photo.caption}</figcaption>}</figure>)}</div>
        <div className="mt-5 flex items-center gap-4">{client.logo && <img src={client.logo} alt="" className="h-14 w-14 rounded-lg object-contain" />}<div>{client.name && <h3 className="text-xl">{client.name}</h3>}<p className="text-base text-institutional-muted">{client.operation}{client.location && ` · ${client.location}`}</p></div></div>
        {client.authorizedServices?.length ? <p className="mt-3 text-sm text-institutional-muted">{client.authorizedServices.join(" · ")}</p> : null}
        {client.caseUrl && <Link to={client.caseUrl} className="institutional-button mt-4 border-institutional-black/25">Conhecer o case</Link>}
      </article>)}
    </div>
  </div></section>;
};

export default ClientGallery;