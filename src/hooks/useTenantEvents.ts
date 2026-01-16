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
            event_date: input.event_date,
            is_active: input.is_active,
            display_order: input.display_order,
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
            event_date: input.event_date,
            is_active: input.is_active ?? true,
            display_order: input.display_order ?? 0,
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
