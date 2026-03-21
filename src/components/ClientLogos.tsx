import boticario from "@/assets/logos/boticario.png";
import jaguar from "@/assets/logos/jaguar.png";
import mouragas from "@/assets/logos/mouragas.png";
import diskPopular from "@/assets/logos/disk-popular.png";
import drogariaMg from "@/assets/logos/drogaria-mg.png";
import oliver from "@/assets/logos/oliver.png";
import lustShop from "@/assets/logos/lust-shop.png";
import hapvida from "@/assets/logos/hapvida.png";
import tudoplay from "@/assets/logos/tudoplay.png";
import conectapro from "@/assets/logos/conectapro.png";
import multclean from "@/assets/logos/multclean.png";
import farmacias from "@/assets/logos/farmacias-associadas.png";
import autoclean from "@/assets/logos/autoclean.png";

const clients = [
  { name: "O Boticário", logo: boticario },
  { name: "Jaguar Auto Peças", logo: jaguar },
  { name: "Mouragas", logo: mouragas },
  { name: "Disk Gás Popular", logo: diskPopular },
  { name: "Drogaria Mato Grosso", logo: drogariaMg },
  { name: "Oliver Imóveis", logo: oliver },
  { name: "AutoClean", logo: autoclean },
  { name: "Lust Shop", logo: lustShop },
  { name: "Hapvida", logo: hapvida },
  { name: "TudoPlay", logo: tudoplay },
  { name: "ConectaPro", logo: conectapro },
  { name: "MultClean", logo: multclean },
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

      <div className="relative">
        <div className="flex animate-marquee gap-6">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
