import { supabase } from "@/integrations/supabase/client";

export interface QuoteOption {
  id: string;
  provider: string;
  carrier: string;
  service: string;
  serviceId: string;
  price: number;
  daysMin: number;
  daysMax: number;
}

export interface QuoteResult {
  quote_id: string;
  options: QuoteOption[];
  expires_at: string;
  production_days: number;
  requires_artwork: boolean;
  origin: { postal_code: string; city: string; state: string };
}

export const normalizeCep = (value: string) => (value || "").replace(/\D/g, "");
export const isValidCep = (value: string) => /^[0-9]{8}$/.test(normalizeCep(value));

export class ShippingError extends Error {}

/** Cotação real de frete. Peso, medidas e preços são lidos no backend. */
export interface QuoteRequestItem {
  product_id: string;
  quantity: number;
  variant_option_ids?: string[];
}

export async function quoteShipping(
  destinationCep: string,
  items: QuoteRequestItem[],
): Promise<QuoteResult> {
  if (!isValidCep(destinationCep)) throw new ShippingError("Informe um CEP válido.");
  if (items.length === 0) throw new ShippingError("Nenhum item para cotar.");

  const { data, error } = await supabase.functions.invoke("shipping-quote", {
    body: { destination_postal_code: normalizeCep(destinationCep), items },
  });

  if (error) {
    let message = "Não foi possível calcular a entrega neste momento. Tente novamente em alguns instantes.";
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === "function") {
      try {
        const body = await ctx.json();
        if (body?.message) message = body.message;
      } catch {
        /* mantém a mensagem padrão */
      }
    }
    throw new ShippingError(message);
  }

  if (!data || data.error) {
    throw new ShippingError(
      data?.message ?? "Não foi possível calcular a entrega neste momento. Tente novamente em alguns instantes.",
    );
  }

  return data as QuoteResult;
}
