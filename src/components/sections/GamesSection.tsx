import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { useTenant } from "@/context/TenantContext";
import { useTenantGames } from "@/hooks/useTenantGames";
import { Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

interface GameCardProps {
    name: string;
    image: string;
}

function GameCard({ name, image }: GameCardProps) {
    return (
        <div className="flex-[0_0_45%] sm:flex-[0_0_30%] md:flex-[0_0_22%] lg:flex-[0_0_18%] min-w-0 px-2">
            <div className="group relative overflow-hidden casino-card hover:border-primary/50 transition-all duration-300">
                <div className="p-2">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Text className="text-foreground font-semibold text-center text-sm">{name}</Text>
                </div>
            </div>
        </div>
    );
}

interface GameCarouselProps {
    title: string;
    icon: React.ReactNode;
    games: { name: string; image: string }[];
}

function GameCarousel({ title, icon, games }: GameCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "start", skipSnaps: false },
        [Autoplay({ delay: 3000, stopOnInteraction: false })]
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (games.length === 0) return null;

    return (
        <div className="mb-12 last:mb-0">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-6"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{title}</h3>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollPrev}
                        className="rounded-full border-border hover:border-primary hover:bg-primary/10"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollNext}
                        className="rounded-full border-border hover:border-primary hover:bg-primary/10"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </motion.div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -mx-2">
                    {games.map((game, index) => (
                        <GameCard key={`${game.name}-${index}`} name={game.name} image={game.image} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function GamesSection() {
    const { tenantId, content } = useTenant();
    const { data: gamesFromDb, isLoading } = useTenantGames(tenantId);
    const gamesContent = content?.games;

    // Filtrar juegos activos por categoría
    const activeGames = gamesFromDb?.filter(g => g.is_active) || [];
    const newGames = activeGames
        .filter(g => g.category === 'new')
        .sort((a, b) => a.display_order - b.display_order)
        .map(g => ({ name: g.name, image: g.image_url }));
    
    const topGames = activeGames
        .filter(g => g.category === 'top')
        .sort((a, b) => a.display_order - b.display_order)
        .map(g => ({ name: g.name, image: g.image_url }));

    // Títulos de las secciones (del mock-tenant o defaults)
    const sectionTitle = gamesContent?.title || "NUESTROS JUEGOS";
    const sectionSubtitle = gamesContent?.subtitle || "Descubre nuestra selección de juegos de casino";
    const newGamesTitle = gamesContent?.newGames?.title || "Nuevos Juegos";
    const topGamesTitle = gamesContent?.topGames?.title || "Los Más Jugados";

    // No mostrar sección si no hay juegos y está cargando
    if (isLoading) {
        return null;
    }

    // No mostrar si no hay juegos en ninguna categoría
    if (newGames.length === 0 && topGames.length === 0) {
        return null;
    }

    return (
        <SectionWrapper id="juegos" background="secondary">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Heading className="mb-4">
                        <span className="text-foreground font-bold">{sectionTitle.split(" ")[0]}</span>{" "}
                        <span className="text-primary font-bold">{sectionTitle.split(" ").slice(1).join(" ")}</span>
                    </Heading>
                    <Text size="lg" textColor="muted">{sectionSubtitle}</Text>
                </motion.div>

                {newGames.length > 0 && (
                    <GameCarousel
                        title={newGamesTitle}
                        icon={<Sparkles className="w-5 h-5" />}
                        games={newGames}
                    />
                )}

                {topGames.length > 0 && (
                    <GameCarousel
                        title={topGamesTitle}
                        icon={<Star className="w-5 h-5" />}
                        games={topGames}
                    />
                )}
            </Container>
        </SectionWrapper>
    );
}
