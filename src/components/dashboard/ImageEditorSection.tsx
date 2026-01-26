import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Image as ImageIcon, Trash2, ExternalLink, Check } from "lucide-react";
import { useTenantImages, useUpsertTenantImage, useDeleteTenantImage, ImageSection } from "@/hooks/useTenantImages";
import { TENANTS } from "@/data/mock-tenant";
import { normalizeImageUrl } from "@/lib/url-utils";

interface ImageEditorSectionProps {
  tenantId: string;
}

interface ImageFormData {
  hero: { url: string; alt: string };
  about: { url: string; alt: string };
  contact: { url: string; alt: string };
}

const SECTION_INFO: Record<ImageSection, { label: string; description: string; fallbackField?: string }> = {
  hero: { 
    label: "Imagen Hero Principal", 
    description: "La imagen grande que aparece en el banner principal del casino.",
    fallbackField: "hero.image"
  },
  about: { 
    label: "Imagen Acerca del Casino", 
    description: "La imagen que aparece junto al texto 'Acerca del Casino'.",
    fallbackField: "about.image"
  },
  contact: { 
    label: "Imagen de Contacto", 
    description: "La imagen decorativa en la sección de contacto (ruleta).",
  },
};

export default function ImageEditorSection({ tenantId }: ImageEditorSectionProps) {
  const { data: images, isLoading } = useTenantImages(tenantId);
  const upsertImage = useUpsertTenantImage();
  const deleteImage = useDeleteTenantImage();

  const [formData, setFormData] = useState<ImageFormData>({
    hero: { url: "", alt: "" },
    about: { url: "", alt: "" },
    contact: { url: "", alt: "" },
  });

  // Get fallback images from mock data
  const getFallbackImage = (section: ImageSection): string => {
    const tenant = TENANTS[tenantId];
    if (!tenant) return "";
    
    switch (section) {
      case "hero":
        return tenant.content.hero?.image || "";
      case "about":
        return typeof tenant.content.about?.image === 'string' 
          ? tenant.content.about.image 
          : tenant.content.about?.image?.url || "";
      case "contact":
        return ""; // No fallback defined in mock for contact
      default:
        return "";
    }
  };

  // Sync form data when images load
  useEffect(() => {
    if (images) {
      const newFormData: ImageFormData = {
        hero: { url: "", alt: "" },
        about: { url: "", alt: "" },
        contact: { url: "", alt: "" },
      };

      images.forEach((img) => {
        const section = img.section as ImageSection;
        newFormData[section] = {
          url: img.image_url,
          alt: img.alt_text || "",
        };
      });

      setFormData(newFormData);
    }
  }, [images]);

  const handleSave = async (section: ImageSection) => {
    const data = formData[section];
    if (!data.url.trim()) return;

    await upsertImage.mutateAsync({
      tenantId,
      section,
      imageUrl: data.url,
      altText: data.alt,
    });
  };

  const handleDelete = async (section: ImageSection) => {
    await deleteImage.mutateAsync({ tenantId, section });
    setFormData((prev) => ({
      ...prev,
      [section]: { url: "", alt: "" },
    }));
  };

  const handleChange = (section: ImageSection, field: "url" | "alt", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Imágenes Principales
        </CardTitle>
        <CardDescription>
          Edita las 3 imágenes principales del sitio. Usa URLs de imágenes externas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {(Object.keys(SECTION_INFO) as ImageSection[]).map((section) => {
          const info = SECTION_INFO[section];
          const data = formData[section];
          const fallback = getFallbackImage(section);
          const hasCustomImage = !!data.url;
          const displayUrl = data.url || fallback;

          return (
            <div key={section} className="space-y-4 p-3 sm:p-4 border border-border rounded-lg bg-card/50">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">{info.label}</h3>
                  <p className="text-xs text-muted-foreground">{info.description}</p>
                </div>
                {hasCustomImage && (
                  <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded flex items-center gap-1 w-fit shrink-0">
                    <Check className="w-3 h-3" /> Personalizada
                  </span>
                )}
              </div>

              {/* Preview */}
              {displayUrl && (
                <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={normalizeImageUrl(displayUrl)}
                    alt={data.alt || `${section} preview`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  {!hasCustomImage && fallback && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Imagen por defecto
                    </div>
                  )}
                </div>
              )}

              {/* Form Fields */}
              <div className="grid gap-3">
                <div>
                  <Label htmlFor={`${section}-url`}>URL de la imagen</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`${section}-url`}
                      placeholder="https://ejemplo.com/imagen.webp"
                      value={data.url}
                      onChange={(e) => handleChange(section, "url", e.target.value)}
                      className="flex-1"
                    />
                    {data.url && (
                      <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-border rounded hover:bg-muted"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor={`${section}-alt`}>Texto alternativo (SEO)</Label>
                  <Input
                    id={`${section}-alt`}
                    placeholder="Descripción de la imagen para SEO"
                    value={data.alt}
                    onChange={(e) => handleChange(section, "alt", e.target.value)}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handleSave(section)}
                    disabled={!data.url.trim() || upsertImage.isPending}
                    className="flex-1"
                  >
                    {upsertImage.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Guardar Imagen
                  </Button>
                  {hasCustomImage && (
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(section)}
                      disabled={deleteImage.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
