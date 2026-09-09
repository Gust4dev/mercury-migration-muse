DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['profiles','user_roles','categories','segments','products','product_images','product_categories','product_segments','quantity_pricing','customization_fields','coupons','addresses','pickup_locations','orders','order_items','order_item_files','payments','shipments','shipping_quotes','artwork_approvals','reviews'] LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT SELECT ON public.%I TO anon', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['orders','order_items','reviews','addresses','profiles','artwork_approvals','shipping_quotes','order_item_files'] LOOP
    EXECUTE format('GRANT INSERT ON public.%I TO anon', t);
  END LOOP;
END $$;