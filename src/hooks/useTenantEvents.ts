import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { normalizeImageUrl } from "@/lib/url-utils";

export interface TenantEvent {
  id: string;
  tenant_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  event_date: string | null;
  event_dates: string[] | null; // Array of specific dates (e.g., ["2025-07-08", "2025-07-20"])
  is_active: boolean;
  display_order: number;
  is_recurring: boolean;
  recurrence_type: string | null; // 'weekly', 'daily', 'monthly', 'specific-dates'
  recurrence_day: number | null; // 0=Sunday, 1=Monday... 6=Saturday (legacy, single day)
  recurrence_days: number[] | null; // Array of days for multi-day events
  recurrence_text: string | null; // "Todos los martes a las 8pm"
  created_at: string;
  updated_at: string;
}

export interface TenantEventInput {
  id?: string;
  tenant_id: string;
  title: string;
  description?: string;
  image_url?: string;
  event_date?: string;
  event_dates?: string[];
  is_active?: boolean;
  display_order?: number;
  is_recurring?: boolean;
  recurrence_type?: string;
  recurrence_day?: number;
  recurrence_days?: number[];
  recurrence_text?: string;
}

// Fetch events for a specific tenant
export function useTenantEvents(tenantId: string) {
  return useQuery({
    queryKey: ['tenant-events', tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenant_events')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      
      // Normalize Google Drive URLs for images
      return (data as TenantEvent[]).map(event => ({
        ...event,
        image_url: event.image_url ? normalizeImageUrl(event.image_url) : null,
      }));
    },
    enabled: !!tenantId,
  });
}

// Create or update an event
export function useUpsertTenantEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: TenantEventInput) => {
      // Normalize image URL if provided
      const normalizedImageUrl = input.image_url ? normalizeImageUrl(input.image_url) : undefined;
      
      if (input.id) {
        // Update existing
        const { data, error } = await supabase
          .from('tenant_events')
          .update({
            title: input.title,
            description: input.description,
            image_url: normalizedImageUrl,
            event_date: input.event_date || null,
            event_dates: input.event_dates || null,
            is_active: input.is_active,
            display_order: input.display_order,
            is_recurring: input.is_recurring ?? false,
            recurrence_type: input.recurrence_type || null,
            recurrence_day: input.recurrence_day ?? null,
            recurrence_days: input.recurrence_days || null,
            recurrence_text: input.recurrence_text || null,
          })
          .eq('id', input.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('tenant_events')
          .insert({
            tenant_id: input.tenant_id,
            title: input.title,
            description: input.description,
            image_url: normalizedImageUrl,
            event_date: input.event_date || null,
            event_dates: input.event_dates || null,
            is_active: input.is_active ?? true,
            display_order: input.display_order ?? 0,
            is_recurring: input.is_recurring ?? false,
            recurrence_type: input.recurrence_type || null,
            recurrence_day: input.recurrence_day ?? null,
            recurrence_days: input.recurrence_days || null,
            recurrence_text: input.recurrence_text || null,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-events', variables.tenant_id] });
      toast({
        title: variables.id ? "Evento actualizado" : "Evento creado",
        description: "Los cambios han sido guardados.",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete an event
export function useDeleteTenantEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, tenantId }: { id: string; tenantId: string }) => {
      const { error } = await supabase
        .from('tenant_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { id, tenantId };
    },
    onSuccess: (variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-events', variables.tenantId] });
      toast({
        title: "Evento eliminado",
        description: "El evento ha sido eliminado.",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Helper to get day name in Spanish
export const DAYS_OF_WEEK = [
  { value: 0, label: 'Domingo', short: 'Dom' },
  { value: 1, label: 'Lunes', short: 'Lun' },
  { value: 2, label: 'Martes', short: 'Mar' },
  { value: 3, label: 'Miércoles', short: 'Mié' },
  { value: 4, label: 'Jueves', short: 'Jue' },
  { value: 5, label: 'Viernes', short: 'Vie' },
  { value: 6, label: 'Sábado', short: 'Sáb' },
];

export const RECURRENCE_TYPES = [
  { value: 'weekly', label: 'Semanal (un día)' },
  { value: 'weekly-multi', label: 'Semanal (múltiples días)' },
  { value: 'daily', label: 'Diario' },
  { value: 'monthly', label: 'Mensual' },
];

// Helper to format multiple dates as readable text
export function formatMultipleDates(dates: string[]): string {
  if (!dates || dates.length === 0) return '';
  
  const sortedDates = [...dates].sort();
  const formatted = sortedDates.map(d => {
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'long' });
  });
  
  if (formatted.length === 1) return formatted[0];
  const last = formatted.pop();
  return `${formatted.join(', ')} y ${last}`;
}

// Helper to generate recurrence text from selected days
export function generateRecurrenceText(days: number[]): string {
  if (!days || days.length === 0) return '';
  
  const sortedDays = [...days].sort((a, b) => a - b);
  
  // Check if it's a consecutive range
  const isConsecutive = sortedDays.every((day, i) => 
    i === 0 || day === sortedDays[i - 1] + 1
  );
  
  if (isConsecutive && sortedDays.length > 1) {
    const firstDay = DAYS_OF_WEEK.find(d => d.value === sortedDays[0])?.label.toLowerCase();
    const lastDay = DAYS_OF_WEEK.find(d => d.value === sortedDays[sortedDays.length - 1])?.label.toLowerCase();
    return `De ${firstDay} a ${lastDay}`;
  }
  
  // Non-consecutive: list all days
  const dayNames = sortedDays.map(d => DAYS_OF_WEEK.find(day => day.value === d)?.label.toLowerCase());
  if (dayNames.length === 1) {
    return `Todos los ${dayNames[0]}`;
  }
  const lastDay = dayNames.pop();
  return `${dayNames.join(', ')} y ${lastDay}`;
}
