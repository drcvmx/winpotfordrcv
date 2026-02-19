import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { supabase } from "@/integrations/supabase/client";
import { demoData } from "@/lib/demo-data";
import { useToast } from "@/hooks/use-toast";

export interface CasinoOverride {
  id: string;
  casino_id: string;
  city: string | null;
  brand: string | null;
  schedule_weekdays: string | null;
  schedule_weekend: string | null;
  address: string | null;
  image_url: string | null;
  google_maps_url: string | null;
  is_open_24h: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface CasinoOverrideInput {
  casino_id: string;
  city?: string | null;
  brand?: string | null;
  schedule_weekdays?: string | null;
  schedule_weekend?: string | null;
  address?: string | null;
  image_url?: string | null;
  google_maps_url?: string | null;
  is_open_24h?: boolean | null;
}

export function useCasinoOverrides() {
  return useQuery({
    queryKey: ["casino-overrides"],
    queryFn: async () => {
      // DEMO MODE
      const data = demoData.getCasinoOverrides();
      return (data as CasinoOverride[]) || [];
    },
  });
}

export function useUpsertCasinoOverride() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CasinoOverrideInput) => {
      // DEMO MODE
      const currentOverrides = demoData.getCasinoOverrides();
      const index = currentOverrides.findIndex((o: any) => o.casino_id === input.casino_id);

      const updatedOverride = {
        id: index !== -1 ? currentOverrides[index].id : `local-override-${Date.now()}`,
        casino_id: input.casino_id,
        city: input.city ?? (index !== -1 ? currentOverrides[index].city : null),
        brand: input.brand ?? (index !== -1 ? currentOverrides[index].brand : null),
        schedule_weekdays: input.schedule_weekdays ?? (index !== -1 ? currentOverrides[index].schedule_weekdays : null),
        schedule_weekend: input.schedule_weekend ?? (index !== -1 ? currentOverrides[index].schedule_weekend : null),
        address: input.address ?? (index !== -1 ? currentOverrides[index].address : null),
        image_url: input.image_url ?? (index !== -1 ? currentOverrides[index].image_url : null),
        google_maps_url: input.google_maps_url ?? (index !== -1 ? currentOverrides[index].google_maps_url : null),
        is_open_24h: input.is_open_24h ?? (index !== -1 ? currentOverrides[index].is_open_24h : null),
        created_at: index !== -1 ? currentOverrides[index].created_at : new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (index !== -1) {
        currentOverrides[index] = updatedOverride;
      } else {
        currentOverrides.push(updatedOverride);
      }

      demoData.setCasinoOverrides(currentOverrides);
      return updatedOverride;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["casino-overrides"] });
      toast({
        title: "Casino actualizado",
        description: "Los cambios se han guardado correctamente (Modo Demo).",
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

export function useDeleteCasinoOverride() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (casinoId: string) => {
      // DEMO MODE
      const currentOverrides = demoData.getCasinoOverrides();
      const filtered = currentOverrides.filter((o: any) => o.casino_id !== casinoId);
      demoData.setCasinoOverrides(filtered);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["casino-overrides"] });
      toast({
        title: "Casino eliminado",
        description: "El casino se ha eliminado correctamente (Modo Demo).",
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
