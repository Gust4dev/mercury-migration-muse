
revoke execute on function public.has_role(uuid, app_role) from anon, authenticated, public;
revoke execute on function public.handle_new_user() from anon, authenticated, public;
revoke execute on function public.update_updated_at_column() from anon, authenticated, public;
revoke execute on function public.enqueue_email(text, jsonb) from anon, authenticated, public;
revoke execute on function public.delete_email(text, bigint) from anon, authenticated, public;
revoke execute on function public.read_email_batch(text, integer, integer) from anon, authenticated, public;
revoke execute on function public.move_to_dlq(text, text, bigint, jsonb) from anon, authenticated, public;
revoke execute on function public.email_queue_dispatch() from anon, authenticated, public;
create or replace function public.enqueue_email(queue_name text, payload jsonb)
 returns bigint language plpgsql security definer set search_path to 'public' as $function$
BEGIN
  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$function$;
create or replace function public.delete_email(queue_name text, message_id bigint)
 returns boolean language plpgsql security definer set search_path to 'public' as $function$
BEGIN
  RETURN pgmq.delete(queue_name, message_id);
EXCEPTION WHEN undefined_table THEN
  RETURN FALSE;
END;
$function$;
create or replace function public.read_email_batch(queue_name text, batch_size integer, vt integer)
 returns table(msg_id bigint, read_ct integer, message jsonb) language plpgsql security definer set search_path to 'public' as $function$
BEGIN
  RETURN QUERY SELECT r.msg_id, r.read_ct, r.message FROM pgmq.read(queue_name, vt, batch_size) r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$function$;
create or replace function public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
 returns bigint language plpgsql security definer set search_path to 'public' as $function$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
EXCEPTION WHEN undefined_table THEN
  BEGIN PERFORM pgmq.create(dlq_name); EXCEPTION WHEN OTHERS THEN NULL; END;
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  BEGIN PERFORM pgmq.delete(source_queue, message_id); EXCEPTION WHEN undefined_table THEN NULL; END;
  RETURN new_id;
END;
$function$;
revoke execute on function public.enqueue_email(text, jsonb) from anon, authenticated, public;
revoke execute on function public.delete_email(text, bigint) from anon, authenticated, public;
revoke execute on function public.read_email_batch(text, integer, integer) from anon, authenticated, public;
revoke execute on function public.move_to_dlq(text, text, bigint, jsonb) from anon, authenticated, public;
