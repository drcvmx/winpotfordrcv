import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Gamepad2, Plus, Trash2, Save, Sparkles, Star } from "lucide-react";
import { 
  useTenantGames, 
  useAddTenantGame, 
  useUpdateTenantGame, 
  useDeleteTenantGame,
  AVAILABLE_GAME_IMAGES,
  TenantGame 
} from "@/hooks/useTenantGames";

interface GamesEditorSectionProps {
  tenantId: string;
}

export function GamesEditorSection({ tenantId }: GamesEditorSectionProps) {
  const { data: games, isLoading } = useTenantGames(tenantId);
  const addGame = useAddTenantGame();
  const updateGame = useUpdateTenantGame();
  const deleteGame = useDeleteTenantGame();

  const [newGameName, setNewGameName] = useState("");
  const [newGameImage, setNewGameImage] = useState(AVAILABLE_GAME_IMAGES[0].path);
  const [newGameCategory, setNewGameCategory] = useState<'new' | 'top'>('new');

  const newGames = games?.filter(g => g.category === 'new') || [];
  const topGames = games?.filter(g => g.category === 'top') || [];

  const handleAddGame = () => {
    if (!newGameName.trim()) return;
    
    addGame.mutate({
      tenant_id: tenantId,
      name: newGameName,
      image_url: newGameImage,
      category: newGameCategory,
      display_order: newGameCategory === 'new' ? newGames.length : topGames.length,
    });
    
    setNewGameName("");
  };

  const handleUpdateGame = (game: TenantGame, updates: Partial<TenantGame>) => {
    // Skip if it's a default game (not in DB yet)
    if (game.id.startsWith('default-')) {
      // First save to DB
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
    if (game.id.startsWith('default-')) {
      // Can't delete default games directly - need to save first
      return;
    }
    deleteGame.mutate({ id: game.id, tenantId });
  };

  const renderGameList = (gamesList: TenantGame[], category: 'new' | 'top') => (
    <div className="space-y-3">
      {gamesList.map((game) => (
        <div 
          key={game.id} 
          className={`flex items-center gap-4 p-3 rounded-lg border ${
            game.id.startsWith('default-') ? 'border-dashed border-muted-foreground/30 bg-muted/30' : 'border-border bg-card'
          }`}
        >
          <img 
            src={game.image_url} 
            alt={game.name} 
            className="w-16 h-16 object-contain rounded"
          />
          
          <div className="flex-1 space-y-2">
            <Input
              value={game.name}
              onChange={(e) => handleUpdateGame(game, { name: e.target.value })}
              className="font-medium"
              placeholder="Nombre del juego"
            />
            
            <Select
              value={game.image_url}
              onValueChange={(value) => handleUpdateGame(game, { image_url: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_GAME_IMAGES.map((img) => (
                  <SelectItem key={img.path} value={img.path}>
                    {img.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={game.is_active}
              onCheckedChange={(checked) => handleUpdateGame(game, { is_active: checked })}
            />
            
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
          </div>
          
          {game.id.startsWith('default-') && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              Sin guardar
            </span>
          )}
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
              <Label>Imagen</Label>
              <Select value={newGameImage} onValueChange={setNewGameImage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_GAME_IMAGES.map((img) => (
                    <SelectItem key={img.path} value={img.path}>
                      {img.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          
          <Button onClick={handleAddGame} disabled={!newGameName.trim() || addGame.isPending}>
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
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderGameList(topGames, 'top')}
        </CardContent>
      </Card>
    </div>
  );
}
