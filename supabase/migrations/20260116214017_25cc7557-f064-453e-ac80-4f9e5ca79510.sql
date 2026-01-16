-- Add recurring event fields to tenant_events
ALTER TABLE public.tenant_events
ADD COLUMN is_recurring BOOLEAN DEFAULT false,
ADD COLUMN recurrence_type TEXT, -- 'weekly', 'daily', 'monthly'
ADD COLUMN recurrence_day INTEGER, -- 0=Domingo, 1=Lunes... 6=Sábado
ADD COLUMN recurrence_text TEXT; -- "Todos los martes a las 8pm"