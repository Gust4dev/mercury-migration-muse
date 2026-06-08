import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import MetricsBanner from "@/components/MetricsBanner";
import AboutSection from "@/components/AboutSection";
import SolutionsOverview from "@/components/SolutionsOverview";
import NexusSection from "@/components/NexusSection";
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
        "Automação comercial, IA e dados para PMEs. Bots de WhatsApp, dashboards e gestão comercial inteligente.",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Mercury Gestora — Automação, IA e Dados para PMEs | Vendi.Mais®"
        description="Mercury Gestora: automação comercial com IA, bots de WhatsApp, dashboards e dados para escalar vendas de PMEs com previsibilidade. Conheça Vendi.Mais® e Mercury Nexus®."
        canonical="/"
        keywords="automação comercial, IA para vendas, bot WhatsApp, chatbot, gestão comercial, dashboards de vendas, Mercury Gestora, Vendi.Mais, Mercury Nexus, automação para PMEs"
        jsonLd={jsonLd}
      />
      <Navbar />
      <Hero />
      <ClientLogos />
      <MetricsBanner />
      <NexusSection />
      <SolutionsOverview />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
