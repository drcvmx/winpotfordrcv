-- Create table for tenant facilities images
CREATE TABLE public.tenant_facilities (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tenant_facilities ENABLE ROW LEVEL SECURITY;

-- Create policies for access
CREATE POLICY "Anyone can view tenant facilities" 
ON public.tenant_facilities 
FOR SELECT 
USING (true);

CREATE POLICY "Editors can insert tenant facilities" 
ON public.tenant_facilities 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors can update tenant facilities" 
ON public.tenant_facilities 
FOR UPDATE 
USING (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors can delete tenant facilities" 
ON public.tenant_facilities 
FOR DELETE 
USING (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tenant_facilities_updated_at
BEFORE UPDATE ON public.tenant_facilities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();