import { BrandTheme, TenantConfig } from "@/types/tenant";

const SHARED_PROVIDERS = [
    { name: "Aurify", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/Aurify.webp" },
    { name: "AGS", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/ags-1.webp" },
    { name: "Dreidel", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/dreidel-1.webp" },
    { name: "EGT", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/EGT-1.webp" },
    { name: "FBM", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/fbm.webp" },
    { name: "IGT", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/igt-1.webp" },
    { name: "Zitro", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/zitro-1.webp" },
    { name: "Ainsworth", logo: "https://tuxtla.winpotcasinos.com.mx/wp-content/uploads/2025/08/Ainsworth-1.webp" },
];

// ==========================================
// BRAND THEMES (VISUAL PRESETS)
// ==========================================

export const BRAND_THEMES: Record<string, BrandTheme> = {
    winpot: {
        id: 'winpot',
        name: 'Winpot Casino',
        colors: {
            primary: '352 100% 58%', // Winpot Red
            secondary: '209 65% 11%', // Navy
            accent: '45 100% 51%', // Gold
            background: '204 69% 8%', // Deep Navy Background
            foreground: '0 0% 100%',
            card: '209 64% 10%',
            cardForeground: '0 0% 100%',
            muted: '209 64% 10%', // Match Card
            mutedForeground: '200 15% 73%',
            border: '209 50% 15%',
            ring: '45 100% 51%'
        },
        fonts: {
            // ONLY Winpot gets the "Home" font (Poppins)
            heading: "'Poppins', sans-serif",
            body: "'Poppins', sans-serif"
        },
        cssVars: {
            '--hero-gradient': 'linear-gradient(135deg, hsl(209 65% 11%) 0%, hsl(204 69% 8%) 100%)',
            '--body-background': 'hsl(204 69% 8%)',
        }
    },
    capri: {
        id: 'capri',
        name: 'Capri Luxury Casino',
        colors: {
            primary: '43 66% 52%', // #D4AF37 Gold (Token: capri-gold/primary)
            secondary: '340 77% 21%', // #5E1A2E Dark Burgundy
            accent: '51 100% 50%', // #FFD700 Golden Yellow
            background: '340 70% 12%', // #2B0815 Deep Burgundy
            foreground: '39 50% 85%', // #E8D4A8 Cream
            card: '340 77% 21%', // Match Secondary/Dark Burgundy
            cardForeground: '39 50% 85%',
            muted: '340 74% 25%', // #6B1035 Burgundy
            mutedForeground: '39 50% 85%',
            border: '43 66% 52%',
            ring: '43 66% 52%'
        },
        fonts: {
            heading: "'Playfair Display', serif",
            body: "'Poppins', sans-serif"
        },
        cssVars: {
            '--capri-gradient': 'radial-gradient(circle at center, #6B1035 0%, #2B0815 100%)',
            '--hero-gradient': 'radial-gradient(circle at center, #6B1035 0%, #2B0815 100%)',
            '--body-background': '#2B0815',
            '--font-heading': "'Playfair Display', serif"
        }
    },
    diamonds: {
        id: 'diamonds',
        name: 'Diamonds Casino',
        colors: {
            primary: '336 100% 58%', // #FF2B7E Pink
            secondary: '345 77% 24%', // #6B0F2A Dark Burgundy
            accent: '43 66% 52%', // #D4AF37 Gold
            background: '345 70% 17%', // #4A0E1F Deep Burgundy
            foreground: '0 0% 100%',
            card: '345 77% 24%', // Dark Burgundy
            cardForeground: '0 0% 100%',
            muted: '345 77% 24%', // Match Secondary
            mutedForeground: '340 13% 86%', // #E0D5D8 Cream
            border: '336 100% 58%',
            ring: '336 100% 58%'
        },
        fonts: {
            heading: "'Poppins', sans-serif",
            body: "'Poppins', sans-serif"
        },
        cssVars: {
            '--hero-gradient': 'linear-gradient(135deg, #8B1538 0%, #4A0E1F 100%)',
            '--body-background': '#4A0E1F',
        }
    },
    veneto: {
        id: 'veneto',
        name: 'Veneto Casino',
        colors: {
            primary: '43 66% 52%', // #D4AF37 Gold
            secondary: '0 0% 0%', // #000000 Pure Black (requested)
            accent: '43 66% 52%', // Gold
            background: '0 0% 0%', // #000000 Pure Black
            foreground: '0 0% 100%', // White
            card: '0 0% 0%', // #000000 Black (requested)
            cardForeground: '0 0% 100%',
            muted: '0 0% 0%', // #000000 Black
            mutedForeground: '0 0% 70%', // Gray 70%
            border: '43 66% 52%',
            ring: '43 66% 52%'
        },
        fonts: {
            heading: "'Playfair Display', serif",
            body: "'Poppins', sans-serif"
        },
        cssVars: {
            '--hero-gradient': 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15) 0%, #000000 80%)',
            '--body-background': '#000000',
            '--font-heading': "'Playfair Display', serif",
            '--card': '#000000',
        }
    }
};

// ==========================================
// TENANT INSTANCES (CONTENT)
// ==========================================

export const TENANTS: Record<string, TenantConfig> = {
    // ------------------------------------------------------------
    // WINPOT TUXTLA
    // ------------------------------------------------------------
    tuxtla: {
        id: 'tuxtla',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Tuxtla",
                city: "Tuxtla",
                state: "Chiapas",
                location: "Plaza Ámbar Fashion Mall"
            },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Instalaciones", href: "#instalaciones" },
                    { name: "Nosotros", href: "#nosotros" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            },
            hero: {
                title: "Winpot",
                subtitle: "TUXTLA",
                description: "Cumplimos 5 años siendo la mejor experiencia de emociones en Tuxtla. Ahora con buffet matutino y eventos musicales que te encantarán.",
                image: "/tenants/tuxtla/hero/hero-main.webp",
                schedule: {
                    weekdays: "Domingo a Miércoles de 9:00 a.m. a 4:00 a.m.",
                    weekend: "Jueves a Sábado de 9:00 a.m. a 6:00 a.m."
                },
                address: {
                    full: "Plaza Ámbar Fashion Mall, Carretera Panamericana a Chiapa de Corzo #651 Col. El Retiro, Tuxtla Gutiérrez.",
                    landmark: "Plaza Ámbar Fashion Mall"
                },
                ctaButtons: [
                    { text: "Ver Ubicación", href: "#ubicacion", variant: "primary" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "secondary" }
                ]
            },
            contact: {
                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.359850110368!2d-93.08940842403566!3d16.75876098402506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ecd966033b0067%3A0x7d65427d14068560!2sPlaza%20%C3%81mbar%20Fashion%20Mall!5e0!3m2!1ses!2smx!4v1703641234567!5m2!1ses!2smx",
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Plaza+Ámbar+Fashion+Mall+Tuxtla+Gutiérrez"
            },
            events: {
                title: "Eventos Especiales",
                subtitle: "Vive la emoción con nuestros eventos",
                layout: "featured",
                featuredEvent: {
                    title: "Buffet Matutino y Eventos Musicales",
                    description: "Disfruta de nuestro nuevo buffet matutino y eventos musicales en vivo",
                    image: "https://tuxtla.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-tuxtla-evento-1.webp"
                },
                items: []
            },
            games: {
                title: "Nuestros Juegos",
                subtitle: "Las mejores marcas de máquinas",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: SHARED_PROVIDERS
                },
                newGames: { title: "JUEGOS NUEVOS", items: [] },
                topGames: { title: "JUEGOS TOP", items: [] }
            },
            features: [
                { id: "buffet", title: "Buffet Matutino", description: "Disfruta de nuestro delicioso buffet matutino", icon: "coffee" },
                { id: "music", title: "Eventos Musicales", description: "Música en vivo y entretenimiento", icon: "music" },
                { id: "vip", title: "Áreas VIP", description: "Espacios exclusivos para ti", icon: "crown" },
                { id: "machines", title: "Última Generación", description: "Máquinas de las mejores marcas", icon: "gamepad" }
            ],
            facilities: {
                images: [
                    { src: "https://tuxtla.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-tuxtla-interior-1.webp", alt: "Tuxtla Interior" }
                ]
            },
            about: {
                title: "Acerca del Casino",
                content: "Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento. Con más de 15 años de experiencia en el mercado.",
                image: "https://tuxtla.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15", label: "Años de Experiencia" },
                    { value: "18", label: "Sucursales" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // WINPOT BOCA DEL RIO
    // ------------------------------------------------------------
    boca: {
        id: 'boca',
        brandId: 'winpot',
        content: {
            metadata: { title: "Winpot Boca del Río" },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" }
                ]
            },
            hero: {
                title: "Winpot",
                subtitle: "BOCA DEL RÍO",
                description: "El casino más grande y emocionante de Veracruz. Abierto las 24 horas del día.",
                image: "/tenants/boca/hero/hero-main.webp",
                schedule: { weekdays: "Abierto las 24 horas" },
                address: {
                    full: "Blvd. Adolfo Ruiz Cortines 3421, Playa de Oro, 94293 Boca del Río, Ver.",
                    landmark: "Junto a Plaza Andamar"
                },
                ctaButtons: [
                    { text: "Ver Mapa", href: "#ubicacion", variant: "primary" }
                ]
            },
            contact: {
                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.5714777551066!2d-96.10821642398457!3d19.14936308207038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c3413697669527%3A0xe54d662136e09886!2sPlaza%20Sol!5e0!3m2!1ses!2smx!4v1703641234567!5m2!1ses!2smx",
                googleMaps: "https://maps.app.goo.gl/BocaExample"
            },
            events: {
                title: "Eventos Especiales",
                subtitle: "Vive la emoción con nuestros eventos",
                layout: "list",
                items: []
            },
            games: {
                title: "Nuestros Juegos",
                subtitle: "Las mejores máquinas y juegos del casino",
                layout: "tabs",
                providers: {
                    layout: "carousel",
                    list: SHARED_PROVIDERS
                },
                newGames: {
                    title: "LO MÁS NUEVO",
                    items: [
                        { name: "Link Up", image: "/games/multi-win-15.webp" },
                        { name: "Dragon Legend", image: "/games/san-fa-pandas.webp" },
                    ]
                },
                topGames: {
                    title: "FAVORITOS BOCA",
                    items: [
                        { name: "Rising Fortune", image: "/games/legendary-sword-veneto.webp" },
                        { name: "Cash Connection", image: "/games/gallina-huevos-veneto.webp" },
                    ]
                }
            },
            facilities: {
                images: [
                    { src: "/facilities/capri-1.webp", alt: "Boca Interior" },
                    { src: "/facilities/capri-2.webp", alt: "Boca Sala" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // WINPOT PUNTO SUR
    // ------------------------------------------------------------
    puntosur: {
        id: 'puntosur',
        brandId: 'winpot',
        content: {
            metadata: { title: "Winpot Punto Sur" },
            navigation: {
                menuItems: [{ name: "Inicio", href: "#inicio" }, { name: "Juegos", href: "#juegos" }, { name: "Ubicación", href: "#ubicacion" }]
            },
            hero: {
                title: "Winpot",
                subtitle: "PUNTO SUR",
                description: "Tu destino de entretenimiento en el sur de la ciudad.",
                image: "/tenants/puntosur/hero/hero-main.webp",
                schedule: { weekdays: "Lun-Dom 10:00 am - 4:00 am" },
                address: {
                    full: "Av. Punto Sur s/n, Los Gavilanes, Tlajomulco de Zúñiga, Jal.",
                    landmark: "Plaza Punto Sur"
                }
            },
            features: [
                { id: "location", title: "Dentro de Punto Sur", description: "Ubicado en el centro comercial", icon: "map-pin" },
                { id: "hours", title: "Horarios Extendidos", description: "Jue-Sáb hasta 6:00 a.m.", icon: "clock" }
            ],
            games: {
                title: "Zona de Juegos",
                subtitle: "Diversión en Punto Sur",
                providers: {
                    list: SHARED_PROVIDERS
                },
                newGames: {
                    title: "ESTRENOS",
                    items: [
                        { name: "Mega Fire Blaze", image: "/games/taco-mania.webp" },
                        { name: "Buffalo Blitz", image: "/games/san-fa-tigers.webp" },
                    ]
                },
                topGames: {
                    title: "MÁS JUGADOS",
                    items: [
                        { name: "Blue Wizard", image: "/games/multi-win-15.webp" },
                        { name: "Red Wizard", image: "/games/bao-zhu-zhao.webp" },
                    ]
                }
            },
            facilities: {
                images: [
                    { src: "https://puntosur.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-punto-sur-interior-1.webp", alt: "Punto Sur Interior" },
                    { src: "https://puntosur.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-punto-sur-interior-2.webp", alt: "Punto Sur Máquinas" }
                ]
            }
        }
    },


    // ------------------------------------------------------------
    // WINPOT TONALÁ
    // ------------------------------------------------------------
    tonala: {
        id: 'tonala',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Tonalá",
                description: "El ambiente de fiesta se vive aquí todos los días. En Tonalá, somos sinónimo de diversión y entretenimiento.",
                city: "Tonalá",
                state: "Jalisco"
            },
            hero: {
                title: "Winpot",
                subtitle: "TONALÁ",
                description: "El ambiente de fiesta se vive aquí todos los días. En Tonalá, somos sinónimo de diversión y entretenimiento.",
                image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-metrocentro-hero-2.webp",
                schedule: {
                    weekdays: "Lunes a Domingo de 11:00 a.m. a 4:00 a.m."
                },
                address: {
                    full: "Av. Patria No. 850 Local A-7, Col. Villas de Oriente, Tonalá, Jalisco. C.P. 45403",
                    landmark: "Plaza Viva Patria"
                },
                ctaButtons: [
                    { text: "Ver Ubicación", href: "#ubicacion", variant: "primary" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "secondary" }
                ]
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Av.+Patria+850+Tonala+Jalisco",
                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.5!2d-103.2345!3d20.6234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPlaza+Viva+Patria!5e0!3m2!1ses!2smx!4v1234567890",
                phone: "+52 33 1234 5678",
                email: "tonala@winpotcasinos.com.mx",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/winpotcasinos", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/winpotcasinos", icon: "instagram" },
                    { platform: "twitter", url: "https://twitter.com/winpotcasinos", icon: "twitter" }
                ]
            },
            features: [
                { id: "party", title: "Ambiente de Fiesta", description: "Diversión y entretenimiento todos los días", icon: "party-popper" },
                { id: "hours", title: "Horario Extendido", description: "Abierto hasta las 4:00 a.m.", icon: "clock" },
                { id: "location", title: "Plaza Viva Patria", description: "Lagos de Oriente, Tonalá", icon: "map-pin" },
                { id: "games", title: "Juegos Premium", description: "Selección de juegos de última generación", icon: "trophy" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: SHARED_PROVIDERS
                },
                newGames: {
                    title: "JUEGOS NUEVOS",
                    items: [
                        { name: "Multi Win 15", image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/08/MULTI-WIN-15.webp" },
                        { name: "San Fa Tigers", image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/08/SAN-FA-TIGERS.webp" },
                        { name: "Tiger and Dragon", image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/08/TIGER-AND-DRAGON.webp" },
                        { name: "Xtension Link", image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/08/XTENSION-LINK-1.webp" },
                        { name: "La Gallina de los Huevos de Oro", image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/08/GALLINA-DE-LOS-HUEVOS-DE-ORO.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "Huff N Puff Money Mansion", image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/08/HUFF-N-PUFF-MONEY-MANSION.webp" },
                        { name: "King Fu Frog", image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/08/KING-FU-FROG.webp" },
                        { name: "Majestic Beast", image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/08/Majestic-Beast.webp" },
                        { name: "Mega King", image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/08/mega-king.webp" },
                        { name: "Mighty Hammer Link Up", image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/08/MIGHTY-HAMMER-LINK-UP.webp" }
                    ]
                }
            },
            events: {
                title: "EVENTOS Y PROMOCIONES",
                subtitle: "El ambiente de fiesta todos los días",
                layout: "featured",
                items: [
                    {
                        title: "Bingo Cantado",
                        subtitle: "Todos los Domingos",
                        description: "¡Ya viene el bingo! Ven a participar por fabulosos premios en nuestros domingos de bingo cantado.",
                        image: "/tenants/tonala/events/evento-bingo.webp"
                    },
                    {
                        title: "Bingo Cantado",
                        subtitle: "Lunes a Jueves",
                        description: "¿Ya tienes tus cartones? Porque el bingo ya comienza con fantásticos premios en efectivo y más horas de diversión, solo en Winpot Casino.",
                        image: "/tenants/tonala/events/evento-grupo.webp"
                    }
                ]
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento. Con más de 15 años de experiencia en el mercado, Winpot y sus marcas asociadas buscan crear un ambiente seguro, divertido y emocionante para cada uno de sus usuarios.",
                image: "https://tonala.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" },
                    { value: "2020", label: "Proyecto Online" }
                ]
            },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // WINPOT PLAYA DEL CARMEN
    // ------------------------------------------------------------
    playa: {
        id: 'playa',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Playa del Carmen",
                description: "Espacios renovados para brindarte una experiencia de lujo y entretenimiento. Sin duda, el mejor lugar para disfrutar tus partidos y eventos deportivos favoritos.",
                city: "Playa del Carmen",
                state: "Quintana Roo"
            },
            hero: {
                title: "Winpot",
                subtitle: "PLAYA DEL CARMEN",
                description: "¡Te esperamos para vivir el verdadero arte del casino! Disfruta de noches inolvidables entre luces, entretenimiento de primer nivel y la posibilidad de ganar en grande.",
                image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-metrocentro-hero-2.webp",
                schedule: { weekdays: "Lunes a Domingo de 10:00 am a 3:00 am" },
                address: {
                    full: "Av. P.º Central Supermanzana 52 Manzana, 1 Lote a1, Col. Nuevo Centro Urbano, 77723 Playa del Carmen, Q.R.",
                    landmark: "Nuevo Centro Urbano"
                },
                ctaButtons: [
                    { text: "¿Cómo Llegar?", href: "#ubicacion", variant: "primary" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "secondary" }
                ]
            },
            contact: {
                googleMaps: "https://maps.app.goo.gl/aAkuAZ3khHEGHZH5A",
                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.5!2d-87.073!3d20.629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWinpot+Playa+del+Carmen!5e0!3m2!1ses!2smx!4v1",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/WinpotPlaya", icon: "facebook" }
                ]
            },
            games: {
                title: "Nuestros Juegos",
                subtitle: "La mejor selección de juegos",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: SHARED_PROVIDERS
                },
                newGames: {
                    title: "JUEGOS NUEVOS",
                    items: [
                        { name: "Multi Win 8", image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/08/MULTI-WIN-8.webp" },
                        { name: "Huff N Puff Money Mansion", image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/08/HUFF-N-PUFF-MONEY-MANSION.webp" },
                        { name: "La Gallina de los Huevos de Oro", image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/08/GALLINA-DE-LOS-HUEVOS-DE-ORO.webp" },
                        { name: "Xtension Link", image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/08/XTENSION-LINK-1.webp" },
                        { name: "Multi Win 15", image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/08/MULTI-WIN-15.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "Mighty Hammer Link Up", image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/08/MIGHTY-HAMMER-LINK-UP.webp" },
                        { name: "Tiger and Dragon", image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/08/TIGER-AND-DRAGON.webp" },
                        { name: "Western Dice", image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/08/WESTERN-DICE.webp" },
                        { name: "Gold Blitz", image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/08/GOLD-BLITZ.webp" },
                        { name: "Huff N Puff Money Mansion", image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/08/HUFF-N-PUFF-MONEY-MANSION-1.webp" }
                    ]
                }
            },
            events: {
                title: "EVENTOS",
                layout: "featured",
                featuredEvent: {
                    title: "Bingo Cantado",
                    description: "¿Ya tienes tus cartones? Porque la diversión del bingo continua a lo grande, te esperamos. Domingo a Jueves.",
                    image: "/tenants/playa/events/evento-bingo.webp"
                },
                items: [
                    {
                        title: "Noche de Despecho",
                        description: "¡Noche de Despecho! Nos vemos este 28 de agosto para pasar una noche de música y gran diversión, solo en Winpot Casino.",
                        image: "/tenants/playa/events/evento-grupo.webp"
                    }
                ]
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Espacios renovados para brindarte una experiencia de lujo y entretenimiento. ¡Sin duda, el mejor lugar para disfrutar tus partidos y eventos deportivos favoritos!",
                image: "https://playa.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" },
                    { value: "2020", label: "Proyecto Online" }
                ]
            },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // WINPOT PUEBLA
    // ------------------------------------------------------------
    puebla: {
        id: 'puebla',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Puebla",
                description: "Un ambiente de primer nivel y amplias instalaciones listas para recibirte. 2 áreas de máquinas, 2 áreas de Juego en Vivo y un sazón en nuestros platillos que te encantará.",
                city: "Puebla",
                state: "Puebla"
            },
            hero: {
                title: "Winpot",
                subtitle: "PUEBLA",
                description: "Un ambiente de primer nivel y amplias instalaciones listas para recibirte. 2 áreas de máquinas, 2 áreas de Juego en Vivo y un sazón en nuestros platillos que te encantará.",
                image: "https://puebla.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-metrocentro-hero-2.webp",
                schedule: { weekdays: "Lunes a Domingo de 10:00 a.m. a 3:00 a.m." },
                address: {
                    full: "Centro Comercial Pabellon Circuito Juan Pablo II No. 1757 Int 2 Col. La Noria Puebla, Puebla C.P. 72410",
                    landmark: "Plaza Pabellón"
                },
                ctaButtons: [
                    { text: "Ver Ubicación", href: "#ubicacion", variant: "outline" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "primary" }
                ]
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Centro+Comercial+Pabellon+Puebla",
                phone: "+52 222 123 4567",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/winpotcasinos", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/winpotcasinos", icon: "instagram" },
                    { platform: "twitter", url: "https://twitter.com/winpotcasinos", icon: "twitter" }
                ]
            },
            features: [
                { id: "machines", title: "2 Áreas de Máquinas", description: "Amplias instalaciones para tu comodidad", icon: "building-2" },
                { id: "live", title: "2 Áreas de Juego en Vivo", description: "Experiencia de casino premium", icon: "users" },
                { id: "gastronomy", title: "Gastronomía Exclusiva", description: "Platillos con sazón único", icon: "chef-hat" },
                { id: "premium", title: "Ambiente de Primer Nivel", description: "Instalaciones premium y modernas", icon: "star" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: SHARED_PROVIDERS
                },
                newGames: {
                    title: "JUEGOS NUEVOS",
                    items: [
                        { name: "La Gallina de los Huevos de Oro", image: "https://puebla.winpotcasinos.com.mx/wp-content/uploads/2025/08/LA-GALLINA-DE-LOS-HUEVOS-DE-ORO.webp" },
                        { name: "Huff N Puff Money Mansion", image: "https://puebla.winpotcasinos.com.mx/wp-content/uploads/2025/08/HUFF-N-PUFF-MONEY-MANSION.webp" },
                        { name: "Multi Win 8", image: "https://puebla.winpotcasinos.com.mx/wp-content/uploads/2025/08/MULTI-WIN-8.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "Mo Mummy Mighty Pyramid", image: "https://puebla.winpotcasinos.com.mx/wp-content/uploads/2025/08/MO-MUMMY-MIGHTY-PYRAMID.webp" },
                        { name: "Huff N Puff Money Mansion", image: "https://puebla.winpotcasinos.com.mx/wp-content/uploads/2025/08/HUFF-N-PUFF-MONEY-MANSION.webp" },
                        { name: "Imperial Ascension", image: "https://puebla.winpotcasinos.com.mx/wp-content/uploads/2025/08/IMPERIAL-ASCENSION-1.webp" }
                    ]
                }
            },
            events: {
                title: "EVENTOS Y PROMOCIONES",
                layout: "featured",
                featuredEvent: {
                    title: "Instalaciones de Primer Nivel",
                    description: "2 áreas de máquinas y 2 áreas de Juego en Vivo con ambiente de primer nivel.",
                    image: "https://puebla.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-puebla-evento-1.webp"
                },
                items: [
                    { title: "Gastronomía Exclusiva", description: "Un sazón en nuestros platillos que te encantará.", image: "https://puebla.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-puebla-evento-2.webp" }
                ]
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento. Con más de 15 años de experiencia en el mercado, Winpot y sus marcas asociadas buscan crear un ambiente seguro, divertido y emocionante para cada uno de sus usuarios.",
                image: "https://puebla.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" },
                    { value: "2020", label: "Proyecto Online" }
                ]
            },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // WINPOT PACHUCA
    // ------------------------------------------------------------
    pachuca: {
        id: 'pachuca',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Pachuca",
                description: "Instalaciones remodeladas. Diseñadas para brindarte la mejor experiencia de juego en Pachuca.",
                city: "Pachuca de Soto",
                state: "Hidalgo"
            },
            hero: {
                title: "Winpot",
                subtitle: "PACHUCA",
                description: "Instalaciones remodeladas. Diseñadas para brindarte la mejor experiencia de juego en Pachuca.",
                image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-metrocentro-hero-2.webp",
                schedule: { weekdays: "Lunes a Domingo de 10:00 a.m a 4:00 a.m" },
                address: {
                    full: "Camino Real de La Plata, Zona Plateada, 42080 Pachuca de Soto, Hgo",
                    landmark: "Zona Plateada"
                },
                ctaButtons: [
                    { text: "Ver Ubicación", href: "#ubicacion", variant: "outline" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "primary" }
                ]
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Camino+Real+de+la+Plata+Pachuca+Hidalgo",
                phone: "+52 771 123 4567",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/winpotcasinos", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/winpotcasinos", icon: "instagram" },
                    { platform: "twitter", url: "https://twitter.com/winpotcasinos", icon: "twitter" }
                ]
            },
            features: [
                { id: "remodeled", title: "Instalaciones Remodeladas", description: "Espacios renovados para tu comodidad", icon: "wrench" },
                { id: "events", title: "Eventos en Vivo", description: "Música y entretenimiento de primera", icon: "music" },
                { id: "schedule", title: "Horario Extendido", description: "Abierto hasta las 4:00 a.m.", icon: "clock" },
                { id: "providers", title: "8 Proveedores Premium", description: "Los mejores juegos del mercado", icon: "trophy" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: SHARED_PROVIDERS
                },
                newGames: {
                    title: "JUEGOS NUEVOS",
                    items: [
                        { name: "Huff N Puff Money Mansion", image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/08/HUFF-N-PUFF-MONEY-MANSION.webp" },
                        { name: "Mega Diamond", image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/08/MEGA-DIAMOND.webp" },
                        { name: "Tiger and Dragon", image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/08/TIGER-AND-DRAGON.webp" },
                        { name: "Taco Mania", image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/08/TACO-MANIA.webp" },
                        { name: "Gallina de los Huevos de Oro", image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/08/GALLINA-DE-LOS-HUEVOS-DE-ORO.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "Tiger and Dragon", image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/08/TIGER-AND-DRAGON-1.webp" },
                        { name: "Shamrock Fortunes", image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/08/SHAMROCK-FORTUNES.webp" },
                        { name: "Mighty Hammer Link Up", image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/08/MIGHTY-HAMMER-LINK-UP.webp" },
                        { name: "Mega Choice", image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/08/mega-choice.webp" },
                        { name: "Huff N Puff Money Mansion", image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/08/HUFF-N-PUFF-MONEY-MANSION-1.webp" }
                    ]
                }
            },
            events: {
                title: "EVENTOS Y PROMOCIONES",
                layout: "featured",
                featuredEvent: {
                    title: "Evento Especial Sonora San Francisco",
                    description: "Disfruta de música en vivo y entretenimiento de primera clase.",
                    image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-evento-sonora-san-francisco.webp"
                },
                items: [
                    {
                        title: "Los Dandys en Vivo",
                        description: "Una noche inolvidable con la música de Los Dandys.",
                        image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-evento-los-dandys.webp"
                    }
                ]
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Instalaciones remodeladas. Diseñadas para brindarte la mejor experiencia de juego en Pachuca.",
                image: "https://pachuca.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" },
                    { value: "2020", label: "Proyecto Online" }
                ]
            },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },


    // ------------------------------------------------------------
    // WINPOT MANDARIN
    // ------------------------------------------------------------
    mandarin: {
        id: 'mandarin',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Mexicali Mandarin",
                description: "Diversión, un clima fresco y nuestra gran variedad de juegos. Fórmula perfecta para pasar el día. Lo mejor en Mexicali!",
                city: "Mexicali",
                state: "Baja California"
            },
            hero: {
                title: "Winpot",
                subtitle: "MEXICALI MANDARIN",
                description: "Diversión, un clima fresco y nuestra gran variedad de juegos. Fórmula perfecta para pasar el día. Lo mejor en Mexicali!",
                image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-metrocentro-hero-2.webp",
                schedule: { weekdays: "Lunes a Domingo Abierto las 24 hrs." },
                address: {
                    full: "Plaza Mandarin, Blvd. Benito Juárez 2252 Local 60 Interior 1, Sánchez Taboada, 21360 Mexicali, B.C.",
                    landmark: "Plaza Mandarin"
                },
                ctaButtons: [
                    { text: "Ver Ubicación", href: "#ubicacion", variant: "primary" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "secondary" }
                ]
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Plaza+Mandarin+Benito+Juarez+Mexicali",
                mapEmbed: "",
                phone: "+52 686 123 4567",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/winpotcasinos", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/winpotcasinos", icon: "instagram" },
                    { platform: "twitter", url: "https://twitter.com/winpotcasinos", icon: "twitter" }
                ]
            },
            features: [
                { id: "24hrs", title: "Abierto 24 Horas", description: "Servicio todos los días las 24 hrs.", icon: "clock" },
                { id: "clima", title: "Clima Fresco", description: "Ambiente climatizado perfectamente", icon: "thermometer-snowflake" },
                { id: "ubicacion", title: "Plaza Mandarin", description: "Ubicación privilegiada en Mexicali", icon: "map-pin" },
                { id: "juegos", title: "Gran Variedad de Juegos", description: "8 proveedores de primera clase", icon: "trophy" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: [
                        { name: "Dreidel", logo: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/dreidel-1.webp" },
                        { name: "E-Gaming", logo: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/e-gaming-.webp" },
                        { name: "EGT", logo: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/EGT-1.webp" },
                        { name: "FBM", logo: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/fbm.webp" },
                        { name: "IGT", logo: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/igt-1.webp" },
                        { name: "Konami", logo: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/konami.webp" },
                        { name: "Ainsworth", logo: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/Ainsworth-1.webp" },
                        { name: "AGS", logo: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/ags-1.webp" }
                    ]
                },
                newGames: {
                    title: "JUEGOS NUEVOS",
                    items: [
                        { name: "Devils Link", image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/DEVILS-LINK.webp" },
                        { name: "Legendary Sword", image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/LEGENDARY-SWORD-1.webp" },
                        { name: "Multi Win 15", image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/MULTI-WIN-15.webp" },
                        { name: "San Fa Tigers", image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/SAN-FA-TIGERS.webp" },
                        { name: "Xtension Link", image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/XTENSION-LINK-1.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "Endless Treasure", image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/ENDLESS-TREASURE.webp" },
                        { name: "Mega King", image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/mega-king.webp" },
                        { name: "Plus 3", image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/plus-3.webp" },
                        { name: "Sacred Guardians", image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/SACRED-GUARDIANS.webp" },
                        { name: "Tiger and Dragon", image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/08/TIGER-AND-DRAGON.webp" }
                    ]
                }
            },
            events: {
                title: "EVENTOS Y PROMOCIONES",
                subtitle: "Clima fresco y gran variedad de entretenimiento",
                layout: "featured",
                featuredEvent: {
                    title: "Ambiente Climatizado",
                    description: "Diversión con un clima fresco y nuestra gran variedad de juegos. Fórmula perfecta para pasar el día.",
                    image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-mexicali-mandarin-evento-1.webp"
                },
                items: [
                    {
                        title: "Lo Mejor en Mexicali",
                        description: "La mejor experiencia de entretenimiento en Mexicali.",
                        image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-mexicali-mandarin-evento-2.webp"
                    }
                ]
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento. Con más de 15 años de experiencia en el mercado, Winpot y sus marcas asociadas buscan crear un ambiente seguro, divertido y emocionante para cada uno de sus usuarios.",
                image: "https://mandarin.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" },
                    { value: "2020", label: "Proyecto Online" }
                ]
            },
            facilities: { images: [] },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // WINPOT MERIDA
    // ------------------------------------------------------------
    merida: {
        id: 'merida',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Mérida",
                description: "Una experiencia distinta en Mérida. ¡Atrévete a vivirla! Encuéntranos en Plaza Las Américas.",
                city: "Mérida",
                state: "Yucatán"
            },
            hero: {
                title: "Winpot",
                subtitle: "MÉRIDA",
                description: "Una experiencia distinta en Mérida. ¡Atrévete a vivirla! Encuéntranos en Plaza Las Américas.",
                image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-metrocentro-hero-2.webp",
                schedule: {
                    weekdays: "Domingo a Jueves 9:00 a.m. a 3:00 a.m.",
                    weekends: "Viernes y Sábado 9:00 a.m. a 4:00 a.m."
                },
                address: {
                    full: "Plaza Las Américas, C. sz 327, Miguel Hidalgo, 97220 Mérida, Yuc.",
                    landmark: "Plaza Las Américas"
                },
                ctaButtons: [
                    { text: "Ver Ubicación", href: "#ubicacion", variant: "outline" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "primary" }
                ]
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Plaza+Las+Americas+Merida+Yucatan",
                mapEmbed: "",
                phone: "+52 999 123 4567",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/winpotcasinos", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/winpotcasinos", icon: "instagram" },
                    { platform: "twitter", url: "https://twitter.com/winpotcasinos", icon: "twitter" }
                ]
            },
            features: [
                { id: "experience", title: "Experiencia Distinta", description: "¡Atrévete a vivirla en Mérida!", icon: "sparkles" },
                { id: "location", title: "Plaza Las Américas", description: "Ubicación premium en el mejor centro comercial", icon: "shopping-bag" },
                { id: "schedule", title: "Horarios Especiales", description: "Viernes y Sábado hasta las 4:00 a.m.", icon: "clock" },
                { id: "providers", title: "9 Proveedores", description: "Incluye Novomatic y E-Gaming", icon: "trophy" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: [
                        { name: "Ainsworth", logo: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/Ainsworth-1.webp" },
                        { name: "Bally", logo: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/BALLY.webp" },
                        { name: "AGS", logo: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/ags-1.webp" },
                        { name: "Dreidel", logo: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/dreidel-1.webp" },
                        { name: "E-Gaming", logo: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/e-gaming-.webp" },
                        { name: "EGT", logo: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/EGT-1.webp" },
                        { name: "Novomatic", logo: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/novomatic.webp" },
                        { name: "Merkur Gaming", logo: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/merkur-gaming-2.webp" },
                        { name: "IGT", logo: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/igt-1.webp" }
                    ]
                },
                newGames: {
                    title: "JUEGOS NUEVOS",
                    items: [
                        { name: "Xing Fu Fortune Money Tree", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/XING-FU-FORTUNE-MONEY-TREE.webp" },
                        { name: "Xing Fu Fortun Money Trees", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/XING-FU-FORTUN-MONEY-TREES.webp" },
                        { name: "Taco Mania", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/TACO-MANIA.webp" },
                        { name: "Jin Qian Spirits", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/JIN-QIAN-SPIRITS.webp" },
                        { name: "Gallina de los Huevos de Oro", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/GALLINA-DE-LOS-HUEVOS-DE-ORO.webp" },
                        { name: "Bao Zhu Zao Fu Link", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/BAO-ZHU-ZAO-FU-LINK.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "88 Fortunes Slots", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/88-FORTUNES-SLOTS.webp" },
                        { name: "La Gallina de Huevos de Oro", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/LA-GALLINA-DE-HUEVOS-DE-ORO.webp" },
                        { name: "Majestic Beast", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/Majestic-Beast.webp" },
                        { name: "Mega Choice", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/mega-choice.webp" },
                        { name: "Tiger and Dragon", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/08/TIGER-AND-DRAGON.webp" }
                    ]
                }
            },
            events: {
                title: "EVENTOS Y PROMOCIONES",
                layout: "featured",
                featuredEvent: {
                    title: "Bingo Cantado",
                    description: "¡Ya viene el bingo! Te esperamos para participar por increíbles premios en efectivo.",
                    image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-merida-evento-1.jpg"
                },
                items: [
                    { title: "Bingo Cantado", description: "¡Ya viene el bingo! Te esperamos para participar por increíbles premios en efectivo.", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-merida-evento-1.jpg" },
                    { title: "Bingo Cantado", description: "Nos vemos desde las 10 am para participar por increíbles premios en efectivo, solo en Winpot Casino.", image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-merida-evento-2.jpg" }
                ]
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento. Con más de 15 años de experiencia en el mercado, Winpot y sus marcas asociadas buscan crear un ambiente seguro, divertido y emocionante para cada uno de sus usuarios.",
                image: "https://merida.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" },
                    { value: "2020", label: "Proyecto Online" }
                ]
            },
            facilities: { images: [] },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // WINPOT METROCENTRO
    // ------------------------------------------------------------
    metrocentro: {
        id: 'metrocentro',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Metrocentro",
                description: "Instalaciones de lujo, 4 pisos llenos de emociones. Descubre el verdadero significado de la adrenalina en la zona de Plaza del Sol!",
                city: "Zapopan",
                state: "Jalisco"
            },
            hero: {
                title: "Winpot",
                subtitle: "METROCENTRO",
                description: "Instalaciones de lujo, 4 pisos llenos de emociones. Descubre el verdadero significado de la adrenalina en la zona de Plaza del Sol!",
                image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-metrocentro-hero-2.webp",
                schedule: {
                    weekdays: "Lunes a Viernes de 10:00 am a 5:00 am",
                    weekends: "Sábados y Domingos 24 Hrs"
                },
                address: {
                    full: "Av. López Mateos Sur 3333, Residencial Victoria, 45088 Zapopan, Jalisco",
                    landmark: "Plaza del Sol"
                },
                ctaButtons: [
                    { text: "¿Cómo Llegar?", href: "#ubicacion", variant: "outline" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "primary" }
                ]
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Av+Lopez+Mateos+Sur+3333+Zapopan+Jalisco",
                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.5!2d-103.4!3d20.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.%20L%C3%B3pez%20Mateos%20Sur%203333%2C%20Zapopan!5e0!3m2!1ses!2smx!4v1234567890",
                phone: "+52 33 1234 5678",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/winpotcasinos", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/winpotcasinos", icon: "instagram" },
                    { platform: "twitter", url: "https://twitter.com/winpotcasinos", icon: "twitter" }
                ]
            },
            features: [
                { id: "pisos", title: "4 Pisos de Lujo", description: "Instalaciones llenas de emociones", icon: "building" },
                { id: "24hrs", title: "24 Horas Fines de Semana", description: "Sábados y Domingos abierto 24 hrs", icon: "clock" },
                { id: "ubicacion", title: "Plaza del Sol", description: "Zona premium en Zapopan", icon: "map-pin" },
                { id: "proveedores", title: "7 Proveedores", description: "Incluye Aristocrat y Aurify", icon: "trophy" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: [
                        { name: "Ainsworth", logo: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/Ainsworth-1.webp" },
                        { name: "Aurify", logo: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/Aurify.webp" },
                        { name: "Aristocrat", logo: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/Aristocrat.webp" },
                        { name: "Bally", logo: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/BALLY.webp" },
                        { name: "Betstone", logo: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/betstone.webp" },
                        { name: "AGS", logo: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/ags-1.webp" },
                        { name: "Dreidel", logo: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/dreidel-1.webp" }
                    ]
                },
                newGames: {
                    title: "JUEGOS NUEVOS",
                    items: [
                        { name: "Xing Fu Fortune Money Trees", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/XING-FU-FORTUN-MONEY-TREES.webp" },
                        { name: "Taco Mania", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/TACO-MANIA.webp" },
                        { name: "Jin Qian Spirits", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/JIN-QIAN-SPIRITS.webp" },
                        { name: "Hallo Win Zitro", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/HALLO-WIN-ZITRO.webp" },
                        { name: "Bao Zhu Zhao Fu Link", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/BAO-ZHU-ZAO-FU-LINK.webp" },
                        { name: "Gallina de los Huevos de Oro", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/GALLINA-DE-LOS-HUEVOS-DE-ORO.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "Imperial Ascension", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/IMPERIAL-ASCENSION.webp" },
                        { name: "Legendary Sword", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/LEGENDARY-SWORD.webp" },
                        { name: "Money Tank", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/MONEY-TANK.webp" },
                        { name: "San Fa Dragons", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/SAN-FA-DRAGONS.webp" },
                        { name: "Xtension Link", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/08/XTENSION-LINK.webp" }
                    ]
                }
            },
            events: {
                title: "EVENTOS",
                subtitle: "¡Te esperamos para vivir el verdadero arte del casino!",
                layout: "featured",
                featuredEvent: {
                    title: "Sonora San Francisco",
                    description: "Nos vemos este 30 de mayo para disfrutar de todo el ritmo y sabor de Sonora San Francisco, te esperamos.",
                    image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-evento-sonora-san-francisco.webp"
                },
                items: [
                    { title: "Los Dandy's", description: "Junto a los Dandy's tenemos todo listo para festejar a mamá con una noche de música y gran diversión, te esperamos.", image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-evento-los-dandys.webp" }
                ]
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento. Con más de 15 años de experiencia en el mercado, Winpot y sus marcas asociadas buscan crear un ambiente seguro, divertido y emocionante para cada uno de sus usuarios.",
                image: "https://metrocentro.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" },
                    { value: "2020", label: "Proyecto Online" }
                ]
            },
            facilities: { images: [] },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // WINPOT METEPEC
    // ------------------------------------------------------------
    metepec: {
        id: 'metepec',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Metepec",
                description: "Recientemente remodelado para ti! Renovamos todas nuestras áreas para brindarte la mejor experiencia de entretenimiento y emociones en Metepec.",
                city: "Metepec",
                state: "Estado de México"
            },
            hero: {
                title: "Winpot",
                subtitle: "METEPEC",
                description: "Recientemente remodelado para ti! Renovamos todas nuestras áreas para brindarte la mejor experiencia de entretenimiento y emociones en Metepec.",
                image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-metrocentro-hero-2.webp",
                schedule: { weekdays: "Lunes a Domingo de 10:00 am a 3:00 am" },
                address: {
                    full: "Plaza Mia, Av. Tecnológico 1600-Local Sa-3, San Salvador Tizatlalli, 52772 San Salvador Tizatlalli, Méx.",
                    landmark: "Plaza Mia"
                },
                ctaButtons: [
                    { text: "¿Cómo Llegar?", href: "#ubicacion", variant: "outline" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "primary" }
                ]
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Av+Tecnologico+1600+Metepec+Estado+Mexico",
                mapEmbed: "",
                phone: "+52 722 123 4567",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/winpotcasinos", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/winpotcasinos", icon: "instagram" },
                    { platform: "twitter", url: "https://twitter.com/winpotcasinos", icon: "twitter" }
                ]
            },
            features: [
                { id: "remodelado", title: "Recientemente Remodelado", description: "Renovamos todas nuestras áreas para ti", icon: "sparkles" },
                { id: "shows", title: "Shows en Vivo", description: "Imitador de Juan Gabriel - 13 de Junio", icon: "music" },
                { id: "ubicacion", title: "Plaza Mia", description: "Ubicación en San Salvador Tizatlalli", icon: "map-pin" },
                { id: "proveedores", title: "7 Proveedores", description: "Incluye FBM Gaming", icon: "trophy" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: [
                        { name: "Ainsworth", logo: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/Ainsworth.webp" },
                        { name: "Dreidel", logo: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/dreidel.webp" },
                        { name: "EGT", logo: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/EGT.webp" },
                        { name: "FBM", logo: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/fbm.webp" },
                        { name: "IGT", logo: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/igt.webp" },
                        { name: "Merkur Gaming", logo: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/merkur-gaming-2.webp" },
                        { name: "AGS", logo: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/ags.webp" }
                    ]
                },
                newGames: {
                    title: "NUEVOS JUEGOS",
                    items: [
                        { name: "Xing Fu Fortune Money Tree", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/XING-FU-FORTUNE-MONEY-TREE.webp" },
                        { name: "Tiger and Dragon", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/TIGER-AND-DRAGON.webp" },
                        { name: "Taco Mania", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/TACO-MANIA.webp" },
                        { name: "La Gallina de Huevos de Oro", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/LA-GALLINA-DE-HUEVOS-DE-ORO.webp" },
                        { name: "Jin Qian Spirits", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/JIN-QIAN-SPIRITS.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "Tiger and Dragon", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/TIGER-AND-DRAGON-1.webp" },
                        { name: "Multiwin 8 Quad Shot", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/MULTIWIN-8-QUAD-SHOT.webp" },
                        { name: "Super Charged 7", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/SUPER-CHARGED-7.webp" },
                        { name: "Legendary Sword", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/LEGENDARY-SWORD.webp" },
                        { name: "La Calaca Bingo", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/08/LA-CALACA-BINGO.webp" }
                    ]
                }
            },
            events: {
                title: "EVENTOS",
                layout: "featured",
                featuredEvent: {
                    title: "Juan Gabriel",
                    description: "Disfruta con nosotros de nuestro show del imitador Juan Gabriel por Juan Danel. Viernes 13 de Junio a las 10:00 PM. Evento Gratuito.",
                    image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-metepec-evento-juan-gabriel.webp"
                },
                items: [
                    { title: "Recientemente Remodelado", description: "Renovamos todas nuestras áreas para brindarte la mejor experiencia de entretenimiento y emociones en Metepec.", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-metepec-evento-1.webp" },
                    { title: "Nuevas Instalaciones", description: "Descubre nuestro casino completamente renovado.", image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-metepec-evento-2.webp" }
                ]
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento. Con más de 15 años de experiencia en el mercado, Winpot y sus marcas asociadas buscan crear un ambiente seguro, divertido y emocionante para cada uno de sus usuarios. Actualmente, contamos con 18 establecimientos a nivel nacional y desde el 2020 desarrollamos nuestro proyecto en línea.",
                image: "https://metepec.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" },
                    { value: "2020", label: "Proyecto Online" }
                ]
            },
            facilities: {
                images: [
                    { src: "src/assets/casino-interior-1.png", alt: "Interior del casino - Área de máquinas" },
                    { src: "src/assets/casino-interior-2.png", alt: "Interior del casino - Área VIP" },
                    { src: "src/assets/casino-interior-3.png", alt: "Interior del casino - Bar y lounge" }
                ]
            },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // WINPOT GUAYMAS
    // ------------------------------------------------------------
    guaymas: {
        id: 'guaymas',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Guaymas",
                description: "El mejor entretenimiento de Sonora. ¡Ven y disfruta de la emoción en Guaymas!",
                city: "Guaymas",
                state: "Sonora"
            },
            hero: {
                title: "Winpot",
                subtitle: "GUAYMAS",
                description: "El mejor entretenimiento de Sonora. ¡Ven y disfruta de la emoción en Guaymas!",
                image: "https://guaymas.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-metrocentro-hero-2.webp",
                schedule: { weekdays: "Lunes a Domingo de 09:00 am a 02:00 am" },
                address: {
                    full: "Blvd. Benito Juárez 900, Guadalupe, 85440 Guaymas, Son.",
                    landmark: "Boulevard Benito Juárez"
                },
                ctaButtons: [
                    { text: "Ver Ubicación", href: "#ubicacion", variant: "primary" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "secondary" }
                ]
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Benito+Juarez+900+Guaymas+Sonora",
                mapEmbed: "",
                phone: "+52 622 123 4567",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/winpotcasinos", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/winpotcasinos", icon: "instagram" }
                ]
            },
            features: [
                { id: "sonora", title: "El Mejor de Sonora", description: "Entretenimiento de primera en Guaymas", icon: "trophy" },
                { id: "horario", title: "Horario Extendido", description: "Abierto hasta las 2:00 am", icon: "clock" },
                { id: "ubicacion", title: "Ubicación Central", description: "En el Boulevard Benito Juárez", icon: "map-pin" },
                { id: "juegos", title: "Variedad de Juegos", description: "Las mejores máquinas del mercado", icon: "gamepad" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: SHARED_PROVIDERS
                },
                newGames: { title: "JUEGOS NUEVOS", items: [] },
                topGames: { title: "JUEGOS TOP", items: [] }
            },
            events: {
                title: "EVENTOS Y PROMOCIONES",
                subtitle: "Vive la emoción con nuestros eventos",
                layout: "featured",
                items: []
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento. Con más de 15 años de experiencia en el mercado.",
                image: "https://guaymas.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" }
                ]
            },
            facilities: { images: [] },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // WINPOT MEXICALI CARRANZA
    // ------------------------------------------------------------
    carranza: {
        id: 'carranza',
        brandId: 'winpot',
        content: {
            metadata: {
                title: "Winpot Mexicali Carranza",
                description: "La mejor experiencia de casino en Mexicali. ¡Abierto las 24 horas para tu diversión!",
                city: "Mexicali",
                state: "Baja California"
            },
            hero: {
                title: "Winpot",
                subtitle: "MEXICALI CARRANZA",
                description: "La mejor experiencia de casino en Mexicali. ¡Abierto las 24 horas para tu diversión!",
                image: "https://mexicali.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-metrocentro-hero-2.webp",
                schedule: { weekdays: "Lunes a Domingo Abierto las 24 hrs." },
                address: {
                    full: "Blvd. Lázaro Cárdenas 2000, Plutarco Elías Calles, 21376 Mexicali, B.C.",
                    landmark: "Boulevard Lázaro Cárdenas"
                },
                ctaButtons: [
                    { text: "Ver Ubicación", href: "#ubicacion", variant: "primary" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "secondary" }
                ]
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Lazaro+Cardenas+2000+Mexicali+Baja+California",
                mapEmbed: "",
                phone: "+52 686 123 4567",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/winpotcasinos", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/winpotcasinos", icon: "instagram" }
                ]
            },
            features: [
                { id: "24hrs", title: "Abierto 24 Horas", description: "Servicio todos los días las 24 hrs.", icon: "clock" },
                { id: "mexicali", title: "Lo Mejor de Mexicali", description: "Segunda ubicación en la ciudad", icon: "sparkles" },
                { id: "ubicacion", title: "Blvd. Lázaro Cárdenas", description: "Fácil acceso y estacionamiento", icon: "map-pin" },
                { id: "juegos", title: "Gran Variedad", description: "Máquinas de primera clase", icon: "trophy" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: SHARED_PROVIDERS
                },
                newGames: { title: "JUEGOS NUEVOS", items: [] },
                topGames: { title: "JUEGOS TOP", items: [] }
            },
            events: {
                title: "EVENTOS Y PROMOCIONES",
                subtitle: "Vive la emoción con nuestros eventos",
                layout: "featured",
                items: []
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento. Con más de 15 años de experiencia en el mercado.",
                image: "https://mexicali.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-banner-nosotros-2-1024x903.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" }
                ]
            },
            facilities: { images: [] },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // DIAMONDS POZA RICA
    // ------------------------------------------------------------
    pozarica: {
        id: 'pozarica',
        brandId: 'diamonds', // Explicitly using Diamonds theme
        content: {
            metadata: {
                title: "Diamonds Poza Rica",
                city: "Poza Rica",
                state: "Veracruz",
                brand: "Diamonds"
            },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Instalaciones", href: "#instalaciones" },
                    { name: "Nosotros", href: "#nosotros" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            },
            contact: {
                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.5714777551066!2d-97.45821642398457!3d20.54936308207038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85da6213697669527%3A0xe54d662136e09886!2sPlaza%20Gran%20Patio%20Poza%20Rica!5e0!3m2!1ses!2smx!4v1703641234567!5m2!1ses!2smx",
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Carretera+Poza+Rica+Cazones+Poza+Rica+Veracruz"
            },
            hero: {
                title: "Diamonds",
                subtitle: "POZA RICA",
                image: "https://pozarica.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-diamonds-hero-2.webp",
                schedule: {
                    weekdays: "Lunes a Domingo de 10:00 am a 3:00 am"
                },
                address: {
                    full: "Plaza Gran Patio, Carr. Poza Rica - Cazones Km. 50, La Rueda, 93306 Poza Rica de Hidalgo, Ver.",
                    landmark: "Gran Patio Poza Rica"
                },
                ctaButtons: [
                    { text: "¿Cómo Llegar?", href: "#ubicacion", variant: "secondary" }
                ]
            },
            events: {
                title: "EVENTOS Y PROMOCIONES",
                items: [
                    {
                        title: "Eventos Musicales y de Comedia",
                        description: "Divertidos eventos de entretenimiento, musicales y de comedia.",
                        image: "https://pozarica.winpotcasinos.com.mx/wp-content/uploads/2025/06/diamonds-poza-rica-eventos-2.webp"
                    }
                ]
            },
            features: [
                { id: "music", title: "Eventos Musicales", description: "Shows en vivo y comedia", icon: "music" },
                { id: "schedule", title: "Horario Extendido", description: "Abierto hasta las 3:00 a.m.", icon: "clock" },
                { id: "providers", title: "11 Proveedores", description: "Incluye BRYKE gaming", icon: "trophy" }
            ],
            games: {
                title: "Juegos Diamonds",
                subtitle: "Lo mejor en entretenimiento",
                providers: {
                    list: SHARED_PROVIDERS
                },
                newGames: {
                    title: "NOVEDADES",
                    items: [
                        { name: "Link Up", image: "/games/multi-win-15.webp" },
                        { name: "Dragon Legend", image: "/games/san-fa-pandas.webp" },
                    ]
                },
                topGames: {
                    title: "FAVORITOS DE LA CASA",
                    items: [
                        { name: "Rising Fortune", image: "/games/legendary-sword-veneto.webp" },
                        { name: "Cash Connection", image: "/games/gallina-huevos-veneto.webp" },
                    ]
                }
            },
            facilities: {
                images: [
                    { src: "https://pozarica.winpotcasinos.com.mx/wp-content/uploads/2025/06/diamonds-interior-1.webp", alt: "Diamonds Interior" },
                    { src: "https://pozarica.winpotcasinos.com.mx/wp-content/uploads/2025/06/diamonds-interior-2.webp", alt: "Diamonds Máquinas" }
                ]
            }
        }
    },


    // ------------------------------------------------------------
    // DIAMONDS CORDILLERAS
    // ------------------------------------------------------------
    cordilleras: {
        id: 'cordilleras',
        brandId: 'diamonds',
        content: {
            metadata: {
                title: "Diamonds Cordilleras – La casa de las emociones en Zapopan",
                description: "La casa de las emociones en Zapopan. Tú eres nuestro invitado de lujo en cada visita. Visítanos y compruébalo.",
                city: "Zapopan",
                state: "Jalisco"
            },
            hero: {
                title: "Diamonds",
                subtitle: "CORDILLERAS",
                description: "La casa de las emociones en Zapopan. Tú eres nuestro invitado de lujo en cada visita. Visítanos y compruébalo.",
                image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/07/winpot-diamonds-hero-2.webp",
                schedule: {
                    weekdays: "Domingo a Miércoles de 10:00 am a 3:00 am",
                    weekends: "Jueves a Sábado de 10:00 am a 5:00 am"
                },
                address: {
                    full: "Av. Patria 1020, Jardines del Tepeyac, 45030 Zapopan, Jal.",
                    landmark: "Jardines del Tepeyac, Zapopan"
                },
                ctaButtons: [
                    { text: "¿Cómo Llegar?", href: "#ubicacion", variant: "secondary" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "primary" }
                ],
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Av+Patria+1020+Jardines+Tepeyac+Zapopan+Jalisco",
                mapEmbed: "",
                phone: "+52 33 1234 5678",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/winpotcasinos", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/winpotcasinos", icon: "instagram" },
                    { platform: "twitter", url: "https://twitter.com/winpotcasinos", icon: "twitter" }
                ]
            },
            features: [
                { id: "emotions", title: "La Casa de las Emociones", description: "Invitado de lujo en cada visita", icon: "star" },
                { id: "parties", title: "Fiestas Temáticas", description: "Eventos especiales - 17 de Mayo", icon: "party-popper" },
                { id: "schedule", title: "Horarios Extendidos", description: "Jueves a Sábado hasta 5:00 AM", icon: "clock" },
                { id: "providers", title: "11 Proveedores", description: "Incluye BRYKE y Aristocrat", icon: "trophy" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: [
                        { name: "Ainsworth", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/Ainsworth-1.webp" },
                        { name: "Aristocrat", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/Aristocrat.webp" },
                        { name: "Aurify", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/Aurify.webp" },
                        { name: "Bally", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/BALLY.webp" },
                        { name: "Betstone", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/betstone.webp" },
                        { name: "EGT", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/EGT-1.webp" },
                        { name: "IGT", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/igt-1.webp" },
                        { name: "Merkur Gaming", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/merkur-gaming-2-1.webp" },
                        { name: "BRYKE", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/BRYKE.webp" },
                        { name: "Dreidel", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/dreidel-1.webp" },
                        { name: "AGS", logo: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/ags-1.webp" }
                    ]
                },
                newGames: {
                    title: "JUEGOS NUEVOS",
                    items: [
                        { name: "Devils Link", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/DEVILS-LINK.webp" },
                        { name: "Hallo Win", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/HALLO-WIN-BTN.webp" },
                        { name: "San Fa Pandas", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/SAN-FA-PANDAS.webp" },
                        { name: "Walking Wolves Hunter", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/WALKING-WOLVES-HUNTER.webp" },
                        { name: "Wonder Dream", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/WONDER-DREAM.webp" },
                        { name: "Xtension Link", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/XTENSION-LINK.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "Overdrive", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/OVERDRIVE.webp" },
                        { name: "Legendary Sword", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/LEGENDARY-SWORD.webp" },
                        { name: "King Fu Frog", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/KING-FU-FROG.webp" },
                        { name: "Boom Kaboom", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/BOOM-KABOOM.webp" },
                        { name: "Bell Link", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/08/BELL-LINK.webp" }
                    ]
                }
            },
            events: {
                title: "EVENTOS",
                subtitle: "¡Te esperamos para vivir el verdadero arte del casino!",
                layout: "featured",
                featuredEvent: {
                    title: "La Casa de las Emociones",
                    description: "Tú eres nuestro invitado de lujo en cada visita.",
                    image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-cdiamonds-evento-1.webp"
                },
                items: [
                    { title: "Invitado de Lujo", description: "Visítanos y compruébalo.", image: "https://cordilleras.winpotcasinos.com.mx/wp-content/uploads/2025/06/winpot-cdiamonds-evento-2.webp" }
                ]
            },
            facilities: { images: [] },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // CAPRI GUADALAJARA
    // ------------------------------------------------------------
    guadalajara: {
        id: 'guadalajara',
        brandId: 'capri',
        content: {
            metadata: { title: "Capri Guadalajara" },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            },
            contact: {
                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.5714777551066!2d-103.35821642398457!3d20.67936308207038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c3413697669527%3A0xe54d662136e09886!2sCapri%20Guadalajara!5e0!3m2!1ses!2smx!4v1703641234567!5m2!1ses!2smx",
                googleMaps: "https://maps.app.goo.gl/CapriExample"
            },
            hero: {
                title: "Capri",
                subtitle: "GUADALAJARA",
                image: "/capri-hero.webp",
                schedule: {
                    weekdays: "Domingo a Miércoles de 10:00 am a 4:00 am",
                    weekends: "Jueves a Sábado de 9:00 a.m. a 6:00 a.m."
                },
                address: {
                    full: "Av. Circunvalación Jorge Álvarez del Castillo 1846, Lomas del Country, Guadalajara.",
                    landmark: "Lomas del Country"
                },
                ctaButtons: [
                    { text: "¿CÓMO LLEGAR?", href: "#ubicacion" }
                ]
            },
            features: [
                { id: "remodelado", title: "Recientemente Remodelado", description: "Instalaciones de lujo renovadas", icon: "sparkles" }
            ],
            events: {
                title: "EVENTOS Y PROMOCIONES",
                items: [
                    {
                        title: "Eventos Especiales",
                        description: "Disfruta de nuestros eventos exclusivos con promociones especiales.",
                        image: "/events/evento-grupo.webp"
                    }
                ]
            },
            games: {
                title: "Casino Capri",
                subtitle: "Lujo y Diversión",
                providers: {
                    list: [
                        { name: "EGT", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/EGT-1.webp" },
                        { name: "FBM", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/fbm.webp" },
                        { name: "Aurify", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/Aurify.webp" },
                    ]
                },
                newGames: {
                    title: "ESTRENOS",
                    items: [
                        { name: "Taco Mania", image: "/games/taco-mania.webp" },
                        { name: "Buffalo Blitz", image: "/games/san-fa-tigers.webp" },
                    ]
                },
                topGames: {
                    title: "VIP SELECTION",
                    items: [
                        { name: "Blue Wizard", image: "/games/multi-win-15.webp" },
                        { name: "Red Wizard", image: "/games/bao-zhu-zhao.webp" },
                    ]
                }
            },
            facilities: {
                images: [
                    { src: "/facilities/capri-1.webp", alt: "Capri Interior" },
                    { src: "/facilities/capri-2.webp", alt: "Capri Interior 2" }
                ]
            }
        }
    },


    // ------------------------------------------------------------
    // CAPRI SATELITE
    // ------------------------------------------------------------
    satelite: {
        id: 'satelite',
        brandId: 'capri',
        content: {
            metadata: {
                title: "Capri Casino Satélite",
                description: "A 5 minutos de las torres de Satélite. Máquinas de última generación, instalaciones renovadas y mesas de Juego en Vivo.",
                city: "Tlalnepantla",
                state: "Estado de México"
            },
            hero: {
                title: "Capri",
                subtitle: "SATÉLITE",
                description: "¡Te esperamos para vivir el CAPRI CASINO! Disfruta de noches inolvidables entre luces, entretenimiento de primer nivel y la posibilidad de ganar en grande.",
                image: "/tenants/capri-satelite/hero/hero-main.webp",
                schedule: {
                    weekdays: "Dom-Mié 10:00 am - 4:00 am",
                    weekends: "Jue-Sáb 9:00 am - 6:00 am"
                },
                address: {
                    full: "Perif. Blvd. Manuel Ávila Camacho 2245, San Lucas Tepetlacalco, 54055 Tlalnepantla, Méx.",
                    landmark: "A 5 minutos de las torres de Satélite"
                },
                ctaButtons: [
                    { text: "¿Cómo Llegar?", href: "#ubicacion", variant: "primary" },
                    { text: "Jugar Online", href: "https://winpot.mx/", variant: "secondary" }
                ],
            },
            contact: {
                googleMaps: "https://www.google.com/maps/search/?api=1&query=Blvd+Manuel+Avila+Camacho+2245+Tlalnepantla+Estado+de+Mexico",
                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.5!2d-99.2305!3d19.5328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDMxJzU4LjEiTiA5OcKwMTMnNDkuOCJX!5e0!3m2!1ses!2smx!4v1234567890",
                phone: "55 1234 5678",
                socialMedia: [
                    { platform: "facebook", url: "https://www.facebook.com/capricasino", icon: "facebook" },
                    { platform: "instagram", url: "https://www.instagram.com/capricasino", icon: "instagram" },
                    { platform: "twitter", url: "https://twitter.com/capricasino", icon: "twitter" }
                ]
            },
            features: [
                { id: "1", title: "A 5 minutos de Satélite", description: "Ubicación estratégica cerca de las torres", icon: "map-pin" },
                { id: "2", title: "Última Generación", description: "Máquinas y equipos de vanguardia", icon: "sparkles" },
                { id: "3", title: "Mesas en Vivo", description: "Juego en vivo exclusivo", icon: "users" },
                { id: "4", title: "13 Proveedores", description: "Incluye Konami, Novomatic y Zitro", icon: "trophy" },
                { id: "5", title: "Horarios Extendidos", description: "Jueves a Sábado hasta las 6:00 a.m.", icon: "clock" },
                { id: "6", title: "Instalaciones Renovadas", description: "Espacios modernos y cómodos", icon: "star" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Máquinas de última generación",
                layout: "rows",
                providers: {
                    layout: "grid",
                    list: [
                        { name: "Dreidel", logo: "/tenants/capri-satelite/providers/dreidel.webp" },
                        { name: "BRYKE", logo: "/tenants/capri-satelite/providers/bryke.webp" },
                        { name: "IGT", logo: "/tenants/capri-satelite/providers/igt.webp" },
                        { name: "Bally", logo: "/tenants/capri-satelite/providers/bally.webp" },
                        { name: "Betstone", logo: "/tenants/capri-satelite/providers/betstone.webp" },
                        { name: "EGT", logo: "/tenants/capri-satelite/providers/egt.webp" },
                        { name: "Aristocrat", logo: "/tenants/capri-satelite/providers/aristocrat.webp" },
                        { name: "Ainsworth", logo: "/tenants/capri-satelite/providers/ainsworth.webp" },
                        { name: "Aurify", logo: "/tenants/capri-satelite/providers/aurify.webp" },
                        { name: "AGS", logo: "/tenants/capri-satelite/providers/ags.webp" },
                        { name: "FBM", logo: "/tenants/capri-satelite/providers/fbm.webp" },
                        { name: "Konami", logo: "/tenants/capri-satelite/providers/konami.webp" },
                        { name: "Novomatic", logo: "/tenants/capri-satelite/providers/novomatic.webp" }
                    ]
                },
                newGames: {
                    title: "NUEVOS JUEGOS",
                    items: [
                        { name: "Xtension Link", image: "/tenants/capri-satelite/games/xtension-link.webp" },
                        { name: "Walking Wolves Hunter", image: "/tenants/capri-satelite/games/walking-wolves-hunter.webp" },
                        { name: "Ji Ji Gao Sheng", image: "/tenants/capri-satelite/games/ji-ji-gao-sheng.webp" },
                        { name: "Huff N Puff Money Mansion", image: "/tenants/capri-satelite/games/huff-n-puff-money-mansion.webp" },
                        { name: "Huff N Even More Puff", image: "/tenants/capri-satelite/games/huff-n-even-more-puff.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "Energy Link Zitro", image: "/tenants/capri-satelite/games/energy-link-zitro.webp" },
                        { name: "Mighty Hammer Link Up", image: "/tenants/capri-satelite/games/mighty-hammer-link-up.webp" },
                        { name: "Legendary Sword", image: "/tenants/capri-satelite/games/legendary-sword.webp" },
                        { name: "King Fu Frog", image: "/tenants/capri-satelite/games/king-fu-frog.webp" },
                        { name: "Epic Empires", image: "/tenants/capri-satelite/games/epic-empires.webp" }
                    ]
                }
            },
            events: {
                title: "EVENTOS Y PROMOCIONES",
                layout: "featured",
                items: [
                    { title: "Evento 1", description: "", image: "/tenants/capri-satelite/events/evento-1.webp" },
                    { title: "Evento 2", description: "", image: "/tenants/capri-satelite/events/evento-2.webp" }
                ]
            },
            about: {
                title: "ACERCA DEL CASINO",
                content: "Somos una empresa enfocada en brindar a nuestros clientes la mejor experiencia de entretenimiento. Con más de 15 años de experiencia en el mercado, Winpot y sus marcas asociadas buscan crear un ambiente seguro, divertido y emocionante para cada uno de sus usuarios.",
                image: "/tenants/capri-satelite/about/about-banner.webp",
                stats: [
                    { value: "15+", label: "Años de experiencia" },
                    { value: "18", label: "Establecimientos" },
                    { value: "2020", label: "Proyecto Online" }
                ]
            },
            facilities: { images: [] },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // VENETO INTERLOMAS
    // ------------------------------------------------------------
    interlomas: {
        id: 'interlomas',
        brandId: 'veneto',
        content: {
            metadata: { title: "Veneto Interlomas" },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Juegos", href: "#juegos" },
                    { name: "Eventos", href: "#eventos" },
                    { name: "Premios", href: "#premios" },
                    { name: "Ubicación", href: "#ubicacion" },
                    { name: "Contacto", href: "#contacto" }
                ]
            },
            contact: {
                mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.5714777551066!2d-99.28821642398457!3d19.39936308207038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2036c64169527%3A0xe54d662136e09886!2sMagnocentro!5e0!3m2!1ses!2smx!4v1703641234567!5m2!1ses!2smx",
                googleMaps: "https://maps.app.goo.gl/VenetoExample"
            },
            hero: {
                title: "Veneto",
                subtitle: "INTERLOMAS",
                image: "/veneto-hero.webp",
                schedule: {
                    weekdays: "Domingo a Jueves de 10:00 am a 4:00 am",
                    weekends: "Viernes y Sábado de 10:00 am a 5:00 am"
                },
                address: {
                    full: "Boulevard Magnocentro 35, San Fernando La Herradura, Huixquilucan.",
                    landmark: "Interlomas"
                },
                ctaButtons: [
                    { text: "¿CÓMO LLEGAR?", href: "#ubicacion" }
                ]
            },
            awards: {
                title: "PREMIOS",
                video: "/premios-veneto.mp4"
            },
            events: {
                title: "EVENTOS",
                subtitle: "Música en vivo",
                items: [
                    {
                        title: "Jimmy Singer",
                        subtitle: "Miércoles 4 y 18 de Junio",
                        description: "Noche de música y gran diversión.",
                        image: "/tenants/interlomas/events/veneto-evento-1.webp"
                    }
                ]
            },
            features: [
                { id: "luxury", title: "Ambiente Premium", description: "Instalaciones de lujo exclusivas", icon: "sparkles" },
                { id: "schedule", title: "Horario Extendido", description: "Vie-Sáb hasta 5:00 am", icon: "clock" }
            ],
            games: {
                title: "NUESTROS JUEGOS",
                subtitle: "Descubre nuestra selección de juegos de última generación",
                providers: {
                    list: [
                        { name: "Merkur", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/dreidel-1.webp" },
                        { name: "EGT", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/EGT-1.webp" },
                        { name: "Zitro", logo: "https://boca.winpotcasinos.com.mx/wp-content/uploads/2025/08/zitro-1.webp" },
                    ]
                },
                newGames: {
                    title: "JUEGOS NUEVOS",
                    items: [
                        { name: "Taco Mania", image: "/games/taco-mania.webp" },
                        { name: "San Fa Tigers", image: "/games/san-fa-tigers.webp" },
                        { name: "Multi Win 15", image: "/games/multi-win-15.webp" },
                        { name: "Legendary Sword", image: "/games/legendary-sword-veneto.webp" },
                        { name: "La Gallina de Huevos de Oro", image: "/games/gallina-huevos-veneto.webp" }
                    ]
                },
                topGames: {
                    title: "JUEGOS TOP",
                    items: [
                        { name: "Spin Bingo", image: "/games/spin-bingo.webp" },
                        { name: "San Fa Pandas", image: "/games/san-fa-pandas.webp" },
                        { name: "Mighty Hammer Link Up", image: "/games/mighty-hammer-veneto.webp" },
                        { name: "Bao Zhu Zhao Fu", image: "/games/bao-zhu-zhao.webp" },
                    ]
                }
            },
            facilities: {
                images: [
                    { src: "https://casinoveneto.com.mx/wp-content/uploads/2025/08/veneto-interior-1.webp", alt: "Veneto Interior" },
                    { src: "https://casinoveneto.com.mx/wp-content/uploads/2025/08/veneto-interior-2.webp", alt: "Veneto Máquinas" }
                ]
            }
        }
    },

    // ------------------------------------------------------------
    // CORPORATE MAIN (DEFAULT)
    // ------------------------------------------------------------
    main: {
        id: 'main',
        brandId: 'winpot',
        content: {
            metadata: { title: "Winpot Corporate" },
            navigation: {
                menuItems: [
                    { name: "Inicio", href: "#inicio" },
                    { name: "Casinos", href: "#casinos" },
                    { name: "Nosotros", href: "#nosotros" },
                    { name: "Contacto", href: "#contacto" }
                ]
            },
            hero: {
                title: "Winpot",
                subtitle: "CASINOS",
                image: "/hero-corporate.webp", // Placeholder
                description: "La mejor experiencia de entretenimiento.",
                schedule: { weekdays: "" },
                address: { full: "" }
            }
        }
    }
};

// Deprecated Exports maintained for compatibility
export const CORPORATE_DATA = { type: 'corporate', ...TENANTS.main, theme: BRAND_THEMES.winpot };
export const VENETO_DATA = { type: 'branch', ...TENANTS.interlomas, theme: BRAND_THEMES.veneto };
export const CAPRI_DATA = { type: 'branch', ...TENANTS.guadalajara, theme: BRAND_THEMES.capri };
export const DIAMONDS_DATA = { type: 'branch', ...TENANTS.pozarica, theme: BRAND_THEMES.diamonds };
export const PUNTOSUR_DATA = { type: 'branch', ...TENANTS.puntosur, theme: BRAND_THEMES.winpot };
