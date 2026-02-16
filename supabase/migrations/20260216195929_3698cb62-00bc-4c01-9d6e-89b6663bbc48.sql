
-- Table to store editable Google Maps URLs for casino cards (corporate/home view)
CREATE TABLE public.casino_map_urls (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  casino_id text NOT NULL UNIQUE,
  google_maps_url text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.casino_map_urls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view casino map urls"
  ON public.casino_map_urls FOR SELECT USING (true);

CREATE POLICY "Editors can insert casino map urls"
  ON public.casino_map_urls FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors can update casino map urls"
  ON public.casino_map_urls FOR UPDATE
  USING (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors can delete casino map urls"
  ON public.casino_map_urls FOR DELETE
  USING (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));
