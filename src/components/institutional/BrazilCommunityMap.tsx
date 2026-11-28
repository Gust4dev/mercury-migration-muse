import geography from "./brazil-states.json";
import { communityAuthority } from "./authority";

const BrazilCommunityMap = () => (
  <figure className="community-map">
    <svg viewBox={geography.viewBox} role="img" aria-label="Mapa das 27 unidades federativas: 25 com representantes na comunidade; Acre e Amapá sem representantes">
      <title>Comunidade Mercury GLP Brasil — presença nacional</title>
      <desc>As unidades federativas com representantes aparecem em amarelo. Acre e Amapá aparecem em cinza. Os indicadores se referem à comunidade, não à carteira de clientes.</desc>
      {geography.states.map((state) => {
        const represented = !communityAuthority.unrepresentedStates.includes(state.code);
        return <path key={state.code} d={state.path} data-state={state.code} data-represented={represented} className={represented ? "community-state represented" : "community-state"}><title>{state.name} ({state.code}) — {represented ? "com representantes" : "ainda sem representantes"}</title></path>;
      })}
    </svg>
    <figcaption className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-institutional-white/80">
      <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-institutional-yellow" />Com representantes</span>
      <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-institutional-muted" />Ainda sem representantes: AC e AP</span>
    </figcaption>
  </figure>
);

export default BrazilCommunityMap;