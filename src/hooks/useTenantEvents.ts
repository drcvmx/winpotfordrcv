import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface TenantEvent {
  id: string;
  tenant_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  event_date: string | null;
  is_active: boolean;
  display_order: number;
  is_recurring: boolean;
  recurrence_type: string | null; // 'weekly', 'daily', 'monthly'
  recurrence_day: number | null; // 0=Sunday, 1=Monday... 6=Saturday
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
  is_active?: boolean;
  display_order?: number;
  is_recurring?: boolean;
  recurrence_type?: string;
  recurrence_day?: number;
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
      return data as TenantEvent[];
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
      if (input.id) {
        // Update existing
        const { data, error } = await supabase
          .from('tenant_events')
          .update({
            title: input.title,
            description: input.description,
            image_url: input.image_url,
            event_date: input.event_date || null,
            is_active: input.is_active,
            display_order: input.display_order,
            is_recurring: input.is_recurring ?? false,
            recurrence_type: input.recurrence_type || null,
            recurrence_day: input.recurrence_day ?? null,
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
            image_url: input.image_url,
            event_date: input.event_date || null,
            is_active: input.is_active ?? true,
            display_order: input.display_order ?? 0,
            is_recurring: input.is_recurring ?? false,
            recurrence_type: input.recurrence_type || null,
            recurrence_day: input.recurrence_day ?? null,
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
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
];

export const RECURRENCE_TYPES = [
  { value: 'weekly', label: 'Semanal' },
  { value: 'daily', label: 'Diario' },
  { value: 'monthly', label: 'Mensual' },
];
