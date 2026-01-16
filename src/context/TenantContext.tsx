import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
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
    const location = useLocation();
    
    // Extract tenant from URL path: /tuxtla -> tuxtla, / -> main
    const getTenantFromPath = (): string => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        
        // Skip dashboard and other reserved routes
        const reservedRoutes = ['dashboard'];
        if (pathSegments.length > 0 && !reservedRoutes.includes(pathSegments[0])) {
            const potentialTenant = pathSegments[0];
            if (TENANTS[potentialTenant]) {
                return potentialTenant;
            }
        }
        
        // Fallback: Check query param for preview/dev
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const tenantParam = searchParams.get('tenant');
            if (tenantParam && TENANTS[tenantParam]) {
                return tenantParam;
            }
        }
        
        return 'main';
    };

    const [tenantId, setTenantId] = useState<string>(getTenantFromPath);
    const [currentData, setCurrentData] = useState<any>(CORPORATE_DATA);

    // Update tenant when path changes
    useEffect(() => {
        const newTenantId = getTenantFromPath();
        if (newTenantId !== tenantId) {
            setTenantId(newTenantId);
        }
    }, [location.pathname]);

    // Effect to update data when tenantId changes
    useEffect(() => {
        const tenantConfig = TENANTS[tenantId] || TENANTS.main;

        // Find Brand Theme
        const brandTheme = BRAND_THEMES[tenantConfig.brandId] || BRAND_THEMES.winpot;

        // Merge them - 'main' is corporate, everything else is branch
        const type: TenantType = tenantId === 'main' ? 'corporate' : 'branch';

        const baseData = {
            ...tenantConfig,
            theme: brandTheme,
            type: type,
        };

        // Load from LocalStorage to persist content edits (CMS feature)
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
