ALTER TABLE public.comunidade_leads ADD COLUMN perfil text NOT NULL DEFAULT 'Não informado';
DROP FUNCTION public.submit_comunidade_lead(text,text,text,text,text,text,jsonb);
CREATE FUNCTION public.submit_comunidade_lead(
  _perfil text, _revenda text, _whatsapp text, _cidade text, _estado text,
  _bandeira text, _vendas text, _utm jsonb
) RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _protocol text; _digits text;
BEGIN
  _digits := regexp_replace(coalesce(_whatsapp,''), '\D', '', 'g');
  IF length(_digits) NOT IN (10, 11) THEN RAISE EXCEPTION 'invalid_whatsapp'; END IF;
  IF length(trim(coalesce(_perfil,''))) < 2 OR length(_perfil) > 80
     OR length(trim(coalesce(_revenda,''))) < 2 OR length(_revenda) > 120
     OR length(trim(coalesce(_cidade,''))) < 2 OR length(_cidade) > 100
     OR _estado !~ '^[A-Z]{2}$'
     OR length(trim(coalesce(_bandeira,''))) < 2 OR length(_bandeira) > 80
     OR length(trim(coalesce(_vendas,''))) < 2 OR length(_vendas) > 40 THEN
    RAISE EXCEPTION 'invalid_input';
  END IF;
  SELECT protocol INTO _protocol FROM comunidade_leads WHERE whatsapp = _digits;
  IF _protocol IS NOT NULL THEN
    UPDATE comunidade_leads SET perfil=trim(_perfil), revenda=trim(_revenda), cidade=trim(_cidade), estado=_estado,
      bandeira=trim(_bandeira), vendas_mensais=_vendas, utm=coalesce(_utm,'{}'::jsonb), updated_at=now()
      WHERE whatsapp=_digits;
    RETURN _protocol;
  END IF;
  _protocol := 'GLP-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8));
  INSERT INTO comunidade_leads(protocol, perfil, revenda, whatsapp, cidade, estado, bandeira, vendas_mensais, utm)
  VALUES (_protocol, trim(_perfil), trim(_revenda), _digits, trim(_cidade), _estado, trim(_bandeira), _vendas, coalesce(_utm,'{}'::jsonb));
  RETURN _protocol;
END $$;
REVOKE ALL ON FUNCTION public.submit_comunidade_lead(text,text,text,text,text,text,text,jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.submit_comunidade_lead(text,text,text,text,text,text,text,jsonb) TO anon, authenticated;