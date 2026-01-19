import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { normalizeImageUrl } from "@/lib/url-utils";

export interface TenantFacility {
  id: string;
  tenant_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Fetch all facilities for a tenant
export function useTenantFacilities(tenantId: string) {
  return useQuery({
    queryKey: ['tenant-facilities', tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenant_facilities')
        .select('*')
        .eq('tenant_id', tenantId)
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return (data as TenantFacility[]).map((f) => ({
        ...f,
        image_url: normalizeImageUrl(f.image_url),
      }));
    },
    enabled: !!tenantId,
  });
}

// Fetch all facilities for a tenant (including inactive, for admin)
export function useTenantFacilitiesAdmin(tenantId: string) {
  return useQuery({
    queryKey: ['tenant-facilities-admin', tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenant_facilities')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return (data as TenantFacility[]).map((f) => ({
        ...f,
        image_url: normalizeImageUrl(f.image_url),
      }));
    },
    enabled: !!tenantId,
  });
}

// Add a new facility image
export function useAddTenantFacility() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      tenantId,
      imageUrl,
      altText,
      displayOrder
    }: {
      tenantId: string;
      imageUrl: string;
      altText?: string;
      displayOrder?: number;
    }) => {
      // Normalize URL (converts Google Drive URLs to embed format)
      const normalizedUrl = normalizeImageUrl(imageUrl);
      
      const { data, error } = await supabase
        .from('tenant_facilities')
        .insert({
          tenant_id: tenantId,
          image_url: normalizedUrl,
          alt_text: altText || null,
          display_order: displayOrder || 0,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities', variables.tenantId] });
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities-admin', variables.tenantId] });
      toast({
        title: "Imagen agregada",
        description: "La imagen de instalación ha sido agregada.",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Error al agregar",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Update a facility image
export function useUpdateTenantFacility() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      tenantId,
      imageUrl,
      altText,
      displayOrder,
      isActive
    }: {
      id: string;
      tenantId: string;
      imageUrl?: string;
      altText?: string;
      displayOrder?: number;
      isActive?: boolean;
    }) => {
      const updateData: Record<string, unknown> = {};
      // Normalize URL if provided (converts Google Drive URLs to embed format)
      if (imageUrl !== undefined) updateData.image_url = normalizeImageUrl(imageUrl);
      if (altText !== undefined) updateData.alt_text = altText;
      if (displayOrder !== undefined) updateData.display_order = displayOrder;
      if (isActive !== undefined) updateData.is_active = isActive;

      const { data, error } = await supabase
        .from('tenant_facilities')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities', variables.tenantId] });
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities-admin', variables.tenantId] });
      toast({
        title: "Imagen actualizada",
        description: "Los cambios han sido guardados.",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Error al actualizar",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete a facility image
export function useDeleteTenantFacility() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      tenantId
    }: {
      id: string;
      tenantId: string;
    }) => {
      const { error } = await supabase
        .from('tenant_facilities')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities', variables.tenantId] });
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities-admin', variables.tenantId] });
      toast({
        title: "Imagen eliminada",
        description: "La imagen ha sido eliminada de la galería.",
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
