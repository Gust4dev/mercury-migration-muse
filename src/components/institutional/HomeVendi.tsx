import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { trackInstitutionalEvent } from "./config";
const journey = [
  ["01", "Atrair", "Marketing, anúncios e presença digital."],
  ["02", "Atender", "Atendimento, organização e automação."],
  ["03", "Converter", "Gestão das oportunidades comerciais."],
  ["04", "Fidelizar", "Relacionamento, remarketing e recorrência."],
];
const HomeVendi = () => <section className="bg-institutional-white py-16 sm:py-20"><div className="institutional-container">
  <Reveal><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div>
    <p className="institutional-eyebrow text-institutional-muted">VENDI.MAIS® / SOLUÇÃO COMERCIAL INTEGRADA</p>
    <h2 className="institutional-title mt-5 max-w-4xl text-4xl sm:text-5xl">Uma operação comercial completa, da primeira busca à próxima compra.</h2>
  </div><Link to="/vendimais" onClick={() => trackInstitutionalEvent("ViewContent", "Conhecer Vendi.Mais na Home")} className="institutional-button shrink-0 bg-institutional-black text-institutional-white hover:bg-institutional-graphite">Conheça o Vendi.Mais® <ArrowRight size={17} /></Link></div></Reveal>
  <ol className="commercial-journey mt-12 grid gap-6 md:grid-cols-4 md:gap-8">{journey.map(([number, title, text]) => <li className="commercial-journey-step" key={number}><span className="commercial-journey-number">{number}</span><h3 className="mt-3 text-3xl md:mt-6">{title}</h3><p className="mt-3 text-lg leading-8 text-institutional-muted">{text}</p></li>)}</ol>
</div></section>;
export default HomeVendi;
