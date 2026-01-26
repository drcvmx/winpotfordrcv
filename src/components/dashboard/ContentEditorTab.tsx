import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TENANTS } from "@/data/mock-tenant";
import { useTenant } from "@/context/TenantContext";
import ImageEditorSection from "./ImageEditorSection";
import ContentEditorSection from "./ContentEditorSection";
import EventsEditorSection from "./EventsEditorSection";
import { GamesEditorSection } from "./GamesEditorSection";
import { FacilitiesEditorSection } from "./FacilitiesEditorSection";
import LegalEditorSection from "./LegalEditorSection";

export default function ContentEditorTab() {
    const { tenantId, setTenantId } = useTenant();
    const [activeTab, setActiveTab] = useState("content");

    return (
        <div className="space-y-6">
            {/* Header with Tenant Selector */}
            <Card className="border-border bg-card">
                <CardContent className="flex justify-between items-center p-4">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Editor de Contenido</h2>
                        <p className="text-muted-foreground text-sm">Todo se guarda en la base de datos</p>
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
                </CardContent>
            </Card>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                    <TabsList className="w-max sm:w-full justify-start bg-card border border-border flex-nowrap">
                        <TabsTrigger 
                            value="content" 
                            className="data-[state=active]:bg-casino-gold data-[state=active]:text-black whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3"
                        >
                            📝 <span className="hidden xs:inline">Contenido</span><span className="xs:hidden">Cont.</span>
                        </TabsTrigger>
                        <TabsTrigger 
                            value="images" 
                            className="data-[state=active]:bg-casino-gold data-[state=active]:text-black whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3"
                        >
                            📷 <span className="hidden xs:inline">Imágenes</span><span className="xs:hidden">Img.</span>
                        </TabsTrigger>
                        <TabsTrigger 
                            value="facilities" 
                            className="data-[state=active]:bg-casino-gold data-[state=active]:text-black whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3"
                        >
                            🏢 <span className="hidden xs:inline">Instalaciones</span><span className="xs:hidden">Inst.</span>
                        </TabsTrigger>
                        <TabsTrigger 
                            value="events" 
                            className="data-[state=active]:bg-casino-gold data-[state=active]:text-black whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3"
                        >
                            🎉 <span className="hidden xs:inline">Eventos</span><span className="xs:hidden">Evnt.</span>
                        </TabsTrigger>
                        <TabsTrigger 
                            value="games" 
                            className="data-[state=active]:bg-casino-gold data-[state=active]:text-black whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3"
                        >
                            🎮 <span className="hidden xs:inline">Juegos</span><span className="xs:hidden">Jueg.</span>
                        </TabsTrigger>
                        <TabsTrigger 
                            value="legal" 
                            className="data-[state=active]:bg-casino-gold data-[state=active]:text-black whitespace-nowrap text-xs sm:text-sm px-2 sm:px-3"
                        >
                            ⚖️ <span className="hidden xs:inline">Legal</span><span className="xs:hidden">Legal</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Content Tab */}
                <TabsContent value="content" className="mt-6">
                    <ContentEditorSection tenantId={tenantId} />
                </TabsContent>

                {/* Images Tab */}
                <TabsContent value="images" className="mt-6">
                    <ImageEditorSection tenantId={tenantId} />
                </TabsContent>

                {/* Facilities Tab */}
                <TabsContent value="facilities" className="mt-6">
                    <FacilitiesEditorSection tenantId={tenantId} />
                </TabsContent>

                {/* Events Tab */}
                <TabsContent value="events" className="mt-6">
                    <EventsEditorSection tenantId={tenantId} />
                </TabsContent>

                {/* Games Tab */}
                <TabsContent value="games" className="mt-6">
                    <GamesEditorSection tenantId={tenantId} />
                </TabsContent>

                {/* Legal Tab */}
                <TabsContent value="legal" className="mt-6">
                    <LegalEditorSection tenantId={tenantId} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
