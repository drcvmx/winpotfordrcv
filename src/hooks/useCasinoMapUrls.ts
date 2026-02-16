import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CasinoMapUrl {
  id: string;
  casino_id: string;
  google_maps_url: string;
  created_at: string;
  updated_at: string;
}

export function useCasinoMapUrls() {
  return useQuery({
    queryKey: ["casino-map-urls"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casino_map_urls")
        .select("*");
      if (error) throw error;
      return (data as CasinoMapUrl[]) || [];
    },
  });
}

export function useUpsertCasinoMapUrl() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ casino_id, google_maps_url }: { casino_id: string; google_maps_url: string }) => {
      const { data, error } = await supabase
        .from("casino_map_urls")
        .upsert({ casino_id, google_maps_url }, { onConflict: "casino_id" })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["casino-map-urls"] });
      toast({
        title: "URL de mapa guardada",
        description: "La URL se ha actualizado correctamente.",
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
