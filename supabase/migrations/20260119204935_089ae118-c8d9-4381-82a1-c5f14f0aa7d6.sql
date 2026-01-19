-- Add column for multiple specific dates
ALTER TABLE public.tenant_events
ADD COLUMN event_dates date[] DEFAULT NULL;