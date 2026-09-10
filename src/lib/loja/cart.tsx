import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface CartItemVariant {
  variantId: string;
  variant: string;
  optionId: string;
  option: string;
}

export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  quantity: number;
  basePrice: number;
  unitPrice: number;
  productionDays: number;
  requiresArtwork: boolean;
  weightGrams: number;
  customization: Record<string, string>;
  /** Variações escolhidas pelo cliente (vazio em produtos sem variações). */
  variants?: CartItemVariant[];
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  totalWeight: number;
  maxProductionDays: number;
  addItem: (item: Omit<CartItem, "key">) => void;
  updateQuantity: (key: string, quantity: number, unitPrice: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

const STORAGE_KEY = "mercury-loja-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

export const variantOptionIds = (item: { variants?: CartItemVariant[] }) =>
  (item.variants ?? []).map((v) => v.optionId);

const makeKey = (productId: string, customization: Record<string, string>, variants?: CartItemVariant[]) =>
  `${productId}::${JSON.stringify(customization ?? {})}::${variantOptionIds({ variants }).sort().join(",")}`;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "key">) => {
    const key = makeKey(item.productId, item.customization, item.variants);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + item.quantity, unitPrice: item.unitPrice } : i,
        );
      }
      return [...prev, { ...item, key }];
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number, unitPrice: number) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity: Math.max(1, quantity), unitPrice } : i)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const totalWeight = items.reduce((s, i) => s + i.weightGrams * i.quantity, 0);
    const maxProductionDays = items.reduce((s, i) => Math.max(s, i.productionDays), 0);
    return { items, count, subtotal, totalWeight, maxProductionDays, addItem, updateQuantity, removeItem, clear };
  }, [items, addItem, updateQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
};
