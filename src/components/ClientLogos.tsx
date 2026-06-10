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

const ClientLogos = () => {
  return (
    <section className="bg-mercury-light py-10 sm:py-16 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-heading text-center text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.15em] text-mercury-dark/70 mb-8 sm:mb-12 px-2">
          Tecnologia e gestão validada por gigantes do mercado
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee-clients">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
              {clients.map((client) => (
                <div
                  key={`${client.name}-${copy}`}
                  className="flex-shrink-0 w-36 h-24 sm:w-48 sm:h-32 rounded-xl overflow-hidden bg-card shadow-md"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    className={`w-full h-full object-center ${client.name === "ArtSuprema" ? "object-contain p-2" : "object-cover"}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
