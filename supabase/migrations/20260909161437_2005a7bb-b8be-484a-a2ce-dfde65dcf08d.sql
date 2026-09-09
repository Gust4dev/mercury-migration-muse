CREATE OR REPLACE FUNCTION public.admin_delete_order(_order_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  DELETE FROM public.order_item_files
   WHERE order_item_id IN (SELECT id FROM public.order_items WHERE order_id = _order_id);
  DELETE FROM public.artwork_approvals WHERE order_id = _order_id;
  DELETE FROM public.shipping_quotes WHERE order_id = _order_id;
  DELETE FROM public.shipments WHERE order_id = _order_id;
  DELETE FROM public.payments WHERE order_id = _order_id;
  DELETE FROM public.order_items WHERE order_id = _order_id;
  DELETE FROM public.orders WHERE id = _order_id;
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_delete_order(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_delete_order(uuid) TO authenticated;