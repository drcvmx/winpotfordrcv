import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { supabase } from "@/integrations/supabase/client";
import { demoData } from "@/lib/demo-data";
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
      // DEMO MODE: Fetch from local storage
      const data = demoData.getTenantGames(tenantId);

      // Sort by category and then display_order
      // 'new' comes first (arbitrary choice, or follows UI logic), then 'top'
      // The original code ordered by category then display_order.
      return data.sort((a: TenantGame, b: TenantGame) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.display_order - b.display_order;
      }) as TenantGame[];
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
      const currentGames = demoData.getTenantGames(game.tenant_id);

      const newGame: TenantGame = {
        id: `local-game-${Date.now()}`,
        ...game,
        display_order: game.display_order ?? currentGames.length,
        is_active: game.is_active ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      currentGames.push(newGame);
      demoData.setTenantGames(game.tenant_id, currentGames);

      return newGame;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tenant-games", variables.tenant_id] });
      toast({
        title: "Juego agregado",
        description: "El juego se ha agregado correctamente (Modo Demo).",
        className: "bg-green-600 text-white border-none",
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
      const currentGames = demoData.getTenantGames(tenantId);
      const gameIndex = currentGames.findIndex((g: TenantGame) => g.id === id);

      if (gameIndex === -1) throw new Error("Game not found");

      const updatedGame = {
        ...currentGames[gameIndex],
        ...updates,
        updated_at: new Date().toISOString()
      };

      currentGames[gameIndex] = updatedGame;
      demoData.setTenantGames(tenantId, currentGames);

      return updatedGame;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tenant-games", variables.tenantId] });
      toast({
        title: "Juego actualizado",
        description: "El juego se ha actualizado correctamente (Modo Demo).",
        className: "bg-green-600 text-white border-none",
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
      const currentGames = demoData.getTenantGames(tenantId);
      const filteredGames = currentGames.filter((g: TenantGame) => g.id !== id);
      demoData.setTenantGames(tenantId, filteredGames);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tenant-games", variables.tenantId] });
      toast({
        title: "Juego eliminado",
        description: "El juego se ha eliminado correctamente (Modo Demo).",
        className: "bg-green-600 text-white border-none",
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

// Bulk reorder games
export function useReorderTenantGames() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ tenantId, updates }: { tenantId: string; updates: { id: string; display_order: number }[] }) => {
      const currentGames = demoData.getTenantGames(tenantId);

      // Update order in memory
      updates.forEach(update => {
        const game = currentGames.find((g: TenantGame) => g.id === update.id);
        if (game) {
          game.display_order = update.display_order;
          game.updated_at = new Date().toISOString();
        }
      });

      demoData.setTenantGames(tenantId, currentGames);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tenant-games", variables.tenantId] });
      toast({
        title: "Orden actualizado",
        description: "El orden de los juegos se ha guardado (Modo Demo).",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo reordenar: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}
