// Cliente do Melhor Envio. Todas as chamadas autenticadas acontecem no backend.
// O token vive apenas em MELHOR_ENVIO_TOKEN (secret) e nunca é logado.

import type { PackResult } from "./packing.ts";
import { isAllowedCarrier } from "./carriers.ts";

const BASE = Deno.env.get("MELHOR_ENVIO_BASE_URL") ?? "https://melhorenvio.com.br";
const USER_AGENT = "Mercury Loja (contato@mercurygestora.com.br)";

export interface QuoteOption {
  id: string;
  provider: "melhor_envio";
  carrier: string;
  service: string;
  serviceId: string;
  price: number;
  daysMin: number;
  daysMax: number;
  companyId?: string;
}

export class MelhorEnvioError extends Error {}

export interface ServiceInfo {
  serviceId: string;
  service: string;
  carrier: string;
  companyId: string;
}

/** Catálogo de serviços do Melhor Envio, restrito às transportadoras aceitas. */
export async function listServices(): Promise<ServiceInfo[]> {
  const token = Deno.env.get("MELHOR_ENVIO_TOKEN");
  if (!token) throw new MelhorEnvioError("missing_token");

  const res = await fetch(`${BASE}/api/v2/me/shipment/services`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": USER_AGENT,
    },
  });
  if (!res.ok) throw new MelhorEnvioError(`melhor_envio_http_${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new MelhorEnvioError("melhor_envio_invalid_response");

  return data
    .map((s: Record<string, unknown>) => {
      const company = (s.company ?? {}) as { name?: string; id?: number | string };
      return {
        serviceId: String(s.id),
        service: String(s.name ?? "Entrega"),
        carrier: company.name ?? "Transportadora",
        companyId: String(company.id ?? ""),
      };
    })
    .filter((s: ServiceInfo) => isAllowedCarrier(s.carrier))
    .sort((a: ServiceInfo, b: ServiceInfo) =>
      a.carrier.localeCompare(b.carrier) || a.service.localeCompare(b.service),
    );
}


export async function calculateShipping(params: {
  fromPostalCode: string;
  toPostalCode: string;
  pack: PackResult;
}): Promise<QuoteOption[]> {
  const token = Deno.env.get("MELHOR_ENVIO_TOKEN");
  if (!token) throw new MelhorEnvioError("missing_token");

  const res = await fetch(`${BASE}/api/v2/me/shipment/calculate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify({
      from: { postal_code: params.fromPostalCode },
      to: { postal_code: params.toPostalCode },
      package: {
        height: params.pack.height,
        width: params.pack.width,
        length: params.pack.length,
        weight: params.pack.weight,
      },
      options: {
        insurance_value: params.pack.insurance_value,
        receipt: false,
        own_hand: false,
      },
    }),
  });

  if (!res.ok) {
    // Nunca registrar token ou headers.
    throw new MelhorEnvioError(`melhor_envio_http_${res.status}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) throw new MelhorEnvioError("melhor_envio_invalid_response");

  return data
    .filter((s: Record<string, unknown>) => !s.error && s.price)
    .map((s: Record<string, unknown>) => {
      const company = (s.company ?? {}) as { name?: string; id?: number | string };
      const price = Number(s.price);
      const days = Number(s.delivery_time ?? 0);
      const rangeMin = Number((s.delivery_range as { min?: number } | undefined)?.min ?? days);
      const rangeMax = Number((s.delivery_range as { max?: number } | undefined)?.max ?? days);
      return {
        id: `me-${s.id}`,
        provider: "melhor_envio" as const,
        carrier: company.name ?? "Transportadora",
        service: String(s.name ?? "Entrega"),
        serviceId: String(s.id),
        price: Number(price.toFixed(2)),
        daysMin: rangeMin || days,
        daysMax: rangeMax || days,
        companyId: String(company.id ?? ""),
      };
    })
    // Somente Correios, Jadlog e Loggi.
    .filter((o: QuoteOption) => o.price > 0 && isAllowedCarrier(o.carrier))
    .sort((a: QuoteOption, b: QuoteOption) => a.price - b.price);
}
