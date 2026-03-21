const metrics = [
  { value: "+57%", label: "aumento em vendas em 60 dias" },
  { value: "+650", label: "leads qualificados por mês" },
  { value: "-86%", label: "redução no tempo de resposta" },
];

const MetricsBanner = () => {
  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {metrics.map((m) => (
            <div key={m.value} className="text-center">
              <p className="font-heading text-4xl md:text-5xl font-black text-primary-foreground">
                {m.value}
              </p>
              <p className="text-primary-foreground/80 font-medium mt-2 text-sm uppercase tracking-wide">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBanner;
