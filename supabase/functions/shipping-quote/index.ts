import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { buildPackage, isValidCep, normalizeCep, type PackItemInput } from "../_shared/shipping/packing.ts";
import { calculateShipping, MelhorEnvioError } from "../_shared/shipping/melhor-envio.ts";
import { itemsHash, loadItems, loadSettings } from "../_shared/shipping/quote-core.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const cep = normalizeCep(String(body?.destination_postal_code ?? ""));
    const rawItems = Array.isArray(body?.items) ? body.items : [];

    if (!isValidCep(cep)) return json({ error: "invalid_cep", message: "Informe um CEP válido." }, 400);
    if (rawItems.length === 0) return json({ error: "empty_cart", message: "Nenhum item para cotar." }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const settings = await loadSettings(supabase);
    const loaded = await loadItems(supabase, rawItems);
    if ("error" in loaded) return json(loaded.error, 400);
    const { items, products, lines } = loaded;

    const hash = itemsHash(items);
    const nowIso = new Date().toISOString();

    // Cache curto: mesma origem + destino + mesma composição.
    const { data: cached } = await supabase
      .from("shipping_quotes")
      .select("id,options,expires_at,packages")
      .eq("items_hash", hash)
      .eq("destination_postal_code", cep)
      .eq("origin_postal_code", settings.origin_postal_code)
      .gt("expires_at", nowIso)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const productionDays = products.reduce((m, p) => Math.max(m, Number(p.production_days || 0)), 0);
    const requiresArtwork = products.some((p) => p.customizable);

    // Entrega grátis local: qualquer CEP 75xxx (Anápolis/GO e região) recebe a opção gratuita
    // em primeiro lugar (pré-selecionada no checkout).
    const withLocalFree = (opts: Record<string, unknown>[]) => {
      if (!settings.free_shipping_local || !cep.startsWith("75")) return opts;
      if (opts.some((o) => o.serviceId === "local-free")) return opts;
      return [
        {
          id: "local-free",
          provider: "melhor_envio",
          carrier: "Mercury",
          service: "Entrega grátis — Anápolis/GO e região",
          serviceId: "local-free",
          price: 0,
          daysMin: 1,
          daysMax: 2,
        },
        ...opts,
      ];
    };

    if (cached && Array.isArray(cached.options) && cached.options.length > 0) {
      return json({
        quote_id: cached.id,
        options: withLocalFree(cached.options),
        expires_at: cached.expires_at,
        production_days: productionDays + Number(settings.handling_days || 0),
        requires_artwork: requiresArtwork,
        origin: {
          postal_code: settings.origin_postal_code,
          city: settings.origin_city,
          state: settings.origin_state,
        },
      });
    }

    // Peso e medidas podem ser específicos da variação escolhida.
    const packItems: PackItemInput[] = lines.map((l) => ({
      weight_g: Number(l.weight_g),
      width_cm: Number(l.width_cm),
      height_cm: Number(l.height_cm),
      length_cm: Number(l.length_cm),
      max_per_package: l.product.max_per_package,
      quantity: l.quantity,
      unit_price: Number(l.basePrice),
    }));

    const pack = buildPackage(packItems);

    let options;
    try {
      options = await calculateShipping({
        fromPostalCode: settings.origin_postal_code,
        toPostalCode: cep,
        pack,
      });
    } catch (err) {
      const code = err instanceof MelhorEnvioError ? err.message : "shipping_provider_error";
      console.error("shipping-quote provider failure", code);
      return json(
        {
          error: code === "missing_token" ? "not_configured" : "provider_unavailable",
          message: "Não foi possível calcular a entrega neste momento. Tente novamente em alguns instantes.",
        },
        503,
      );
    }

    const disabled = new Set((settings.disabled_services as string[] | null) ?? []);
    const markup = Number(settings.shipping_markup_percent || 0);
    const finalOptions = options
      .filter((o) => !disabled.has(o.serviceId))
      .map((o) => ({ ...o, price: Number((o.price * (1 + markup / 100)).toFixed(2)) }));

    const withLocalFreeFinal = withLocalFree(finalOptions as Record<string, unknown>[]);
    const storedOptions = withLocalFreeFinal;

    if (withLocalFreeFinal.length === 0) {
      return json(
        { error: "no_services", message: "Nenhuma transportadora atende este CEP no momento." },
        200,
      );
    }

    const ttl = Number(settings.quote_ttl_minutes || 30);
    const expiresAt = new Date(Date.now() + ttl * 60_000).toISOString();

    const { data: quote, error } = await supabase
      .from("shipping_quotes")
      .insert({
        origin_postal_code: settings.origin_postal_code,
        destination_postal_code: cep,
        packages: pack,
        options: storedOptions,
        items,
        items_hash: hash,
        provider: "melhor_envio",
        expires_at: expiresAt,
      })
      .select("id")
      .single();

    if (error) throw error;

    return json({
      quote_id: quote.id,
      options: storedOptions,
      expires_at: expiresAt,
      production_days: productionDays + Number(settings.handling_days || 0),
      requires_artwork: requiresArtwork,
      origin: {
        postal_code: settings.origin_postal_code,
        city: settings.origin_city,
        state: settings.origin_state,
      },
    });
  } catch (err) {
    console.error("shipping-quote error", err instanceof Error ? err.message : String(err));
    return json(
      { error: "unexpected", message: "Não foi possível calcular a entrega neste momento. Tente novamente." },
      500,
    );
  }
});
