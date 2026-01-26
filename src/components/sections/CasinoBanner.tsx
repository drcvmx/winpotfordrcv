import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { normalizeImageUrl } from "@/lib/url-utils";

export function CasinoBanner() {
    return (
        <SectionWrapper background="default" padding="lg" className="relative overflow-hidden">
            {/* Decorative dots */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-accent" />
            </div>

            <Container>
                <div className="relative flex flex-col lg:flex-row items-center gap-8 py-8">
                    {/* Horseshoe Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotate: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:absolute lg:-left-8 xl:left-0 flex-shrink-0"
                    >
                        <img
                            src={normalizeImageUrl("https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-deco-img-2-1.webp")}
                            alt="Herradura de la suerte"
                            className="w-32 h-32 lg:w-40 lg:h-40 object-contain"
                        />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center lg:ml-48 xl:ml-52 flex-1"
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
