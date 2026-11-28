import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import mercuryLogo from "@/assets/mercury-logo.png";
import Reveal from "./Reveal";

const HomeAbout = () => (
  <section id="sobre" className="bg-institutional-graphite py-16 text-institutional-white sm:py-24">
    <div className="institutional-container grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
      <Reveal>
        <div>
          <p className="institutional-eyebrow text-institutional-yellow">QUEM SOMOS</p>
          <h2 className="institutional-title mt-5 text-4xl sm:text-5xl">
            Tecnologia feita por pessoas. Estratégia construída para negócios reais.
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-institutional-white/60">
            <p>A Mercury Gestora nasceu com o propósito de aproximar empresas das oportunidades proporcionadas pela tecnologia.</p>
            <p>Combinamos conhecimento de mercado, desenvolvimento tecnológico, marketing e inteligência comercial para construir soluções que fazem sentido na realidade de cada negócio.</p>
            <p>Mais do que fornecer ferramentas, trabalhamos ao lado das empresas na construção de operações comerciais mais eficientes.</p>
          </div>
          <Link to="/sobre" className="institutional-button mt-8 border-institutional-white/25 text-institutional-white hover:border-institutional-yellow hover:text-institutional-yellow">
            Conheça a Mercury <ArrowRight size={17} />
          </Link>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div className="flex h-full min-h-[280px] flex-col justify-between border-l border-institutional-white/15 pl-8 sm:pl-12">
          <img src={mercuryLogo} alt="" className="h-16 w-auto self-start" />
          <div>
            <p className="text-3xl leading-tight text-institutional-white">Mercury Gestora</p>
            <p className="mt-4 max-w-sm text-lg leading-7 text-institutional-white/55">
              Estratégia para gerar oportunidades. Tecnologia para simplificar. Transparência para acompanhar resultados.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default HomeAbout;
