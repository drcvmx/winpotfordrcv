import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Heading } from "@/components/ui/typography";

import { useTenant } from "@/context/TenantContext";

const defaultProviders = [
    { name: "Aurify", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/Aurify.webp" },
    { name: "AGS", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/ags-1.webp" },
    { name: "Dreidel", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/dreidel-1.webp" },
    { name: "EGT", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/EGT-1.webp" },
    { name: "FBM", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/fbm.webp" },
    { name: "IGT", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/igt-1.webp" },
    { name: "Zitro", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/zitro-1.webp" },
    { name: "Ainsworth", logo: "https://tuxtla.winpotcasinos.com.mx/wp-content/uploads/2025/08/Ainsworth-1.webp" },
];

export function ProvidersSection() {
    const { content } = useTenant();
    const providersList = content?.games?.providers?.list || defaultProviders;

    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: "start", dragFree: true },
        [Autoplay({ delay: 2000, stopOnInteraction: false })]
    );

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
