import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useTenant } from "@/context/TenantContext";
import { TENANTS } from "@/data/mock-tenant";

import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BranchHeroSection } from "@/components/sections/BranchHeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CasinosSection } from "@/components/sections/CasinosSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LegalSection } from "@/components/sections/LegalSection";
import { Footer } from "@/components/sections/Footer";
import { GamesSection } from "@/components/sections/GamesSection";
import { CasinoBanner } from "@/components/sections/CasinoBanner";
import { EventsSection } from "@/components/sections/EventsSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { ProvidersSection } from "@/components/sections/ProvidersSection";
import { LocationSection } from "@/components/sections/LocationSection";
import DevSwitcher from "@/components/DevSwitcher";

const TenantPage = () => {
  const { tenantId: urlTenantId } = useParams<{ tenantId: string }>();
  const { tenant, setTenantId, tenantId } = useTenant();

  // Sync URL param with context
  useEffect(() => {
    if (urlTenantId && TENANTS[urlTenantId] && urlTenantId !== tenantId) {
      setTenantId(urlTenantId);
    }
  }, [urlTenantId, setTenantId, tenantId]);

  // If tenant doesn't exist, redirect to home
  if (urlTenantId && !TENANTS[urlTenantId]) {
    return <Navigate to="/" replace />;
  }

  // Branch View (all tenants except 'main')
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
        <LegalSection />
        <Footer />
      </div>
    );
  }

  // Corporate View (fallback)
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
      <LegalSection />
      <Footer />
    </div>
  );
};

export default TenantPage;
