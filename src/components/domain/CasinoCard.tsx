import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { CasinoType } from "@/types";
import { ContentCard } from "@/components/ui/content-card";
import { Heading, Text } from "@/components/ui/typography";
import { brandColors } from "@/data/casinos";
import { normalizeImageUrl } from "@/lib/url-utils";
import { useCasinoOverrides } from "@/hooks/useCasinoOverrides";

interface CasinoCardProps {
  casino: CasinoType;
}

export function CasinoCard({ casino }: CasinoCardProps) {
  const { data: overrides } = useCasinoOverrides();
  const override = overrides?.find(o => o.casino_id === casino.id);

  // Merge: DB override wins over static data
  const city = override?.city || casino.city;
  const brand = (override?.brand || casino.brand) as CasinoType['brand'];
  const scheduleWeekdays = override?.schedule_weekdays || casino.schedule.weekdays;
  const scheduleWeekend = override?.schedule_weekend ?? casino.schedule.weekend;
  const address = override?.address || casino.address;
  const imageUrl = override?.image_url || casino.imageUrl;
  const googleMapsUrl = override?.google_maps_url || casino.googleMapsUrl;
  const isOpen24h = override?.is_open_24h ?? casino.isOpen24h;

  const colors = brandColors[brand] || brandColors.winpot;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <ContentCard
        variant="gradient"
        padding="none"
        className="overflow-hidden group border border-casino-gold/30 text-center h-full flex flex-col shadow-[0_0_20px_rgba(255,193,7,0.3)] hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] transition-shadow duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={normalizeImageUrl(imageUrl)}
            alt={`Casino ${city}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {isOpen24h && (
            <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
              24 HRS
            </span>
          )}
        </div>
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <Heading as="h3" size="h3" className="text-foreground mb-1">
            {city}
          </Heading>
          <Text size="sm" className="font-semibold mb-4 capitalize" style={{ color: colors.hex }}>
            {brand}
          </Text>

          <Text size="sm" textColor="muted" weight="medium" className="mb-2">
            Horarios de servicio:
          </Text>
          <Text size="sm" textColor="muted" className="mb-1">
            {scheduleWeekdays}
          </Text>
          {scheduleWeekend && (
            <Text size="sm" textColor="muted" className="mb-3">
              {scheduleWeekend}
            </Text>
          )}

          <Text size="sm" textColor="muted" className="mb-6 flex-1">
            {address}
          </Text>

          <div className="flex flex-col gap-2">
            <Link
              to={`/${casino.id}`}
              className="inline-block bg-casino-gold hover:bg-casino-gold/90 text-casino-black font-semibold px-8 py-3 rounded transition-all text-sm text-center"
            >
              Visitar Sitio
            </Link>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-casino-gold/50 hover:bg-casino-gold/10 text-casino-gold font-medium px-6 py-2 rounded transition-all text-sm"
            >
              <MapPin className="w-4 h-4" />
              Ver en Mapa
            </a>
          </div>
        </div>
      </ContentCard>
    </motion.div>
  );
}
