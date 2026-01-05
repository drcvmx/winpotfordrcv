import { useState } from "react";
import { useTenant } from "@/context/TenantContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";  // Assuming you have this or use Input for now

import { TENANTS } from "@/data/mock-tenant";

export default function ContentEditorTab() {
    const { tenantId, setTenantId, content, updateContent } = useTenant();
    const { toast } = useToast();
    const [selectedSection, setSelectedSection] = useState("hero");

    // Local state for form to avoid re-rendering context on every keystroke
    // In a real app we'd use react-hook-form
    const [formData, setFormData] = useState<any>(content?.[selectedSection] || {});

    const handleSave = () => {
        updateContent(selectedSection, formData);
        toast({
            title: "Cambios guardados correctamente",
            description: "La configuración se ha actualizado localmente.",
            className: "bg-green-600 text-white border-none",
        });
    };

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNestedChange = (parent: string, field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [field]: value
            }
        }));
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border">
                <div>
                    <h2 className="text-xl font-bold text-primary">Editor de Contenido</h2>
                    <p className="text-muted-foreground text-sm">Modifica los textos e imágenes del sitio</p>
                </div>
                <div className="flex gap-4 items-center">
                    <Select value={tenantId} onValueChange={(val) => setTenantId(val)}>
                        <SelectTrigger className="w-[200px] bg-background">
                            <SelectValue placeholder="Seleccionar Sitio" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(TENANTS).map((t) => (
                                <SelectItem key={t.id} value={t.id}>
                                    {t.content.metadata.title || t.id}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    <Button
                        variant={selectedSection === 'hero' ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => { setSelectedSection('hero'); setFormData(content?.hero || {}); }}
                    >
                        Hero Banner
                    </Button>
                    <Button
                        variant={selectedSection === 'metadata' ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => { setSelectedSection('metadata'); setFormData(content?.metadata || {}); }}
                    >
                        SEO & Metadata
                    </Button>
                    <Button
                        variant={selectedSection === 'contact' ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => { setSelectedSection('contact'); setFormData(content?.contact || {}); }}
                    >
                        Contacto & Mapa
                    </Button>
                    <Button
                        variant={selectedSection === 'events' ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => { setSelectedSection('events'); setFormData(content?.events || {}); }}
                    >
                        Eventos
                    </Button>
                    <Button
                        variant={selectedSection === 'games' ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => { setSelectedSection('games'); setFormData(content?.games || {}); }}
                    >
                        Juegos (Config)
                    </Button>
                </div>

                {/* Editor Form */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="capitalize">Editando: {selectedSection}</CardTitle>
                            <CardDescription>Realiza cambios en tiempo real.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {selectedSection === 'hero' && (
                                <>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="title">Título Principal</Label>
                                        <Input
                                            id="title"
                                            value={formData.title || ''}
                                            onChange={(e) => handleChange('title', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="subtitle">Subtítulo</Label>
                                        <Input
                                            id="subtitle"
                                            value={formData.subtitle || ''}
                                            onChange={(e) => handleChange('subtitle', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="desc">Descripción</Label>
                                        <Textarea
                                            id="desc"
                                            value={formData.description || ''}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="image">URL de Imagen de Fondo</Label>
                                        <Input
                                            id="image"
                                            value={formData.image || ''}
                                            onChange={(e) => handleChange('image', e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {selectedSection === 'metadata' && (
                                <>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="metaTitle">Título del Sitio (Browser Tab)</Label>
                                        <Input
                                            id="metaTitle"
                                            value={formData.title || ''}
                                            onChange={(e) => handleChange('title', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="metaDesc">Descripción SEO</Label>
                                        <Textarea
                                            id="metaDesc"
                                            value={formData.description || ''}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="city">Ciudad</Label>
                                        <Input
                                            id="city"
                                            value={formData.city || ''}
                                            onChange={(e) => handleChange('city', e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {selectedSection === 'contact' && (
                                <>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone || ''}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="gmaps">Enlace Google Maps</Label>
                                        <Input
                                            id="gmaps"
                                            value={formData.googleMaps || ''}
                                            onChange={(e) => handleChange('googleMaps', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="mapEmbed">Embed URL (Iframe src)</Label>
                                        <Input
                                            id="mapEmbed"
                                            value={formData.mapEmbed || ''}
                                            onChange={(e) => handleChange('mapEmbed', e.target.value)}
                                        />
                                        <p className="text-xs text-muted-foreground">Copia solo la URL dentro del src="" del iframe de Google Maps.</p>
                                    </div>
                                </>
                            )}

                            {selectedSection === 'games' && (
                                <div className="space-y-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="gamesTitle">Título Sección Juegos</Label>
                                        <Input
                                            id="gamesTitle"
                                            value={formData.title || ''}
                                            onChange={(e) => handleChange('title', e.target.value)}
                                        />
                                    </div>
                                    <div className="p-4 border border-blue-500/20 bg-blue-500/10 rounded">
                                        <p className="text-sm">La lista de proveedores y juegos se gestiona automáticamente desde la base de datos central por ahora.</p>
                                    </div>
                                </div>
                            )}

                            {selectedSection === 'events' && (
                                <div className="space-y-6">
                                    <div className="grid w-full items-center gap-1.5 border-b pb-4">
                                        <h3 className="font-semibold text-lg">Cabecera de Sección</h3>
                                        <Label htmlFor="eventTitle">Título Principal</Label>
                                        <Input
                                            id="eventTitle"
                                            value={formData.title || ''}
                                            onChange={(e) => handleChange('title', e.target.value)}
                                        />
                                        <Label htmlFor="eventSub">Subtítulo</Label>
                                        <Input
                                            id="eventSub"
                                            value={formData.subtitle || ''}
                                            onChange={(e) => handleChange('subtitle', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-lg">Lista de Eventos Activos</h3>
                                            <Button variant="outline" size="sm" onClick={() => {
                                                const newItems = [...(formData.items || []), { title: 'Nuevo Evento', description: '', image: '' }];
                                                handleChange('items', newItems);
                                            }}>
                                                + Agregar Evento
                                            </Button>
                                        </div>

                                        <div className="grid gap-4">
                                            {formData.items?.map((item: any, index: number) => (
                                                <div key={index} className="border rounded-lg p-4 space-y-4 bg-card/50">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium">Evento #{index + 1}</span>
                                                        <Button variant="destructive" size="sm" onClick={() => {
                                                            const newItems = formData.items.filter((_: any, i: number) => i !== index);
                                                            handleChange('items', newItems);
                                                        }}>Eliminar</Button>
                                                    </div>

                                                    <div className="grid gap-3">
                                                        <div className="grid w-full items-center gap-1.5">
                                                            <Label>Título del Evento</Label>
                                                            <Input
                                                                value={item.title || ''}
                                                                onChange={(e) => {
                                                                    const newItems = [...formData.items];
                                                                    newItems[index] = { ...item, title: e.target.value };
                                                                    handleChange('items', newItems);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="grid w-full items-center gap-1.5">
                                                            <Label>Descripción</Label>
                                                            <Textarea
                                                                value={item.description || ''}
                                                                onChange={(e) => {
                                                                    const newItems = [...formData.items];
                                                                    newItems[index] = { ...item, description: e.target.value };
                                                                    handleChange('items', newItems);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="grid w-full items-center gap-1.5">
                                                            <Label>Imagen del Evento (URL)</Label>
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    value={item.image || ''}
                                                                    onChange={(e) => {
                                                                        const newItems = [...formData.items];
                                                                        newItems[index] = { ...item, image: e.target.value };
                                                                        handleChange('items', newItems);
                                                                    }}
                                                                    placeholder="https://..."
                                                                />
                                                                <Button variant="secondary" size="icon" title="Simular Subida">
                                                                    ↑
                                                                </Button>
                                                            </div>
                                                            {item.image && (
                                                                <img src={item.image} alt="Preview" className="w-20 h-20 object-cover rounded mt-2 bg-muted" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Button className="w-full mt-4" onClick={handleSave}>Guardar Cambios</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
