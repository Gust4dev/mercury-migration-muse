// Sistema dinâmico de variações da Loja Mercury.
// Nada é fixo no código: nomes e opções vêm do painel administrativo.

export interface VariantOption {
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
  image_urls: string[];
  sort_order: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  required: boolean;
  sort_order: number;
  product_variant_options: VariantOption[];
}

export interface SelectedVariant {
  variantId: string;
  variant: string;
  optionId: string;
  option: string;
}

export const sortVariants = (variants: ProductVariant[] | null | undefined): ProductVariant[] =>
  [...(variants ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((v) => ({
      ...v,
      product_variant_options: [...(v.product_variant_options ?? [])].sort((a, b) => a.sort_order - b.sort_order),
    }));

/** Preço base do produto já considerando as opções escolhidas (mesma regra do backend). */
export function basePriceWithVariants(productPrice: number, selected: VariantOption[]): number {
  const override = selected.find((o) => o.price_override != null)?.price_override;
  const value =
    override != null
      ? Number(override) + selected.reduce((s, o) => s + (o.price_override != null ? 0 : Number(o.price_delta || 0)), 0)
      : Number(productPrice) + selected.reduce((s, o) => s + Number(o.price_delta || 0), 0);
  return Number(Math.max(0, value).toFixed(2));
}

/** Imagens específicas da seleção; vazio significa usar as imagens padrão do produto. */
export function variantImages(selected: VariantOption[]): string[] {
  for (const o of [...selected].reverse()) {
    if (o.image_urls?.length) return o.image_urls;
  }
  return [];
}

/** Retorna o nome da primeira variação obrigatória ainda não escolhida. */
export function missingRequiredVariant(
  variants: ProductVariant[],
  selection: Record<string, string>,
): string | null {
  const missing = variants.find((v) => v.required && !selection[v.id]);
  return missing ? missing.name : null;
}
