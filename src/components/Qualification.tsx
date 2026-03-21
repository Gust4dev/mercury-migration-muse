import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const criteria = [
  "Você já fatura acima de R$ 50 mil/mês",
  "Tem um time comercial (mesmo que pequeno)",
  "Está cansado de depender de indicação",
  "Quer escalar vendas com previsibilidade",
  "Busca um parceiro estratégico, não um fornecedor",
];

const Qualification = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            O Vendi.Mais® <span className="text-primary">não é para aventureiros</span>
          </h2>
          <p className="text-muted-foreground">
            Nosso sistema funciona para quem leva vendas a sério.
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-8 mb-8">
          <p className="font-heading font-bold text-lg text-primary mb-6 uppercase tracking-wider">
            É para você se:
          </p>
          <ul className="space-y-4">
            {criteria.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="text-primary" size={14} />
                </div>
                <span className="text-foreground font-medium">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground font-heading font-bold text-base px-10 py-6 hover:bg-primary/90"
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
