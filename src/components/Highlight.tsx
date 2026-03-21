import { useEffect, useRef, useState } from "react";

const Highlight = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background py-20 overflow-hidden">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 text-center max-w-4xl transition-all duration-1000 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
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
