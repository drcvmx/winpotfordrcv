import { TENANTS, CORPORATE_DATA } from "@/data/mock-tenant";

const STORAGE_PREFIX = "winpot_demo_";

export const demoData = {
    // Generic helper to get data with default fallback
    get: <T>(key: string, defaultValue: T): T => {
        const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (!stored) return defaultValue;
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error(`Error parsing ${key} from localStorage`, e);
            return defaultValue;
        }
    },

    // Generic helper to save data
    set: <T>(key: string, value: T): void => {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    },

    // --- Specific Data Handlers ---

    // Tenant Content
    getTenantContent: (tenantId: string) => {
        const key = `content_${tenantId}`;
        // If no local data, construct default from mock-tenant
        const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (stored) return JSON.parse(stored);

        const tenant = TENANTS[tenantId];
        if (!tenant) return null;

        // Transform mock data to fit expected DB shape
        return {
            id: `local-${tenantId}`,
            tenant_id: tenantId,
            hero_title: tenant.content.hero?.title || null,
            hero_subtitle: tenant.content.hero?.subtitle || null,
            hero_schedule: tenant.content.hero?.schedule ? `${tenant.content.hero.schedule.weekdays} | ${tenant.content.hero.schedule.weekend}` : null,
            hero_address: typeof tenant.content.hero?.address === 'object' ? tenant.content.hero.address.full : (tenant.content.hero?.address || null),
            contact_phone: (tenant.content.contact as any)?.phone || null,
            contact_email: (tenant.content.contact as any)?.email || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            // Add other fields as needed based on usage
        };
    },

    setTenantContent: (tenantId: string, data: any) => {
        demoData.set(`content_${tenantId}`, data);
        return data;
    },

    // Games
    getTenantGames: (tenantId: string) => {
        const key = `games_${tenantId}`;
        const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);

        if (stored) return JSON.parse(stored);

        // Initialize with RICH mock data if empty
        const tenant = TENANTS[tenantId];
        // If tenant exists in mock-tenant, try to use that first, but ensure it's fully populated
        // If not, fall back to a generic rich set

        const games: any[] = [];

        // 1. Try to get specific mock data
        if (tenant?.content?.games) {
            // Helper to map mock items to DB shape
            const mapGames = (items: any[], category: 'new' | 'top') => {
                return items.map((game, idx) => ({
                    id: `local-game-${category}-${idx}`,
                    tenant_id: tenantId,
                    name: game.name,
                    image_url: game.image,
                    category: category,
                    display_order: idx,
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }));
            };
            if (tenant.content.games.newGames?.items) {
                games.push(...mapGames(tenant.content.games.newGames.items, 'new'));
            }
            if (tenant.content.games.topGames?.items) {
                games.push(...mapGames(tenant.content.games.topGames.items, 'top'));
            }
        }

        // 2. If still empty (or tenant not found/incomplete), fill with generic rich data
        if (games.length === 0) {
            const defaultNewGames = [
                { name: "Mighty Hammer", image: "/games/mighty-hammer.webp" },
                { name: "Epic Empires", image: "/games/epic-empires.webp" },
                { name: "Bao Zhu Zao Fu", image: "/games/bao-zhu-zao-fu.webp" },
                { name: "Go Power", image: "/games/go-power.webp" },
            ];
            const defaultTopGames = [
                { name: "Legendary Sword", image: "/games/legendary-sword.webp" },
                { name: "Gallina Huevos de Oro", image: "/games/gallina-huevos-oro.webp" },
                { name: "Ojo de Tigre", image: "/games/san-fa-tigers.webp" }, // Invented name/image match
                { name: "Link Medieval", image: "/games/night-link-medieval.webp" },
            ];

            defaultNewGames.forEach((g, i) => games.push({
                id: `default-new-${i}`,
                tenant_id: tenantId,
                name: g.name,
                image_url: g.image,
                category: 'new',
                display_order: i,
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }));

            defaultTopGames.forEach((g, i) => games.push({
                id: `default-top-${i}`,
                tenant_id: tenantId,
                name: g.name,
                image_url: g.image,
                category: 'top',
                display_order: i,
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }));
        }

        // Save initial state so future edits stick
        demoData.set(`games_${tenantId}`, games);
        return games;
    },

    setTenantGames: (tenantId: string, games: any[]) => {
        demoData.set(`games_${tenantId}`, games);
        return games;
    },

    // Events
    getTenantEvents: (tenantId: string) => {
        const key = `events_${tenantId}`;
        const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (stored) return JSON.parse(stored);

        // Default Events
        const events = [
            {
                id: `default-event-1`,
                tenant_id: tenantId,
                title: "Noche de Casino",
                description: "Disfruta de música en vivo y bebidas de cortesía todos los viernes.",
                image_url: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317",
                event_date: null,
                event_dates: [],
                is_active: true,
                display_order: 1,
                is_recurring: true,
                recurrence_type: "weekly",
                recurrence_day: 5, // Viernes
                recurrence_days: [5],
                recurrence_text: "Todos los viernes a las 8:00 PM",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: `default-event-2`,
                tenant_id: tenantId,
                title: "Torneo de Slots",
                description: "Participa y gana hasta $50,000 MXN en premios.",
                image_url: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b",
                event_date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), // 5 days from now
                event_dates: [],
                is_active: true,
                display_order: 2,
                is_recurring: false,
                recurrence_type: null,
                recurrence_day: null,
                recurrence_days: null,
                recurrence_text: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];

        demoData.set(key, events);
        return events;
    },
    setTenantEvents: (tenantId: string, events: any[]) => {
        demoData.set(`events_${tenantId}`, events);
        return events;
    },

    // Facilities
    getTenantFacilities: (tenantId: string) => {
        const key = `facilities_${tenantId}`;
        const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (stored) return JSON.parse(stored);

        // Default Facilities
        const facilities = [
            {
                id: 'default-facility-1',
                tenant_id: tenantId,
                image_url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
                alt_text: "Bar Principal",
                display_order: 0,
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 'default-facility-2',
                tenant_id: tenantId,
                image_url: "https://images.unsplash.com/photo-1551632811-561732d1e306",
                alt_text: "Área de Máquinas",
                display_order: 1,
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 'default-facility-3',
                tenant_id: tenantId,
                image_url: "https://images.unsplash.com/photo-1563720223185-11003d516935",
                alt_text: "Entrada VIP",
                display_order: 2,
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];

        demoData.set(key, facilities);
        return facilities;
    },
    setTenantFacilities: (tenantId: string, facilities: any[]) => {
        demoData.set(`facilities_${tenantId}`, facilities);
        return facilities;
    },

    // Gallery  // Images
    getTenantImages: (tenantId: string) => {
        const key = `images_${tenantId}`;
        const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (stored) return JSON.parse(stored);

        // Default Images
        const images = [
            {
                id: 'default-img-hero',
                tenant_id: tenantId,
                section: 'hero',
                image_url: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317', // Casino interior high quality
                alt_text: 'Bienvenido a Winpot',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 'default-img-about',
                tenant_id: tenantId,
                section: 'about',
                image_url: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3', // Elegant atmosphere
                alt_text: 'Sobre Nosotros',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 'default-img-contact',
                tenant_id: tenantId,
                section: 'contact',
                image_url: 'https://images.unsplash.com/photo-1533052702750-g0111246d8f5', // Contact/Support theme
                alt_text: 'Contáctanos',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];

        demoData.set(key, images);
        return images;
    },
    setTenantImages: (tenantId: string, images: any[]) => {
        demoData.set(`images_${tenantId}`, images);
        return images;
    },

    // Legal
    getTenantLegal: (tenantId: string) => {
        const key = `legal_${tenantId}`;
        const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (stored) return JSON.parse(stored);

        // Default Legal Text
        const defaultLegal = [{
            id: 'default-legal-1',
            tenant_id: tenantId,
            legal_text: `Winpot © 2006-2025. Todos los derechos reservados.
www.winpotcasinos.com.mx es un sitio web totalmente informativo. No se permiten, ni se captan apuestas en línea a través de este sitio web.

Winpot.com es una página informativa de los casinos con las marcas comerciales Winpot©, Veneto©, Capri© y Diamonds©.

Que operan al amparo de los permisos federales: Pur Umazal Tov S.A. de C.V. (DGJS/DGAFJ/DCRCA/P-03/2014, DGJS/DGAFJ/DCRCA/P-04/2014 , DGJS/DGAFJ/DCRCA/P-05/2014, DGJS/DGAFJ/DCRCA/P-06/2014, DGJS/DGAFJ/DCRCA/P-07/2014, DGJS/DGAFJ/DCRCA/P-08/2014, DGJS/DGAFJ/DCRCA/P-09/2014). Operadora de Coincidencias Numéricas S.A. de C.V. DGJS/DGAAD/DCRCA/P-01/2017. El Palacio de los Números, S.A. de C.V. DGAJS/SCEVF/P-01/2006.

JUEGUE DE MANERA RESPONSABLE, SANA E INFORMADA, CON EL PROPÓSITO DE ENTRETENIMIENTO, DIVERSIÓN Y ESPARCIMIENTO. PUBLICIDAD DIRIGIDA A MAYORES DE EDAD. LA LUDOPATIA ES UNA ENFERMEDAD QUE PUEDE AFECTAR EL DESARROLLO DE LA PERSONA Y FAMILIA. AYUDA LLAME A CONACID: 800 911 2000. http://www.juegosysorteos.gob.mx/es/Juegos_y_Sorteos/Atencion_al_Ludopata`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }];

        demoData.set(key, defaultLegal);
        return defaultLegal;
    },
    setTenantLegal: (tenantId: string, legal: any[]) => {
        demoData.set(`legal_${tenantId}`, legal);
        return legal;
    },

    // Casino Overrides
    getCasinoOverrides: () => {
        return demoData.get<any[]>(`casino_overrides`, []);
    },
    setCasinoOverrides: (overrides: any[]) => {
        demoData.set(`casino_overrides`, overrides);
        return overrides;
    }
};
