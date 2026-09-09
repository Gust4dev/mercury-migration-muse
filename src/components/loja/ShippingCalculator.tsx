import { useEffect, useState } from "react";
import { Loader2, RefreshCw, Truck } from "lucide-react";
import { brl, formatCep } from "@/lib/loja/pricing";
import { quoteShipping, ShippingError, type QuoteOption, type QuoteResult } from "@/lib/loja/shipping";

interface Props {
  items: { product_id: string; quantity: number }[];
  title?: string;
  selectable?: boolean;
  selectedServiceId?: string | null;
  initialCep?: string;
  onQuote?: (quote: QuoteResult | null) => void;
  onSelect?: (option: QuoteOption | null) => void;
  onCepChange?: (cep: string) => void;
}

const ShippingCalculator = ({
  items,
  title = "Calcule o frete",
  selectable = false,
  selectedServiceId = null,
  initialCep = "",
  onQuote,
  onSelect,
  onCepChange,
}: Props) => {
  const [cep, setCep] = useState(formatCep(initialCep));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<QuoteResult | null>(null);

  // Alterou itens/quantidade -> a cotação anterior deixa de valer.
  const signature = items.map((i) => `${i.product_id}:${i.quantity}`).sort().join("|");
  useEffect(() => {
    setQuote(null);
    setError(null);
    onQuote?.(null);
    onSelect?.(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  const calculate = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await quoteShipping(cep, items);
      localStorage.setItem("mercury-loja-cep", cep);
      setQuote(result);
      onQuote?.(result);
      onCepChange?.(cep);
      if (selectable) onSelect?.(result.options[0] ?? null);
      if (result.options.length === 0) setError("Nenhuma transportadora atende este CEP no momento.");
    } catch (err) {
      setQuote(null);
      onQuote?.(null);
      onSelect?.(null);
      setError(err instanceof ShippingError ? err.message : "Não foi possível calcular a entrega neste momento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Truck className="h-4 w-4 text-primary" /> {title}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          value={cep}
          onChange={(e) => {
            setCep(formatCep(e.target.value));
            setQuote(null);
            onQuote?.(null);
            onSelect?.(null);
          }}
          placeholder="00000-000"
          inputMode="numeric"
          aria-label="CEP de entrega"
          className="flex-1 h-11 px-3 rounded bg-secondary border border-border text-sm"
        />
        <button
          type="button"
          onClick={calculate}
          disabled={loading}
          className="h-11 px-4 rounded border border-border text-sm font-semibold disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Calcular"}
        </button>
      </div>

      {loading && (
        <div className="mt-3 space-y-2" aria-live="polite">
          <p className="text-xs text-muted-foreground">Calculando as melhores opções de entrega...</p>
          {[0, 1].map((i) => (
            <div key={i} className="h-12 rounded bg-secondary animate-pulse" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-3 text-xs text-muted-foreground space-y-2">
          <p>{error}</p>
          <button
            type="button"
            onClick={calculate}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded border border-border"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Tentar novamente
          </button>
        </div>
      )}

      {!loading && quote && quote.options.length > 0 && (
        <div className="mt-3 space-y-2">
          {selectable && <p className="text-xs text-muted-foreground">Escolha como receber:</p>}
          {quote.options.map((o) =>
            selectable ? (
              <label
                key={o.id}
                className={`flex items-center justify-between gap-3 p-3 rounded border cursor-pointer text-sm ${
                  selectedServiceId === o.serviceId ? "border-primary" : "border-border"
                }`}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={selectedServiceId === o.serviceId}
                    onChange={() => onSelect?.(o)}
                    className="accent-[hsl(var(--primary))]"
                  />
                  <span>
                    <span className="block font-medium">
                      {o.carrier} {o.service}
                    </span>
                    <span className="block text-[11px] text-muted-foreground">
                      {o.daysMin === o.daysMax ? `${o.daysMax}` : `${o.daysMin} a ${o.daysMax}`} dias úteis após a produção
                    </span>
                  </span>
                </span>
                <span className="font-semibold">{brl(o.price)}</span>
              </label>
            ) : (
              <div key={o.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">
                  {o.carrier} {o.service} ·{" "}
                  {o.daysMin === o.daysMax ? `${o.daysMax}` : `${o.daysMin}–${o.daysMax}`} dias úteis
                </span>
                <span className="font-semibold">{brl(o.price)}</span>
              </div>
            ),
          )}

          <div className="text-[11px] text-muted-foreground pt-1 space-y-0.5">
            <div>Produção: até {quote.production_days} dia(s) úteis.</div>
            <div>
              Previsão total: aproximadamente {quote.production_days + quote.options[0].daysMax} dia(s) úteis.
            </div>
            {quote.requires_artwork && <div>O prazo de produção começa após a aprovação da personalização.</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
