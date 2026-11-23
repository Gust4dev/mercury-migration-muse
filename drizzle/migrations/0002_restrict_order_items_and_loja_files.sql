DROP POLICY IF EXISTS "order_items insert any" ON public.order_items;
DROP POLICY IF EXISTS "oif insert any" ON public.order_item_files;
CREATE POLICY "oif admin insert" ON public.order_item_files FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "loja read" ON storage.objects;
CREATE POLICY "loja admin read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'loja' AND public.has_role(auth.uid(), 'admin'));