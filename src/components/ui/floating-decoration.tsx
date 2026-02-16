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
  // On mobile: tuck partially off-screen so they don't overlap content
  // On tablet+: extend further out
  const positionClass = side === "left"
    ? "-left-6 sm:-left-6 md:-left-10 lg:-left-14 xl:-left-16"
    : "-right-6 sm:-right-6 md:-right-10 lg:-right-14 xl:-right-16";

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={`absolute ${positionClass} w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 object-contain pointer-events-none select-none z-0 opacity-70 md:opacity-80 lg:opacity-100 ${className}`}
      style={{ top }}
    />
  );
}
