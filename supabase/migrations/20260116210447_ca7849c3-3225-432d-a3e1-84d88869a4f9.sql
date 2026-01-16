-- Create tenant_images table to store customizable images per casino/tenant
-- Stores URLs only (no file uploads to database)

CREATE TABLE public.tenant_images (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id TEXT NOT NULL, -- e.g., 'tuxtla', 'boca', 'interlomas'
    section TEXT NOT NULL CHECK (section IN ('hero', 'about', 'contact')),
    image_url TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    
    -- Each tenant can only have one image per section
    UNIQUE(tenant_id, section)
);

-- Enable Row Level Security
ALTER TABLE public.tenant_images ENABLE ROW LEVEL SECURITY;

-- Public read access (images are public content)
CREATE POLICY "Anyone can view tenant images"
ON public.tenant_images
FOR SELECT
USING (true);

-- Only authenticated users can manage images (for dashboard)
CREATE POLICY "Authenticated users can insert tenant images"
ON public.tenant_images
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update tenant images"
ON public.tenant_images
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete tenant images"
ON public.tenant_images
FOR DELETE
TO authenticated
USING (true);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tenant_images_updated_at
BEFORE UPDATE ON public.tenant_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();