import { Target, Filter, BarChart3, X, Check, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Pillar = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  erros: string[];
  jeito: string[];
};

const pillars: Pillar[] = [
  {
    icon: Target,
    title: "Atração Cirúrgica",
    subtitle: "Atraia quem compra — não curiosos",
    erros: [
      "Impulsionar posts sem estratégia",
      "Atrair curiosos em vez de compradores",
      "Ignorar o Google Meu Negócio como fonte de leads",
    ],
    jeito: [
      "Campanhas pagas com segmentação por comportamento real",
      "Análise e otimização do Google Meu Negócio para captação orgânica",
      "Tráfego pago + orgânico juntos com ROI mensurável",
    ],
  },
  {
    icon: Filter,
    title: "O Filtro",
    subtitle: "Só lead pronto chega no vendedor",
    erros: [
      "Responder todo mundo igual",
      "Vendedor perdendo tempo com lead frio",
      "Sem qualificação antes do contato",
    ],
    jeito: [
      "Leads qualificados automaticamente por IA",
      "Priorização por intenção de compra",
      "Vendedor só recebe lead pronto",
    ],
  },
  {
    icon: BarChart3,
    title: "Os Dados",
    subtitle: "Decisões com base em dados reais",
    erros: [
      "Decisões baseadas em achismo",
      "Relatórios manuais e atrasados",
      "Sem visão real do funil",
    ],
    jeito: [
      "Dashboard em tempo real com métricas-chave",
      "Previsibilidade de receita por período",
      "Decisões rápidas baseadas em dados reais",
    ],
  },
];

const Pillars = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const pillar = pillars[active];

  return (
    <section className="bg-secondary py-16 md:py-24 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-10 md:mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-heading font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
            Metodologia exclusiva
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 px-2">
            Os 3 pilares do <span className="text-primary">Vendi.Mais®</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base px-4">
            A diferença entre o que o mercado faz e o que realmente funciona.
          </p>
        </div>

        {/* Pillar Tabs */}
        <div
          className={`flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-8 md:mb-12 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {pillars.map((p, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={p.title}
                onClick={() => setActive(idx)}
                className={`group flex items-center gap-3 rounded-xl px-5 py-3.5 sm:py-4 transition-all duration-300 border text-left sm:flex-1 ${
                  isActive
                    ? "bg-primary/10 border-primary/40 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)]"
                    : "bg-card/50 border-border/40 hover:border-primary/20 hover:bg-card/80"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-primary"
                  }`}
                >
                  <p.icon size={20} />
                </div>
                <div>
                  <span
                    className={`font-heading font-bold text-sm block transition-colors ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span className="text-[11px] text-muted-foreground hidden sm:block">
                    {p.subtitle}
                  </span>
                </div>
                {/* active indicator */}
                <div
                  className={`ml-auto w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
                    isActive ? "bg-primary scale-100" : "bg-transparent scale-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden">
            {/* Top bar with icon */}
            <div className="bg-background/60 border-b border-border/40 p-5 md:p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <pillar.icon className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  {pillar.subtitle}
                </p>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
              {/* Erro */}
              <div className="p-5 md:p-7">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="text-destructive" size={12} />
                  </div>
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-destructive">
                    Erro do Mercado
                  </span>
                </div>
                <ul className="space-y-3">
                  {pillar.erros.map((e, idx) => (
                    <li
                      key={e}
                      className="flex items-start gap-3 animate-fade-in"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive/40 mt-2 shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {e}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Jeito Mercury */}
              <div className="p-5 md:p-7 bg-primary/[0.02]">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="text-primary" size={12} />
                  </div>
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary">
                    Jeito Mercury
                  </span>
                </div>
                <ul className="space-y-3">
                  {pillar.jeito.map((j, idx) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 animate-fade-in"
                      style={{ animationDelay: `${150 + idx * 100}ms` }}
                    >
                      <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="text-primary" size={10} />
                      </div>
                      <span className="text-sm text-foreground leading-relaxed font-medium">
                        {j}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
