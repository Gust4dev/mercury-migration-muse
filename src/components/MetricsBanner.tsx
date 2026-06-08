const metrics = [
  { value: "+57%", label: "aumento médio de vendas digitais" },
  { value: "-86%", label: "redução no tempo de resposta" },
  { value: "+27%", label: "aumento de recorrência" },
  { value: "+59%", label: "mais oportunidades aproveitadas" },
];

const MetricsBanner = () => {
  return (
    <section className="bg-primary py-4 sm:py-5 overflow-hidden">
      <div className="flex w-max animate-marquee-metrics">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-6 sm:gap-12 pr-6 sm:pr-12 whitespace-nowrap">
            {metrics.map((m) => (
              <div key={`${m.value}-${copy}`} className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-primary-foreground">
                  {m.value}
                </span>
                <span className="text-primary-foreground/80 font-medium text-xs sm:text-sm uppercase tracking-wide">
                  {m.label}
                </span>
                <span className="text-primary-foreground/30 mx-2 sm:mx-4">●</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MetricsBanner;
