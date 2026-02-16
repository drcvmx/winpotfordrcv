import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Gamepad2, Plus, Trash2, GripVertical, Sparkles, Star, ImageIcon } from "lucide-react";
import { 
  useTenantGames, 
  useAddTenantGame, 
  useUpdateTenantGame, 
  useDeleteTenantGame,
  useReorderTenantGames,
  TenantGame 
} from "@/hooks/useTenantGames";
import { normalizeImageUrl } from "@/lib/url-utils";

interface GamesEditorSectionProps {
  tenantId: string;
}

export function GamesEditorSection({ tenantId }: GamesEditorSectionProps) {
  const { data: games, isLoading } = useTenantGames(tenantId);
  const addGame = useAddTenantGame();
  const updateGame = useUpdateTenantGame();
  const deleteGame = useDeleteTenantGame();
  const reorderGames = useReorderTenantGames();

  const [newGameName, setNewGameName] = useState("");
  const [newGameImageUrl, setNewGameImageUrl] = useState("");
  const [newGameCategory, setNewGameCategory] = useState<'new' | 'top'>('new');

  // Drag state
  const dragItem = useRef<{ id: string; category: string } | null>(null);
  const dragOverItem = useRef<{ id: string; category: string } | null>(null);

  const newGames = games?.filter(g => g.category === 'new').sort((a, b) => a.display_order - b.display_order) || [];
  const topGames = games?.filter(g => g.category === 'top').sort((a, b) => a.display_order - b.display_order) || [];

  const handleAddGame = () => {
    if (!newGameName.trim() || !newGameImageUrl.trim()) return;
    
    const targetGames = newGameCategory === 'new' ? newGames : topGames;
    addGame.mutate({
      tenant_id: tenantId,
      name: newGameName,
      image_url: newGameImageUrl,
      category: newGameCategory,
      display_order: targetGames.length,
    });
    
    setNewGameName("");
    setNewGameImageUrl("");
  };

  const handleUpdateGame = (game: TenantGame, updates: Partial<TenantGame>) => {
    if (game.id.startsWith('default-')) {
      addGame.mutate({
        tenant_id: tenantId,
        name: updates.name || game.name,
        image_url: updates.image_url || game.image_url,
        category: game.category,
        display_order: game.display_order,
        is_active: updates.is_active ?? game.is_active,
      });
      return;
    }
    
    updateGame.mutate({
      id: game.id,
      tenantId,
      updates,
    });
  };

  const handleDeleteGame = (game: TenantGame) => {
    if (game.id.startsWith('default-')) return;
    deleteGame.mutate({ id: game.id, tenantId });
  };

  const handleDragStart = (game: TenantGame) => {
    dragItem.current = { id: game.id, category: game.category };
  };

  const handleDragOver = (e: React.DragEvent, game: TenantGame) => {
    e.preventDefault();
    dragOverItem.current = { id: game.id, category: game.category };
  };

  const handleDrop = (e: React.DragEvent, category: 'new' | 'top') => {
    e.preventDefault();
    if (!dragItem.current || !dragOverItem.current) return;
    // Only allow reorder within same category
    if (dragItem.current.category !== dragOverItem.current.category) return;

    const list = category === 'new' ? [...newGames] : [...topGames];
    const dragIndex = list.findIndex(g => g.id === dragItem.current!.id);
    const overIndex = list.findIndex(g => g.id === dragOverItem.current!.id);

    if (dragIndex === -1 || overIndex === -1 || dragIndex === overIndex) return;

    // Reorder
    const [moved] = list.splice(dragIndex, 1);
    list.splice(overIndex, 0, moved);

    // Only reorder saved games (not defaults)
    const savedGames = list.filter(g => !g.id.startsWith('default-'));
    if (savedGames.length > 0) {
      reorderGames.mutate({
        tenantId,
        updates: savedGames.map((g, i) => ({ id: g.id, display_order: i })),
      });
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

  const renderGameList = (gamesList: TenantGame[], category: 'new' | 'top') => (
    <div className="space-y-3" onDrop={(e) => handleDrop(e, category)} onDragOver={(e) => e.preventDefault()}>
      {gamesList.map((game) => (
        <div 
          key={game.id}
          draggable={!game.id.startsWith('default-')}
          onDragStart={() => handleDragStart(game)}
          onDragOver={(e) => handleDragOver(e, game)}
          className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-lg border transition-colors ${
            game.id.startsWith('default-') 
              ? 'border-dashed border-muted-foreground/30 bg-muted/30' 
              : 'border-border bg-card cursor-grab active:cursor-grabbing hover:border-primary/40'
          }`}
        >
          {/* Drag handle */}
          {!game.id.startsWith('default-') && (
            <div className="hidden sm:flex items-center text-muted-foreground">
              <GripVertical className="h-5 w-5" />
            </div>
          )}

          <img 
            src={normalizeImageUrl(game.image_url)} 
            alt={game.name} 
            className="w-16 h-16 object-contain rounded mx-auto sm:mx-0 shrink-0 bg-muted/20"
            onError={(e) => { (e.target as HTMLImageElement).src = '/games/epic-empires.webp'; }}
          />
          
          <div className="flex-1 space-y-2 min-w-0">
            <Input
              value={game.name}
              onChange={(e) => handleUpdateGame(game, { name: e.target.value })}
              className="font-medium"
              placeholder="Nombre del juego"
            />
            
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                value={game.image_url}
                onChange={(e) => handleUpdateGame(game, { image_url: e.target.value })}
                placeholder="URL de imagen o link de Google Drive"
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground sm:hidden">Activo</span>
              <Switch
                checked={game.is_active}
                onCheckedChange={(checked) => handleUpdateGame(game, { is_active: checked })}
              />
            </div>
            
            <div className="flex items-center gap-2">
              {!game.id.startsWith('default-') && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteGame(game)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              
              {game.id.startsWith('default-') && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  Sin guardar
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {gamesList.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No hay juegos en esta categoría
        </p>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Cargando juegos...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add New Game */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Agregar Nuevo Juego
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Nombre del juego</Label>
              <Input
                value={newGameName}
                onChange={(e) => setNewGameName(e.target.value)}
                placeholder="Ej: Dragon Fortune"
              />
            </div>
            
            <div className="space-y-2">
              <Label>URL de imagen</Label>
              <Input
                value={newGameImageUrl}
                onChange={(e) => setNewGameImageUrl(e.target.value)}
                placeholder="URL o link de Google Drive"
              />
              {newGameImageUrl && (
                <img 
                  src={normalizeImageUrl(newGameImageUrl)} 
                  alt="Preview" 
                  className="w-16 h-16 object-contain rounded bg-muted/20 mt-1"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select value={newGameCategory} onValueChange={(v) => setNewGameCategory(v as 'new' | 'top')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Juegos Nuevos</SelectItem>
                  <SelectItem value="top">Más Jugados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleAddGame} disabled={!newGameName.trim() || !newGameImageUrl.trim() || addGame.isPending}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Juego
          </Button>
        </CardContent>
      </Card>

      {/* New Games Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Juegos Nuevos ({newGames.length})
            <span className="text-xs text-muted-foreground font-normal ml-2">Arrastra para reordenar</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderGameList(newGames, 'new')}
        </CardContent>
      </Card>

      {/* Top Games Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Más Jugados ({topGames.length})
            <span className="text-xs text-muted-foreground font-normal ml-2">Arrastra para reordenar</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderGameList(topGames, 'top')}
        </CardContent>
      </Card>
    </div>
  );
}
