-- Add recurrence_days column to support multiple days (array of integers 0-6)
ALTER TABLE public.tenant_events 
ADD COLUMN recurrence_days integer[] DEFAULT NULL;

-- Add comment explaining the field
COMMENT ON COLUMN public.tenant_events.recurrence_days IS 'Array of day numbers (0=Sunday, 1=Monday...6=Saturday) for multi-day recurring events';