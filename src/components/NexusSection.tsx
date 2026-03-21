import { Play, Zap, Shield, TrendingUp } from "lucide-react";

const benefits = [
  { icon: Zap, text: "Automação completa do funil de vendas" },
  { icon: Shield, text: "Segurança e compliance integrados" },
  { icon: TrendingUp, text: "Relatórios em tempo real com IA" },
];

const NexusSection = () => {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Plataforma Proprietária
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mercury <span className="text-primary">Nexus®</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa para gerenciar todo o seu processo comercial,
            da atração ao fechamento.
          </p>
        </div>

        {/* Video placeholder */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="aspect-video bg-mercury-dark rounded-xl border border-border flex items-center justify-center cursor-pointer group hover:border-primary/40 transition-colors">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Play className="text-primary ml-1" size={32} />
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {benefits.map((b) => (
            <div key={b.text} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <b.icon className="text-primary" size={20} />
              </div>
              <p className="text-sm text-foreground font-medium">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NexusSection;
