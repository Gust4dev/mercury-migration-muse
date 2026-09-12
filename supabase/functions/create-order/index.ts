import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { isValidCep, normalizeCep } from "../_shared/shipping/packing.ts";
import { itemsHash, lineKey, loadItems, loadSettings, priceItems } from "../_shared/shipping/quote-core.ts";
import { isServiceAllowed } from "../_shared/shipping/carriers.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const orderNumber = () => {
  const d = new Date();
  const stamp = `${d.getFullYear()}`.slice(2) + String(d.getMonth() + 1).padStart(2, "0");
  return `MC${stamp}${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    // Usuário opcional (compra sem conta é permitida).
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const { data } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
      userId = data.user?.id ?? null;
    }

    const customer = body?.customer ?? {};
    const address = body?.address ?? {};
    const deliveryMethod = body?.delivery_method === "local" ? "local" : "shipping";
    const name = String(customer.name ?? "").trim();
    const email = String(customer.email ?? "").trim().toLowerCase();

    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ error: "invalid_customer", message: "Informe nome e e-mail válidos." }, 400);
    }

    const loaded = await loadItems(supabase, Array.isArray(body?.items) ? body.items : []);
    if ("error" in loaded) return json(loaded.error, 400);
    const { items, products, lines } = loaded;

    const priced = await priceItems(supabase, lines);
    const subtotal = Number(priced.reduce((s, p) => s + p.lineTotal, 0).toFixed(2));
    const settings = await loadSettings(supabase);

    // ---------- Frete: fonte de verdade é o backend ----------
    let shipping = {
      provider: null as string | null,
      carrier: "Mercury" as string | null,
      service: "Entrega grátis em Anápolis/GO" as string | null,
      serviceId: null as string | null,
      price: 0,
      daysMin: null as number | null,
      daysMax: null as number | null,
      quoteData: null as unknown,
      quotedAt: null as string | null,
      originPostalCode: settings.origin_postal_code,
    };

    const destinationCep = normalizeCep(String(address.postal_code ?? ""));

    if (deliveryMethod === "shipping") {
      if (!isValidCep(destinationCep) || !String(address.street ?? "").trim()) {
        return json({ error: "invalid_address", message: "Endereço de entrega incompleto." }, 400);
      }

      const quoteId = String(body?.quote_id ?? "");
      const serviceId = String(body?.shipping_service_id ?? "");
      if (!quoteId || !serviceId) {
        return json({ error: "shipping_required", message: "Selecione uma opção de entrega." }, 400);
      }

      const { data: quote } = await supabase
        .from("shipping_quotes")
        .select("id,options,items_hash,destination_postal_code,origin_postal_code,expires_at,packages,created_at")
        .eq("id", quoteId)
        .maybeSingle();

      const valid =
        quote &&
        quote.items_hash === itemsHash(items) &&
        quote.destination_postal_code === destinationCep &&
        new Date(quote.expires_at) > new Date();

      if (!valid) {
        return json(
          { error: "quote_expired", message: "A cotação de frete expirou. Calcule a entrega novamente." },
          409,
        );
      }

      const option = (quote.options as { serviceId: string }[]).find((o) => o.serviceId === serviceId) as
        | {
            serviceId: string;
            carrier: string;
            service: string;
            price: number;
            daysMin: number;
            daysMax: number;
            provider: string;
          }
        | undefined;

      const disabledServices = new Set(((settings.disabled_services as string[] | null) ?? []).map(String));
      if (!option || !isServiceAllowed({ carrier: option.carrier, serviceId: option.serviceId }, disabledServices)) {
        return json({ error: "invalid_service", message: "Opção de entrega indisponível." }, 400);
      }

      shipping = {
        provider: option.provider ?? "melhor_envio",
        carrier: option.carrier,
        service: option.service,
        serviceId: option.serviceId,
        price: Number(option.price),
        daysMin: option.daysMin,
        daysMax: option.daysMax,
        quoteData: { quote_id: quote.id, option, package: quote.packages },
        quotedAt: quote.created_at,
        originPostalCode: quote.origin_postal_code,
      };
    }

    // ---------- Cupom validado no backend ----------
    let discount = 0;
    let couponCode: string | null = null;
    const rawCoupon = String(body?.coupon_code ?? "").trim().toUpperCase();
    if (rawCoupon) {
      const { data: c } = await supabase
        .from("coupons")
        .select("code,discount_type,discount_value,free_shipping,min_order_total,valid_from,valid_until,max_uses,used_count,active")
        .eq("code", rawCoupon)
        .eq("active", true)
        .maybeSingle();
      const now = new Date();
      const ok =
        c &&
        subtotal >= Number(c.min_order_total || 0) &&
        (!c.valid_from || new Date(c.valid_from) <= now) &&
        (!c.valid_until || new Date(c.valid_until) >= now) &&
        (c.max_uses == null || c.used_count < c.max_uses);
      if (ok) {
        couponCode = c!.code;
        discount = Math.min(
          c!.discount_type === "percent" ? (subtotal * Number(c!.discount_value)) / 100 : Number(c!.discount_value),
          subtotal,
        );
        if (c!.free_shipping) shipping.price = 0;
      }
    }

    if (
      settings.free_shipping_min_total != null &&
      subtotal >= Number(settings.free_shipping_min_total) &&
      deliveryMethod === "shipping"
    ) {
      shipping.price = 0;
    }

    discount = Number(discount.toFixed(2));
    const total = Number((Math.max(0, subtotal - discount) + shipping.price).toFixed(2));
    const productionDays =
      products.reduce((m, p) => Math.max(m, Number(p.production_days || 0)), 0) + Number(settings.handling_days || 0);

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber(),
        user_id: userId,
        customer_name: name,
        customer_email: email,
        customer_phone: String(customer.phone ?? "").slice(0, 20),
        customer_document: String(customer.document ?? "").slice(0, 20),
        delivery_method: deliveryMethod,
        pickup_location_id: null,
        shipping_postal_code: destinationCep || null,
        shipping_street: String(address.street ?? "") || null,
        shipping_number: String(address.number ?? "") || null,
        shipping_complement: String(address.complement ?? "") || null,
        shipping_district: String(address.district ?? "") || null,
        shipping_city: deliveryMethod === "local" ? "Anápolis" : String(address.city ?? "") || null,
        shipping_state: deliveryMethod === "local" ? "GO" : String(address.state ?? "") || null,
        shipping_provider: shipping.provider,
        shipping_carrier: shipping.carrier,
        shipping_service: shipping.service,
        shipping_service_id: shipping.serviceId,
        shipping_cost: shipping.price,
        shipping_days_min: shipping.daysMin,
        shipping_days_max: shipping.daysMax,
        shipping_origin_postal_code: shipping.originPostalCode,
        shipping_quote_data: shipping.quoteData,
        shipping_quoted_at: shipping.quotedAt,
        production_days: productionDays,
        subtotal,
        discount_total: discount,
        coupon_code: couponCode,
        total,
        payment_method: ["pix", "card", "boleto"].includes(String(body?.payment_method)) ? body.payment_method : "pix",
        payment_status: "pending",
        status: "awaiting_payment",
        requires_artwork: products.some((p) => p.customizable),
        notes: String(body?.notes ?? "").slice(0, 500),
      })
      .select("id,order_number")
      .single();

    if (error) throw error;

    const customizations: Record<string, Record<string, string>> = {};
    for (const r of (Array.isArray(body?.items) ? body.items : []) as {
      product_id: string;
      variant_option_ids?: string[];
      customization?: Record<string, string>;
    }[]) {
      if (r.customization) customizations[lineKey(String(r.product_id), r.variant_option_ids ?? [])] = r.customization;
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      priced.map((p) => ({
        order_id: order.id,
        product_id: p.product.id,
        product_name: p.product.name,
        product_slug: p.product.slug,
        quantity: p.quantity,
        unit_price: p.unitPrice,
        base_price: Number(p.product.price),
        line_total: p.lineTotal,
        production_days: Number(p.product.production_days || 0),
        customization: customizations[p.line.key] ?? {},
        variants: p.line.variants,
        requires_artwork: p.product.customizable,
      })),
    );
    if (itemsError) throw itemsError;

    if (shipping.quoteData) {
      await supabase.from("shipping_quotes").update({ order_id: order.id }).eq("id", (shipping.quoteData as { quote_id: string }).quote_id);
    }

    return json({
      order_number: order.order_number,
      subtotal,
      discount,
      shipping_cost: shipping.price,
      total,
    });
  } catch (err) {
    console.error("create-order error", err instanceof Error ? err.message : String(err));
    return json({ error: "unexpected", message: "Não foi possível finalizar o pedido. Tente novamente." }, 500);
  }
});
