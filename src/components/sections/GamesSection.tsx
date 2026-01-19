import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

// Juegos hardcodeados - mismos para todos los casinos (corporativo)
const NEW_GAMES = [
    { name: "Bao Zhu Zao Fu", image: "/games/bao-zhu-zao-fu.webp" },
    { name: "Epic Empires", image: "/games/epic-empires.webp" },
    { name: "San Fa Tigers", image: "/games/san-fa-tigers.webp" },
    { name: "Taco Mania", image: "/games/taco-mania.webp" },
    { name: "Multi Win 15", image: "/games/multi-win-15.webp" },
    { name: "Go Power", image: "/games/go-power.webp" },
    { name: "Kung Fu Frog", image: "/games/kung-fu-frog.webp" },
    { name: "Spin Bingo", image: "/games/spin-bingo.webp" },
];

const TOP_GAMES = [
    { name: "Legendary Sword", image: "/games/legendary-sword.webp" },
    { name: "Mighty Hammer", image: "/games/mighty-hammer.webp" },
    { name: "Tiger Dragon", image: "/games/tiger-dragon.webp" },
    { name: "Gallina Huevos de Oro", image: "/games/gallina-huevos-oro.webp" },
    { name: "Night Link Medieval", image: "/games/night-link-medieval.webp" },
    { name: "Xtension Link", image: "/games/xtension-link.webp" },
    { name: "San Fa Pandas", image: "/games/san-fa-pandas.webp" },
    { name: "Bao Zhu Zhao", image: "/games/bao-zhu-zhao.webp" },
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
                        <span className="text-foreground font-bold">NUESTROS</span>{" "}
                        <span className="text-primary font-bold">JUEGOS</span>
                    </Heading>
                    <Text size="lg" textColor="muted">Descubre nuestra selección de juegos de casino</Text>
                </motion.div>

                <GameCarousel
                    title="Nuevos Juegos"
                    icon={<Sparkles className="w-5 h-5" />}
                    games={NEW_GAMES}
                />

                <GameCarousel
                    title="Los Más Jugados"
                    icon={<Star className="w-5 h-5" />}
                    games={TOP_GAMES}
                />
            </Container>
        </SectionWrapper>
    );
}
