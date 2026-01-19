import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { useTenant } from "@/context/TenantContext";
import { Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

// Mapeo de nombres de juegos a imágenes locales
const GAME_IMAGE_MAP: Record<string, string> = {
    // Nombres comunes
    "bao zhu zao fu": "/games/bao-zhu-zao-fu.webp",
    "bao zhu zhao": "/games/bao-zhu-zhao.webp",
    "epic empires": "/games/epic-empires.webp",
    "gallina huevos de oro": "/games/gallina-huevos-oro.webp",
    "la gallina de los huevos de oro": "/games/gallina-huevos-oro.webp",
    "gallina huevos oro": "/games/gallina-huevos-oro.webp",
    "go power": "/games/go-power.webp",
    "kung fu frog": "/games/kung-fu-frog.webp",
    "king fu frog": "/games/kung-fu-frog.webp",
    "legendary sword": "/games/legendary-sword.webp",
    "mighty hammer": "/games/mighty-hammer.webp",
    "mighty hammer link up": "/games/mighty-hammer.webp",
    "multi win 15": "/games/multi-win-15.webp",
    "night link medieval": "/games/night-link-medieval.webp",
    "san fa pandas": "/games/san-fa-pandas.webp",
    "san fa tigers": "/games/san-fa-tigers.webp",
    "spin bingo": "/games/spin-bingo.webp",
    "taco mania": "/games/taco-mania.webp",
    "tiger dragon": "/games/tiger-dragon.webp",
    "tiger and dragon": "/games/tiger-dragon.webp",
    "xtension link": "/games/xtension-link.webp",
    // Fallbacks para nombres variantes
    "link up": "/games/multi-win-15.webp",
    "dragon legend": "/games/san-fa-pandas.webp",
    "rising fortune": "/games/legendary-sword.webp",
    "cash connection": "/games/gallina-huevos-oro.webp",
    "mega fire blaze": "/games/taco-mania.webp",
    "fortune link": "/games/xtension-link.webp",
    "huff n puff money mansion": "/games/epic-empires.webp",
    "majestic beast": "/games/san-fa-tigers.webp",
    "mega king": "/games/bao-zhu-zao-fu.webp",
};

// Fallback default para juegos sin mapeo
const DEFAULT_GAME_IMAGE = "/games/epic-empires.webp";

// Función para obtener imagen local basada en nombre del juego
function getLocalGameImage(name: string, originalImage?: string): string {
    // Si ya es una ruta local válida, usarla
    if (originalImage?.startsWith("/games/")) {
        return originalImage;
    }
    
    // Buscar en el mapeo por nombre (normalizado a minúsculas)
    const normalizedName = name.toLowerCase().trim();
    return GAME_IMAGE_MAP[normalizedName] || DEFAULT_GAME_IMAGE;
}

// Juegos por defecto si el tenant no tiene
const DEFAULT_NEW_GAMES = [
    { name: "Bao Zhu Zao Fu", image: "/games/bao-zhu-zao-fu.webp" },
    { name: "Epic Empires", image: "/games/epic-empires.webp" },
    { name: "San Fa Tigers", image: "/games/san-fa-tigers.webp" },
    { name: "Taco Mania", image: "/games/taco-mania.webp" },
    { name: "Multi Win 15", image: "/games/multi-win-15.webp" },
];

const DEFAULT_TOP_GAMES = [
    { name: "Legendary Sword", image: "/games/legendary-sword.webp" },
    { name: "Mighty Hammer", image: "/games/mighty-hammer.webp" },
    { name: "Tiger Dragon", image: "/games/tiger-dragon.webp" },
    { name: "Gallina Huevos de Oro", image: "/games/gallina-huevos-oro.webp" },
    { name: "Night Link Medieval", image: "/games/night-link-medieval.webp" },
];

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
                    {games.map((game) => (
                        <GameCard key={game.name} name={game.name} image={game.image} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function GamesSection() {
    const { content } = useTenant();
    const games = content?.games;

    // Obtener juegos del tenant o usar defaults
    const newGamesData = games?.newGames?.items || DEFAULT_NEW_GAMES;
    const topGamesData = games?.topGames?.items || DEFAULT_TOP_GAMES;

    // Mapear a imágenes locales
    const newGames = newGamesData.map((game: { name: string; image?: string }) => ({
        name: game.name,
        image: getLocalGameImage(game.name, game.image),
    }));

    const topGames = topGamesData.map((game: { name: string; image?: string }) => ({
        name: game.name,
        image: getLocalGameImage(game.name, game.image),
    }));

    const sectionTitle = games?.title || "NUESTROS JUEGOS";
    const sectionSubtitle = games?.subtitle || "Descubre nuestra selección de juegos de casino";
    const newGamesTitle = games?.newGames?.title || "Nuevos Juegos";
    const topGamesTitle = games?.topGames?.title || "Los Más Jugados";

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

                <GameCarousel
                    title={newGamesTitle}
                    icon={<Sparkles className="w-5 h-5" />}
                    games={newGames}
                />

                <GameCarousel
                    title={topGamesTitle}
                    icon={<Star className="w-5 h-5" />}
                    games={topGames}
                />
            </Container>
        </SectionWrapper>
    );
}
