export type BrandId = 'winpot' | 'capri' | 'diamonds' | 'veneto';

export interface BrandTheme {
    id: BrandId;
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        foreground: string;
        card: string;
        cardForeground: string;
        muted?: string;
        mutedForeground?: string;
        border: string;
        ring: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
    cssVars: Record<string, string>;
}

export interface NavigationItem {
    id?: string;
    name: string;
    href: string;
    label?: string; // Supporting both naming conventions temporarily
}

export interface SocialMedia {
    platform: 'facebook' | 'instagram' | 'twitter';
    url: string;
    icon: string;
}

export interface TenantContent {
    metadata: {
        title: string;
        description?: string;
        siteName?: string;
        location?: string;
        url?: string;
        lastUpdated?: string;
        brand?: string;
        city?: string;
        state?: string;
    };
    navigation: {
        logo?: string | { url: string; alt: string };
        menuItems: NavigationItem[]; // We map this to our internal component structure
    };
    hero: {
        title: string;
        subtitle: string;
        description?: string;
        image: string; // Internal normalized field
        schedule?: {
            weekdays: string;
            weekends?: string; // Legacy
            weekend?: string;
        };
        address?: string | {
            full: string;
            street?: string;
            city?: string;
            landmark?: string;
        };
        ctaButtons?: Array<{
            text?: string;
            label?: string;
            href: string;
            variant?: 'primary' | 'secondary' | 'outline';
        }>;
        floatingImages?: Array<{ url: string; alt: string } | string>;
    };
    events?: {
        title: string;
        subtitle?: string;
        layout?: 'grid' | 'list' | 'featured'; // New: Control layout
        items: Array<{
            title: string;
            subtitle?: string;
            description?: string;
            image: string;
        }>;
        featuredEvent?: {
            title: string;
            description: string;
            image: string;
        };
        secondaryEvent?: any;
    };
    games?: {
        title: string;
        subtitle?: string;
        layout?: 'tabs' | 'rows'; // New: Control overall games layout
        newGames?: {
            title: string;
            items: any[];
        } | any;
        topGames?: {
            title: string;
            items: any[];
        } | any;
        providers?: {
            title?: string;
            layout?: 'grid' | 'carousel'; // New: Control provider display
            list: Array<{ name: string; logo: string }>;
        };
        categories?: any[];
    };
    awards?: {
        title: string;
        video: string;
    };
    facilities?: {
        images: Array<{ src: string; alt: string }>;
    };
    about?: {
        title?: string;
        content?: string;
        image?: string | { url: string };
        stats?: any[];
        statistics?: any;
    };
    features?: any[];
    contact?: {
        socialMedia?: SocialMedia[] | Record<string, string>;
        googleMaps?: string;
        mapEmbed?: string;
        phone?: string;
        email?: string;
    };
    legal?: any;
    footer?: any;
}

export interface TenantConfig {
    id: string; // e.g., 'tuxtla', 'guadalajara'
    brandId: BrandId;
    content: TenantContent;
}
