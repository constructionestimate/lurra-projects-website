CREATE TABLE IF NOT EXISTS public.lurra_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NULL,
  project_details TEXT NOT NULL,
  preferred_contact TEXT NOT NULL DEFAULT 'either',
  source TEXT NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lurra_contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role manages lurra contacts" ON public.lurra_contacts;
CREATE POLICY "Anyone can submit lurra contact"
ON public.lurra_contacts FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins read lurra contacts"
ON public.lurra_contacts FOR SELECT
TO authenticated
USING (true);