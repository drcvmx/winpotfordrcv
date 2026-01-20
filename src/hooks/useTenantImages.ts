import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { normalizeImageUrl } from "@/lib/url-utils";

export type ImageSection = 'hero' | 'about' | 'contact';

interface TenantImage {
  id: string;
  tenant_id: string;
  section: ImageSection;
  image_url: string;
  alt_text: string | null;
  created_at: string;
  updated_at: string;
}

// Fetch images for a specific tenant
export function useTenantImages(tenantId: string) {
  return useQuery({
    queryKey: ['tenant-images', tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenant_images')
        .select('*')
        .eq('tenant_id', tenantId);
      
      if (error) throw error;
      
      // Normalize Google Drive URLs
      return (data as TenantImage[]).map(img => ({
        ...img,
        image_url: normalizeImageUrl(img.image_url),
      }));
    },
    enabled: !!tenantId,
  });
}

// Fetch a single image by tenant and section
export function useTenantImage(tenantId: string, section: ImageSection) {
  return useQuery({
    queryKey: ['tenant-image', tenantId, section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenant_images')
        .select('*')
        .eq('tenant_id', tenantId)
        .eq('section', section)
        .maybeSingle();
      
      if (error) throw error;
      
      // Normalize Google Drive URL
      if (data) {
        return {
          ...data,
          image_url: normalizeImageUrl(data.image_url),
        } as TenantImage;
      }
      return null;
    },
    enabled: !!tenantId && !!section,
  });
}

// Upsert (create or update) a tenant image
export function useUpsertTenantImage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      tenantId,
      section,
      imageUrl,
      altText
    }: {
      tenantId: string;
      section: ImageSection;
      imageUrl: string;
      altText?: string;
    }) => {
      // Normalize URL before saving
      const normalizedUrl = normalizeImageUrl(imageUrl);
      
      const { data, error } = await supabase
        .from('tenant_images')
        .upsert(
          {
            tenant_id: tenantId,
            section: section,
            image_url: normalizedUrl,
            alt_text: altText || null,
          },
          {
            onConflict: 'tenant_id,section',
          }
        )
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-images', variables.tenantId] });
      queryClient.invalidateQueries({ queryKey: ['tenant-image', variables.tenantId, variables.section] });
      toast({
        title: "Imagen actualizada",
        description: `La imagen de ${variables.section} ha sido guardada.`,
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

// Delete a tenant image
export function useDeleteTenantImage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      tenantId,
      section
    }: {
      tenantId: string;
      section: ImageSection;
    }) => {
      const { error } = await supabase
        .from('tenant_images')
        .delete()
        .eq('tenant_id', tenantId)
        .eq('section', section);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-images', variables.tenantId] });
      queryClient.invalidateQueries({ queryKey: ['tenant-image', variables.tenantId, variables.section] });
      toast({
        title: "Imagen eliminada",
        description: "Se usará la imagen por defecto.",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Error al eliminar",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
