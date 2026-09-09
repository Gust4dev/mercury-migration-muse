import { supabase } from "@/integrations/supabase/client";

// SDK oficial do Mercado Pago (Checkout Transparente).
// Somente a Public Key trafega no navegador.

interface MpInstance {
  createCardToken: (data: Record<string, string>) => Promise<{ id: string }>;
  getPaymentMethods: (data: { bin: string }) => Promise<{ results: { id: string; payment_type_id: string }[] }>;
  getInstallments: (data: {
    amount: string;
    bin: string;
    paymentTypeId: string;
  }) => Promise<
    { payer_costs: { installments: number; recommended_message: string; total_amount: number; installment_amount: number }[] }[]
  >;
}

declare global {
  interface Window {
    MercadoPago?: new (publicKey: string, options?: { locale?: string }) => MpInstance;
  }
}

export interface MpConfig {
  public_key: string;
  environment: "test" | "production";
  configured: boolean;
}

let configCache: MpConfig | null = null;
let sdkPromise: Promise<void> | null = null;
let instance: MpInstance | null = null;

export const getMpConfig = async (): Promise<MpConfig> => {
  if (configCache) return configCache;
  const { data, error } = await supabase.functions.invoke("mp-config", { body: {} });
  if (error || !data) throw new Error("Pagamento indisponível no momento.");
  configCache = data as MpConfig;
  return configCache;
};

const loadSdk = () => {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise<void>((resolve, reject) => {
    if (window.MercadoPago) return resolve();
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Não foi possível carregar o pagamento."));
    document.head.appendChild(script);
  });
  return sdkPromise;
};

export const getMp = async (): Promise<MpInstance> => {
  if (instance) return instance;
  const config = await getMpConfig();
  if (!config.configured) throw new Error("Pagamento ainda não configurado.");
  await loadSdk();
  if (!window.MercadoPago) throw new Error("Não foi possível carregar o pagamento.");
  instance = new window.MercadoPago(config.public_key, { locale: "pt-BR" });
  return instance;
};

export const PAYMENT_STATUS_LABEL: Record<string, string> = {
  pending: "Aguardando pagamento",
  approved: "Pagamento aprovado",
  rejected: "Pagamento recusado",
  cancelled: "Pagamento cancelado",
  refunded: "Pagamento reembolsado",
  in_process: "Pagamento em análise",
};
