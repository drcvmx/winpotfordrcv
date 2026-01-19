import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TENANTS } from "@/data/mock-tenant";

export interface TenantGame {
  id: string;
  tenant_id: string;
  name: string;
  image_url: string;
  category: 'new' | 'top';
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TenantGameInput {
  tenant_id: string;
  name: string;
  image_url: string;
  category: 'new' | 'top';
  display_order?: number;
  is_active?: boolean;
}

// Available local game images
export const AVAILABLE_GAME_IMAGES = [
  { name: "Bao Zhu Zao Fu", path: "/games/bao-zhu-zao-fu.webp" },
  { name: "Bao Zhu Zhao", path: "/games/bao-zhu-zhao.webp" },
  { name: "Epic Empires", path: "/games/epic-empires.webp" },
  { name: "Gallina Huevos de Oro", path: "/games/gallina-huevos-oro.webp" },
  { name: "Gallina Huevos Veneto", path: "/games/gallina-huevos-veneto.webp" },
  { name: "Go Power", path: "/games/go-power.webp" },
  { name: "Kung Fu Frog", path: "/games/kung-fu-frog.webp" },
  { name: "Legendary Sword", path: "/games/legendary-sword.webp" },
  { name: "Legendary Sword Veneto", path: "/games/legendary-sword-veneto.webp" },
  { name: "Mighty Hammer", path: "/games/mighty-hammer.webp" },
  { name: "Mighty Hammer Veneto", path: "/games/mighty-hammer-veneto.webp" },
  { name: "Multi Win 15", path: "/games/multi-win-15.webp" },
  { name: "Night Link Medieval", path: "/games/night-link-medieval.webp" },
  { name: "San Fa Pandas", path: "/games/san-fa-pandas.webp" },
  { name: "San Fa Tigers", path: "/games/san-fa-tigers.webp" },
  { name: "Spin Bingo", path: "/games/spin-bingo.webp" },
  { name: "Taco Mania", path: "/games/taco-mania.webp" },
  { name: "Tiger Dragon", path: "/games/tiger-dragon.webp" },
  { name: "Xtension Link", path: "/games/xtension-link.webp" },
];

// Get default games from mock-tenant for a specific tenant
function getDefaultGames(tenantId: string): TenantGame[] {
  const tenant = TENANTS[tenantId];
  if (!tenant?.content?.games) return [];

  const games: TenantGame[] = [];
  const gamesContent = tenant.content.games;

  // Add new games
  if (gamesContent.newGames?.items) {
    gamesContent.newGames.items.forEach((game: { name: string; image?: string }, index: number) => {
      games.push({
        id: `default-new-${index}`,
        tenant_id: tenantId,
        name: game.name,
        image_url: game.image?.startsWith('/games/') ? game.image : '/games/epic-empires.webp',
        category: 'new',
        display_order: index,
        is_active: true,
        created_at: '',
        updated_at: '',
      });
    });
  }

  // Add top games
  if (gamesContent.topGames?.items) {
    gamesContent.topGames.items.forEach((game: { name: string; image?: string }, index: number) => {
      games.push({
        id: `default-top-${index}`,
        tenant_id: tenantId,
        name: game.name,
        image_url: game.image?.startsWith('/games/') ? game.image : '/games/legendary-sword.webp',
        category: 'top',
        display_order: index,
        is_active: true,
        created_at: '',
        updated_at: '',
      });
    });
  }

  return games;
}

// Fetch games for a specific tenant
export function useTenantGames(tenantId: string) {
  return useQuery({
    queryKey: ["tenant-games", tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tenant_games")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("category")
        .order("display_order");
      
      if (error) throw error;
      
      // If no DB data exists, return defaults from mock-tenant
      if (!data || data.length === 0) {
        return getDefaultGames(tenantId);
      }
      
      return data as TenantGame[];
    },
    enabled: !!tenantId,
  });
}

// Add a new game
export function useAddTenantGame() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (game: TenantGameInput) => {
      const { data, error } = await supabase
        .from("tenant_games")
        .insert(game)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tenant-games", variables.tenant_id] });
      toast({
        title: "Juego agregado",
        description: "El juego se ha agregado correctamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo agregar el juego: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

// Update an existing game
export function useUpdateTenantGame() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, tenantId, updates }: { id: string; tenantId: string; updates: Partial<TenantGameInput> }) => {
      const { data, error } = await supabase
        .from("tenant_games")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tenant-games", variables.tenantId] });
      toast({
        title: "Juego actualizado",
        description: "El juego se ha actualizado correctamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo actualizar el juego: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

// Delete a game
export function useDeleteTenantGame() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, tenantId }: { id: string; tenantId: string }) => {
      const { error } = await supabase
        .from("tenant_games")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tenant-games", variables.tenantId] });
      toast({
        title: "Juego eliminado",
        description: "El juego se ha eliminado correctamente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo eliminar el juego: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}
