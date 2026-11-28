import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BrazilCommunityMap from "./BrazilCommunityMap";
import Reveal from "./Reveal";
import { communityAuthority, communityBenefits } from "./authority";
import { trackInstitutionalEvent } from "./config";

const HomeCommunity = () => <section className="bg-institutional-black py-16 text-institutional-white sm:py-20"><div className="institutional-container">
  <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
    <Reveal><div>
      <div className="flex items-center gap-4"><img src="/institutional/mercury-glp.webp" alt="Comunidade Mercury GLP Brasil" loading="lazy" className="h-16 w-16 rounded-2xl" /><p className="institutional-eyebrow text-institutional-yellow">COMUNIDADE MERCURY GLP BRASIL</p></div>
      <h2 className="institutional-title mt-6 text-4xl sm:text-5xl">Conectando revendedores de gás de todo o Brasil.</h2>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-institutional-white/80">Uma comunidade empresarial dedicada ao compartilhamento de conhecimento, experiências e oportunidades no mercado de GLP, conectando revendedores de diferentes regiões brasileiras.</p>
      <dl className="mt-8 grid grid-cols-3 gap-4">
        <div><dd className="text-3xl text-institutional-yellow sm:text-5xl">{communityAuthority.minimumMembers}+</dd><dt className="mt-3 text-sm leading-6 text-institutional-white/80 sm:text-base">Integrantes na comunidade</dt></div>
        <div><dd className="text-3xl text-institutional-yellow sm:text-5xl">{communityAuthority.representedStates}<span className="text-lg sm:text-2xl"> de {communityAuthority.totalStates}</span></dd><dt className="mt-3 text-sm leading-6 text-institutional-white/80 sm:text-base">Unidades federativas</dt></div>
        <div><dd className="text-3xl text-institutional-yellow sm:text-5xl">{communityAuthority.coveragePercent.toLocaleString("pt-BR")}%</dd><dt className="mt-3 text-sm leading-6 text-institutional-white/80 sm:text-base">Cobertura das unidades federativas brasileiras</dt></div>
      </dl>
      <p className="mt-5 text-sm leading-6 text-institutional-white/70">Presente nas cinco regiões do Brasil. Indicadores da comunidade empresarial, não da carteira de clientes da Mercury.</p>
      <Button asChild variant="ghost" className="institutional-button mt-7 h-auto bg-institutional-yellow text-institutional-black hover:bg-institutional-yellow/85 hover:text-institutional-black"><Link to={communityAuthority.destination} onClick={() => trackInstitutionalEvent("ViewContent", "Faça parte da Comunidade Mercury GLP Brasil")}>Faça parte gratuitamente <ArrowRight size={17} /></Link></Button>
    </div></Reveal>
    <Reveal delay={100}><BrazilCommunityMap /></Reveal>
  </div>
  <ul className="mt-12 grid gap-x-8 gap-y-4 text-base text-institutional-white/85 sm:grid-cols-2 lg:grid-cols-3">{communityBenefits.map((benefit) => <li key={benefit} className="flex items-center gap-3"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-institutional-yellow" />{benefit}</li>)}</ul>
</div></section>;
export default HomeCommunity;
