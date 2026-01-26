import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface TenantLegal {
  id: string;
  tenant_id: string;
  legal_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface TenantLegalInput {
  tenant_id: string;
  legal_text: string;
}

const DEFAULT_LEGAL_TEXT = `Winpot © 2006-2025. Todos los derechos reservados.
www.winpotcasinos.com.mx es un sitio web totalmente informativo. No se permiten, ni se captan apuestas en línea a través de este sitio web.

Winpot.com es una página informativa de los casinos con las marcas comerciales Winpot©, Veneto©, Capri© y Diamonds©.

Que operan al amparo de los permisos federales: Pur Umazal Tov S.A. de C.V. (DGJS/DGAFJ/DCRCA/P-03/2014, DGJS/DGAFJ/DCRCA/P-04/2014 , DGJS/DGAFJ/DCRCA/P-05/2014, DGJS/DGAFJ/DCRCA/P-06/2014, DGJS/DGAFJ/DCRCA/P-07/2014, DGJS/DGAFJ/DCRCA/P-08/2014, DGJS/DGAFJ/DCRCA/P-09/2014). Operadora de Coincidencias Numéricas S.A. de C.V. DGJS/DGAAD/DCRCA/P-01/2017. El Palacio de los Números, S.A. de C.V. DGAJS/SCEVF/P-01/2006.

JUEGUE DE MANERA RESPONSABLE, SANA E INFORMADA, CON EL PROPÓSITO DE ENTRETENIMIENTO, DIVERSIÓN Y ESPARCIMIENTO. PUBLICIDAD DIRIGIDA A MAYORES DE EDAD. LA LUDOPATIA ES UNA ENFERMEDAD QUE PUEDE AFECTAR EL DESARROLLO DE LA PERSONA Y FAMILIA. AYUDA LLAME A CONACID: 800 911 2000. http://www.juegosysorteos.gob.mx/es/Juegos_y_Sorteos/Atencion_al_Ludopata`;

export function useTenantLegal(tenantId: string) {
  return useQuery({
    queryKey: ['tenant-legal', tenantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenant_legal')
        .select('*')
        .eq('tenant_id', tenantId)
        .maybeSingle();
      
      if (error) throw error;
      
      // Return data or default
      if (data) {
        return data as TenantLegal;
      }
      
      // Return default structure if no data exists
      return {
        id: '',
        tenant_id: tenantId,
        legal_text: DEFAULT_LEGAL_TEXT,
        created_at: '',
        updated_at: '',
      } as TenantLegal;
    },
    enabled: !!tenantId,
  });
}

export function useUpsertTenantLegal() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: TenantLegalInput) => {
      const { data, error } = await supabase
        .from('tenant_legal')
        .upsert(
          {
            tenant_id: input.tenant_id,
            legal_text: input.legal_text,
          },
          {
            onConflict: 'tenant_id',
          }
        )
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tenant-legal', variables.tenant_id] });
      toast({
        title: "Texto legal actualizado",
        description: "Los cambios se han guardado correctamente.",
      });
    },
    onError: (error) => {
      console.error('Error updating legal text:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar el texto legal.",
        variant: "destructive",
      });
    },
  });
}

export { DEFAULT_LEGAL_TEXT };
