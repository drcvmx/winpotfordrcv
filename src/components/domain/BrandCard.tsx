import { motion } from "framer-motion";
import type { BrandType } from "@/types";
import { cn } from "@/lib/utils";

interface BrandCardProps {
  brand: BrandType;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        "border rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-xl",
        brand.bgColorClass,
        brand.borderColorClass
      )}
    >
      <span className={cn("text-2xl md:text-3xl font-bold", brand.colorClass)}>
        {brand.name}
      </span>
    </motion.div>
  );
}
