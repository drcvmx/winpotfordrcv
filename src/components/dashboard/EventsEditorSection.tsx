import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Plus, Trash2, Save, Calendar, Image, Repeat } from "lucide-react";
import { normalizeImageUrl } from "@/lib/url-utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  useTenantEvents, 
  useUpsertTenantEvent, 
  useDeleteTenantEvent, 
  TenantEvent,
  DAYS_OF_WEEK,
  RECURRENCE_TYPES,
  generateRecurrenceText,
  formatMultipleDates
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
  event_dates: string[]; // Multiple specific dates
  is_active: boolean;
  is_recurring: boolean;
  recurrence_type: string;
  recurrence_day: number;
  recurrence_days: number[];
  recurrence_text: string;
  date_mode: 'single' | 'multiple'; // UI helper for date selection
}

const emptyEvent: EventFormData = {
  title: '',
  description: '',
  image_url: '',
  event_date: '',
  event_dates: [],
  is_active: true,
  is_recurring: false,
  recurrence_type: 'weekly',
  recurrence_day: 1,
  recurrence_days: [],
  recurrence_text: '',
  date_mode: 'single',
};

export default function EventsEditorSection({ tenantId }: EventsEditorSectionProps) {
  const { data: events, isLoading } = useTenantEvents(tenantId);
  const upsertEvent = useUpsertTenantEvent();
  const deleteEvent = useDeleteTenantEvent();

  const [editingEvent, setEditingEvent] = useState<EventFormData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const handleEdit = (event: TenantEvent) => {
    // Determine date_mode based on existing data
    const hasMultipleDates = event.event_dates && event.event_dates.length > 0;
    
    setEditingEvent({
      id: event.id,
      title: event.title,
      description: event.description || '',
      image_url: event.image_url || '',
      event_date: event.event_date || '',
      event_dates: event.event_dates || [],
      is_active: event.is_active,
      is_recurring: event.is_recurring ?? false,
      recurrence_type: event.recurrence_type || 'weekly',
      recurrence_day: event.recurrence_day ?? 1,
      recurrence_days: event.recurrence_days || [],
      recurrence_text: event.recurrence_text || '',
      date_mode: hasMultipleDates ? 'multiple' : 'single',
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

    const isMultiDay = editingEvent.recurrence_type === 'weekly-multi';
    const isMultipleDates = !editingEvent.is_recurring && editingEvent.date_mode === 'multiple';
    
    upsertEvent.mutate({
      id: editingEvent.id,
      tenant_id: tenantId,
      title: editingEvent.title,
      description: editingEvent.description || undefined,
      image_url: editingEvent.image_url || undefined,
      event_date: editingEvent.is_recurring ? undefined : 
        (isMultipleDates ? undefined : editingEvent.event_date || undefined),
      event_dates: editingEvent.is_recurring ? undefined :
        (isMultipleDates ? editingEvent.event_dates : undefined),
      is_active: editingEvent.is_active,
      is_recurring: editingEvent.is_recurring,
      recurrence_type: editingEvent.is_recurring ? editingEvent.recurrence_type : undefined,
      recurrence_day: editingEvent.is_recurring && !isMultiDay ? editingEvent.recurrence_day : undefined,
      recurrence_days: editingEvent.is_recurring && isMultiDay ? editingEvent.recurrence_days : undefined,
      recurrence_text: editingEvent.is_recurring ? editingEvent.recurrence_text : undefined,
    }, {
      onSuccess: () => {
        setEditingEvent(null);
        setIsCreating(false);
      },
    });
  };

  const handleDeleteClick = (id: string) => {
    setEventToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      deleteEvent.mutate({ id: eventToDelete, tenantId });
    }
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const handleChange = (field: keyof EventFormData, value: string | boolean | number | number[] | string[]) => {
    if (!editingEvent) return;
    setEditingEvent(prev => prev ? { ...prev, [field]: value } : null);
  };

  // Add a date to the multiple dates array
  const handleAddDate = (date: string) => {
    if (!editingEvent || !date) return;
    if (editingEvent.event_dates.includes(date)) return; // Already exists
    
    const newDates = [...editingEvent.event_dates, date].sort();
    handleChange('event_dates', newDates);
  };

  // Remove a date from the multiple dates array
  const handleRemoveDate = (dateToRemove: string) => {
    if (!editingEvent) return;
    const newDates = editingEvent.event_dates.filter(d => d !== dateToRemove);
    handleChange('event_dates', newDates);
  };

  // Auto-generate recurrence text when single day changes
  const handleRecurrenceDayChange = (day: number) => {
    const dayName = DAYS_OF_WEEK.find(d => d.value === day)?.label || '';
    handleChange('recurrence_day', day);
    handleChange('recurrence_text', `Todos los ${dayName.toLowerCase()}`);
  };

  // Toggle a day in the multi-day selection
  const handleToggleDay = (day: number) => {
    if (!editingEvent) return;
    
    const currentDays = editingEvent.recurrence_days || [];
    let newDays: number[];
    
    if (currentDays.includes(day)) {
      newDays = currentDays.filter(d => d !== day);
    } else {
      newDays = [...currentDays, day].sort((a, b) => a - b);
    }
    
    handleChange('recurrence_days', newDays);
    // Auto-generate text
    handleChange('recurrence_text', generateRecurrenceText(newDays));
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">🎉 Eventos del Casino</h3>
          <p className="text-sm text-muted-foreground">Gestiona eventos únicos o recurrentes</p>
        </div>
        <Button
          onClick={handleCreate}
          disabled={!!editingEvent}
          className="bg-casino-gold hover:bg-casino-dark-gold text-black w-full sm:w-auto"
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
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap pt-2">
                  <button
                    type="button"
                    onClick={() => handleChange('is_recurring', false)}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
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
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
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

            {/* Conditional: Specific Date(s) OR Recurrence Options */}
            {!editingEvent.is_recurring ? (
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
                {/* Single vs Multiple Date Toggle */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <button
                    type="button"
                    onClick={() => handleChange('date_mode', 'single')}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      editingEvent.date_mode === 'single' 
                        ? 'bg-casino-gold text-black' 
                        : 'bg-background text-foreground border border-border hover:border-casino-gold/50'
                    }`}
                  >
                    📅 Una Fecha
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('date_mode', 'multiple')}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      editingEvent.date_mode === 'multiple' 
                        ? 'bg-casino-gold text-black' 
                        : 'bg-background text-foreground border border-border hover:border-casino-gold/50'
                    }`}
                  >
                    📆 Múltiples Fechas
                  </button>
                </div>

                {/* Single Date Mode */}
                {editingEvent.date_mode === 'single' && (
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
                )}

                {/* Multiple Dates Mode */}
                {editingEvent.date_mode === 'multiple' && (
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Agregar Fechas (ej: 8 de julio y 20 de julio)
                    </Label>
                    
                    {/* Date input to add new dates */}
                    <div className="flex gap-2">
                      <Input
                        type="date"
                        id="new-date-input"
                        className="max-w-xs"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddDate((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById('new-date-input') as HTMLInputElement;
                          if (input?.value) {
                            handleAddDate(input.value);
                            input.value = '';
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Agregar
                      </Button>
                    </div>

                    {/* Display selected dates */}
                    {editingEvent.event_dates.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Fechas seleccionadas: <span className="font-medium text-foreground">{formatMultipleDates(editingEvent.event_dates)}</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {editingEvent.event_dates.map((date) => {
                            const formatted = new Date(date + 'T00:00:00').toLocaleDateString('es-MX', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            });
                            return (
                              <span
                                key={date}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-casino-gold/20 text-casino-gold text-sm border border-casino-gold/30"
                              >
                                {formatted}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveDate(date)}
                                  className="ml-1 hover:text-destructive transition-colors"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-amber-500">Agrega al menos una fecha</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="space-y-2">
                  <Label>Frecuencia</Label>
                  <Select 
                    value={editingEvent.recurrence_type} 
                    onValueChange={(val) => {
                      handleChange('recurrence_type', val);
                      // Reset text when changing type
                      if (val === 'weekly-multi') {
                        handleChange('recurrence_text', generateRecurrenceText(editingEvent.recurrence_days));
                      } else if (val === 'weekly') {
                        const dayName = DAYS_OF_WEEK.find(d => d.value === editingEvent.recurrence_day)?.label || '';
                        handleChange('recurrence_text', `Todos los ${dayName.toLowerCase()}`);
                      } else if (val === 'daily') {
                        handleChange('recurrence_text', 'Todos los días');
                      }
                    }}
                  >
                    <SelectTrigger className="max-w-xs">
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

                {/* Single day selection */}
                {editingEvent.recurrence_type === 'weekly' && (
                  <div className="space-y-2">
                    <Label>Día de la Semana</Label>
                    <Select 
                      value={String(editingEvent.recurrence_day)} 
                      onValueChange={(val) => handleRecurrenceDayChange(Number(val))}
                    >
                      <SelectTrigger className="max-w-xs">
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

                {/* Multi-day selection */}
                {editingEvent.recurrence_type === 'weekly-multi' && (
                  <div className="space-y-3">
                    <Label>Selecciona los días</Label>
                    <div className="flex flex-wrap gap-2">
                      {DAYS_OF_WEEK.map((day) => {
                        const isSelected = editingEvent.recurrence_days?.includes(day.value);
                        return (
                          <button
                            key={day.value}
                            type="button"
                            onClick={() => handleToggleDay(day.value)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                              isSelected
                                ? 'bg-casino-gold text-black border-casino-gold'
                                : 'bg-background text-foreground border-border hover:border-casino-gold/50'
                            }`}
                          >
                            {day.short}
                          </button>
                        );
                      })}
                    </div>
                    {editingEvent.recurrence_days?.length === 0 && (
                      <p className="text-xs text-amber-500">Selecciona al menos un día</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Texto a Mostrar</Label>
                  <Input
                    value={editingEvent.recurrence_text}
                    onChange={(e) => handleChange('recurrence_text', e.target.value)}
                    placeholder="Ej: De lunes a jueves"
                  />
                  <p className="text-xs text-muted-foreground">
                    Este texto se mostrará en el sitio web (se genera automáticamente, pero puedes editarlo)
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
                    src={normalizeImageUrl(editingEvent.image_url)}
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
                disabled={
                  !editingEvent.title || 
                  upsertEvent.isPending ||
                  (editingEvent.is_recurring && editingEvent.recurrence_type === 'weekly-multi' && (!editingEvent.recurrence_days || editingEvent.recurrence_days.length === 0)) ||
                  (!editingEvent.is_recurring && editingEvent.date_mode === 'multiple' && editingEvent.event_dates.length === 0)
                }
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
                  src={normalizeImageUrl(event.image_url)}
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
                    {event.recurrence_type === 'weekly-multi' ? 'Multi-día' : 'Recurrente'}
                  </span>
                )}
                {!event.is_recurring && event.event_dates && event.event_dates.length > 0 && (
                  <span className="bg-casino-gold text-black text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {event.event_dates.length} fechas
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
              ) : event.event_dates && event.event_dates.length > 0 ? (
                <p className="text-xs text-casino-gold mt-2">
                  📆 {formatMultipleDates(event.event_dates)}
                </p>
              ) : event.event_date ? (
                <p className="text-xs text-casino-gold mt-2">
                  📅 {new Date(event.event_date + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              ) : null}
              <div className="flex justify-end mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(event.id);
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              ¿Eliminar evento?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Esta acción no se puede deshacer. El evento será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border hover:bg-muted">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}