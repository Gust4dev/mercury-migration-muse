import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import MetricsBanner from "@/components/MetricsBanner";
import OperationSection from "@/components/OperationSection";
import VendiMaisHighlight from "@/components/VendiMaisHighlight";
import NexusSection from "@/components/NexusSection";
import MercuryDifferentials from "@/components/MercuryDifferentials";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Mercury Gestora",
      url: "https://mercurygestora.com.br",
      inLanguage: "pt-BR",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://mercurygestora.com.br/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Mercury Gestora",
      image: "https://mercurygestora.com.br/favicon.png",
      url: "https://mercurygestora.com.br",
      telephone: "+55-62-9361-8627",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Goiânia",
        addressRegion: "GO",
        addressCountry: "BR",
      },
      areaServed: "BR",
      description:
        "Gestão de tráfego, IA, CRM, automação, dados e consultoria estratégica para PMEs. Solução principal: Vendi.Mais®. Tecnologia proprietária: Mercury Nexus®.",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Mercury Gestora — Automação Comercial com IA e CRM"
        description="Tecnologia, estratégia e automação para sua empresa vender mais. Conheça o Vendi.Mais® e a tecnologia Mercury Nexus®."
        canonical="/"
        keywords="Mercury Gestora, Vendi.Mais, Mercury Nexus, automação comercial, IA para vendas, CRM, bot WhatsApp"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <Hero />
        <ClientLogos />
        <MetricsBanner />
        <OperationSection />
        <VendiMaisHighlight />
        <NexusSection />
        <MercuryDifferentials />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
