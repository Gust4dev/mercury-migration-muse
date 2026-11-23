ALTER TABLE public.comunidade_leads
  ADD COLUMN sheets_status text NOT NULL DEFAULT 'pendente',
  ADD COLUMN sheets_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN sheets_last_error text,
  ADD COLUMN sheets_synced_at timestamptz;