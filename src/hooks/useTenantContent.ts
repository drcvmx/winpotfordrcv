import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
