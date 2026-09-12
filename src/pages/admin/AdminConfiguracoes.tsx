import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatCep } from "@/lib/loja/pricing";

interface Settings {
  id: number;
  origin_postal_code: string;
  origin_city: string | null;
  origin_state: string | null;
  handling_days: number;
  quote_ttl_minutes: number;
  shipping_markup_percent: number | null;
  free_shipping_local: boolean;
  disabled_services: string[];
}

interface ServiceInfo {
  serviceId: string;
  service: string;
  carrier: string;
  companyId: string;
}

const AdminConfiguracoes = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    supabase
      .from("shipping_settings")
      .select("id,origin_postal_code,origin_city,origin_state,handling_days,quote_ttl_minutes,shipping_markup_percent,free_shipping_local,disabled_services")
      .limit(1)
      .maybeSingle()
      .then(({ data }) =>
        setSettings(
          data
            ? {
                ...(data as unknown as Settings),
                disabled_services: (((data as { disabled_services?: unknown }).disabled_services as string[]) ?? []).map(
                  String,
                ),
              }
            : null,
        ),
      );

    supabase.functions
      .invoke("shipping-services")
      .then(({ data, error }) => {
        if (error || !data?.services) {
          setServicesError(data?.message ?? "Não foi possível carregar os serviços das transportadoras.");
        } else {
          setServices(data.services as ServiceInfo[]);
        }
      })
      .finally(() => setLoadingServices(false));
  }, []);

  const toggleService = (serviceId: string) => {
    if (!settings) return;
    const off = settings.disabled_services.includes(serviceId);
    setSettings({
      ...settings,
      disabled_services: off
        ? settings.disabled_services.filter((s) => s !== serviceId)
        : [...settings.disabled_services, serviceId],
    });
  };

  const carriers = Array.from(new Set(services.map((s) => s.carrier)));

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    const { error } = await supabase
      .from("shipping_settings")
      .update({
        origin_postal_code: settings.origin_postal_code.replace(/\D/g, ""),
        origin_city: settings.origin_city,
        origin_state: settings.origin_state,
        handling_days: Number(settings.handling_days) || 0,
        quote_ttl_minutes: Number(settings.quote_ttl_minutes) || 30,
        shipping_markup_percent: Number(settings.shipping_markup_percent) || 0,
        free_shipping_local: settings.free_shipping_local,
        disabled_services: settings.disabled_services,
      })
      .eq("id", settings.id);
    setSaving(false);
    toast({
      title: error ? "Não foi possível salvar" : "Configurações salvas",
      description: error?.message,
      variant: error ? "destructive" : undefined,
    });
  };

  const input = "w-full h-10 px-3 rounded bg-secondary border border-border text-sm";
  const lbl = "text-xs text-muted-foreground";

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Configurações</h1>

      <section className="rounded-lg border border-border bg-card p-4 space-y-4">
        <div>
          <h2 className="font-semibold">Logística e frete</h2>
          <p className="text-sm text-muted-foreground">
            O frete é calculado em tempo real com as transportadoras, a partir do CEP de origem abaixo. Os valores nunca
            são estimados manualmente.
          </p>
        </div>

        {settings ? (
          <>
            <div className="grid sm:grid-cols-3 gap-3">
              <label className="block">
                <span className={lbl}>CEP de origem</span>
                <input
                  className={input}
                  value={formatCep(settings.origin_postal_code)}
                  onChange={(e) => setSettings({ ...settings, origin_postal_code: e.target.value })}
                />
              </label>
              <label className="block">
                <span className={lbl}>Cidade de origem</span>
                <input
                  className={input}
                  value={settings.origin_city ?? ""}
                  onChange={(e) => setSettings({ ...settings, origin_city: e.target.value })}
                />
              </label>
              <label className="block">
                <span className={lbl}>UF de origem</span>
                <input
                  className={input}
                  maxLength={2}
                  value={settings.origin_state ?? ""}
                  onChange={(e) => setSettings({ ...settings, origin_state: e.target.value.toUpperCase() })}
                />
              </label>
              <label className="block">
                <span className={lbl}>Dias extras de manuseio</span>
                <input
                  className={input}
                  type="number"
                  value={settings.handling_days}
                  onChange={(e) => setSettings({ ...settings, handling_days: Number(e.target.value) })}
                />
              </label>
              <label className="block">
                <span className={lbl}>Validade da cotação (minutos)</span>
                <input
                  className={input}
                  type="number"
                  value={settings.quote_ttl_minutes}
                  onChange={(e) => setSettings({ ...settings, quote_ttl_minutes: Number(e.target.value) })}
                />
              </label>
              <label className="block">
                <span className={lbl}>Acréscimo sobre o frete (%)</span>
                <input
                  className={input}
                  type="number"
                  value={settings.shipping_markup_percent ?? 0}
                  onChange={(e) => setSettings({ ...settings, shipping_markup_percent: Number(e.target.value) })}
                />
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.free_shipping_local}
                onChange={(e) => setSettings({ ...settings, free_shipping_local: e.target.checked })}
              />
              Entrega grátis automática para CEPs 75xxx (Anápolis/GO e região)
            </label>

            <div className="space-y-3 pt-2 border-t border-border">
              <div>
                <h3 className="font-semibold text-sm">Transportadoras e serviços</h3>
                <p className="text-xs text-muted-foreground">
                  A loja trabalha apenas com Correios, Jadlog e Loggi. Desative as modalidades que não quer oferecer ao
                  cliente.
                </p>
              </div>

              {loadingServices && <p className="text-xs text-muted-foreground">Carregando serviços...</p>}
              {!loadingServices && servicesError && <p className="text-xs text-muted-foreground">{servicesError}</p>}

              {carriers.map((carrier) => (
                <div key={carrier} className="rounded border border-border p-3 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wide">{carrier}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {services
                      .filter((s) => s.carrier === carrier)
                      .map((s) => (
                        <label key={s.serviceId} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={!settings.disabled_services.includes(s.serviceId)}
                            onChange={() => toggleService(s.serviceId)}
                          />
                          {s.service}
                        </label>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={save}
              disabled={saving}
              className="h-10 px-4 rounded bg-primary text-primary-foreground text-sm font-bold disabled:opacity-60"
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Carregando configurações...</p>
        )}
      </section>

      <section className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground space-y-1">
        <h2 className="font-semibold text-foreground">Produtos e envio</h2>
        <p>Todo produto publicado precisa ter peso em gramas e medidas da embalagem em centímetros.</p>
        <p>Sem esses dados o frete real não pode ser calculado e o produto não pode ficar ativo.</p>
      </section>

      <section className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground space-y-1">
        <h2 className="font-semibold text-foreground">Pagamentos</h2>
        <p>Os pedidos já registram método de pagamento, status e valores de frete.</p>
        <p>A cobrança automática será ativada quando o gateway for conectado.</p>
      </section>
    </div>
  );
};

export default AdminConfiguracoes;
