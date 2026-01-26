import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Save, RotateCcw } from "lucide-react";
import { useTenantLegal, useUpsertTenantLegal, DEFAULT_LEGAL_TEXT } from "@/hooks/useTenantLegal";

interface LegalEditorSectionProps {
  tenantId: string;
}

export default function LegalEditorSection({ tenantId }: LegalEditorSectionProps) {
  const { data: legalData, isLoading } = useTenantLegal(tenantId);
  const upsertLegal = useUpsertTenantLegal();

  const [legalText, setLegalText] = useState('');

  useEffect(() => {
    if (legalData) {
      setLegalText(legalData.legal_text || DEFAULT_LEGAL_TEXT);
    }
  }, [legalData]);

  const handleSave = () => {
    upsertLegal.mutate({
      tenant_id: tenantId,
      legal_text: legalText,
    });
  };

  const handleReset = () => {
    setLegalText(DEFAULT_LEGAL_TEXT);
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
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">⚖️ Texto Legal / Derechos Reservados</CardTitle>
          <CardDescription>
            Este texto aparece arriba del footer en todas las páginas del casino. 
            Incluye información de permisos, marcas registradas y avisos legales.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={legalText}
            onChange={(e) => setLegalText(e.target.value)}
            placeholder="Texto legal y derechos reservados..."
            rows={12}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Separa los párrafos con líneas en blanco para mejor legibilidad.
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleReset}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Restaurar Texto Original
        </Button>
        
        <Button
          onClick={handleSave}
          disabled={upsertLegal.isPending}
          className="bg-casino-gold hover:bg-casino-dark-gold text-black"
        >
          {upsertLegal.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Guardar Texto Legal
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
