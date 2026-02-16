
-- Comprehensive casino overrides table (replaces casino_map_urls)
CREATE TABLE public.casino_overrides (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  casino_id text NOT NULL UNIQUE,
  city text,
  brand text,
  schedule_weekdays text,
  schedule_weekend text,
  address text,
  image_url text,
  google_maps_url text,
  is_open_24h boolean,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.casino_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view casino overrides"
  ON public.casino_overrides FOR SELECT USING (true);

CREATE POLICY "Editors can insert casino overrides"
  ON public.casino_overrides FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors can update casino overrides"
  ON public.casino_overrides FOR UPDATE
  USING (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Editors can delete casino overrides"
  ON public.casino_overrides FOR DELETE
  USING (has_role(auth.uid(), 'superadmin'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Migrate any existing data from casino_map_urls
INSERT INTO public.casino_overrides (casino_id, google_maps_url)
SELECT casino_id, google_maps_url FROM public.casino_map_urls
ON CONFLICT (casino_id) DO NOTHING;

-- Drop old table
DROP TABLE public.casino_map_urls;
