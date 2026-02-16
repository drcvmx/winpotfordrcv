import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Save, Loader2, ExternalLink } from "lucide-react";
import { casinos } from "@/data/casinos";
import { useCasinoMapUrls, useUpsertCasinoMapUrl } from "@/hooks/useCasinoMapUrls";

export default function CasinoMapEditorSection() {
  const { data: mapUrls, isLoading } = useCasinoMapUrls();
  const upsert = useUpsertCasinoMapUrl();
  const [urls, setUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    // Initialize with static data
    const initial: Record<string, string> = {};
    casinos.forEach(c => {
      initial[c.id] = c.googleMapsUrl;
    });
    // Override with DB data
    mapUrls?.forEach(m => {
      initial[m.casino_id] = m.google_maps_url;
    });
    setUrls(initial);
  }, [mapUrls]);

  const handleSave = (casinoId: string) => {
    const url = urls[casinoId];
    if (!url?.trim()) return;
    upsert.mutate({ casino_id: casinoId, google_maps_url: url });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-casino-gold" />
      </div>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-foreground">
          <MapPin className="h-5 w-5 text-primary" />
          URLs de Google Maps — Casinos
        </CardTitle>
        <CardDescription>Edita la URL del botón "Ver en Mapa" de cada casino en la página principal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {casinos.map((casino) => {
          const hasDbOverride = mapUrls?.some(m => m.casino_id === casino.id);
          return (
            <div key={casino.id} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg border border-border bg-background">
              <div className="sm:w-48 shrink-0">
                <span className="font-medium text-sm text-foreground">{casino.city}</span>
                <span className="text-xs text-muted-foreground ml-2 capitalize">({casino.brand})</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <Input
                  value={urls[casino.id] || ''}
                  onChange={(e) => setUrls(prev => ({ ...prev, [casino.id]: e.target.value }))}
                  placeholder="https://www.google.com/maps/..."
                  className="text-xs h-9"
                />
                {urls[casino.id] && (
                  <a
                    href={urls[casino.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary shrink-0"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSave(casino.id)}
                  disabled={upsert.isPending}
                  className="shrink-0"
                >
                  <Save className="h-3 w-3" />
                </Button>
              </div>
              {hasDbOverride && (
                <span className="text-[10px] text-green-500 shrink-0">✓ Guardado</span>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
