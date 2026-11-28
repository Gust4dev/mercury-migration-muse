import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import MercuryIdentity from "./MercuryIdentity";
const HomeAbout = () => <section id="sobre" className="bg-institutional-graphite py-16 text-institutional-white sm:py-20"><div className="institutional-container grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
  <Reveal><div><p className="institutional-eyebrow text-institutional-yellow">QUEM SOMOS</p><h2 className="institutional-title mt-5 text-4xl sm:text-5xl">Tecnologia feita por pessoas. Estratégia construída para negócios reais.</h2>
    <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-institutional-white/80"><p>A Mercury Gestora nasceu com o propósito de aproximar empresas das oportunidades proporcionadas pela tecnologia.</p><p>Combinamos conhecimento de mercado, desenvolvimento tecnológico, marketing e inteligência comercial para construir soluções que fazem sentido na realidade de cada negócio.</p><p>Mais do que fornecer ferramentas, trabalhamos ao lado das empresas na construção de operações comerciais mais eficientes.</p></div>
    <Link to="/sobre" className="institutional-button mt-8 border-institutional-white/25 text-institutional-white hover:border-institutional-yellow hover:text-institutional-yellow">Conheça a Mercury <ArrowRight size={17} /></Link>
  </div></Reveal><Reveal delay={100}><MercuryIdentity /></Reveal>
</div></section>;
export default HomeAbout;
