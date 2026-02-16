import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
      const { data, error } = await supabase
        .from("casino_overrides")
        .select("*");
      if (error) throw error;
      return (data as CasinoOverride[]) || [];
    },
  });
}

export function useUpsertCasinoOverride() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CasinoOverrideInput) => {
      const { data, error } = await supabase
        .from("casino_overrides")
        .upsert(input, { onConflict: "casino_id" })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["casino-overrides"] });
      toast({
        title: "Casino actualizado",
        description: "Los cambios se han guardado correctamente.",
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
