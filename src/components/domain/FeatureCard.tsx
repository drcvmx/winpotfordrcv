import type { FeatureType } from "@/types";
import { ContentCard } from "@/components/ui/content-card";
import { Text } from "@/components/ui/typography";

// Custom casino icons as SVG components
const CasinoIcons = {
  Dices: () => (
    <svg viewBox="0 0 64 64" className="w-16 h-16" stroke="currentColor" fill="none" strokeWidth="1.5">
      <rect x="8" y="24" width="24" height="24" rx="3" />
      <circle cx="14" cy="30" r="2" fill="currentColor" />
      <circle cx="26" cy="42" r="2" fill="currentColor" />
      <circle cx="20" cy="36" r="2" fill="currentColor" />
      <path d="M32 24L44 12h16a3 3 0 013 3v16L51 43" />
      <circle cx="50" cy="24" r="2" fill="currentColor" />
      <path d="M24 8L32 16" strokeLinecap="round" />
      <ellipse cx="48" cy="52" rx="8" ry="4" />
      <path d="M40 52v-8a8 4 0 0116 0v8" />
    </svg>
  ),
  Slot: () => (
    <svg viewBox="0 0 64 64" className="w-16 h-16" stroke="currentColor" fill="none" strokeWidth="1.5">
      <rect x="12" y="16" width="40" height="36" rx="4" />
      <rect x="18" y="24" width="8" height="16" rx="1" />
      <rect x="28" y="24" width="8" height="16" rx="1" />
      <rect x="38" y="24" width="8" height="16" rx="1" />
      <text x="20" y="36" fontSize="10" fill="currentColor" stroke="none">7</text>
      <text x="30" y="36" fontSize="10" fill="currentColor" stroke="none">7</text>
      <text x="40" y="36" fontSize="10" fill="currentColor" stroke="none">7</text>
      <circle cx="52" cy="32" r="3" />
      <path d="M12 48h40" />
    </svg>
  ),
  Building: () => (
    <svg viewBox="0 0 64 64" className="w-16 h-16" stroke="currentColor" fill="none" strokeWidth="1.5">
      <path d="M16 56V20a4 4 0 014-4h24a4 4 0 014 4v36" />
      <path d="M8 56h48" />
      <rect x="24" y="8" width="16" height="8" rx="2" />
      <text x="27" y="14" fontSize="6" fill="currentColor" stroke="none">CASINO</text>
      <rect x="22" y="24" width="6" height="6" rx="1" />
      <rect x="36" y="24" width="6" height="6" rx="1" />
      <rect x="22" y="36" width="6" height="6" rx="1" />
      <rect x="36" y="36" width="6" height="6" rx="1" />
      <path d="M28 56V48h8v8" />
    </svg>
  ),
  Coins: () => (
    <svg viewBox="0 0 64 64" className="w-16 h-16" stroke="currentColor" fill="none" strokeWidth="1.5">
      <ellipse cx="24" cy="44" rx="16" ry="8" />
      <path d="M8 44v-8c0-4.4 7.2-8 16-8s16 3.6 16 8v8" />
      <ellipse cx="24" cy="36" rx="16" ry="8" />
      <ellipse cx="40" cy="28" rx="16" ry="8" />
      <path d="M24 28v-8c0-4.4 7.2-8 16-8s16 3.6 16 8v8" />
      <ellipse cx="40" cy="20" rx="16" ry="8" />
      <text x="36" y="24" fontSize="10" fill="currentColor" stroke="none">$</text>
    </svg>
  ),
};

interface FeatureCardProps {
  feature: FeatureType;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = CasinoIcons[feature.icon as keyof typeof CasinoIcons] || CasinoIcons.Dices;
  
  return (
    <ContentCard 
      variant="gradient" 
      className="text-center group hover:border-primary/30 border border-border/30 flex flex-col items-center justify-center min-h-[200px]"
    >
      <div className="text-accent mb-4">
        <IconComponent />
      </div>
      <Text size="sm" weight="medium" className="text-foreground max-w-[180px]">
        {feature.title}
      </Text>
    </ContentCard>
  );
}
