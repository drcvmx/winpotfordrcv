
-- Add footer fields to tenant_content
ALTER TABLE public.tenant_content
ADD COLUMN footer_description text,
ADD COLUMN footer_address text;
