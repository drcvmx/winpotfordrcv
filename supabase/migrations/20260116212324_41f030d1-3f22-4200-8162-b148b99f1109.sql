-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('superadmin', 'admin', 'editor');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Superadmins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'superadmin'));

CREATE POLICY "Superadmins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'superadmin'))
WITH CHECK (public.has_role(auth.uid(), 'superadmin'));

-- Update tenant_images policies to require authentication for writes
DROP POLICY IF EXISTS "Authenticated users can insert tenant images" ON public.tenant_images;
DROP POLICY IF EXISTS "Authenticated users can update tenant images" ON public.tenant_images;
DROP POLICY IF EXISTS "Authenticated users can delete tenant images" ON public.tenant_images;

CREATE POLICY "Editors can insert tenant images"
ON public.tenant_images
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'superadmin') OR 
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Editors can update tenant images"
ON public.tenant_images
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'superadmin') OR 
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Editors can delete tenant images"
ON public.tenant_images
FOR DELETE
TO authenticated
USING (
  public.has_role(auth.uid(), 'superadmin') OR 
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'editor')
);