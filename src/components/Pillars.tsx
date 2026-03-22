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
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const pillar = pillars[active];

  return (
    <section className="bg-secondary py-12 sm:py-24 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-5 sm:px-4 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-heading font-semibold text-[11px] sm:text-sm uppercase tracking-[0.2em] mb-2 sm:mb-3">
            Metodologia exclusiva
          </p>
          <h2 className="font-heading text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3">
            Os 3 pilares do <span className="text-primary">Vendi.Mais®</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-xs sm:text-base">
            A diferença entre o que o mercado faz e o que realmente funciona.
          </p>
        </div>

        {/* Pillar Tabs */}
        <div
          className={`flex flex-row justify-center gap-2 sm:gap-3 mb-6 sm:mb-12 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {pillars.map((p, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={p.title}
                onClick={() => setActive(idx)}
                className={`group flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 rounded-xl px-3 sm:px-5 py-2.5 sm:py-4 transition-all duration-300 border text-center sm:text-left flex-1 active:scale-95 ${
                  isActive
                    ? "bg-primary/10 border-primary/40 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)]"
                    : "bg-card/50 border-border/40"
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p.icon size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span
                    className={`font-heading font-bold text-xs sm:text-sm block transition-colors ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground hidden sm:block">
                    {p.subtitle}
                  </span>
                </div>
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
          <div className="rounded-xl sm:rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden">
            {/* Top bar */}
            <div className="bg-background/60 border-b border-border/40 p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <pillar.icon className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base sm:text-xl text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-[11px] sm:text-sm">
                  {pillar.subtitle}
                </p>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
              {/* Erro */}
              <div className="p-4 sm:p-7">
                <div className="flex items-center gap-2 mb-4 sm:mb-5">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="text-destructive" size={11} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider text-destructive">
                    Erro do Mercado
                  </span>
                </div>
                <ul className="space-y-2.5 sm:space-y-3">
                  {pillar.erros.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 sm:gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive/40 mt-1.5 sm:mt-2 shrink-0" />
                      <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Jeito Mercury */}
              <div className="p-4 sm:p-7 bg-primary/[0.02]">
                <div className="flex items-center gap-2 mb-4 sm:mb-5">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="text-primary" size={11} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider text-primary">
                    Jeito Mercury
                  </span>
                </div>
                <ul className="space-y-2.5 sm:space-y-3">
                  {pillar.jeito.map((j) => (
                    <li key={j} className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="text-primary" size={9} />
                      </div>
                      <span className="text-xs sm:text-sm text-foreground leading-relaxed font-medium">{j}</span>
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
