import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { supabase } from "@/integrations/supabase/client";
import { demoData } from "@/lib/demo-data";
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
      // DEMO MODE
      const data = demoData.getTenantFacilities(tenantId);

      return (data as TenantFacility[])
        .filter(f => f.is_active)
        .map((f) => ({
          ...f,
          image_url: normalizeImageUrl(f.image_url),
        }))
        .sort((a, b) => a.display_order - b.display_order);
    },
    enabled: !!tenantId,
  });
}

// Fetch all facilities for a tenant (including inactive, for admin)
export function useTenantFacilitiesAdmin(tenantId: string) {
  return useQuery({
    queryKey: ['tenant-facilities-admin', tenantId],
    queryFn: async () => {
      // DEMO MODE
      const data = demoData.getTenantFacilities(tenantId);

      return (data as TenantFacility[]).map((f) => ({
        ...f,
        image_url: normalizeImageUrl(f.image_url),
      })).sort((a, b) => a.display_order - b.display_order);
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
      const currentFacilities = demoData.getTenantFacilities(tenantId);

      const newFacility = {
        id: `local-facility-${Date.now()}`,
        tenant_id: tenantId,
        image_url: normalizedUrl,
        alt_text: altText || null,
        display_order: displayOrder || 0,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      currentFacilities.push(newFacility);
      demoData.setTenantFacilities(tenantId, currentFacilities);

      return newFacility;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities', variables.tenantId] });
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities-admin', variables.tenantId] });
      toast({
        title: "Imagen agregada",
        description: "La imagen de instalación ha sido agregada (Modo Demo).",
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
      const currentFacilities = demoData.getTenantFacilities(tenantId);
      const index = currentFacilities.findIndex((f: any) => f.id === id);

      if (index === -1) throw new Error("Facility not found");

      const updateData: any = { ...currentFacilities[index] };

      if (imageUrl !== undefined) updateData.image_url = normalizeImageUrl(imageUrl);
      if (altText !== undefined) updateData.alt_text = altText;
      if (displayOrder !== undefined) updateData.display_order = displayOrder;
      if (isActive !== undefined) updateData.is_active = isActive;

      updateData.updated_at = new Date().toISOString();

      currentFacilities[index] = updateData;
      demoData.setTenantFacilities(tenantId, currentFacilities);
      return updateData;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities', variables.tenantId] });
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities-admin', variables.tenantId] });
      toast({
        title: "Imagen actualizada",
        description: "Los cambios han sido guardados (Modo Demo).",
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
      const currentFacilities = demoData.getTenantFacilities(tenantId);
      const filtered = currentFacilities.filter((f: any) => f.id !== id);
      demoData.setTenantFacilities(tenantId, filtered);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities', variables.tenantId] });
      queryClient.invalidateQueries({ queryKey: ['tenant-facilities-admin', variables.tenantId] });
      toast({
        title: "Imagen eliminada",
        description: "La imagen ha sido eliminada de la galería (Modo Demo).",
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
