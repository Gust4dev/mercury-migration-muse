// Consolidação de volumes (packing) da Mercury Loja.
//
// Estratégia conservadora da primeira versão:
// - soma o volume real de todos os itens (largura x altura x comprimento x quantidade);
// - aplica um fator de folga de embalagem (espaço perdido entre peças);
// - transforma o volume total em uma caixa cúbica aproximada;
// - garante que a caixa nunca seja menor que a maior dimensão individual de um produto;
// - respeita os limites mínimos aceitos pelas transportadoras.
//
// A arquitetura já aceita `max_per_package` por produto para, no futuro,
// gerar múltiplos volumes e caixas cadastradas com peso próprio.

export interface PackItemInput {
  weight_g: number;
  width_cm: number;
  height_cm: number;
  length_cm: number;
  max_per_package: number | null;
  quantity: number;
  unit_price: number;
}

export interface PackResult {
  weight: number; // kg
  width: number; // cm
  height: number; // cm
  length: number; // cm
  insurance_value: number;
  volumes: number;
}

const PACKING_SLACK = 1.2; // 20% de folga de embalagem
const MIN = { width: 11, height: 2, length: 16 };
const MAX = { width: 105, height: 105, length: 105, weight: 30 };

export function buildPackage(items: PackItemInput[]): PackResult {
  let weightKg = 0;
  let volume = 0;
  let maxW = 0;
  let maxH = 0;
  let maxL = 0;
  let insurance = 0;
  let volumes = 0;

  for (const it of items) {
    const qty = Math.max(1, Math.floor(it.quantity));
    weightKg += (Number(it.weight_g) * qty) / 1000;
    volume += Number(it.width_cm) * Number(it.height_cm) * Number(it.length_cm) * qty;
    maxW = Math.max(maxW, Number(it.width_cm));
    maxH = Math.max(maxH, Number(it.height_cm));
    maxL = Math.max(maxL, Number(it.length_cm));
    insurance += Number(it.unit_price) * qty;
    const perBox = it.max_per_package && it.max_per_package > 0 ? it.max_per_package : qty;
    volumes += Math.ceil(qty / perBox);
  }

  const side = Math.cbrt(Math.max(volume, 1) * PACKING_SLACK);

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, Math.ceil(v)));

  return {
    weight: Math.min(MAX.weight, Math.max(0.1, Number(weightKg.toFixed(3)))),
    width: clamp(Math.max(side, maxW), MIN.width, MAX.width),
    height: clamp(Math.max(side, maxH), MIN.height, MAX.height),
    length: clamp(Math.max(side, maxL), MIN.length, MAX.length),
    insurance_value: Number(insurance.toFixed(2)),
    volumes: Math.max(1, volumes),
  };
}

export const normalizeCep = (value: string) => (value || "").replace(/\D/g, "");
export const isValidCep = (value: string) => /^[0-9]{8}$/.test(normalizeCep(value));
