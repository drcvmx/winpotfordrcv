import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { useTenantContent, useUpsertTenantContent, TenantContentInput } from "@/hooks/useTenantContent";

interface ContentEditorSectionProps {
  tenantId: string;
}

export default function ContentEditorSection({ tenantId }: ContentEditorSectionProps) {
  const { data: content, isLoading } = useTenantContent(tenantId);
  const upsertContent = useUpsertTenantContent();

  const [formData, setFormData] = useState<Omit<TenantContentInput, 'tenant_id'>>({
    hero_title: '',
    hero_subtitle: '',
    hero_schedule: '',
    hero_address: '',
    hero_cta_primary_text: '',
    hero_cta_primary_link: '',
    hero_cta_secondary_text: '',
    hero_cta_secondary_link: '',
    contact_phone: '',
    contact_email: '',
    contact_hours: '',
    meta_title: '',
    meta_description: '',
    footer_description: '',
    footer_address: '',
    privacy_policy_url: '',
    privacy_policy_url_2: '',
  });

  useEffect(() => {
    if (content) {
      setFormData({
        hero_title: content.hero_title || '',
        hero_subtitle: content.hero_subtitle || '',
        hero_schedule: content.hero_schedule || '',
        hero_address: content.hero_address || '',
        hero_cta_primary_text: content.hero_cta_primary_text || '',
        hero_cta_primary_link: content.hero_cta_primary_link || '',
        hero_cta_secondary_text: content.hero_cta_secondary_text || '',
        hero_cta_secondary_link: content.hero_cta_secondary_link || '',
        contact_phone: content.contact_phone || '',
        contact_email: content.contact_email || '',
        contact_hours: content.contact_hours || '',
        meta_title: content.meta_title || '',
        meta_description: content.meta_description || '',
        footer_description: content.footer_description || '',
        footer_address: content.footer_address || '',
        privacy_policy_url: (content as any).privacy_policy_url || '',
        privacy_policy_url_2: (content as any).privacy_policy_url_2 || '',
      });
    }
  }, [content]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    upsertContent.mutate({
      tenant_id: tenantId,
      ...formData,
    });
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
      {/* Hero Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">🎰 Sección Hero</CardTitle>
          <CardDescription>Contenido principal del banner de inicio</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              value={formData.hero_title}
              onChange={(e) => handleChange('hero_title', e.target.value)}
              placeholder="Bienvenido a Casino..."
            />
          </div>
          <div className="space-y-2">
            <Label>Subtítulo</Label>
            <Input
              value={formData.hero_subtitle}
              onChange={(e) => handleChange('hero_subtitle', e.target.value)}
              placeholder="Tu destino de entretenimiento..."
            />
          </div>
          <div className="space-y-2">
            <Label>Horario</Label>
            <Input
              value={formData.hero_schedule}
              onChange={(e) => handleChange('hero_schedule', e.target.value)}
              placeholder="Lunes a Domingo 24hrs"
            />
          </div>
          <div className="space-y-2">
            <Label>Dirección</Label>
            <Input
              value={formData.hero_address}
              onChange={(e) => handleChange('hero_address', e.target.value)}
              placeholder="Av. Principal #123..."
            />
          </div>
          <div className="space-y-2">
            <Label>Botón Primario - Texto</Label>
            <Input
              value={formData.hero_cta_primary_text}
              onChange={(e) => handleChange('hero_cta_primary_text', e.target.value)}
              placeholder="Ver Juegos"
            />
          </div>
          <div className="space-y-2">
            <Label>Botón Primario - Link</Label>
            <Input
              value={formData.hero_cta_primary_link}
              onChange={(e) => handleChange('hero_cta_primary_link', e.target.value)}
              placeholder="#juegos"
            />
          </div>
          <div className="space-y-2">
            <Label>Botón Secundario - Texto</Label>
            <Input
              value={formData.hero_cta_secondary_text}
              onChange={(e) => handleChange('hero_cta_secondary_text', e.target.value)}
              placeholder="Contáctanos"
            />
          </div>
          <div className="space-y-2">
            <Label>Botón Secundario - Link</Label>
            <Input
              value={formData.hero_cta_secondary_link}
              onChange={(e) => handleChange('hero_cta_secondary_link', e.target.value)}
              placeholder="#contacto"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">📞 Información de Contacto</CardTitle>
          <CardDescription>Datos de contacto del casino</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input
              value={formData.contact_phone}
              onChange={(e) => handleChange('contact_phone', e.target.value)}
              placeholder="+52 555 123 4567"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={formData.contact_email}
              onChange={(e) => handleChange('contact_email', e.target.value)}
              placeholder="contacto@casino.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Horario de Atención</Label>
            <Input
              value={formData.contact_hours}
              onChange={(e) => handleChange('contact_hours', e.target.value)}
              placeholder="24 horas, 7 días"
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO/Metadata Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">🔍 SEO / Metadata</CardTitle>
          <CardDescription>Configuración para buscadores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Meta Título</Label>
            <Input
              value={formData.meta_title}
              onChange={(e) => handleChange('meta_title', e.target.value)}
              placeholder="Casino Winpot - Entretenimiento Premium"
            />
          </div>
          <div className="space-y-2">
            <Label>Meta Descripción</Label>
            <Textarea
              value={formData.meta_description}
              onChange={(e) => handleChange('meta_description', e.target.value)}
              placeholder="Descubre la mejor experiencia de casino en..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">🦶 Footer</CardTitle>
          <CardDescription>Contenido del pie de página</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-1">
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea
              value={formData.footer_description}
              onChange={(e) => handleChange('footer_description', e.target.value)}
              placeholder="La mejor experiencia de casino en México..."
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>Dirección del Footer</Label>
            <Input
              value={formData.footer_address}
              onChange={(e) => handleChange('footer_address', e.target.value)}
              placeholder="Av. Principal #123, Ciudad de México"
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Policy Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">🔒 Aviso de Privacidad</CardTitle>
          <CardDescription>URL del documento de Aviso de Privacidad (Google Drive u otro enlace)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>URL Aviso de Privacidad</Label>
            <Input
              value={formData.privacy_policy_url}
              onChange={(e) => handleChange('privacy_policy_url', e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={upsertContent.isPending}
          className="bg-casino-gold hover:bg-casino-dark-gold text-black"
        >
          {upsertContent.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Guardar Contenido
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
