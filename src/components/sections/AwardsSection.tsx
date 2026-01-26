import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { useTenant } from "@/context/TenantContext";
import { normalizeImageUrl } from "@/lib/url-utils";

export function AwardsSection() {
    const { content } = useTenant();
    const awards = content.awards;

    if (!awards) return null;

    return (
        <SectionWrapper id="premios" background="secondary">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Heading className="mb-4">
                        <span className="text-foreground font-bold">{awards.title}</span>
                    </Heading>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-accent/20"
                >
                    <video
                        src={normalizeImageUrl(awards.video)}
                        controls
                        className="w-full h-auto aspect-video object-cover"
                        poster={awards.poster ? normalizeImageUrl(awards.poster) : undefined}
                    >
                        Your browser does not support the video tag.
                    </video>
                </motion.div>
            </Container>
        </SectionWrapper>
    );
}
