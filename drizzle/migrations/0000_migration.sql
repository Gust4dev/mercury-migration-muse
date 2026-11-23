CREATE TABLE public.comunidade_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol text NOT NULL UNIQUE,
  revenda text NOT NULL,
  whatsapp text NOT NULL UNIQUE,
  cidade text NOT NULL,
  estado text NOT NULL,
  bandeira text NOT NULL,
  vendas_mensais text NOT NULL,
  utm jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'Cadastro recebido',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.comunidade_leads TO service_role;
GRANT SELECT, UPDATE, DELETE ON public.comunidade_leads TO authenticated;
ALTER TABLE public.comunidade_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage comunidade leads" ON public.comunidade_leads
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.submit_comunidade_lead(
  _revenda text, _whatsapp text, _cidade text, _estado text,
  _bandeira text, _vendas text, _utm jsonb
) RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _protocol text; _digits text;
BEGIN
  _digits := regexp_replace(coalesce(_whatsapp,''), '\D', '', 'g');
  IF length(_digits) NOT IN (10, 11) THEN RAISE EXCEPTION 'invalid_whatsapp'; END IF;
  IF length(trim(coalesce(_revenda,''))) < 2 OR length(_revenda) > 120
     OR length(trim(coalesce(_cidade,''))) < 2 OR length(_cidade) > 100
     OR _estado !~ '^[A-Z]{2}$'
     OR length(trim(coalesce(_bandeira,''))) < 2 OR length(_bandeira) > 80
     OR length(trim(coalesce(_vendas,''))) < 2 OR length(_vendas) > 40 THEN
    RAISE EXCEPTION 'invalid_input';
  END IF;
  SELECT protocol INTO _protocol FROM comunidade_leads WHERE whatsapp = _digits;
  IF _protocol IS NOT NULL THEN
    UPDATE comunidade_leads SET revenda=trim(_revenda), cidade=trim(_cidade), estado=_estado,
      bandeira=trim(_bandeira), vendas_mensais=_vendas, utm=coalesce(_utm,'{}'::jsonb), updated_at=now()
      WHERE whatsapp=_digits;
    RETURN _protocol;
  END IF;
  _protocol := 'GLP-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8));
  INSERT INTO comunidade_leads(protocol, revenda, whatsapp, cidade, estado, bandeira, vendas_mensais, utm)
  VALUES (_protocol, trim(_revenda), _digits, trim(_cidade), _estado, trim(_bandeira), _vendas, coalesce(_utm,'{}'::jsonb));
  RETURN _protocol;
END $$;
REVOKE ALL ON FUNCTION public.submit_comunidade_lead(text,text,text,text,text,text,jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.submit_comunidade_lead(text,text,text,text,text,text,jsonb) TO anon, authenticated;