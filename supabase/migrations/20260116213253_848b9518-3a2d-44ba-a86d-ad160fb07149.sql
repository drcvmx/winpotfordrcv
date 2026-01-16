-- Table for tenant content (Hero, Contact, Metadata)
CREATE TABLE public.tenant_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT NOT NULL UNIQUE,
    
    -- Hero Section
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_schedule TEXT,
    hero_address TEXT,
    hero_cta_primary_text TEXT,
    hero_cta_primary_link TEXT,
    hero_cta_secondary_text TEXT,
    hero_cta_secondary_link TEXT,
    
    -- Contact Section
    contact_phone TEXT,
    contact_email TEXT,
    contact_hours TEXT,
    
    -- Metadata/SEO
    meta_title TEXT,
    meta_description TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tenant_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read content
CREATE POLICY "Anyone can view tenant content"
ON public.tenant_content
FOR SELECT
USING (true);

-- Editors can manage content
CREATE POLICY "Editors can insert tenant content"
ON public.tenant_content
FOR INSERT
TO authenticated
WITH CHECK (
    public.has_role(auth.uid(), 'superadmin') OR 
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Editors can update tenant content"
ON public.tenant_content
FOR UPDATE
TO authenticated
USING (
    public.has_role(auth.uid(), 'superadmin') OR 
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

-- Trigger for updated_at
CREATE TRIGGER update_tenant_content_updated_at
BEFORE UPDATE ON public.tenant_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Table for tenant events
CREATE TABLE public.tenant_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    event_date DATE,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tenant_events ENABLE ROW LEVEL SECURITY;

-- Anyone can read events
CREATE POLICY "Anyone can view tenant events"
ON public.tenant_events
FOR SELECT
USING (true);

-- Editors can manage events
CREATE POLICY "Editors can insert tenant events"
ON public.tenant_events
FOR INSERT
TO authenticated
WITH CHECK (
    public.has_role(auth.uid(), 'superadmin') OR 
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Editors can update tenant events"
ON public.tenant_events
FOR UPDATE
TO authenticated
USING (
    public.has_role(auth.uid(), 'superadmin') OR 
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Editors can delete tenant events"
ON public.tenant_events
FOR DELETE
TO authenticated
USING (
    public.has_role(auth.uid(), 'superadmin') OR 
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
);

-- Trigger for updated_at
CREATE TRIGGER update_tenant_events_updated_at
BEFORE UPDATE ON public.tenant_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_tenant_events_tenant_id ON public.tenant_events(tenant_id);
CREATE INDEX idx_tenant_content_tenant_id ON public.tenant_content(tenant_id);