
create policy "loja read" on storage.objects for select to anon, authenticated using (bucket_id = 'loja');
create policy "loja admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'loja' and public.has_role(auth.uid(),'admin'));
create policy "loja admin update" on storage.objects for update to authenticated using (bucket_id = 'loja' and public.has_role(auth.uid(),'admin'));
create policy "loja admin delete" on storage.objects for delete to authenticated using (bucket_id = 'loja' and public.has_role(auth.uid(),'admin'));
