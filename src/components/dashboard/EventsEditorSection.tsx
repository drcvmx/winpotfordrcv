import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Trash2, Save, Calendar, Image, Repeat } from "lucide-react";
import { 
  useTenantEvents, 
  useUpsertTenantEvent, 
  useDeleteTenantEvent, 
  TenantEvent,
  DAYS_OF_WEEK,
  RECURRENCE_TYPES 
} from "@/hooks/useTenantEvents";

interface EventsEditorSectionProps {
  tenantId: string;
}

interface EventFormData {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  event_date: string;
  is_active: boolean;
  is_recurring: boolean;
  recurrence_type: string;
  recurrence_day: number;
  recurrence_text: string;
}

const emptyEvent: EventFormData = {
  title: '',
  description: '',
  image_url: '',
  event_date: '',
  is_active: true,
  is_recurring: false,
  recurrence_type: 'weekly',
  recurrence_day: 1,
  recurrence_text: '',
};

export default function EventsEditorSection({ tenantId }: EventsEditorSectionProps) {
  const { data: events, isLoading } = useTenantEvents(tenantId);
  const upsertEvent = useUpsertTenantEvent();
  const deleteEvent = useDeleteTenantEvent();

  const [editingEvent, setEditingEvent] = useState<EventFormData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (event: TenantEvent) => {
    setEditingEvent({
      id: event.id,
      title: event.title,
      description: event.description || '',
      image_url: event.image_url || '',
      event_date: event.event_date || '',
      is_active: event.is_active,
      is_recurring: event.is_recurring ?? false,
      recurrence_type: event.recurrence_type || 'weekly',
      recurrence_day: event.recurrence_day ?? 1,
      recurrence_text: event.recurrence_text || '',
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingEvent({ ...emptyEvent });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingEvent(null);
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!editingEvent) return;

    upsertEvent.mutate({
      id: editingEvent.id,
      tenant_id: tenantId,
      title: editingEvent.title,
      description: editingEvent.description || undefined,
      image_url: editingEvent.image_url || undefined,
      event_date: editingEvent.is_recurring ? undefined : editingEvent.event_date || undefined,
      is_active: editingEvent.is_active,
      is_recurring: editingEvent.is_recurring,
      recurrence_type: editingEvent.is_recurring ? editingEvent.recurrence_type : undefined,
      recurrence_day: editingEvent.is_recurring ? editingEvent.recurrence_day : undefined,
      recurrence_text: editingEvent.is_recurring ? editingEvent.recurrence_text : undefined,
    }, {
      onSuccess: () => {
        setEditingEvent(null);
        setIsCreating(false);
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      deleteEvent.mutate({ id, tenantId });
    }
  };

  const handleChange = (field: keyof EventFormData, value: string | boolean | number) => {
    if (!editingEvent) return;
    setEditingEvent(prev => prev ? { ...prev, [field]: value } : null);
  };

  // Auto-generate recurrence text when day changes
  const handleRecurrenceDayChange = (day: number) => {
    const dayName = DAYS_OF_WEEK.find(d => d.value === day)?.label || '';
    handleChange('recurrence_day', day);
    if (!editingEvent?.recurrence_text) {
      handleChange('recurrence_text', `Todos los ${dayName.toLowerCase()}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-casino-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">🎉 Eventos del Casino</h3>
          <p className="text-sm text-muted-foreground">Gestiona eventos únicos o recurrentes</p>
        </div>
        <Button
          onClick={handleCreate}
          disabled={!!editingEvent}
          className="bg-casino-gold hover:bg-casino-dark-gold text-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Evento
        </Button>
      </div>

      {/* Editing Form */}
      {editingEvent && (
        <Card className="border-casino-gold/50 bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              {isCreating ? '✨ Crear Evento' : '✏️ Editar Evento'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Título del Evento *</Label>
                <Input
                  value={editingEvent.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Noche de Bingo"
                />
              </div>
              
              {/* Event Type Toggle */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Repeat className="h-4 w-4" />
                  Tipo de Evento
                </Label>
                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => handleChange('is_recurring', false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      !editingEvent.is_recurring 
                        ? 'bg-casino-gold text-black' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    📅 Fecha Específica
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('is_recurring', true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      editingEvent.is_recurring 
                        ? 'bg-casino-gold text-black' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    🔄 Recurrente
                  </button>
                </div>
              </div>
            </div>

            {/* Conditional: Specific Date OR Recurrence Options */}
            {!editingEvent.is_recurring ? (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Fecha del Evento
                </Label>
                <Input
                  type="date"
                  value={editingEvent.event_date}
                  onChange={(e) => handleChange('event_date', e.target.value)}
                />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="space-y-2">
                  <Label>Frecuencia</Label>
                  <Select 
                    value={editingEvent.recurrence_type} 
                    onValueChange={(val) => handleChange('recurrence_type', val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RECURRENCE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {editingEvent.recurrence_type === 'weekly' && (
                  <div className="space-y-2">
                    <Label>Día de la Semana</Label>
                    <Select 
                      value={String(editingEvent.recurrence_day)} 
                      onValueChange={(val) => handleRecurrenceDayChange(Number(val))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS_OF_WEEK.map((day) => (
                          <SelectItem key={day.value} value={String(day.value)}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2 md:col-span-full">
                  <Label>Texto a Mostrar</Label>
                  <Input
                    value={editingEvent.recurrence_text}
                    onChange={(e) => handleChange('recurrence_text', e.target.value)}
                    placeholder="Ej: Todos los martes a las 8pm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Este texto se mostrará en el sitio web
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                value={editingEvent.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe el evento, premios, horarios..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                URL de Imagen
              </Label>
              <Input
                value={editingEvent.image_url}
                onChange={(e) => handleChange('image_url', e.target.value)}
                placeholder="https://ejemplo.com/imagen-evento.webp"
              />
              {editingEvent.image_url && (
                <div className="mt-2">
                  <img
                    src={editingEvent.image_url}
                    alt="Preview"
                    className="h-32 w-auto rounded-lg object-cover border border-border"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={editingEvent.is_active}
                onCheckedChange={(checked) => handleChange('is_active', checked)}
              />
              <Label>Evento Activo (visible en el sitio)</Label>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={!editingEvent.title || upsertEvent.isPending}
                className="bg-casino-gold hover:bg-casino-dark-gold text-black"
              >
                {upsertEvent.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isCreating ? 'Crear Evento' : 'Guardar Cambios'}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <Card
            key={event.id}
            className={`border-border bg-card cursor-pointer transition-all hover:border-casino-gold/50 ${
              editingEvent?.id === event.id ? 'ring-2 ring-casino-gold' : ''
            }`}
            onClick={() => handleEdit(event)}
          >
            <div className="relative">
              {event.image_url ? (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-32 bg-muted flex items-center justify-center rounded-t-lg">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="absolute top-2 left-2 flex gap-1">
                {event.is_recurring && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Repeat className="h-3 w-3" />
                    Recurrente
                  </span>
                )}
              </div>
              {!event.is_active && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Inactivo
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground truncate">{event.title}</h4>
              {event.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {event.description}
                </p>
              )}
              {event.is_recurring && event.recurrence_text ? (
                <p className="text-xs text-blue-400 mt-2">
                  🔄 {event.recurrence_text}
                </p>
              ) : event.event_date ? (
                <p className="text-xs text-casino-gold mt-2">
                  📅 {new Date(event.event_date).toLocaleDateString('es-MX')}
                </p>
              ) : null}
              <div className="flex justify-end mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(event.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {(!events || events.length === 0) && !editingEvent && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No hay eventos configurados. ¡Crea el primero!
          </div>
        )}
      </div>
    </div>
  );
}
