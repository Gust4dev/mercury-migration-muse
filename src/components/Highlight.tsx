import { useEffect, useRef, useState } from "react";

const Highlight = () => {
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
    <section className="bg-background py-12 sm:py-20 overflow-hidden">
      <div
        ref={ref}
        className={`container mx-auto px-5 sm:px-4 lg:px-8 text-center max-w-4xl transition-all duration-1000 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <p className="text-primary font-heading font-semibold text-[11px] sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-6">
          Vendi.Mais®
        </p>
        <h2 className="font-heading text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight px-1">
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
