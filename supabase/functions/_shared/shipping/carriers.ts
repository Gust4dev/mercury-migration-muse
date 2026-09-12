// Transportadoras aceitas na loja. Filtro aplicado no backend (cotação e pedido),
// nunca apenas na interface.

export const ALLOWED_CARRIERS = ["correios", "jadlog", "loggi"] as const;

export const normalizeCarrier = (value: string) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/** Verdadeiro somente para Correios, Jadlog e Loggi. */
export function isAllowedCarrier(name: string | null | undefined): boolean {
  const n = normalizeCarrier(name ?? "");
  if (!n) return false;
  return ALLOWED_CARRIERS.some((c) => n.includes(c));
}

/** A entrega grátis local é da própria Mercury e continua válida. */
export const isLocalFreeService = (serviceId: string | null | undefined) => serviceId === "local-free";

export function isServiceAllowed(
  option: { carrier?: string | null; serviceId?: string | null },
  disabledServiceIds: Set<string>,
): boolean {
  if (isLocalFreeService(option.serviceId)) return true;
  if (!isAllowedCarrier(option.carrier)) return false;
  return !disabledServiceIds.has(String(option.serviceId));
}
