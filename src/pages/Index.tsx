import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CasinosSection } from "@/components/sections/CasinosSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LegalSection } from "@/components/sections/LegalSection";
import { Footer } from "@/components/sections/Footer";
import DevSwitcher from "@/components/DevSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <DevSwitcher />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CasinosSection />
      <AboutSection />
      <BrandsSection />
      <ContactSection />
      <LegalSection />
      <Footer />
    </div>
  );
};

export default Index;
