import mercuryLogo from "@/assets/mercury-logo.png";
import { mercuryPhotos } from "./authority";

const MercuryIdentity = () => {
  const photo = mercuryPhotos[0];
  if (photo) return <figure><img src={photo.image} alt={photo.alt} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />{photo.caption && <figcaption className="mt-3 text-sm text-institutional-white/75">{photo.caption}</figcaption>}</figure>;
  return <div className="mercury-identity">
    <img src={mercuryLogo} alt="Símbolo institucional Mercury" className="h-24 w-auto sm:h-32" loading="lazy" />
    <p className="mt-7 text-3xl text-institutional-white sm:text-4xl">Mercury Gestora</p>
    <p className="mt-4 max-w-sm text-lg leading-8 text-institutional-white/80">Conhecimento de mercado.<br />Tecnologia própria.<br />Trabalho próximo da sua empresa.</p>
    <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-institutional-yellow"><span>Marketing</span><span>Tecnologia</span><span>Inteligência comercial</span></div>
  </div>;
};

export default MercuryIdentity;