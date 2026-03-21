import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    title: "Como gerar 650 leads qualificados por mês sem aumentar a verba",
    category: "Estratégia",
    readTime: "5 min",
  },
  {
    title: "O erro que 90% das empresas cometem na gestão comercial",
    category: "Gestão",
    readTime: "4 min",
  },
  {
    title: "Dados vs Achismo: por que sua equipe de vendas está perdendo dinheiro",
    category: "Dados",
    readTime: "6 min",
  },
];

const BlogSection = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground font-heading font-bold text-base px-8 py-6 hover:bg-primary/90 mb-8"
          >
            Quero ver como funciona pra mim!!
            <ArrowRight className="ml-2" size={18} />
          </Button>

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Conteúdos que <span className="text-primary">vendem</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Artigos, insights e estratégias direto do nosso time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {articles.map((article) => (
            <div
              key={article.title}
              className="bg-card rounded-xl border border-border p-6 hover:border-primary/40 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground">• {article.readTime}</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
