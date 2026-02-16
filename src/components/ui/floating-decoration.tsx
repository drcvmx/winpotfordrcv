import { motion } from "framer-motion";

interface FloatingDecorationProps {
  src: string;
  side: "left" | "right";
  className?: string;
  /** Vertical offset from top, e.g. "10%" or "50px" */
  top?: string;
  /** Size class, default w-28 h-28 */
  size?: string;
  /** Animation delay */
  delay?: number;
}

export function FloatingDecoration({
  src,
  side,
  className = "",
  top = "50%",
  size = "w-28 h-28 lg:w-36 lg:h-36",
  delay = 0,
}: FloatingDecorationProps) {
  const positionClass = side === "left"
    ? "-left-4 lg:-left-12 xl:-left-16"
    : "-right-4 lg:-right-12 xl:-right-16";

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={`absolute ${positionClass} ${size} object-contain pointer-events-none select-none z-10 hidden md:block ${className}`}
      style={{ top }}
    />
  );
}
