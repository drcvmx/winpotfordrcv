import { motion } from "framer-motion";
import { Calendar, PartyPopper, Clock, MapPin, Trophy, Repeat } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { useTenant } from "@/context/TenantContext";
import { useTenantEvents } from "@/hooks/useTenantEvents";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "party-popper": PartyPopper,
    "clock": Clock,
    "map-pin": MapPin,
    "trophy": Trophy,
};

export function EventsSection() {
    const { content, tenantId } = useTenant();
    const { data: dbEvents } = useTenantEvents(tenantId);
    const { events: mockEvents, features } = content;

    // Use DB events if available, otherwise fallback to mock
    const hasDbEvents = dbEvents && dbEvents.length > 0;
    const activeDbEvents = dbEvents?.filter(e => e.is_active) || [];

    // If no DB events and no mock events, don't render
    if (!hasDbEvents && !mockEvents) return null;

    const eventsTitle = mockEvents?.title || "EVENTOS Y PROMOCIONES";
    const eventsSubtitle = mockEvents?.subtitle || "Descubre nuestras promociones especiales";

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
                        <span className="text-foreground font-bold">{eventsTitle.split(" ")[0]}</span>{" "}
                        <span className="text-primary font-bold">{eventsTitle.split(" ").slice(1).join(" ")}</span>
                    </Heading>
                    <Text size="lg" textColor="muted">{eventsSubtitle}</Text>
                </motion.div>

                {/* Events List - Priority: DB events > Mock events */}
                <div className="space-y-6 mb-12">
                    {hasDbEvents ? (
                        // Render events from database
                        activeDbEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="bg-card border border-border rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
                            >
                                {/* Event Image */}
                                <div className="h-64 lg:h-auto">
                                    {event.image_url ? (
                                        <img
                                            src={event.image_url}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                            <Calendar className="w-16 h-16 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>

                                {/* Event Content */}
                                <div className="p-6 lg:p-8 flex flex-col justify-center">
                                    <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-2">{event.title}</h3>
                                    
                                    {/* Show recurrence text OR specific date */}
                                    {event.is_recurring && event.recurrence_text ? (
                                        <p className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <Repeat className="h-5 w-5 text-blue-400" />
                                            {event.recurrence_text}
                                        </p>
                                    ) : event.event_date ? (
                                        <p className="text-lg font-semibold text-foreground mb-4">
                                            📅 {new Date(event.event_date).toLocaleDateString('es-MX', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </p>
                                    ) : null}
                                    
                                    {event.description && (
                                        <Text textColor="muted">{event.description}</Text>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        // Fallback to mock events
                        mockEvents?.items?.map((event: any, index: number) => (
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
                        ))
                    )}
                </div>

                {/* Features Grid */}
                {features && features.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map((feature: any, index: number) => {
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
                )}
            </Container>
        </SectionWrapper>
    );
}
