import boticario from "@/assets/logos/boticario.png";
import jaguar from "@/assets/logos/jaguar.png";
import drogariaMg from "@/assets/logos/drogaria-mg.png";
import autoclean from "@/assets/logos/autoclean.png";
import oliver from "@/assets/logos/oliver.png";
import diskPopular from "@/assets/logos/disk-popular.png";
import mouragas from "@/assets/logos/mouragas.png";
import farmacias from "@/assets/logos/farmacias-associadas.png";

const clients = [
  { name: "O Boticário", logo: boticario },
  { name: "Jaguar", logo: jaguar },
  { name: "Drogaria Mato Grosso", logo: drogariaMg },
  { name: "AutoClean", logo: autoclean },
  { name: "Oliver Imóveis", logo: oliver },
  { name: "Disk das Popular", logo: diskPopular },
  { name: "Mouragas", logo: mouragas },
  { name: "Farmácias Associadas", logo: farmacias },
];

const ClientLogos = () => {
  return (
    <section className="bg-mercury-light py-16 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-heading text-center text-sm md:text-base font-bold uppercase tracking-[0.15em] text-mercury-dark/70 mb-12">
          Tecnologia e gestão validada por gigantes do mercado
        </h2>
      </div>

      {/* Infinite scroll marquee */}
      <div className="relative">
        <div className="flex animate-marquee gap-8">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 w-40 h-20 bg-white rounded-lg border border-mercury-dark/10 flex items-center justify-center p-4 hover:shadow-md transition-shadow"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
