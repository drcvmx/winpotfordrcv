import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BranchHeroSection } from "@/components/sections/BranchHeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CasinosSection } from "@/components/sections/CasinosSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

// Branch specific components
import { GamesSection } from "@/components/sections/GamesSection";
import { CasinoBanner } from "@/components/sections/CasinoBanner";
import { EventsSection } from "@/components/sections/EventsSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { ProvidersSection } from "@/components/sections/ProvidersSection";
import { LocationSection } from "@/components/sections/LocationSection";

import { useTenant } from "@/context/TenantContext";
import { Button } from "@/components/ui/button"; // For the switcher

import { TENANTS } from "@/data/mock-tenant";

const Index = () => {
  const { tenant, tenantId, setTenantId } = useTenant();

  // Temporary Dev Switcher (Only visible in development)
  const DevSwitcher = () => {
    if (!import.meta.env.DEV) return null; // Hide in production

    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-4 bg-black/90 rounded-lg border border-white/20 text-white max-w-xs shadow-xl max-h-[80vh] overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest font-bold text-center mb-1 text-white/50">Select Tenant (DEV)</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(TENANTS).map((t) => (
            <Button
              key={t.id}
              size="sm"
              variant={tenantId === t.id ? 'default' : 'outline'}
              onClick={() => setTenantId(t.id)}
              className="text-xs truncate px-2"
              title={t.content.metadata.title}
            >
              {t.id === 'main' ? 'Corporate' : t.content.metadata.city || t.id}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  if (tenant === 'branch') {
    return (
      <div className="min-h-screen bg-background">
        <DevSwitcher />
        <Navbar />
        <BranchHeroSection />
        <GamesSection />
        <CasinoBanner />
        <EventsSection />
        <AwardsSection />
        <FacilitiesSection />
        <AboutSection />
        <ProvidersSection />
        <LocationSection />
        <ContactSection />
        <Footer />
      </div>
    );
  }

  // Corporate View
  return (
    <div className="min-h-screen bg-background">
      <DevSwitcher />
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
