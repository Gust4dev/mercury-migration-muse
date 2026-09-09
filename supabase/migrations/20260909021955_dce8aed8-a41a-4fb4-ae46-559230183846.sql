
-- ============ ROLES & PROFILES ============
create type public.app_role as enum ('admin','customer');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  document text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create policy "own profile read" on public.profiles for select to authenticated using (id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "own profile insert" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "roles read own" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'customer') on conflict do nothing;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- ============ CATALOG ============
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  image_url text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.categories to anon, authenticated;
grant all on public.categories to service_role;
grant insert, update, delete on public.categories to authenticated;
alter table public.categories enable row level security;
create policy "categories public read" on public.categories for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "categories admin write" on public.categories for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger t_categories_updated before update on public.categories for each row execute function public.update_updated_at_column();

create table public.segments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  image_url text,
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.segments to anon, authenticated;
grant all on public.segments to service_role;
grant insert, update, delete on public.segments to authenticated;
alter table public.segments enable row level security;
create policy "segments public read" on public.segments for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "segments admin write" on public.segments for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger t_segments_updated before update on public.segments for each row execute function public.update_updated_at_column();

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sku text,
  short_description text,
  description text,
  price numeric(12,2) not null default 0,
  compare_at_price numeric(12,2),
  cost numeric(12,2),
  pix_discount_percent numeric(5,2) default 0,
  stock int not null default 0,
  made_to_order boolean not null default true,
  production_days int not null default 3,
  weight_g int not null default 100,
  height_cm numeric(8,2) not null default 2,
  width_cm numeric(8,2) not null default 10,
  length_cm numeric(8,2) not null default 10,
  max_per_package int,
  customizable boolean not null default false,
  active boolean not null default true,
  featured boolean not null default false,
  best_seller boolean not null default false,
  is_new boolean not null default false,
  on_sale boolean not null default false,
  sales_count int not null default 0,
  rating numeric(3,2) not null default 0,
  reviews_count int not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant all on public.products to service_role;
grant insert, update, delete on public.products to authenticated;
alter table public.products enable row level security;
create policy "products public read" on public.products for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "products admin write" on public.products for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger t_products_updated before update on public.products for each row execute function public.update_updated_at_column();

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.product_images to anon, authenticated;
grant all on public.product_images to service_role;
grant insert, update, delete on public.product_images to authenticated;
alter table public.product_images enable row level security;
create policy "product_images public read" on public.product_images for select to anon, authenticated using (true);
create policy "product_images admin write" on public.product_images for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.product_categories (
  product_id uuid not null references public.products(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key (product_id, category_id)
);
grant select on public.product_categories to anon, authenticated;
grant all on public.product_categories to service_role;
grant insert, update, delete on public.product_categories to authenticated;
alter table public.product_categories enable row level security;
create policy "pc public read" on public.product_categories for select to anon, authenticated using (true);
create policy "pc admin write" on public.product_categories for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.product_segments (
  product_id uuid not null references public.products(id) on delete cascade,
  segment_id uuid not null references public.segments(id) on delete cascade,
  primary key (product_id, segment_id)
);
grant select on public.product_segments to anon, authenticated;
grant all on public.product_segments to service_role;
grant insert, update, delete on public.product_segments to authenticated;
alter table public.product_segments enable row level security;
create policy "ps public read" on public.product_segments for select to anon, authenticated using (true);
create policy "ps admin write" on public.product_segments for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.quantity_pricing (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  min_qty int not null,
  max_qty int,
  unit_price numeric(12,2) not null,
  created_at timestamptz not null default now()
);
grant select on public.quantity_pricing to anon, authenticated;
grant all on public.quantity_pricing to service_role;
grant insert, update, delete on public.quantity_pricing to authenticated;
alter table public.quantity_pricing enable row level security;
create policy "qp public read" on public.quantity_pricing for select to anon, authenticated using (true);
create policy "qp admin write" on public.quantity_pricing for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.customization_fields (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  label text not null,
  field_key text not null,
  field_type text not null default 'text',
  help_text text,
  required boolean not null default false,
  options jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.customization_fields to anon, authenticated;
grant all on public.customization_fields to service_role;
grant insert, update, delete on public.customization_fields to authenticated;
alter table public.customization_fields enable row level security;
create policy "cf public read" on public.customization_fields for select to anon, authenticated using (true);
create policy "cf admin write" on public.customization_fields for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ PICKUP / COUPONS ============
create table public.pickup_locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  city text,
  state text,
  postal_code text,
  opening_hours text,
  ready_in_days int not null default 3,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.pickup_locations to anon, authenticated;
grant all on public.pickup_locations to service_role;
grant insert, update, delete on public.pickup_locations to authenticated;
alter table public.pickup_locations enable row level security;
create policy "pickup public read" on public.pickup_locations for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "pickup admin write" on public.pickup_locations for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type text not null default 'percent',
  discount_value numeric(12,2) not null default 0,
  free_shipping boolean not null default false,
  min_order_total numeric(12,2) not null default 0,
  max_uses int,
  used_count int not null default 0,
  valid_from timestamptz,
  valid_until timestamptz,
  product_ids uuid[],
  category_ids uuid[],
  segment_ids uuid[],
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.coupons to anon, authenticated;
grant all on public.coupons to service_role;
grant insert, update, delete on public.coupons to authenticated;
alter table public.coupons enable row level security;
create policy "coupons public read" on public.coupons for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "coupons admin write" on public.coupons for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ ADDRESSES ============
create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  recipient text,
  postal_code text not null,
  street text not null,
  number text,
  complement text,
  district text,
  city text not null,
  state text not null,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.addresses to authenticated;
grant all on public.addresses to service_role;
alter table public.addresses enable row level security;
create policy "addresses own" on public.addresses for all to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'admin')) with check (user_id = auth.uid());

-- ============ ORDERS ============
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  customer_document text,
  shipping_postal_code text,
  shipping_street text,
  shipping_number text,
  shipping_complement text,
  shipping_district text,
  shipping_city text,
  shipping_state text,
  delivery_method text not null default 'shipping',
  pickup_location_id uuid references public.pickup_locations(id) on delete set null,
  shipping_carrier text,
  shipping_service text,
  shipping_cost numeric(12,2) not null default 0,
  shipping_days_min int,
  shipping_days_max int,
  production_days int not null default 0,
  subtotal numeric(12,2) not null default 0,
  discount_total numeric(12,2) not null default 0,
  coupon_code text,
  total numeric(12,2) not null default 0,
  payment_method text,
  payment_status text not null default 'pending',
  status text not null default 'awaiting_payment',
  requires_artwork boolean not null default false,
  tracking_code text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert on public.orders to anon;
grant select, insert, update on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "orders insert any" on public.orders for insert to anon, authenticated with check (user_id is null or user_id = auth.uid());
create policy "orders read own" on public.orders for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "orders admin update" on public.orders for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger t_orders_updated before update on public.orders for each row execute function public.update_updated_at_column();

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_slug text,
  product_image text,
  sku text,
  quantity int not null default 1,
  unit_price numeric(12,2) not null,
  base_price numeric(12,2),
  line_total numeric(12,2) not null,
  production_days int not null default 0,
  customization jsonb,
  requires_artwork boolean not null default false,
  created_at timestamptz not null default now()
);
grant select, insert on public.order_items to anon;
grant select, insert on public.order_items to authenticated;
grant all on public.order_items to service_role;
alter table public.order_items enable row level security;
create policy "order_items insert any" on public.order_items for insert to anon, authenticated with check (true);
create policy "order_items read own" on public.order_items for select to authenticated using (
  public.has_role(auth.uid(),'admin') or exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);

create table public.order_item_files (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references public.order_items(id) on delete cascade,
  field_key text,
  file_url text not null,
  file_name text,
  created_at timestamptz not null default now()
);
grant select, insert on public.order_item_files to anon, authenticated;
grant all on public.order_item_files to service_role;
alter table public.order_item_files enable row level security;
create policy "oif insert any" on public.order_item_files for insert to anon, authenticated with check (true);
create policy "oif read own" on public.order_item_files for select to authenticated using (
  public.has_role(auth.uid(),'admin') or exists (
    select 1 from public.order_items oi join public.orders o on o.id = oi.order_id
    where oi.id = order_item_id and o.user_id = auth.uid())
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text,
  provider_payment_id text,
  method text,
  amount numeric(12,2) not null default 0,
  status text not null default 'pending',
  raw jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.payments to authenticated;
grant all on public.payments to service_role;
alter table public.payments enable row level security;
create policy "payments admin" on public.payments for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  carrier text,
  service text,
  tracking_code text,
  label_url text,
  shipped_at timestamptz,
  delivered_at timestamptz,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.shipments to authenticated;
grant all on public.shipments to service_role;
alter table public.shipments enable row level security;
create policy "shipments admin" on public.shipments for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "shipments read own" on public.shipments for select to authenticated using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

create table public.shipping_quotes (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  origin_postal_code text,
  destination_postal_code text,
  packages jsonb,
  options jsonb,
  created_at timestamptz not null default now()
);
grant select, insert on public.shipping_quotes to anon, authenticated;
grant all on public.shipping_quotes to service_role;
alter table public.shipping_quotes enable row level security;
create policy "quotes insert any" on public.shipping_quotes for insert to anon, authenticated with check (true);
create policy "quotes admin read" on public.shipping_quotes for select to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.artwork_approvals (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  order_item_id uuid references public.order_items(id) on delete cascade,
  preview_url text not null,
  version int not null default 1,
  status text not null default 'pending',
  customer_comment text,
  responded_at timestamptz,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.artwork_approvals to authenticated;
grant all on public.artwork_approvals to service_role;
alter table public.artwork_approvals enable row level security;
create policy "artwork admin" on public.artwork_approvals for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "artwork read own" on public.artwork_approvals for select to authenticated using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "artwork respond own" on public.artwork_approvals for update to authenticated using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())) with check (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  author_name text,
  rating int not null,
  comment text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.reviews to anon;
grant select, insert on public.reviews to authenticated;
grant update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "reviews public read" on public.reviews for select to anon, authenticated using (approved or public.has_role(auth.uid(),'admin'));
create policy "reviews insert own" on public.reviews for insert to authenticated with check (user_id = auth.uid());
create policy "reviews admin write" on public.reviews for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ GUEST ORDER LOOKUP ============
create or replace function public.get_order_public(_order_number text, _email text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare o public.orders; items jsonb;
begin
  select * into o from public.orders
   where order_number = upper(trim(_order_number)) and lower(customer_email) = lower(trim(_email));
  if not found then return null; end if;
  select coalesce(jsonb_agg(to_jsonb(i) order by i.created_at), '[]'::jsonb) into items
    from public.order_items i where i.order_id = o.id;
  return jsonb_build_object('order', to_jsonb(o), 'items', items);
end; $$;
grant execute on function public.get_order_public(text, text) to anon, authenticated;

create index on public.product_categories(category_id);
create index on public.product_segments(segment_id);
create index on public.quantity_pricing(product_id);
create index on public.order_items(order_id);
