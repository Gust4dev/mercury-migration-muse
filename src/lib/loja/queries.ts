import { supabase } from "@/integrations/supabase/client";

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  customizable: boolean;
  featured: boolean;
  best_seller: boolean;
  is_new: boolean;
  on_sale: boolean;
  rating: number;
  reviews_count: number;
  production_days: number;
  stock: number;
  made_to_order: boolean;
  created_at: string;
  product_images: { url: string; alt: string | null; sort_order: number }[];
  quantity_pricing: { min_qty: number; max_qty: number | null; unit_price: number }[];
}

const LIST_SELECT =
  "id,name,slug,short_description,price,compare_at_price,customizable,featured,best_seller,is_new,on_sale,rating,reviews_count,production_days,stock,made_to_order,created_at,product_images(url,alt,sort_order),quantity_pricing(min_qty,max_qty,unit_price)";

export const productImage = (p: Pick<ProductListItem, "product_images">) =>
  [...(p.product_images || [])].sort((a, b) => a.sort_order - b.sort_order)[0]?.url ?? null;

export interface CatalogFilters {
  search?: string;
  categorySlug?: string;
  segmentSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  customizableOnly?: boolean;
  sort?: "relevance" | "price_asc" | "price_desc" | "newest" | "best_sellers";
  limit?: number;
}

export async function fetchProducts(filters: CatalogFilters = {}) {
  let productIds: string[] | null = null;

  if (filters.categorySlug) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", filters.categorySlug)
      .maybeSingle();
    if (!cat) return [] as ProductListItem[];
    const { data } = await supabase
      .from("product_categories")
      .select("product_id")
      .eq("category_id", cat.id);
    productIds = (data ?? []).map((r) => r.product_id);
  }

  if (filters.segmentSlug) {
    const { data: seg } = await supabase
      .from("segments")
      .select("id")
      .eq("slug", filters.segmentSlug)
      .maybeSingle();
    if (!seg) return [] as ProductListItem[];
    const { data } = await supabase
      .from("product_segments")
      .select("product_id")
      .eq("segment_id", seg.id);
    const ids = (data ?? []).map((r) => r.product_id);
    productIds = productIds ? productIds.filter((id) => ids.includes(id)) : ids;
  }

  if (productIds && productIds.length === 0) return [] as ProductListItem[];

  let query = supabase.from("products").select(LIST_SELECT).eq("active", true);

  if (productIds) query = query.in("id", productIds);
  if (filters.search?.trim()) {
    const term = `%${filters.search.trim()}%`;
    query = query.or(`name.ilike.${term},short_description.ilike.${term},description.ilike.${term}`);
  }
  if (filters.minPrice != null) query = query.gte("price", filters.minPrice);
  if (filters.maxPrice != null) query = query.lte("price", filters.maxPrice);
  if (filters.customizableOnly) query = query.eq("customizable", true);

  switch (filters.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "best_sellers":
      query = query.order("sales_count", { ascending: false });
      break;
    default:
      query = query.order("featured", { ascending: false }).order("sales_count", { ascending: false });
  }

  if (filters.limit) query = query.limit(filters.limit);

  const { data, error } = await query.returns<ProductListItem[]>();
  if (error) throw error;
  return data ?? [];
}

export async function fetchCategories() {
  const { data } = await supabase
    .from("categories")
    .select("id,name,slug,description,icon,image_url,sort_order")
    .eq("active", true)
    .order("sort_order");
  return data ?? [];
}

export async function fetchSegments() {
  const { data } = await supabase
    .from("segments")
    .select("id,name,slug,description,icon,image_url,sort_order,seo_title,seo_description")
    .eq("active", true)
    .order("sort_order");
  return data ?? [];
}

export async function fetchProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      "*,product_images(id,url,alt,sort_order),quantity_pricing(id,min_qty,max_qty,unit_price),customization_fields(id,label,field_key,field_type,help_text,required,options,sort_order),product_variants(id,name,required,sort_order,product_variant_options(id,variant_id,label,price_delta,price_override,available,weight_g,width_cm,height_cm,length_cm,image_urls,sort_order)),product_categories(categories(name,slug)),product_segments(segments(name,slug))",
    )
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchApprovedReviews(productId: string) {
  const { data } = await supabase
    .from("reviews")
    .select("id,author_name,rating,comment,created_at")
    .eq("product_id", productId)
    .eq("approved", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function fetchPickupLocations() {
  const { data } = await supabase
    .from("pickup_locations")
    .select("*")
    .eq("active", true)
    .order("name");
  return data ?? [];
}
