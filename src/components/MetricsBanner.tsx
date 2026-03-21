const metrics = [
  { value: "+57%", label: "aumento de vendas digitais em 60 dias" },
  { value: "-86%", label: "redução no tempo de resposta" },
  { value: "+27%", label: "de recorrência" },
  { value: "0", label: "perca de Leads na estrutura" },
  { value: "+59%", label: "de eficiência em análise de dados" },
];

const MetricsBanner = () => {
  const doubled = [...metrics, ...metrics];

  return (
    <section className="bg-primary py-5 overflow-hidden">
      <div className="flex w-max animate-marquee-metrics">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-12 pr-12 whitespace-nowrap">
            {metrics.map((m) => (
              <div key={`${m.value}-${copy}`} className="flex items-center gap-3 flex-shrink-0">
                <span className="font-heading text-3xl md:text-4xl font-black text-primary-foreground">
                  {m.value}
                </span>
                <span className="text-primary-foreground/80 font-medium text-sm uppercase tracking-wide">
                  {m.label}
                </span>
                <span className="text-primary-foreground/30 mx-4">●</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MetricsBanner;
