import { useEffect, useRef, useState } from "react";
import { Target, Cpu, BarChart3, Workflow, Brain, Rocket } from "lucide-react";

const items = [
  { icon: Target, title: "Estratégia" },
  { icon: Cpu, title: "Tecnologia" },
  { icon: BarChart3, title: "Dados" },
  { icon: Workflow, title: "Automação" },
  { icon: Brain, title: "Inteligência Artificial" },
  { icon: Rocket, title: "Execução" },
];

const MercuryDifferentials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background py-14 sm:py-20" ref={ref}>
      <div className="container mx-auto px-5 sm:px-4 lg:px-8">
        <div className={`text-center mb-10 sm:mb-14 max-w-3xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-heading font-semibold text-[11px] sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
            Diferenciais Mercury
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Por que a <span className="text-primary">Mercury é diferente?</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Enquanto muitas empresas vendem apenas tráfego, apenas CRM ou apenas chatbot,
            a Mercury entrega uma operação comercial completa.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className={`bg-card rounded-xl border border-border p-4 sm:p-5 text-center hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${200 + idx * 80}ms` }}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2.5">
                <item.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-heading font-bold text-foreground text-xs sm:text-sm">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MercuryDifferentials;
