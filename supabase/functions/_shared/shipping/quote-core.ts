// Núcleo compartilhado das cotações: leitura de configurações, itens e preços.
// Nunca confiar em peso, dimensões ou preços vindos do frontend.

// deno-lint-ignore no-explicit-any
type Client = any;

export interface QuoteItem {
  product_id: string;
  quantity: number;
  variant_option_ids: string[];
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

export interface VariantRow {
  id: string;
  product_id: string;
  name: string;
  required: boolean;
  sort_order: number;
}

export interface VariantOptionRow {
  id: string;
  variant_id: string;
  label: string;
  price_delta: number;
  price_override: number | null;
  available: boolean;
  weight_g: number | null;
  width_cm: number | null;
  height_cm: number | null;
  length_cm: number | null;
  sort_order: number;
}

/** Linha do pedido já resolvida no backend (produto + variações escolhidas). */
export interface ResolvedLine {
  key: string;
  product: ProductRow;
  quantity: number;
  variant_option_ids: string[];
  variants: { variant: string; option: string }[];
  basePrice: number;
  weight_g: number;
  width_cm: number;
  height_cm: number;
  length_cm: number;
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

export const lineKey = (productId: string, optionIds: string[]) =>
  `${productId}#${[...optionIds].sort().join(",")}`;

export function itemsHash(items: QuoteItem[]) {
  return [...items]
    .map((i) => `${lineKey(i.product_id, i.variant_option_ids ?? [])}:${i.quantity}`)
    .sort()
    .join("|");
}

const isUuid = (v: string) => /^[0-9a-f-]{36}$/i.test(v);

export async function loadItems(
  supabase: Client,
  raw: { product_id?: string; quantity?: number; variant_option_ids?: string[] }[],
): Promise<{ items: QuoteItem[]; products: ProductRow[]; lines: ResolvedLine[] } | { error: { error: string; message: string } }> {
  const items: QuoteItem[] = [];
  for (const r of raw) {
    const id = String(r?.product_id ?? "");
    const qty = Math.floor(Number(r?.quantity ?? 0));
    const optionIds = Array.isArray(r?.variant_option_ids)
      ? [...new Set(r!.variant_option_ids!.map((o) => String(o)))]
      : [];
    if (!isUuid(id) || qty < 1 || qty > 100000 || optionIds.some((o) => !isUuid(o))) {
      return { error: { error: "invalid_items", message: "Itens do pedido inválidos." } };
    }
    const key = lineKey(id, optionIds);
    const existing = items.find((i) => lineKey(i.product_id, i.variant_option_ids) === key);
    if (existing) existing.quantity += qty;
    else items.push({ product_id: id, quantity: qty, variant_option_ids: optionIds });
  }

  const productIds = [...new Set(items.map((i) => i.product_id))];

  const { data: products } = await supabase
    .from("products")
    .select(
      "id,name,slug,price,weight_g,width_cm,height_cm,length_cm,max_per_package,production_days,customizable,active",
    )
    .in("id", productIds);

  const rows = (products ?? []) as ProductRow[];
  if (rows.length !== productIds.length || rows.some((p) => !p.active)) {
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

  // ---------- Variações dinâmicas ----------
  const { data: variantsData } = await supabase
    .from("product_variants")
    .select("id,product_id,name,required,sort_order")
    .in("product_id", productIds);
  const variants = (variantsData ?? []) as VariantRow[];

  let options: VariantOptionRow[] = [];
  if (variants.length) {
    const { data: optionsData } = await supabase
      .from("product_variant_options")
      .select("id,variant_id,label,price_delta,price_override,available,weight_g,width_cm,height_cm,length_cm,sort_order")
      .in("variant_id", variants.map((v) => v.id));
    options = (optionsData ?? []) as VariantOptionRow[];
  }

  const lines: ResolvedLine[] = [];

  for (const item of items) {
    const product = rows.find((p) => p.id === item.product_id)!;
    const productVariants = variants.filter((v) => v.product_id === product.id);
    const chosen: VariantOptionRow[] = [];

    for (const id of item.variant_option_ids) {
      const option = options.find((o) => o.id === id);
      const variant = option ? productVariants.find((v) => v.id === option.variant_id) : undefined;
      if (!option || !variant) {
        return { error: { error: "invalid_variant", message: "Opção de variação inválida para este produto." } };
      }
      if (!option.available) {
        return {
          error: { error: "variant_unavailable", message: `A opção "${option.label}" está indisponível no momento.` },
        };
      }
      chosen.push(option);
    }

    // Uma escolha por variação e todas as obrigatórias preenchidas.
    const chosenVariantIds = chosen.map((o) => o.variant_id);
    if (new Set(chosenVariantIds).size !== chosenVariantIds.length) {
      return { error: { error: "invalid_variant", message: "Escolha apenas uma opção por variação." } };
    }
    const missing = productVariants.find((v) => v.required && !chosenVariantIds.includes(v.id));
    if (missing) {
      return {
        error: { error: "variant_required", message: `Escolha uma opção de "${missing.name}" antes de continuar.` },
      };
    }

    const override = chosen.find((o) => o.price_override != null)?.price_override;
    const basePrice =
      override != null
        ? Number(override) + chosen.reduce((s, o) => s + (o.price_override != null ? 0 : Number(o.price_delta || 0)), 0)
        : Number(product.price) + chosen.reduce((s, o) => s + Number(o.price_delta || 0), 0);

    const dim = (key: "weight_g" | "width_cm" | "height_cm" | "length_cm") => {
      const specific = chosen.map((o) => o[key]).filter((v) => v != null && Number(v) > 0) as number[];
      return specific.length ? Math.max(...specific.map(Number)) : Number(product[key]);
    };

    const ordered = [...chosen].sort((a, b) => {
      const va = productVariants.find((v) => v.id === a.variant_id)!;
      const vb = productVariants.find((v) => v.id === b.variant_id)!;
      return va.sort_order - vb.sort_order;
    });

    lines.push({
      key: lineKey(item.product_id, item.variant_option_ids),
      product,
      quantity: item.quantity,
      variant_option_ids: item.variant_option_ids,
      variants: ordered.map((o) => ({
        variant: productVariants.find((v) => v.id === o.variant_id)!.name,
        option: o.label,
      })),
      basePrice: Number(basePrice.toFixed(2)),
      weight_g: dim("weight_g"),
      width_cm: dim("width_cm"),
      height_cm: dim("height_cm"),
      length_cm: dim("length_cm"),
    });
  }

  return { items, products: rows, lines };
}

/** Preço unitário real, considerando faixas de quantidade e variações escolhidas. */
export async function priceItems(supabase: Client, lines: ResolvedLine[]) {
  const { data: tiers } = await supabase
    .from("quantity_pricing")
    .select("product_id,min_qty,max_qty,unit_price")
    .in("product_id", [...new Set(lines.map((l) => l.product.id))]);

  return lines.map((line) => {
    // A faixa por quantidade substitui apenas o preço base do produto;
    // os acréscimos das variações continuam sendo somados.
    let unit = line.basePrice;
    const extra = Number((line.basePrice - Number(line.product.price)).toFixed(2));
    for (const t of (tiers ?? []).filter((t: { product_id: string }) => t.product_id === line.product.id)) {
      if (line.quantity >= t.min_qty && (t.max_qty == null || line.quantity <= t.max_qty)) {
        unit = Number(t.unit_price) + extra;
      }
    }
    unit = Number(Math.max(0, unit).toFixed(2));
    return {
      product: line.product,
      line,
      quantity: line.quantity,
      unitPrice: unit,
      lineTotal: Number((unit * line.quantity).toFixed(2)),
    };
  });
}
