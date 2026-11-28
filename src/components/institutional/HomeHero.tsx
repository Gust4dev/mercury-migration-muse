import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import NexusShowcase from "./NexusShowcase";
import { trackInstitutionalEvent, WHATSAPP_URL } from "./config";

const HomeHero = () => (
  <section className="institutional-hero bg-institutional-black text-institutional-white">
    <div className="institutional-container">
      <p className="institutional-eyebrow text-institutional-yellow">MERCURY GESTORA</p>
      <h1 className="institutional-display mt-5">Tecnologia e estratégia para empresas que querem <span className="text-institutional-yellow">crescer.</span></h1>
      <div className="mt-6 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
        <p className="max-w-2xl text-lg leading-8 text-institutional-white/80">Conectamos marketing, tecnologia e inteligência comercial para atrair clientes, aumentar vendas e construir negócios mais eficientes.</p>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link to="/solucoes" onClick={() => trackInstitutionalEvent("ViewContent", "Hero conhecer soluções")} className="institutional-button bg-institutional-yellow text-institutional-black hover:bg-institutional-yellow/85">Conheça nossas soluções <ArrowRight size={17} /></Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("Contact", "Hero fale com nossa equipe")} className="institutional-button border-institutional-white/25 text-institutional-white hover:border-institutional-white/60">Fale com nossa equipe <ArrowUpRight size={17} /></a>
        </div>
      </div>
      <NexusShowcase compact />
    </div>
  </section>
);
export default HomeHero;
