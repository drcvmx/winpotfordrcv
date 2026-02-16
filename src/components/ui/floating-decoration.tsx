import { motion } from "framer-motion";

interface FloatingDecorationProps {
  src: string;
  side: "left" | "right";
  className?: string;
  /** Vertical offset from top, e.g. "10%" or "50px" */
  top?: string;
  /** Animation delay */
  delay?: number;
}

export function FloatingDecoration({
  src,
  side,
  className = "",
  top = "50%",
  delay = 0,
}: FloatingDecorationProps) {
  const positionClass = side === "left"
    ? "left-0 sm:left-0 md:-left-4 lg:-left-8 xl:-left-12"
    : "right-0 sm:right-0 md:-right-4 lg:-right-8 xl:-right-12";

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 0.85, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={`absolute ${positionClass} w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain pointer-events-none select-none z-10 ${className}`}
      style={{ top }}
    />
  );
}