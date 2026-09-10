CREATE TABLE public.product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name text NOT NULL,
  required boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.product_variants TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_variants TO authenticated;
GRANT ALL ON public.product_variants TO service_role;

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Variações são públicas" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam variações" ON public.product_variants FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.product_variant_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id uuid NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  label text NOT NULL,
  price_delta numeric NOT NULL DEFAULT 0,
  price_override numeric,
  available boolean NOT NULL DEFAULT true,
  weight_g integer,
  width_cm numeric,
  height_cm numeric,
  length_cm numeric,
  image_urls text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.product_variant_options TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_variant_options TO authenticated;
GRANT ALL ON public.product_variant_options TO service_role;

ALTER TABLE public.product_variant_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Opções de variação são públicas" ON public.product_variant_options FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam opções de variação" ON public.product_variant_options FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_product_variants_product ON public.product_variants(product_id, sort_order);
CREATE INDEX idx_product_variant_options_variant ON public.product_variant_options(variant_id, sort_order);

ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS variants jsonb NOT NULL DEFAULT '[]'::jsonb;