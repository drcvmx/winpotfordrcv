import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { supabase } from "@/integrations/supabase/client";
import { demoData } from "@/lib/demo-data";
import { useToast } from "@/hooks/use-toast";
import { TENANTS } from "@/data/mock-tenant";

export interface TenantContent {
  id: string;
  tenant_id: string;
  // Hero
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_schedule: string | null;
  hero_address: string | null;
  hero_cta_primary_text: string | null;
  hero_cta_primary_link: string | null;
  hero_cta_secondary_text: string | null;
  hero_cta_secondary_link: string | null;
  // Contact
  contact_phone: string | null;
  contact_email: string | null;
  contact_hours: string | null;
  // Metadata
  meta_title: string | null;
  meta_description: string | null;
  // Footer
  footer_description: string | null;
  footer_address: string | null;
  // Legal / Privacy
  privacy_policy_url: string | null;
  privacy_policy_url_2: string | null;
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface TenantContentInput {
  tenant_id: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_schedule?: string;
  hero_address?: string;
  hero_cta_primary_text?: string;
  hero_cta_primary_link?: string;
  hero_cta_secondary_text?: string;
  hero_cta_secondary_link?: string;
  contact_phone?: string;
  contact_email?: string;
  contact_hours?: string;
  meta_title?: string;
  meta_description?: string;
  footer_description?: string;
  footer_address?: string;
  privacy_policy_url?: string;
  privacy_policy_url_2?: string;
}

// Get default content from mock-tenant for a specific tenant
function getDefaultContent(tenantId: string): Partial<TenantContent> | null {
  const tenant = TENANTS[tenantId];
  if (!tenant) return null;

  const content = tenant.content;
  const hero = content.hero;
  const contact = content.contact;
  const metadata = content.metadata;

  // Build schedule string from hero.schedule object
  let scheduleStr = '';
  if (hero?.schedule) {
    const parts: string[] = [];
    if (hero.schedule.weekdays) parts.push(hero.schedule.weekdays);
    if (hero.schedule.weekend) parts.push(hero.schedule.weekend);
    scheduleStr = parts.join(' | ');
  }

  // Get CTA buttons
  const ctaPrimary = hero?.ctaButtons?.find(b => b.variant === 'primary');
  const ctaSecondary = hero?.ctaButtons?.find(b => b.variant === 'secondary');

  return {
    hero_title: hero?.title || null,
    hero_subtitle: hero?.subtitle || null,
    hero_schedule: scheduleStr || null,
    hero_address: typeof hero?.address === 'object' ? hero.address.full : (hero?.address || null),
    hero_cta_primary_text: ctaPrimary?.text || null,
    hero_cta_primary_link: ctaPrimary?.href || null,
    hero_cta_secondary_text: ctaSecondary?.text || null,
    hero_cta_secondary_link: ctaSecondary?.href || null,
    contact_phone: (contact as any)?.phone || null,
    contact_email: (contact as any)?.email || null,
    contact_hours: scheduleStr || null,
    meta_title: metadata?.title || null,
    meta_description: hero?.description || null,
    footer_description: 'La mejor experiencia de casino en México. Más de 15 años ofreciendo entretenimiento de calidad.',
    footer_address: typeof hero?.address === 'object' ? hero.address.full : (hero?.address || 'Av. Principal #123, Ciudad de México, México'),
  };
}

// Fetch content for a specific tenant
export function useTenantContent(tenantId: string) {
  return useQuery({
    queryKey: ['tenant-content', tenantId],
    queryFn: async () => {
      // DEMO MODE: Fetch from local storage
      const data = demoData.getTenantContent(tenantId);

      // If no local data exists yet (first run), get default from mock and save it
      if (!data) {
        const defaults = getDefaultContent(tenantId);
        if (defaults) {
          const initialData = {
            id: `local-${tenantId}`,
            tenant_id: tenantId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...defaults,
          };
          demoData.setTenantContent(tenantId, initialData);
          return initialData as TenantContent;
        }
        return null; // Should not happen for valid tenants
      }

      return data as TenantContent;
    },
    enabled: !!tenantId,
  });
}

// Upsert tenant content
export function useUpsertTenantContent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: TenantContentInput) => {
      // DEMO MODE: Update local storage
      const current = demoData.getTenantContent(input.tenant_id) || {};
      const updated = {
        ...current,
        ...input,
        updated_at: new Date().toISOString()
      };

      demoData.setTenantContent(input.tenant_id, updated);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      return updated;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-content', variables.tenant_id] });
      toast({
        title: "Contenido guardado",
        description: "Los cambios han sido guardados correctamente (Modo Demo).",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Error al guardar",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
