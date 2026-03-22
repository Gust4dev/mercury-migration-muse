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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background py-20" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Quem Somos
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            A <span className="text-primary">Mercury Gestora</span> faz a ponte entre a tecnologia de ponta e o seu negócio
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Unimos a fronteira da tecnologia com inteligência de dados e gestão estratégica
            para transformar os setores de pequenas e médias empresas — <strong className="text-foreground">a sua empresa</strong>.
            Não somos uma agência. Somos o braço de automação, tecnologia e dados que faltava
            pro seu negócio, pelo preço certo.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            Fala-se muito de IA, mas pouco se mostra de soluções reais para empresas do dia a dia.
            O mercado só fala de big techs. Nós viemos para quebrar isso — fazemos a cola entre
            tecnologias como IA e SaaS e os empreendedores reais. Com tecnologias próprias e
            patenteadas, estruturas únicas e uma parceria genuína: você nos contrata para resolver
            seu problema e nós <span className="text-primary font-semibold">resolveremos</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {values.map((v, idx) => (
            <div
              key={v.title}
              className={`bg-card rounded-xl border border-border p-6 text-center hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + idx * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
