import { formatCep, onlyDigits } from "@/lib/loja/pricing";

const KEY = "mercury-loja-cep";
const EVENT = "mercury-loja-cep-change";

export const isCepComplete = (value: string) => onlyDigits(value).length === 8;

export const getSavedCep = () => {
  try {
    return formatCep(localStorage.getItem(KEY) ?? "");
  } catch {
    return "";
  }
};

export const saveCep = (value: string) => {
  if (!isCepComplete(value)) return;
  try {
    localStorage.setItem(KEY, formatCep(value));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: formatCep(value) }));
  } catch {
    /* ignora */
  }
};

export const onCepSaved = (cb: (cep: string) => void) => {
  const handler = (e: Event) => cb((e as CustomEvent<string>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
};

export interface CepAddress {
  street: string;
  district: string;
  city: string;
  state: string;
}

/** Consulta o ViaCEP. Retorna null quando o CEP não existe ou a consulta falha. */
export async function lookupCep(value: string): Promise<CepAddress | null> {
  const digits = onlyDigits(value);
  if (digits.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.erro) return null;
    return {
      street: data.logradouro ?? "",
      district: data.bairro ?? "",
      city: data.localidade ?? "",
      state: data.uf ?? "",
    };
  } catch {
    return null;
  }
}
