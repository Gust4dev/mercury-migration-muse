// Núcleo compartilhado das cotações: leitura de configurações, itens e preços.
// Nunca confiar em peso, dimensões ou preços vindos do frontend.

// deno-lint-ignore no-explicit-any
type Client = any;

export interface QuoteItem {
  product_id: string;
  quantity: number;
}

export interface ProductRow {
  id: string;
  name: string;
  slug: string;
  price: number;
  weight_g: number;
  width_cm: number;
  height_cm: number;
  length_cm: number;
  max_per_package: number | null;
  production_days: number;
  customizable: boolean;
  active: boolean;
}

export interface ShippingSettings {
  origin_postal_code: string;
  origin_city: string;
  origin_state: string;
  handling_days: number;
  free_shipping_local: boolean;
  free_shipping_local_city: string;
  free_shipping_min_total: number | null;
  shipping_markup_percent: number;
  disabled_services: unknown;
  quote_ttl_minutes: number;
}

export async function loadSettings(supabase: Client): Promise<ShippingSettings> {
  const { data } = await supabase.from("shipping_settings").select("*").eq("id", 1).maybeSingle();
  return (
    data ?? {
      origin_postal_code: "75110250",
      origin_city: "Anápolis",
      origin_state: "GO",
      handling_days: 0,
      free_shipping_local: true,
      free_shipping_local_city: "Anápolis",
      free_shipping_min_total: null,
      shipping_markup_percent: 0,
      disabled_services: [],
      quote_ttl_minutes: 30,
    }
  );
}

export function itemsHash(items: QuoteItem[]) {
  return [...items]
    .sort((a, b) => a.product_id.localeCompare(b.product_id))
    .map((i) => `${i.product_id}:${i.quantity}`)
    .join("|");
}

export async function loadItems(
  supabase: Client,
  raw: { product_id?: string; quantity?: number }[],
): Promise<{ items: QuoteItem[]; products: ProductRow[] } | { error: { error: string; message: string } }> {
  const items: QuoteItem[] = [];
  for (const r of raw) {
    const id = String(r?.product_id ?? "");
    const qty = Math.floor(Number(r?.quantity ?? 0));
    if (!/^[0-9a-f-]{36}$/i.test(id) || qty < 1 || qty > 100000) {
      return { error: { error: "invalid_items", message: "Itens do pedido inválidos." } };
    }
    const existing = items.find((i) => i.product_id === id);
    if (existing) existing.quantity += qty;
    else items.push({ product_id: id, quantity: qty });
  }

  const { data: products } = await supabase
    .from("products")
    .select(
      "id,name,slug,price,weight_g,width_cm,height_cm,length_cm,max_per_package,production_days,customizable,active",
    )
    .in("id", items.map((i) => i.product_id));

  const rows = (products ?? []) as ProductRow[];
  if (rows.length !== items.length || rows.some((p) => !p.active)) {
    return { error: { error: "invalid_items", message: "Um dos produtos não está mais disponível." } };
  }

  const missingLogistics = rows.find(
    (p) => !(Number(p.weight_g) > 0 && Number(p.width_cm) > 0 && Number(p.height_cm) > 0 && Number(p.length_cm) > 0),
  );
  if (missingLogistics) {
    return {
      error: {
        error: "missing_logistics",
        message: `O produto "${missingLogistics.name}" está sem peso ou medidas cadastradas.`,
      },
    };
  }

  return { items, products: rows };
}

/** Preço unitário real, considerando as faixas de quantidade cadastradas. */
export async function priceItems(supabase: Client, items: QuoteItem[], products: ProductRow[]) {
  const { data: tiers } = await supabase
    .from("quantity_pricing")
    .select("product_id,min_qty,max_qty,unit_price")
    .in("product_id", items.map((i) => i.product_id));

  return items.map((i) => {
    const product = products.find((p) => p.id === i.product_id)!;
    let unit = Number(product.price);
    for (const t of (tiers ?? []).filter((t: { product_id: string }) => t.product_id === i.product_id)) {
      if (i.quantity >= t.min_qty && (t.max_qty == null || i.quantity <= t.max_qty)) unit = Number(t.unit_price);
    }
    return { product, quantity: i.quantity, unitPrice: unit, lineTotal: Number((unit * i.quantity).toFixed(2)) };
  });
}
