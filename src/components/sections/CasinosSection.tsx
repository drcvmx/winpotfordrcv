import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { CasinoCard } from "@/components/domain/CasinoCard";
import { casinos, brandFilters } from "@/data/casinos";
import { useCasinoOverrides } from "@/hooks/useCasinoOverrides";
import type { CasinoType } from "@/types";
import { FloatingDecoration } from "@/components/ui/floating-decoration";
import { getBrandDecorations } from "@/data/brand-decorations";
import { useTenant } from "@/context/TenantContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function CasinosSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: overrides } = useCasinoOverrides();

  // Static casino IDs
  const staticCasinoIds = new Set(casinos.map(c => c.id));

  // Build CasinoType objects from DB-only overrides
  const dbOnlyCasinos: CasinoType[] = (overrides || [])
    .filter(o => !staticCasinoIds.has(o.casino_id))
    .map(o => ({
      id: o.casino_id,
      city: o.city || 'Sin nombre',
      brand: (o.brand as CasinoType['brand']) || 'winpot',
      schedule: {
        weekdays: o.schedule_weekdays || '',
        weekend: o.schedule_weekend || undefined,
      },
      address: o.address || '',
      imageUrl: o.image_url || '/placeholder.svg',
      isOpen24h: o.is_open_24h ?? false,
      externalLink: '',
      googleMapsUrl: o.google_maps_url || '',
      isDbOnly: true,
    } as CasinoType & { isDbOnly?: boolean }));

  const allCasinos = [...casinos, ...dbOnlyCasinos];

  const filteredCasinos = activeFilter === "all" 
    ? allCasinos 
    : allCasinos.filter((c) => c.brand === activeFilter);

  const { data } = useTenant();
  const brandId = data?.brandId || 'winpot';
  const decorations = getBrandDecorations(brandId);

  return (
    <SectionWrapper id="casinos" background="secondary" className="relative overflow-hidden">
      <FloatingDecoration src={decorations[1]} side="left" top="10%" />
      <FloatingDecoration src={decorations[2]} side="right" top="70%" />
      <Container>
        <div className="text-center mb-12">
          <Heading className="mb-4">
            <span className="text-foreground italic font-bold">NUESTROS</span>
            <br />
            <span className="text-primary italic font-bold">CASINOS</span>
          </Heading>
          <Text textColor="muted" className="max-w-3xl mx-auto leading-relaxed">
            Con más de 18 sucursales en 16 ciudades del país, Winpot Casino te ofrece una experiencia de entretenimiento única y variada. 
            Con marcas como Winpot, Capri, Veneto y Diamonds, nuestras instalaciones modernas, tecnología de punta, áreas VIP y 
            servicio excepcional garantizan diversión y emociones en cada visita.
          </Text>
        </div>

        {/* Mobile Carousel for filters */}
        <div className="md:hidden mb-8">
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {brandFilters.map((filter) => (
                <CarouselItem key={filter.id} className="pl-2 basis-auto">
                  <button 
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-5 py-2 rounded-full font-medium text-sm transition-all border-2 whitespace-nowrap ${
                      activeFilter === filter.id 
                        ? "bg-casino-gold border-casino-gold text-casino-black" 
                        : "bg-transparent border-casino-gold/70 text-foreground hover:bg-casino-gold/10"
                    }`}
                  >
                    {filter.label}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop filters */}
        <div className="hidden md:flex flex-wrap justify-center gap-3 mb-12">
          {brandFilters.map((filter) => (
            <button 
              key={filter.id} 
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all border-2 ${
                activeFilter === filter.id 
                  ? "bg-casino-gold border-casino-gold text-casino-black" 
                  : "bg-transparent border-casino-gold/70 text-foreground hover:bg-casino-gold/10"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCasinos.map((casino) => <CasinoCard key={casino.id} casino={casino} />)}
          </AnimatePresence>
        </div>
      </Container>
    </SectionWrapper>
  );
}
