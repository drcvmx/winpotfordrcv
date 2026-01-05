
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TENANTS, BRAND_THEMES, CORPORATE_DATA } from "@/data/mock-tenant";
import { TenantConfig, BrandTheme } from "@/types/tenant";

// Define strict types for the context
type TenantType = 'corporate' | 'branch';

interface TenantContextType {
    tenant: TenantType;
    data: any; // Merged Data (Content + Theme)
    content: any; // Shortcut to data.content
    theme: BrandTheme; // Shortcut to data.theme
    tenantId: string;
    setTenantId: (id: string) => void;
    updateContent: (section: string, newData: any) => void; // For Dashboard
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
    const [tenantId, setTenantId] = useState<string>('main');
    const [currentData, setCurrentData] = useState<any>(CORPORATE_DATA);


    // Logic to detect tenant or switch logic
    useEffect(() => {
        // 1. Detect Subdomain logic (For Production)
        const hostname = window.location.hostname;
        const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');

        // If we are in production (not localhost), we try to set tenantId from subdomain
        if (!isLocalhost) {
            // "guadalajara.winpot.mx" -> "guadalajara"
            // "winpot.mx" -> "www" (or just verify if it matches main domain)

            const parts = hostname.split('.');
            // Extremely simple subdomain extraction: just take the first part
            // Adjust this logic if you use "www.guadalajara.winpot.mx" etc.
            const subdomain = parts[0];

            // Check if this subdomain matches a valid tenant ID
            // We strip 'www' if present to allow www.winpot.mx to go to main
            const candidateId = subdomain === 'www' ? 'main' : subdomain;

            if (TENANTS[candidateId]) {
                // Priority: subdomain > whatever state (in a real app)
                // However, we want 'setTenantId' to still work for internal nav if needed, 
                // but typically multi-tenant apps are strict. 
                // For now, we ONLY set it if it's different to prevent loops, 
                // and we trust the URL source of truth.
                if (tenantId !== candidateId) {
                    setTenantId(candidateId);
                }
            } else {
                // If subdomain unknown (e.g. "admin.winpot.mx"), fallback to main or error page
                if (tenantId !== 'main') setTenantId('main');
            }
        }

        // 2. Find Tenant Config (based on resolved tenantId)
        const tenantConfig = TENANTS[tenantId] || TENANTS.main;

        // 3. Find Brand Theme
        const brandTheme = BRAND_THEMES[tenantConfig.brandId] || BRAND_THEMES.winpot;

        // 4. Merge them
        // We ensure 'type' is set for the layouts (corporate vs branch)
        const type: TenantType = tenantId === 'main' ? 'corporate' : 'branch';

        const baseData = {
            ...tenantConfig,
            theme: brandTheme,
            type: type,
        };

        // 5. Load from LocalStorage to persist content edits (CMS feature)
        const savedData = localStorage.getItem(`tenant_data_${tenantId}`);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setCurrentData({
                    ...baseData,
                    content: {
                        ...baseData.content,
                        ...parsed.content
                    }
                });
            } catch (e) {
                console.error("Failed to load saved data", e);
                setCurrentData(baseData);
            }
        } else {
            setCurrentData(baseData);
        }

    }, [tenantId]);

    // Logic to update CSS variables when data changes
    useEffect(() => {
        const root = document.documentElement;
        const theme = currentData?.theme;

        if (theme) {
            // 1. Map 'colors' object to standard CSS variables
            if (theme.colors) {
                Object.entries(theme.colors).forEach(([key, value]) => {
                    // Convert camelCase to kebab-case (e.g. cardForeground -> --card-foreground)
                    // This AUTOMATICALLY applies the theme background to the entire site
                    const cssVar = `--${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;
                    root.style.setProperty(cssVar, value as string);
                });
            }

            // 2. Map explicit 'cssVars' overrides (takes precedence if overlapping)
            if (theme.cssVars) {
                Object.entries(theme.cssVars).forEach(([key, value]) => {
                    root.style.setProperty(key, value as string);
                });
            }

            // 3. Map fonts if present
            if (theme.fonts) {
                if (theme.fonts.heading) root.style.setProperty('--font-heading', theme.fonts.heading);
                if (theme.fonts.body) root.style.setProperty('--font-body', theme.fonts.body);
            }
        }
    }, [currentData, tenantId]);

    const updateContent = (section: string, newData: any) => {
        setCurrentData((prev: any) => {
            const nextState = {
                ...prev,
                content: {
                    ...prev.content,
                    [section]: newData
                }
            };

            // Persist to LocalStorage
            localStorage.setItem(`tenant_data_${tenantId}`, JSON.stringify(nextState));

            return nextState;
        });
    };

    return (
        <TenantContext.Provider value={{
            tenant: currentData.type,
            data: currentData,
            content: currentData.content,
            theme: currentData.theme,
            tenantId,
            setTenantId,
            updateContent
        }}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const context = useContext(TenantContext);
    if (context === undefined) {
        throw new Error("useTenant must be used within a TenantProvider");
    }
    return context;
}
