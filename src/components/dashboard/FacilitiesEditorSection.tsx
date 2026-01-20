import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2, Save, GripVertical, Image as ImageIcon } from "lucide-react";
import { normalizeImageUrl } from "@/lib/url-utils";
import {
  useTenantFacilitiesAdmin,
  useAddTenantFacility,
  useUpdateTenantFacility,
  useDeleteTenantFacility,
  TenantFacility
} from "@/hooks/useTenantFacilities";

interface FacilitiesEditorSectionProps {
  tenantId: string;
}

interface FacilityFormData {
  imageUrl: string;
  altText: string;
}

export function FacilitiesEditorSection({ tenantId }: FacilitiesEditorSectionProps) {
  const { data: facilities, isLoading } = useTenantFacilitiesAdmin(tenantId);
  const addFacility = useAddTenantFacility();
  const updateFacility = useUpdateTenantFacility();
  const deleteFacility = useDeleteTenantFacility();

  const [editingItems, setEditingItems] = useState<Record<string, FacilityFormData>>({});
  const [newItem, setNewItem] = useState<FacilityFormData>({ imageUrl: "", altText: "" });

  // Sync editing items with fetched data
  useEffect(() => {
    if (facilities) {
      const items: Record<string, FacilityFormData> = {};
      facilities.forEach((f) => {
        items[f.id] = {
          imageUrl: f.image_url,
          altText: f.alt_text || "",
        };
      });
      setEditingItems(items);
    }
  }, [facilities]);

  const handleAdd = () => {
    if (!newItem.imageUrl.trim()) return;
    
    const maxOrder = facilities?.reduce((max, f) => Math.max(max, f.display_order), -1) ?? -1;
    
    addFacility.mutate({
      tenantId,
      imageUrl: newItem.imageUrl,
      altText: newItem.altText,
      displayOrder: maxOrder + 1,
    }, {
      onSuccess: () => {
        setNewItem({ imageUrl: "", altText: "" });
      }
    });
  };

  const handleUpdate = (id: string) => {
    const item = editingItems[id];
    if (!item) return;

    updateFacility.mutate({
      id,
      tenantId,
      imageUrl: item.imageUrl,
      altText: item.altText,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta imagen?")) {
      deleteFacility.mutate({ id, tenantId });
    }
  };

  const handleChange = (id: string, field: keyof FacilityFormData, value: string) => {
    setEditingItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Galería de Instalaciones
        </CardTitle>
        <CardDescription>
          Administra las imágenes de la sección "Nuestras Instalaciones" para este casino
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new image */}
        <div className="p-4 border-2 border-dashed border-muted-foreground/20 rounded-lg space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground">Agregar nueva imagen</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-url">URL de la imagen</Label>
              <Input
                id="new-url"
                placeholder="https://ejemplo.com/imagen.webp"
                value={newItem.imageUrl}
                onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-alt">Texto alternativo</Label>
              <Input
                id="new-alt"
                placeholder="Descripción de la imagen"
                value={newItem.altText}
                onChange={(e) => setNewItem({ ...newItem, altText: e.target.value })}
              />
            </div>
          </div>
          {newItem.imageUrl && (
            <div className="w-32 h-24 rounded-md overflow-hidden bg-muted">
              <img
                src={normalizeImageUrl(newItem.imageUrl)}
                alt="Vista previa"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
          )}
          <Button
            onClick={handleAdd}
            disabled={!newItem.imageUrl.trim() || addFacility.isPending}
            size="sm"
          >
            {addFacility.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Agregar Imagen
          </Button>
        </div>

        {/* Existing images */}
        {facilities && facilities.length > 0 ? (
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground">
              Imágenes actuales ({facilities.length})
            </h4>
            {facilities.map((facility, index) => (
              <div
                key={facility.id}
                className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 p-4 border rounded-lg bg-card"
              >
                <div className="flex items-center gap-3 sm:gap-0">
                  <div className="flex items-center text-muted-foreground sm:mr-2">
                    <GripVertical className="h-5 w-5" />
                    <span className="text-sm ml-1">{index + 1}</span>
                  </div>

                  {/* Preview */}
                  <div className="w-24 sm:w-32 h-16 sm:h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={normalizeImageUrl(editingItems[facility.id]?.imageUrl || facility.image_url)}
                      alt={facility.alt_text || "Instalación"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>

                {/* Form fields */}
                <div className="flex-1 grid grid-cols-1 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">URL de la imagen</Label>
                    <Input
                      value={editingItems[facility.id]?.imageUrl || ""}
                      onChange={(e) => handleChange(facility.id, "imageUrl", e.target.value)}
                      placeholder="URL de la imagen"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Texto alternativo</Label>
                    <Input
                      value={editingItems[facility.id]?.altText || ""}
                      onChange={(e) => handleChange(facility.id, "altText", e.target.value)}
                      placeholder="Descripción"
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdate(facility.id)}
                    disabled={updateFacility.isPending}
                    className="flex-1 sm:flex-initial"
                  >
                    {updateFacility.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="h-4 w-4 sm:mr-0 mr-2" />
                        <span className="sm:hidden">Guardar</span>
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(facility.id)}
                    disabled={deleteFacility.isPending}
                    className="flex-1 sm:flex-initial"
                  >
                    {deleteFacility.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 sm:mr-0 mr-2" />
                        <span className="sm:hidden">Eliminar</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No hay imágenes de instalaciones configuradas</p>
            <p className="text-sm">Agrega imágenes usando el formulario de arriba</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
