import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Heading } from "@/components/ui/typography";

import { useTenant } from "@/context/TenantContext";

export function ProvidersSection() {
    const { content } = useTenant();
    const providersList = content?.games?.providers?.list;

    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: "start", dragFree: true },
        [Autoplay({ delay: 2000, stopOnInteraction: false })]
    );

    if (!providersList || providersList.length === 0) return null;

    return (
        <SectionWrapper background="muted" padding="lg">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Heading as="h2" size="h2" className="mb-2">
                        <span className="text-primary">PROVEEDORES</span>
                    </Heading>
                    <Heading as="h3" size="h3" className="text-foreground">
                        DE JUEGO
                    </Heading>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="overflow-hidden"
                    ref={emblaRef}
                >
                    <div className="flex gap-4">
                        {providersList.map((provider: any, index: number) => (
                            <div
                                key={index}
                                className="flex-shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                            >
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center h-32 hover:bg-white/20 transition-colors">
                                    <img
                                        src={provider.logo}
                                        alt={provider.name}
                                        className="max-h-20 max-w-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </SectionWrapper>
    );
}
