import { useEffect, useRef, useState } from "react";
import { Megaphone, Bot, Users, BarChart3, Repeat, Lightbulb } from "lucide-react";

const cards = [
  { icon: Megaphone, title: "Gestão de Tráfego", desc: "Google Ads, Meta Ads e geração de demanda." },
  { icon: Bot, title: "Atendimento com IA", desc: "WhatsApp, Instagram e Site funcionando 24 horas." },
  { icon: Users, title: "CRM e Processos", desc: "Organização comercial e acompanhamento de oportunidades." },
  { icon: BarChart3, title: "Dados e Analytics", desc: "Transformamos dados em decisões estratégicas." },
  { icon: Repeat, title: "Remarketing", desc: "Recuperação de clientes e aumento de recorrência." },
  { icon: Lightbulb, title: "Consultoria Estratégica", desc: "Estruturação de processos comerciais e crescimento." },
];

const OperationSection = () => {
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
            O que fazemos
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Cuidamos da sua <span className="text-primary">operação comercial</span> de ponta a ponta
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Da atração de clientes até a recompra.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 max-w-5xl mx-auto">
          {cards.map((c, idx) => (
            <div
              key={c.title}
              className={`bg-card rounded-xl border border-border p-5 sm:p-6 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${200 + idx * 80}ms` }}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <c.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-heading font-bold text-foreground text-base sm:text-lg mb-1.5">{c.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationSection;
