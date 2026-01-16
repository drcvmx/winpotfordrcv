import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Trash2, Save, Calendar, Image } from "lucide-react";
import { useTenantEvents, useUpsertTenantEvent, useDeleteTenantEvent, TenantEvent } from "@/hooks/useTenantEvents";

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
}

const emptyEvent: EventFormData = {
  title: '',
  description: '',
  image_url: '',
  event_date: '',
  is_active: true,
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
      event_date: editingEvent.event_date || undefined,
      is_active: editingEvent.is_active,
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

  const handleChange = (field: keyof EventFormData, value: string | boolean) => {
    if (!editingEvent) return;
    setEditingEvent(prev => prev ? { ...prev, [field]: value } : null);
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
          <p className="text-sm text-muted-foreground">Gestiona los eventos y promociones</p>
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
            </div>

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
              {event.event_date && (
                <p className="text-xs text-casino-gold mt-2">
                  📅 {new Date(event.event_date).toLocaleDateString('es-MX')}
                </p>
              )}
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
