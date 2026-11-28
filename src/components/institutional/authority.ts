import glpClient from "@/assets/institutional/glp-cliente.webp";
import farmaClient from "@/assets/institutional/farma-cliente.webp";
import autoClient from "@/assets/institutional/auto-cliente.webp";

/** Institutional content only; never used as operational customer or sales data. */
export const communityAuthority = {
  minimumMembers: 400,
  representedStates: 25,
  totalStates: 27,
  regions: 5,
  coveragePercent: 92.6,
  unrepresentedStates: ["AC", "AP"],
  destination: "/comunidade",
  scope: "community" as const,
};

export const communityBenefits = [
  "Troca de experiências entre revendedores",
  "Conhecimento de mercado",
  "Estratégias comerciais",
  "Conteúdos especializados",
  "Workshops e aprendizado",
  "Conexões empresariais",
];

export const nexusCaptures = [
  { image: "/institutional/nexus-analytics.webp", title: "Mercury Analytics", alt: "Interface real do Mercury Analytics, com dados comerciais ocultos" },
  { image: "/institutional/nexus-clients.webp", title: "Gestão de clientes", alt: "Interface real da gestão de clientes da Nexus, com dados pessoais ocultos" },
  { image: "/institutional/nexus-calendar.webp", title: "Calendário estratégico", alt: "Interface real do calendário estratégico da Nexus, com informações comerciais ocultas" },
];

export interface InstitutionalPhoto {
  image: string;
  alt: string;
  caption?: string;
}

export interface ClientRecord {
  segment: string;
  name?: string;
  logo?: string;
  location?: string;
  operation: string;
  photos: InstitutionalPhoto[];
  authorizedServices?: string[];
  caseUrl?: string;
}

/** These operations/photos are confirmed; commercial names have not been supplied. */
export const clientRecords: ClientRecord[] = [
  { segment: "glp", operation: "Operação de uma revenda de GLP atendida pela Mercury", photos: [{ image: glpClient, alt: "Botijões organizados na revenda de um cliente real da Mercury" }] },
  { segment: "farma", operation: "Interior de uma farmácia atendida pela Mercury", photos: [{ image: farmaClient, alt: "Interior da farmácia de um cliente real da Mercury" }] },
  { segment: "auto", operation: "Estabelecimento automotivo atendido pela Mercury", photos: [{ image: autoClient, alt: "Peças e veículos no estabelecimento de um cliente real da Mercury" }] },
];

/** Optional real team/office/production photos; empty collections stay hidden. */
export const mercuryPhotos: InstitutionalPhoto[] = [];
export const creattoProductionPhotos: InstitutionalPhoto[] = [];
export const creattoOfficialLogo: string | undefined = undefined;

export interface VerifiedCase {
  company: string;
  segment: string;
  challenge: string;
  strategy: string;
  period: string;
  results: string;
  metrics: { label: string; value: string }[];
  photos: InstitutionalPhoto[];
  authorizedTestimonial?: string;
  approved: boolean;
}

export const verifiedCases: VerifiedCase[] = [];