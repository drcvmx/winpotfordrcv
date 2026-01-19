-- Create table for tenant games
CREATE TABLE public.tenant_games (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    name TEXT NOT NULL,
    image_url TEXT NOT NULL DEFAULT '/games/epic-empires.webp',
    category TEXT NOT NULL DEFAULT 'new', -- 'new' or 'top'
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tenant_games ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view tenant games" 
ON public.tenant_games 
FOR SELECT 
USING (true);

CREATE POLICY "Editors can insert tenant games" 
ON public.tenant_games 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors can update tenant games" 
ON public.tenant_games 
FOR UPDATE 
USING (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors can delete tenant games" 
ON public.tenant_games 
FOR DELETE 
USING (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_tenant_games_updated_at
BEFORE UPDATE ON public.tenant_games
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();