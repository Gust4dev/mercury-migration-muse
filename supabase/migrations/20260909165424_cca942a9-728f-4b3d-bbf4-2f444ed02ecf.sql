
CREATE TABLE IF NOT EXISTS public.shipping_settings (
  id integer PRIMARY KEY DEFAULT 1,
  origin_postal_code text NOT NULL DEFAULT '75110250',
  origin_city text NOT NULL DEFAULT 'Anápolis',
  origin_state text NOT NULL DEFAULT 'GO',
  origin_country text NOT NULL DEFAULT 'BR',
  handling_days integer NOT NULL DEFAULT 0,
  free_shipping_local boolean NOT NULL DEFAULT true,
  free_shipping_local_city text NOT NULL DEFAULT 'Anápolis',
  free_shipping_min_total numeric,
  shipping_markup_percent numeric NOT NULL DEFAULT 0,
  disabled_services jsonb NOT NULL DEFAULT '[]'::jsonb,
  quote_ttl_minutes integer NOT NULL DEFAULT 30,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT shipping_settings_singleton CHECK (id = 1)
);

GRANT SELECT ON public.shipping_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.shipping_settings TO authenticated;
GRANT ALL ON public.shipping_settings TO service_role;

ALTER TABLE public.shipping_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "shipping settings readable" ON public.shipping_settings;
CREATE POLICY "shipping settings readable" ON public.shipping_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "admins manage shipping settings" ON public.shipping_settings;
CREATE POLICY "admins manage shipping settings" ON public.shipping_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS t_shipping_settings_updated ON public.shipping_settings;
CREATE TRIGGER t_shipping_settings_updated BEFORE UPDATE ON public.shipping_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.shipping_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.shipping_quotes
  ADD COLUMN IF NOT EXISTS items jsonb,
  ADD COLUMN IF NOT EXISTS items_hash text,
  ADD COLUMN IF NOT EXISTS provider text NOT NULL DEFAULT 'melhor_envio',
  ADD COLUMN IF NOT EXISTS expires_at timestamptz;

CREATE INDEX IF NOT EXISTS shipping_quotes_lookup_idx
  ON public.shipping_quotes (items_hash, destination_postal_code, expires_at);

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS shipping_provider text,
  ADD COLUMN IF NOT EXISTS shipping_service_id text,
  ADD COLUMN IF NOT EXISTS shipping_origin_postal_code text,
  ADD COLUMN IF NOT EXISTS shipping_quote_data jsonb,
  ADD COLUMN IF NOT EXISTS shipping_quoted_at timestamptz;
