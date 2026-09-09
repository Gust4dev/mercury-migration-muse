export interface PriceTier {
  min_qty: number;
  max_qty: number | null;
  unit_price: number;
}

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Retorna o preço unitário considerando faixas de quantidade (preço progressivo). */
export function unitPriceFor(basePrice: number, tiers: PriceTier[], qty: number) {
  const sorted = [...(tiers || [])].sort((a, b) => a.min_qty - b.min_qty);
  let price = basePrice;
  for (const t of sorted) {
    if (qty >= t.min_qty && (t.max_qty == null || qty <= t.max_qty)) price = Number(t.unit_price);
  }
  return price;
}

export const onlyDigits = (s: string) => (s || "").replace(/\D/g, "");

export const formatCep = (s: string) => {
  const d = onlyDigits(s).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
};

export interface ShippingOption {
  id: string;
  carrier: string;
  service: string;
  price: number;
  daysMin: number;
  daysMax: number;
}

/**
 * Cálculo PRELIMINAR de frete (estimativa própria por região + peso).
 * A estrutura já está pronta para ser substituída por uma cotação real
 * (Melhor Envio ou equivalente) sem mudar a interface.
 */
export function estimateShipping(cep: string, weightGrams: number): ShippingOption[] {
  const digits = onlyDigits(cep);
  if (digits.length !== 8) return [];
  const prefix = Number(digits.slice(0, 2));

  // Regiões aproximadas por faixa de CEP
  let zone = 4;
  if (prefix >= 70 && prefix <= 76) zone = 1; // Centro-Oeste / DF / GO
  else if ((prefix >= 1 && prefix <= 39) || (prefix >= 80 && prefix <= 99)) zone = 2; // Sudeste / Sul
  else if (prefix >= 40 && prefix <= 65) zone = 3; // Nordeste / Norte próximo
  else zone = 4;

  const kg = Math.max(0.3, weightGrams / 1000);
  const base = [14.9, 21.9, 27.9, 33.9][zone - 1];
  const perKg = [4.5, 6.5, 8.5, 10.5][zone - 1];
  const economic = base + perKg * kg;

  const round = (v: number) => Math.round(v * 100) / 100;

  return [
    {
      id: "economico",
      carrier: "Transportadora parceira",
      service: "Econômico",
      price: round(economic),
      daysMin: 4 + zone,
      daysMax: 8 + zone * 2,
    },
    {
      id: "expresso",
      carrier: "Transportadora parceira",
      service: "Expresso",
      price: round(economic * 1.65),
      daysMin: 2 + zone,
      daysMax: 4 + zone,
    },
  ];
}

export function orderNumber() {
  const d = new Date();
  const stamp = `${d.getFullYear()}`.slice(2) + String(d.getMonth() + 1).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `MC${stamp}${rand}`;
}
