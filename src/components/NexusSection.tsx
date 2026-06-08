import { Bot, Repeat, Users, Send, BarChart3, LayoutDashboard, Plug, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: Bot, title: "Atendimento IA" },
  { icon: Users, title: "CRM Integrado" },
  { icon: Repeat, title: "Remarketing Automático" },
  { icon: Send, title: "Envios em Massa" },
  { icon: BarChart3, title: "Mercury Analytics" },
  { icon: LayoutDashboard, title: "Dashboard de Resultados" },
  { icon: Plug, title: "Integrações" },
  { icon: UsersRound, title: "Multiusuários" },
];

const NexusSection = () => {
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
    <section id="nexus" className="bg-secondary py-14 sm:py-20" ref={ref}>
      <div className="container mx-auto px-5 sm:px-4 lg:px-8">
        <div className={`text-center mb-10 sm:mb-14 max-w-3xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-heading font-semibold text-[11px] sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
            Tecnologia Proprietária
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
            <span className="text-foreground">A tecnologia por</span>{" "}
            <span className="text-primary">trás de tudo</span>
          </h2>
          <p className="font-heading text-base sm:text-lg text-foreground/90 font-semibold mb-3 sm:mb-4">
            Tudo isso funciona através da <span className="text-white">Mercury Nexus®</span>.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            A Mercury Nexus é a plataforma proprietária da Mercury Gestora responsável por conectar
            atendimento, CRM, automações, campanhas, dados e Inteligência Artificial em um único
            ambiente. Ela é o núcleo tecnológico que torna possível a operação do{" "}
            <span className="text-foreground font-semibold">Vendi.Mais</span> e de diversas soluções da Mercury.
          </p>
        </div>

        <div className={`max-w-4xl mx-auto mb-10 sm:mb-14 transition-all duration-700 delay-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-border shadow-xl">
            <video
              className="w-full pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/nexus-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className={`bg-card rounded-xl border border-border p-4 sm:p-5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 text-center sm:text-left ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${400 + idx * 70}ms` }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 sm:mb-3 mx-auto sm:mx-0">
                <f.icon className="text-primary" size={18} />
              </div>
              <h3 className="font-heading font-bold text-foreground text-xs sm:text-sm">{f.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NexusSection;
