
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
    // Initialize tenantId directly from URL Logic to prevent useEffect loops
    // This allows the Dashboard dropdown to change the state without the URL forcing it back
    const [tenantId, setTenantId] = useState<string>(() => {
        if (typeof window === 'undefined') return 'main';

        // 1. Check Query Param (Priority for Vercel Previews)
        const searchParams = new URL(window.location.href).searchParams;
        const tenantParam = searchParams.get('tenant');
        if (tenantParam && TENANTS[tenantParam]) {
            return tenantParam;
        }

        // 2. Check Subdomain (Production)
        const hostname = window.location.hostname;
        const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');

        if (!isLocalhost) {
            const parts = hostname.split('.');
            const subdomain = parts[0];
            const candidateId = subdomain === 'www' ? 'main' : subdomain;
            if (TENANTS[candidateId]) {
                return candidateId;
            }
        }

        // 3. Default
        return 'main';
    });

    const [currentData, setCurrentData] = useState<any>(CORPORATE_DATA);


    // 2. Find Tenant Config (based on resolved tenantId)
    // Effect to update data when tenantId changes (whether by init or dropdown)
    useEffect(() => {
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
