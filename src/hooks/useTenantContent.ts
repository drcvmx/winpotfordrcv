import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  };
}

// Fetch content for a specific tenant
export function useTenantContent(tenantId: string) {
  return useQuery({
    queryKey: ['tenant-content', tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenant_content')
        .select('*')
        .eq('tenant_id', tenantId)
        .maybeSingle();
      
      if (error) throw error;
      
      // If no DB data exists, return defaults from mock-tenant
      if (!data) {
        const defaults = getDefaultContent(tenantId);
        if (defaults) {
          return {
            id: '',
            tenant_id: tenantId,
            created_at: '',
            updated_at: '',
            ...defaults,
          } as TenantContent;
        }
      }
      
      return data as TenantContent | null;
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
      const { data, error } = await supabase
        .from('tenant_content')
        .upsert(input, { onConflict: 'tenant_id' })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-content', variables.tenant_id] });
      toast({
        title: "Contenido guardado",
        description: "Los cambios han sido guardados correctamente.",
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
