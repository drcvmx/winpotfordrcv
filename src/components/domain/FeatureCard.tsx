import type { FeatureType } from "@/types";
import { ContentCard } from "@/components/ui/content-card";
import { Text } from "@/components/ui/typography";

import featureCards from "@/assets/features/feature-cards.png";
import featureSlots from "@/assets/features/feature-slots.png";
import featureCasino from "@/assets/features/feature-casino.png";
import featureChips from "@/assets/features/feature-chips.png";

const featureImages: Record<string, string> = {
  Dices: featureCards,
  Slot: featureSlots,
  Building: featureCasino,
  Coins: featureChips,
};

interface FeatureCardProps {
  feature: FeatureType;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const imageSrc = featureImages[feature.icon] || featureCards;
  
  return (
    <ContentCard 
      variant="gradient" 
      className="text-center group hover:border-primary/30 border border-border/30 flex flex-col items-center justify-center min-h-[200px]"
    >
      <div className="mb-4">
        <img 
          src={imageSrc} 
          alt={feature.title} 
          className="w-16 h-16 object-contain mix-blend-screen"
        />
      </div>
      <Text size="sm" weight="medium" className="text-foreground max-w-[180px]">
        {feature.title}
      </Text>
    </ContentCard>
  );
}
