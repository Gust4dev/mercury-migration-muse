import SEO from "@/components/SEO";
import InstitutionalLayout from "@/components/institutional/InstitutionalLayout";
import HomeHero from "@/components/institutional/HomeHero";
import HomeLogos from "@/components/institutional/HomeLogos";
import HomePillars from "@/components/institutional/HomePillars";
import HomeSegments from "@/components/institutional/HomeSegments";
import HomeNexus from "@/components/institutional/HomeNexus";
import HomeVendi from "@/components/institutional/HomeVendi";
import HomeCommunity from "@/components/institutional/HomeCommunity";
import HomeCreatto from "@/components/institutional/HomeCreatto";
import HomeAbout from "@/components/institutional/HomeAbout";
import RealCases from "@/components/institutional/RealCases";
import InstitutionalCta from "@/components/institutional/InstitutionalCta";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mercury Gestora",
    url: "https://mercurygestora.com.br",
    inLanguage: "pt-BR",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mercury Gestora",
    url: "https://mercurygestora.com.br",
    logo: "https://mercurygestora.com.br/favicon.png",
    taxID: "50.884.134/0001-90",
    description: "Empresa de marketing, tecnologia e inteligência comercial que desenvolve soluções para aquisição de clientes, atendimento, relacionamento e eficiência operacional.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-62-9361-8627",
      contactType: "sales",
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    },
    sameAs: ["https://www.instagram.com/mercurygestora"],
  },
];

const Index = () => (
  <>
    <SEO
      title="Mercury Gestora | Marketing, Tecnologia e Inteligência Comercial"
      description="A Mercury Gestora conecta marketing, tecnologia e inteligência comercial para ajudar empresas a conquistar clientes, aumentar vendas e melhorar suas operações."
      canonical="/"
      keywords="Mercury Gestora, marketing, tecnologia, inteligência comercial, gestão de tráfego, presença digital, Mercury Nexus, Vendi.Mais, Creatto"
      jsonLd={jsonLd}
    />
    <InstitutionalLayout>
      <HomeHero />
      <HomeLogos />
      <HomePillars />
      <HomeSegments />
      <HomeNexus />
      <HomeVendi />
      <HomeCommunity />
      <HomeCreatto />
      <HomeAbout />
      <RealCases />
      <InstitutionalCta />
    </InstitutionalLayout>
  </>
);

export default Index;
