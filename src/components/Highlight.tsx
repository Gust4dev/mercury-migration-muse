const Highlight = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6">
          Vendi.Mais®
        </p>
        <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          Os 3 pilares funcionam{" "}
          <span className="text-primary">simultaneamente</span>, criando um
          sistema de vendas que{" "}
          <span className="text-primary">se retroalimenta</span> e escala com
          previsibilidade.
        </h2>
      </div>
    </section>
  );
};

export default Highlight;
