const clients = [
  "O Boticário",
  "Jaguar",
  "Drogaria Mato Grosso",
  "AutoClean",
  "Oliver Imóveis",
  "Disk das Popular",
  "Mouragas",
  "Farmácias Associadas",
];

const ClientLogos = () => {
  return (
    <section className="bg-mercury-light py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-heading text-center text-sm md:text-base font-bold uppercase tracking-[0.15em] text-mercury-dark/70 mb-12">
          Tecnologia e gestão validada por gigantes do mercado
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {clients.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center bg-white rounded-lg border border-mercury-dark/10 p-6 h-24 hover:shadow-md transition-shadow"
            >
              <span className="font-heading font-bold text-sm text-mercury-dark/60 text-center">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
