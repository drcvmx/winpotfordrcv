import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { useTenant } from "@/context/TenantContext";

export function FacilitiesSection() {
    const { content } = useTenant();
    if (!content.facilities) return null;

    // Fallback images if not provided? Or assume they are provided in context
    const galleryImages = content.facilities.images;

    return (
        <SectionWrapper id="instalaciones" background="secondary">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Heading className="mb-4">
                        <span className="text-foreground font-bold">Nuestras</span>{" "}
                        <span className="text-primary font-bold">Instalaciones</span>
                    </Heading>
                    <Text size="lg" textColor="muted">
                        Conoce nuestro espacio diseñado para tu entretenimiento
                    </Text>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="group relative overflow-hidden rounded-xl aspect-[4/3]"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </SectionWrapper>
    );
}
