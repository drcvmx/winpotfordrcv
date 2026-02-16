import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, Loader2, ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import { casinos } from "@/data/casinos";
import { useCasinoOverrides, useUpsertCasinoOverride, CasinoOverrideInput } from "@/hooks/useCasinoOverrides";
import { normalizeImageUrl } from "@/lib/url-utils";

export default function CasinoOverridesEditorSection() {
  const { data: overrides, isLoading } = useCasinoOverrides();
  const upsert = useUpsertCasinoOverride();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, CasinoOverrideInput>>({});

  useEffect(() => {
    const initial: Record<string, CasinoOverrideInput> = {};
    casinos.forEach(c => {
      const override = overrides?.find(o => o.casino_id === c.id);
      initial[c.id] = {
        casino_id: c.id,
        city: override?.city ?? c.city,
        brand: override?.brand ?? c.brand,
        schedule_weekdays: override?.schedule_weekdays ?? c.schedule.weekdays,
        schedule_weekend: override?.schedule_weekend ?? c.schedule.weekend ?? '',
        address: override?.address ?? c.address,
        image_url: override?.image_url ?? c.imageUrl,
        google_maps_url: override?.google_maps_url ?? c.googleMapsUrl,
        is_open_24h: override?.is_open_24h ?? c.isOpen24h ?? false,
      };
    });
    setForms(initial);
  }, [overrides]);

  const handleChange = (casinoId: string, field: keyof CasinoOverrideInput, value: string | boolean) => {
    setForms(prev => ({
      ...prev,
      [casinoId]: { ...prev[casinoId], [field]: value },
    }));
  };

  const handleSave = (casinoId: string) => {
    const form = forms[casinoId];
    if (!form) return;
    upsert.mutate(form);
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
        <CardTitle className="text-lg text-foreground">🏢 Editor de Casinos</CardTitle>
        <CardDescription>Edita la información de cada casino en la página principal (excepto "Visitar Sitio")</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {casinos.map((casino) => {
          const form = forms[casino.id];
          if (!form) return null;
          const isExpanded = expandedId === casino.id;
          const hasOverride = overrides?.some(o => o.casino_id === casino.id);

          return (
            <div key={casino.id} className="border border-border rounded-lg overflow-hidden">
              {/* Collapsed header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : casino.id)}
                className="w-full flex items-center justify-between p-3 bg-background hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {form.image_url && (
                    <img
                      src={normalizeImageUrl(form.image_url)}
                      alt={form.city || casino.city}
                      className="w-10 h-10 rounded object-cover shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                    />
                  )}
                  <div>
                    <span className="font-medium text-sm text-foreground">{form.city || casino.city}</span>
                    <span className="text-xs text-muted-foreground ml-2 capitalize">({form.brand || casino.brand})</span>
                  </div>
                  {hasOverride && <span className="text-[10px] text-green-500">✓ Editado</span>}
                </div>
                {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>

              {/* Expanded form */}
              {isExpanded && (
                <div className="p-4 border-t border-border space-y-4 bg-card">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ciudad / Nombre</Label>
                      <Input
                        value={form.city || ''}
                        onChange={(e) => handleChange(casino.id, 'city', e.target.value)}
                        placeholder="Ej: Tuxtla"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Marca</Label>
                      <Input
                        value={form.brand || ''}
                        onChange={(e) => handleChange(casino.id, 'brand', e.target.value)}
                        placeholder="winpot, capri, veneto, diamonds"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Horario entre semana</Label>
                      <Input
                        value={form.schedule_weekdays || ''}
                        onChange={(e) => handleChange(casino.id, 'schedule_weekdays', e.target.value)}
                        placeholder="Lunes a Domingo de 10:00 am a 3:00 am"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Horario fin de semana</Label>
                      <Input
                        value={form.schedule_weekend || ''}
                        onChange={(e) => handleChange(casino.id, 'schedule_weekend', e.target.value)}
                        placeholder="Jueves a Sábado de 9:00 am a 6:00 am"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Dirección</Label>
                    <Input
                      value={form.address || ''}
                      onChange={(e) => handleChange(casino.id, 'address', e.target.value)}
                      placeholder="Av. Principal #123..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><ImageIcon className="h-3 w-3" /> URL de imagen (acepta Google Drive)</Label>
                    <div className="flex gap-2 items-start">
                      <Input
                        value={form.image_url || ''}
                        onChange={(e) => handleChange(casino.id, 'image_url', e.target.value)}
                        placeholder="URL de imagen o link de Google Drive"
                        className="flex-1"
                      />
                      {form.image_url && (
                        <img
                          src={normalizeImageUrl(form.image_url)}
                          alt="Preview"
                          className="w-12 h-12 rounded object-cover shrink-0 bg-muted"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>URL de Google Maps</Label>
                    <Input
                      value={form.google_maps_url || ''}
                      onChange={(e) => handleChange(casino.id, 'google_maps_url', e.target.value)}
                      placeholder="https://www.google.com/maps/..."
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={!!form.is_open_24h}
                      onCheckedChange={(checked) => handleChange(casino.id, 'is_open_24h', checked)}
                    />
                    <Label>Abierto 24 horas</Label>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={() => handleSave(casino.id)}
                      disabled={upsert.isPending}
                      className="bg-casino-gold hover:bg-casino-dark-gold text-black"
                    >
                      {upsert.isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...</>
                      ) : (
                        <><Save className="mr-2 h-4 w-4" /> Guardar Casino</>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
