import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, Loader2, ChevronDown, ChevronUp, ImageIcon, Plus, Trash2 } from "lucide-react";
import { casinos } from "@/data/casinos";
import { useCasinoOverrides, useUpsertCasinoOverride, useDeleteCasinoOverride, CasinoOverrideInput } from "@/hooks/useCasinoOverrides";
import { normalizeImageUrl } from "@/lib/url-utils";

const EMPTY_FORM: CasinoOverrideInput = {
  casino_id: '',
  city: '',
  brand: 'winpot',
  schedule_weekdays: '',
  schedule_weekend: '',
  address: '',
  image_url: '',
  google_maps_url: '',
  is_open_24h: false,
};

export default function CasinoOverridesEditorSection() {
  const { data: overrides, isLoading } = useCasinoOverrides();
  const upsert = useUpsertCasinoOverride();
  const deleteMutation = useDeleteCasinoOverride();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, CasinoOverrideInput>>({});
  const [showNewForm, setShowNewForm] = useState(false);
  const [newForm, setNewForm] = useState<CasinoOverrideInput>({ ...EMPTY_FORM });

  // Static casino IDs
  const staticCasinoIds = new Set(casinos.map(c => c.id));

  // DB-only casinos (not in static data)
  const dbOnlyCasinos = overrides?.filter(o => !staticCasinoIds.has(o.casino_id)) || [];

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
    // Also include DB-only casinos
    dbOnlyCasinos.forEach(o => {
      initial[o.casino_id] = {
        casino_id: o.casino_id,
        city: o.city ?? '',
        brand: o.brand ?? 'winpot',
        schedule_weekdays: o.schedule_weekdays ?? '',
        schedule_weekend: o.schedule_weekend ?? '',
        address: o.address ?? '',
        image_url: o.image_url ?? '',
        google_maps_url: o.google_maps_url ?? '',
        is_open_24h: o.is_open_24h ?? false,
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

  const handleNewChange = (field: keyof CasinoOverrideInput, value: string | boolean) => {
    setNewForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateCasino = () => {
    if (!newForm.city) return;
    // Generate a slug-like ID from the city name
    const casinoId = (newForm.city as string)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    upsert.mutate(
      { ...newForm, casino_id: casinoId },
      {
        onSuccess: () => {
          setNewForm({ ...EMPTY_FORM });
          setShowNewForm(false);
        },
      }
    );
  };

  const handleDeleteCasino = (casinoId: string) => {
    if (confirm('¿Estás seguro de eliminar este casino?')) {
      deleteMutation.mutate(casinoId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-casino-gold" />
      </div>
    );
  }

  const renderCasinoForm = (casinoId: string, label: string, brandLabel: string, isDbOnly: boolean) => {
    const form = forms[casinoId];
    if (!form) return null;
    const isExpanded = expandedId === casinoId;
    const hasOverride = overrides?.some(o => o.casino_id === casinoId);

    return (
      <div key={casinoId} className="border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedId(isExpanded ? null : casinoId)}
          className="w-full flex items-center justify-between p-3 bg-background hover:bg-muted/50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            {form.image_url && (
              <img
                src={normalizeImageUrl(form.image_url)}
                alt={form.city || label}
                className="w-10 h-10 rounded object-cover shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
              />
            )}
            <div>
              <span className="font-medium text-sm text-foreground">{form.city || label}</span>
              <span className="text-xs text-muted-foreground ml-2 capitalize">({form.brand || brandLabel})</span>
            </div>
            {isDbOnly && <span className="text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">Nuevo</span>}
            {hasOverride && !isDbOnly && <span className="text-[10px] text-green-500">✓ Editado</span>}
          </div>
          {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </button>

        {isExpanded && (
          <div className="p-4 border-t border-border space-y-4 bg-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ciudad / Nombre</Label>
                <Input
                  value={form.city || ''}
                  onChange={(e) => handleChange(casinoId, 'city', e.target.value)}
                  placeholder="Ej: Tuxtla"
                />
              </div>
              <div className="space-y-2">
                <Label>Marca</Label>
                <Input
                  value={form.brand || ''}
                  onChange={(e) => handleChange(casinoId, 'brand', e.target.value)}
                  placeholder="winpot, capri, veneto, diamonds"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Horario entre semana</Label>
                <Input
                  value={form.schedule_weekdays || ''}
                  onChange={(e) => handleChange(casinoId, 'schedule_weekdays', e.target.value)}
                  placeholder="Lunes a Domingo de 10:00 am a 3:00 am"
                />
              </div>
              <div className="space-y-2">
                <Label>Horario fin de semana</Label>
                <Input
                  value={form.schedule_weekend || ''}
                  onChange={(e) => handleChange(casinoId, 'schedule_weekend', e.target.value)}
                  placeholder="Jueves a Sábado de 9:00 am a 6:00 am"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input
                value={form.address || ''}
                onChange={(e) => handleChange(casinoId, 'address', e.target.value)}
                placeholder="Av. Principal #123..."
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1"><ImageIcon className="h-3 w-3" /> URL de imagen (acepta Google Drive)</Label>
              <div className="flex gap-2 items-start">
                <Input
                  value={form.image_url || ''}
                  onChange={(e) => handleChange(casinoId, 'image_url', e.target.value)}
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
                onChange={(e) => handleChange(casinoId, 'google_maps_url', e.target.value)}
                placeholder="https://www.google.com/maps/..."
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={!!form.is_open_24h}
                onCheckedChange={(checked) => handleChange(casinoId, 'is_open_24h', checked)}
              />
              <Label>Abierto 24 horas</Label>
            </div>

            <div className="flex justify-between pt-2">
              {isDbOnly && (
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCasino(casinoId)}
                  disabled={deleteMutation.isPending}
                  size="sm"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                </Button>
              )}
              <div className={isDbOnly ? '' : 'ml-auto'}>
                <Button
                  onClick={() => handleSave(casinoId)}
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
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-foreground">🏢 Editor de Casinos</CardTitle>
            <CardDescription>Edita la información de cada casino o agrega uno nuevo</CardDescription>
          </div>
          <Button
            onClick={() => setShowNewForm(!showNewForm)}
            className="bg-casino-gold hover:bg-casino-dark-gold text-black"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Casino
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* New casino form */}
        {showNewForm && (
          <div className="border-2 border-dashed border-casino-gold/50 rounded-lg p-4 space-y-4 bg-casino-gold/5">
            <h4 className="font-semibold text-foreground text-sm">➕ Nuevo Casino</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ciudad / Nombre *</Label>
                <Input
                  value={newForm.city || ''}
                  onChange={(e) => handleNewChange('city', e.target.value)}
                  placeholder="Ej: León"
                />
              </div>
              <div className="space-y-2">
                <Label>Marca</Label>
                <Input
                  value={newForm.brand || ''}
                  onChange={(e) => handleNewChange('brand', e.target.value)}
                  placeholder="winpot, capri, veneto, diamonds"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Horario entre semana</Label>
                <Input
                  value={newForm.schedule_weekdays || ''}
                  onChange={(e) => handleNewChange('schedule_weekdays', e.target.value)}
                  placeholder="Lunes a Domingo de 10:00 am a 3:00 am"
                />
              </div>
              <div className="space-y-2">
                <Label>Horario fin de semana</Label>
                <Input
                  value={newForm.schedule_weekend || ''}
                  onChange={(e) => handleNewChange('schedule_weekend', e.target.value)}
                  placeholder="Jueves a Sábado de 9:00 am a 6:00 am"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input
                value={newForm.address || ''}
                onChange={(e) => handleNewChange('address', e.target.value)}
                placeholder="Av. Principal #123..."
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><ImageIcon className="h-3 w-3" /> URL de imagen</Label>
              <Input
                value={newForm.image_url || ''}
                onChange={(e) => handleNewChange('image_url', e.target.value)}
                placeholder="URL de imagen o link de Google Drive"
              />
            </div>
            <div className="space-y-2">
              <Label>URL de Google Maps</Label>
              <Input
                value={newForm.google_maps_url || ''}
                onChange={(e) => handleNewChange('google_maps_url', e.target.value)}
                placeholder="https://www.google.com/maps/..."
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={!!newForm.is_open_24h}
                onCheckedChange={(checked) => handleNewChange('is_open_24h', checked)}
              />
              <Label>Abierto 24 horas</Label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowNewForm(false)}>Cancelar</Button>
              <Button
                onClick={handleCreateCasino}
                disabled={upsert.isPending || !newForm.city}
                className="bg-casino-gold hover:bg-casino-dark-gold text-black"
                size="sm"
              >
                {upsert.isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando...</>
                ) : (
                  <><Plus className="mr-2 h-4 w-4" /> Crear Casino</>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* DB-only casinos first */}
        {dbOnlyCasinos.map((o) =>
          renderCasinoForm(o.casino_id, o.city || 'Sin nombre', o.brand || 'winpot', true)
        )}

        {/* Static casinos */}
        {casinos.map((casino) =>
          renderCasinoForm(casino.id, casino.city, casino.brand, false)
        )}
      </CardContent>
    </Card>
  );
}
