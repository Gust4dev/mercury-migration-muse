import boticario from "@/assets/logos/boticario.png";
import jaguar from "@/assets/logos/jaguar.png";
import mouragas from "@/assets/logos/mouragas.png";
import diskPopular from "@/assets/logos/disk-popular.png";
import drogariaMg from "@/assets/logos/drogaria-mg.png";
import hapvida from "@/assets/logos/hapvida.png";
import conectapro from "@/assets/logos/conectapro.png";
import multclean from "@/assets/logos/multclean.png";
import farmacias from "@/assets/logos/farmacias-associadas.png";
import fernandesGas from "@/assets/logos/fernandes-gas.jpg";
import grupoAtiva from "@/assets/logos/grupo-ativa.jpg";
import consigaz from "@/assets/logos/consigaz.png";
import artsuprema from "@/assets/logos/artsuprema.png";

const clients = [
  { name: "O Boticário", logo: boticario },
  { name: "Jaguar Auto Peças", logo: jaguar },
  { name: "Mouragas", logo: mouragas },
  { name: "Disk Gás Popular", logo: diskPopular },
  { name: "Drogaria Mato Grosso", logo: drogariaMg },
  { name: "Hapvida", logo: hapvida },
  { name: "Fernandes Gás", logo: fernandesGas },
  { name: "Grupo Ativa", logo: grupoAtiva },
  { name: "Consigaz", logo: consigaz },
  { name: "ArtSuprema", logo: artsuprema },
  { name: "ConectaPro", logo: conectapro },
  { name: "MultClean", logo: multclean },
  { name: "Farmácias Associadas", logo: farmacias },
];

const LogoRow = ({ hidden = false }: { hidden?: boolean }) => (
  <div className="flex items-center" aria-hidden={hidden || undefined}>
    {clients.map((client) => (
      <div key={`${client.name}-${hidden}`} className="flex h-20 w-36 shrink-0 items-center justify-center px-4 sm:h-24 sm:w-44">
        <img
          src={client.logo}
          alt={hidden ? "" : client.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
        />
      </div>
    ))}
  </div>
);

const HomeLogos = () => (
  <section className="overflow-hidden border-b border-institutional-line/70 bg-institutional-light py-10 sm:py-14" aria-label="Empresas e marcas">
    <div className="institutional-container mb-8">
      <h2 className="max-w-xl text-2xl leading-tight text-institutional-black sm:text-3xl">
        Empresas e marcas que fazem parte da nossa trajetória.
      </h2>
    </div>
    <div className="institutional-marquee flex">
      <LogoRow />
      <LogoRow hidden />
    </div>
  </section>
);

export default HomeLogos;
