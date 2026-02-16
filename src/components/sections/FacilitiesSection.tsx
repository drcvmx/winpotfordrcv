import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { useTenant } from "@/context/TenantContext";
import { useTenantFacilities } from "@/hooks/useTenantFacilities";
import { normalizeImageUrl } from "@/lib/url-utils";
import { FloatingDecoration } from "@/components/ui/floating-decoration";
import { getBrandDecorations } from "@/data/brand-decorations";

export function FacilitiesSection() {
    const { tenantId, content, data } = useTenant();
    const { data: dbFacilities, isLoading } = useTenantFacilities(tenantId);
    const brandId = data?.brandId || 'winpot';
    const decorations = getBrandDecorations(brandId);

    const galleryImages = dbFacilities && dbFacilities.length > 0
        ? dbFacilities.map(f => ({ src: normalizeImageUrl(f.image_url), alt: f.alt_text || "Instalación" }))
        : content.facilities?.images || [];
    if (!isLoading && galleryImages.length === 0) return null;

    return (
        <SectionWrapper id="instalaciones" background="secondary" className="relative overflow-hidden">
            {/* Decoration: right side */}
            <FloatingDecoration src={decorations[4]} side="right" top="25%" />

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

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-[4/3] rounded-xl bg-muted animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {galleryImages.map((image: { src: string; alt: string }, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="group relative overflow-hidden rounded-xl aspect-[4/3]"
                            >
                                <img
                                    src={normalizeImageUrl(image.src)}
                                    alt={image.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                      e.currentTarget.src = "/placeholder.svg";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </div>
                )}
            </Container>
        </SectionWrapper>
    );
}
