import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import NexusVideo from "./NexusVideo";
import { trackInstitutionalEvent, WHATSAPP_URL } from "./config";

const HomeHero = () => (
  <section className="bg-institutional-black pb-16 pt-28 text-institutional-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
    <div className="institutional-container grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
      <div>
        <p className="institutional-eyebrow text-institutional-yellow">MERCURY GESTORA</p>
        <h1 className="institutional-display mt-6 max-w-3xl text-[2.65rem] sm:text-6xl lg:text-[4.25rem] xl:text-[4.7rem]">
          Tecnologia e estratégia para empresas que querem <span className="text-institutional-yellow">crescer.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-institutional-white/65">
          Conectamos marketing, tecnologia e inteligência comercial para atrair clientes, aumentar vendas e construir negócios mais eficientes.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/solucoes"
            onClick={() => trackInstitutionalEvent("ViewContent", "Hero conhecer soluções")}
            className="institutional-button bg-institutional-yellow text-institutional-black hover:bg-institutional-yellow/85"
          >
            Conheça nossas soluções <ArrowRight size={17} />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackInstitutionalEvent("Contact", "Hero fale com nossa equipe")}
            className="institutional-button border-institutional-white/25 text-institutional-white hover:border-institutional-white/60"
          >
            Fale com nossa equipe <ArrowUpRight size={17} />
          </a>
        </div>
      </div>

      <figure className="relative lg:pl-6">
        <div className="absolute -left-1 -top-4 h-20 w-1 bg-institutional-yellow lg:left-2" aria-hidden="true" />
        <div className="overflow-hidden rounded-sm border border-institutional-white/15 bg-institutional-graphite">
          <NexusVideo eager />
        </div>
        <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-institutional-white/15 pt-4 text-xs text-institutional-white/50">
          <span><span className="text-institutional-white">Mercury Nexus®</span> — tecnologia proprietária</span>
          <span>Interface real da plataforma</span>
        </figcaption>
      </figure>
    </div>
  </section>
);

export default HomeHero;
