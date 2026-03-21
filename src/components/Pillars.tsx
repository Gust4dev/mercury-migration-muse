import { Target, Filter, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: Target,
    title: "Atração Cirúrgica",
    erros: [
      "Impulsionar posts sem estratégia",
      "Atrair curiosos em vez de compradores",
      "Gastar verba sem segmentação real",
    ],
    jeito: [
      "Campanhas baseadas em dados de comportamento",
      "Segmentação que atrai quem realmente compra",
      "Investimento otimizado com ROI mensurável",
    ],
  },
  {
    icon: Filter,
    title: "O Filtro",
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

const AnimatedCard = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Pillars = () => {
  return (
    <section className="bg-mercury-light py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-mercury-dark mb-4">
          Os 3 pilares do <span className="text-primary">Vendi.Mais®</span>
        </h2>
        <p className="text-center text-mercury-dark/60 mb-16 max-w-2xl mx-auto">
          A diferença entre o que o mercado faz e o que realmente funciona.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <AnimatedCard key={pillar.title} delay={idx * 150}>
              <div className="bg-white rounded-xl border border-mercury-dark/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-mercury-dark p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <pillar.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {pillar.title}
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-destructive mb-3">
                      ✕ Erro do Mercado
                    </p>
                    <ul className="space-y-2">
                      {pillar.erros.map((e) => (
                        <li key={e} className="text-sm text-mercury-dark/60 flex items-start gap-2">
                          <span className="text-destructive mt-0.5">•</span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                      ✓ Jeito Mercury
                    </p>
                    <ul className="space-y-2">
                      {pillar.jeito.map((j) => (
                        <li key={j} className="text-sm text-mercury-dark/80 flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {j}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
