import { motion } from "framer-motion";
import { Calendar, PartyPopper, Clock, MapPin, Trophy } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { useTenant } from "@/context/TenantContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "party-popper": PartyPopper,
    "clock": Clock,
    "map-pin": MapPin,
    "trophy": Trophy,
};

export function EventsSection() {
    const { content } = useTenant();
    const { events, features } = content;

    if (!events) return null;

    return (
        <SectionWrapper id="eventos" background="secondary">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Heading className="mb-4">
                        <span className="text-foreground font-bold">{events.title.split(" ")[0]}</span>{" "}
                        <span className="text-primary font-bold">{events.title.split(" ").slice(1).join(" ")}</span>
                    </Heading>
                    <Text size="lg" textColor="muted">{events.subtitle}</Text>
                </motion.div>

                {/* Events List */}
                <div className="space-y-6 mb-12">
                    {events.items.map((event: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="bg-card border border-border rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
                        >
                            {/* Event Image */}
                            <div className="h-64 lg:h-auto">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Event Content */}
                            <div className="p-6 lg:p-8 flex flex-col justify-center">
                                <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-2">{event.title}</h3>
                                <p className="text-lg font-semibold text-foreground mb-4">{event.subtitle}</p>
                                <Text textColor="muted">{event.description}</Text>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features && features.map((feature: any, index: number) => {
                        const Icon = iconMap[feature.icon] || Calendar;
                        return (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors"
                            >
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-foreground font-semibold mb-2">{feature.title}</h3>
                                <Text size="sm" textColor="muted">{feature.description}</Text>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </SectionWrapper>
    );
}
