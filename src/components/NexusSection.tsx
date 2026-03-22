import { Bot, CreditCard, BarChart3, Users, GraduationCap, LayoutDashboard, Globe, ShoppingCart, Cpu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: Bot, title: "Atendente IA", desc: "IA própria Mercury nos bots da estrutura Vendi.Mais" },
  { icon: CreditCard, title: "Mercury Pay", desc: "Cobranças e gestão financeira centralizadas" },
  { icon: Users, title: "CRM Integrado", desc: "Dados de todos os seus clientes em um só lugar" },
  { icon: BarChart3, title: "Mercury Analytics", desc: "Campanhas, bots, vendas — tudo analisado pela nossa IA" },
  { icon: Globe, title: "Multi-equipe", desc: "Acesso para toda sua equipe com permissões inteligentes" },
  { icon: GraduationCap, title: "Treinamentos", desc: "Mercury Academy + treinamentos internos da sua empresa" },
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
    <section className="bg-secondary py-14 sm:py-20" ref={ref}>
      <div className="container mx-auto px-5 sm:px-4 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-heading font-semibold text-[11px] sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4">
            Tecnologias Próprias e Patenteadas
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-foreground">Mercury</span>{" "}
            <span className="text-white">Nexus®</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-sm sm:text-base px-2">
            Uma plataforma <strong className="text-primary">exclusiva para clientes Mercury</strong> que centraliza todas as nossas ferramentas e estruturas em um só lugar.
            Modelada de acordo com os serviços ativos na sua conta — com IA própria, gestão financeira, analytics e treinamentos.
          </p>
        </div>

        {/* Video */}
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

        {/* Value props */}
        <div className={`text-center mb-8 sm:mb-10 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
              <Cpu size={13} /> IA Própria Mercury
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
              <LayoutDashboard size={13} /> Tudo Centralizado
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
              <ShoppingCart size={13} /> + Eficiência − Custo
            </span>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 max-w-4xl mx-auto">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className={`bg-card rounded-xl border border-border p-4 sm:p-5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 active:scale-[0.98] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${600 + idx * 100}ms` }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 sm:mb-3">
                <f.icon className="text-primary" size={18} />
              </div>
              <h3 className="font-heading font-bold text-foreground text-xs sm:text-sm mb-1">{f.title}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <p className={`text-center text-muted-foreground text-xs sm:text-sm mt-8 sm:mt-10 max-w-2xl mx-auto transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1200ms" }}>
          Mais vendas. Mais eficiência. Menos custo. — <span className="text-primary font-semibold">Tudo em um só lugar.</span>
        </p>
      </div>
    </section>
  );
};

export default NexusSection;
