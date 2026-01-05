import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import heroBanner from "@/assets/hero-banner.webp";

export function HeroSection() {
  return (
    <SectionWrapper id="inicio" background="gradient" padding="none" className="min-h-screen pt-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-5rem)]">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.img
              src={heroBanner}
              alt="Winpot Casino Banner"
              className="w-full max-w-2xl mx-auto animate-float"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center lg:text-right"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Heading as="h1" size="h1" className="mb-4">
                <span className="text-foreground font-extrabold tracking-tight">WINPOT</span>
                <br />
                <span className="text-primary text-shadow-glow font-extrabold">CASINO</span>
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Text size="lg" textColor="muted" leading="relaxed" className="mb-8 max-w-md ml-auto">
                La diversión nunca se detiene. En Winpot cada momento es una oportunidad para disfrutar, ganar y vivir la emoción al máximo.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex justify-center lg:justify-end"
            >
              <a 
                href="#casinos" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-4 rounded transition-all text-lg tracking-wide"
              >
                VER CASINOS
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
