import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { useTenant } from "@/context/TenantContext";
import { FloatingDecoration } from "@/components/ui/floating-decoration";
import { getBrandDecorations } from "@/data/brand-decorations";

export function CasinoBanner() {
    const { data } = useTenant();
    const brandId = data?.brandId || 'winpot';
    const decorations = getBrandDecorations(brandId);

    return (
        <SectionWrapper background="default" padding="lg" className="relative overflow-hidden">
            {/* Decorative dots */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-accent" />
            </div>

            {/* Decoration: left side (replaces old horseshoe) */}
            <FloatingDecoration src={decorations[1]} side="left" top="30%" />

            <Container>
                <div className="relative flex flex-col lg:flex-row items-center gap-8 py-8">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center flex-1"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-tight">
                            ¡Te esperamos para vivir el{" "}
                            <br className="hidden md:block" />
                            verdadero arte del casino!
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Disfruta de noches inolvidables entre luces, entretenimiento de primer
                            nivel y la posibilidad de ganar en grande.
                        </p>
                    </motion.div>
                </div>
            </Container>
        </SectionWrapper>
    );
}
