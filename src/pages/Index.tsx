import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import MetricsBanner from "@/components/MetricsBanner";
import Pillars from "@/components/Pillars";
import Highlight from "@/components/Highlight";
import BlogSection from "@/components/BlogSection";
import NexusSection from "@/components/NexusSection";
import Qualification from "@/components/Qualification";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ClientLogos />
      <MetricsBanner />
      <Pillars />
      <Highlight />
      <BlogSection />
      <NexusSection />
      <Qualification />
      <Footer />
    </div>
  );
};

export default Index;
