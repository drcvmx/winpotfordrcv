import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CasinosSection } from "@/components/sections/CasinosSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  // Corporate View - Always shows the main/corporate content
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CasinosSection />
      <AboutSection />
      <BrandsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
