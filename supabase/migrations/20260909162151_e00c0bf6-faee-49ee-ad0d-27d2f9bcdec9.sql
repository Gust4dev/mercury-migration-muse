
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO anon, authenticated, service_role;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['products','product_images','product_categories','product_segments','categories','segments','quantity_pricing','customization_fields','reviews','pickup_locations','coupons'] LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
    EXECUTE format('GRANT INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
  END LOOP;

  FOREACH t IN ARRAY ARRAY['orders','order_items','order_item_files','artwork_approvals','shipping_quotes','payments','shipments','profiles','addresses','user_roles','email_send_log','email_send_state','email_unsubscribe_tokens','suppressed_emails'] LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
  END LOOP;

  FOREACH t IN ARRAY ARRAY['orders','order_items','order_item_files','artwork_approvals','shipping_quotes'] LOOP
    EXECUTE format('GRANT SELECT, INSERT ON public.%I TO anon', t);
  END LOOP;
END $$;
