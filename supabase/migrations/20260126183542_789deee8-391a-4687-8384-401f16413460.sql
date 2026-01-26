-- Create table for legal/rights reserved content per tenant
CREATE TABLE public.tenant_legal (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id TEXT NOT NULL UNIQUE,
  legal_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tenant_legal ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view legal text)
CREATE POLICY "Legal content is publicly readable"
ON public.tenant_legal
FOR SELECT
USING (true);

-- Only authenticated admins can modify
CREATE POLICY "Admins can manage legal content"
ON public.tenant_legal
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('superadmin', 'admin')
  )
);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_tenant_legal_updated_at
BEFORE UPDATE ON public.tenant_legal
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();