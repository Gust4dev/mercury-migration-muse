import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const criteria = [
  "Você já fatura acima de R$ 50 mil/mês",
  "Tem um time comercial (mesmo que pequeno)",
  "Está cansado de depender de indicação",
  "Quer escalar vendas com previsibilidade",
  "Busca um parceiro estratégico, não um fornecedor",
];

const Qualification = () => {
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
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            O Vendi.Mais® <span className="text-primary">não é para aventureiros</span>
          </h2>
          <p className="text-muted-foreground">
            Nosso sistema funciona para quem leva vendas a sério.
          </p>
        </div>

        <div className={`bg-card rounded-xl border border-border p-8 mb-8 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-heading font-bold text-lg text-primary mb-6 uppercase tracking-wider">
            É para você se:
          </p>
          <ul className="space-y-4">
            {criteria.map((c, idx) => (
              <li
                key={c}
                className={`flex items-start gap-3 transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                style={{ transitionDelay: `${400 + idx * 100}ms` }}
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="text-primary" size={14} />
                </div>
                <span className="text-foreground font-medium">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`text-center transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground font-heading font-bold text-base px-10 py-6 hover:bg-primary/90 hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
          >
            Quero ver valores para implementar
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
