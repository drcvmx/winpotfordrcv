import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { useTenant } from "@/context/TenantContext";

export function LocationSection() {
    const { content } = useTenant();
    const { hero, contact } = content;

    if (!hero || !contact) return null;

    return (
        <SectionWrapper id="ubicacion" background="secondary">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Heading className="mb-4">
                        <span className="text-foreground font-bold">Nuestra</span>{" "}
                        <span className="text-primary font-bold">Ubicación</span>
                    </Heading>
                    <Text size="lg" textColor="muted">Encuéntranos en {hero.address.landmark}</Text>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Map Embed */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="rounded-xl overflow-hidden aspect-video lg:aspect-square"
                    >
                        <iframe
                            src={contact.mapEmbed}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación del Casino"
                        />
                    </motion.div>

                    {/* Address Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="bg-card border border-border rounded-xl p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-foreground font-semibold mb-2">Dirección</h3>
                                    <Text size="sm" textColor="muted" className="leading-relaxed">
                                        {hero.address.full}
                                    </Text>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Navigation className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-foreground font-semibold mb-2">Referencia</h3>
                                    <Text size="sm" textColor="muted">
                                        {hero.address.landmark}
                                    </Text>
                                </div>
                            </div>

                            <a
                                href={contact.googleMaps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded flex items-center justify-center gap-2 transition-all"
                            >
                                Abrir en Google Maps
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </SectionWrapper>
    );
}
