import boticario from "@/assets/logos/boticario.png";
import mouragas from "@/assets/logos/mouragas.png";
import diskPopular from "@/assets/logos/disk-popular.png";
import drogariaMg from "@/assets/logos/drogaria-mg.png";
import oliver from "@/assets/logos/oliver.png";
import lustShop from "@/assets/logos/lust-shop.png";
import hapvida from "@/assets/logos/hapvida.png";
import tudoplay from "@/assets/logos/tudoplay.png";
import conectapro from "@/assets/logos/conectapro.png";

const clients = [
  { name: "O Boticário", logo: boticario },
  { name: "Mouragas", logo: mouragas },
  { name: "Disk Gás Popular", logo: diskPopular },
  { name: "Drogaria Mato Grosso", logo: drogariaMg },
  { name: "Oliver Imóveis", logo: oliver },
  { name: "Lust Shop", logo: lustShop },
  { name: "Hapvida", logo: hapvida },
  { name: "TudoPlay", logo: tudoplay },
  { name: "ConectaPro", logo: conectapro },
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
              className="flex-shrink-0 w-44 h-24 bg-white rounded-lg border border-mercury-dark/10 flex items-center justify-center p-4 hover:shadow-md transition-shadow"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
