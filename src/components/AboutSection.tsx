import { useEffect, useRef, useState } from "react";
import { Rocket, Users, Eye, Award } from "lucide-react";

const values = [
  { icon: Rocket, title: "Inovação", desc: "Tecnologia de ponta aplicada à gestão comercial real." },
  { icon: Users, title: "Parceria", desc: "Somos parte do time, não um fornecedor externo." },
  { icon: Eye, title: "Transparência", desc: "Dados acessíveis e resultados mensuráveis sempre." },
  { icon: Award, title: "Excelência", desc: "Obsessão por performance e melhoria contínua." },
];

const AboutSection = () => {
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
    <section className="bg-background py-10 sm:py-14" ref={ref}>
      <div className="container mx-auto px-5 sm:px-4 lg:px-8">
        <div className={`max-w-2xl mx-auto text-center mb-8 sm:mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-heading font-semibold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 sm:mb-3">
            Quem Somos
          </p>
          <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            A <span className="text-primary">Mercury Gestora</span> conecta tecnologia de ponta ao seu negócio
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            Unimos IA, dados e gestão estratégica para transformar pequenas e médias empresas.
            Não somos uma agência — somos o braço de automação, tecnologia e dados que faltava
            pro seu negócio, pelo preço certo.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {values.map((v, idx) => (
            <div
              key={v.title}
              className={`bg-card rounded-xl border border-border p-4 sm:p-6 text-center hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-500 active:scale-[0.98] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + idx * 100}ms` }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <v.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm mb-1 sm:mb-2">{v.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
