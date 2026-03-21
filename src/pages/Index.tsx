import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import MetricsBanner from "@/components/MetricsBanner";
import AboutSection from "@/components/AboutSection";
import SolutionsOverview from "@/components/SolutionsOverview";
import NexusSection from "@/components/NexusSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ClientLogos />
      <MetricsBanner />
      <AboutSection />
      <SolutionsOverview />
      <NexusSection />
      <Footer />
    </div>
  );
};

export default Index;
