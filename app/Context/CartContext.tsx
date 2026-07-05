import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export interface CartItem {
  id: number;
  product_id: number;
  title: string;
  price: number;
  final_price: number;
  quantity: number;
  image: string;
}

export interface CartTotals {
  items_count: number;
  total_price: number;
  total_discount: number;
  final_price: number;
}

interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  refreshCart: () => Promise<void>;
  addToCart: (product: any) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  getItemCount: (productId: number) => number;
  isInCart: (productId: number) => boolean;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const EMPTY_TOTALS: CartTotals = {
  items_count: 0,
  total_price: 0,
  total_discount: 0,
  final_price: 0,
};

function toNumber(value: any, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeCartItem(it: any): CartItem {
  const quantity = toNumber(
    it?.quantity ?? it?.count ?? it?.qty ?? it?.amount ?? 0,
    0
  );

  const productId = toNumber(
    it?.product_id ??
      it?.product?.id ??
      it?.product?.product_id ??
      it?.id ??
      0,
    0
  );

  const rowId = toNumber(it?.id ?? productId, 0);

  const title =
    it?.title ??
    it?.name ??
    it?.product?.title ??
    it?.product?.name ??
    "محصول";

  const price = toNumber(
    it?.price ??
      it?.unit_price ??
      it?.original_price ??
      it?.product?.price ??
      0,
    0
  );

  const finalPrice = toNumber(
    it?.final_price ??
      it?.discounted_price ??
      it?.unit_final_price ??
      it?.product?.final_price ??
      it?.product?.discounted_price ??
      price,
    price
  );

  const image =
    it?.image ??
    it?.img ??
    it?.photo ??
    it?.thumbnail ??
    it?.product?.image ??
    it?.product?.img ??
    it?.product?.photo ??
    it?.product?.thumbnail ??
    "/placeholder.png";

  return {
    id: rowId,
    product_id: productId,
    title,
    price,
    final_price: finalPrice,
    quantity,
    image,
  };
}

function mergeDuplicateItems(items: CartItem[]): CartItem[] {
  const map = new Map<number, CartItem>();

  for (const item of items) {
    const existing = map.get(item.product_id);

    if (existing) {
      map.set(item.product_id, {
        ...existing,
        quantity: existing.quantity + item.quantity,
      });
    } else {
      map.set(item.product_id, item);
    }
  }

  return Array.from(map.values());
}

function calculateTotals(items: CartItem[]): CartTotals {
  const items_count = items.reduce((sum, item) => sum + item.quantity, 0);

  const total_price = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const final_price = items.reduce(
    (sum, item) => sum + item.final_price * item.quantity,
    0
  );

  const total_discount = Math.max(total_price - final_price, 0);

  return {
    items_count,
    total_price,
    total_discount,
    final_price,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const totals = useMemo(() => calculateTotals(items), [items]);

  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("https://api1.renn.ir/cart", {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`cart failed: ${res.status}`);
      }

      const json = await res.json();
      const data = json?.data ?? json;

      const rawItems = Array.isArray(data?.items)
        ? data.items
        : Array.isArray(json?.items)
        ? json.items
        : [];

      const normalizedItems = rawItems
        .map(normalizeCartItem)
        .filter((item: CartItem) => item.product_id > 0 && item.quantity > 0);

      setItems(mergeDuplicateItems(normalizedItems));
    } catch (error) {
      console.error("Cart Refresh Error:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(
    async (product: any) => {
      try {
        setLoading(true);

        const productId = toNumber(product?.id ?? product?.product_id, 0);

        const res = await fetch("https://api1.renn.ir/add_to_cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            product_id: productId,
            action: "increment",
          }),
        });

        if (!res.ok) {
          throw new Error();
        }

        await refreshCart();
      } finally {
        setLoading(false);
      }
    },
    [refreshCart]
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      try {
        setLoading(true);

        const res = await fetch("https://api1.renn.ir/add_to_cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            product_id: productId,
            action: "decrement",
          }),
        });

        if (!res.ok) {
          throw new Error();
        }

        await refreshCart();
      } finally {
        setLoading(false);
      }
    },
    [refreshCart]
  );

  const getItemCount = useCallback(
    (productId: number) => {
      const item = items.find((i) => i.product_id === productId);
      return item?.quantity ?? 0;
    },
    [items]
  );

  const isInCart = useCallback(
    (productId: number) => getItemCount(productId) > 0,
    [getItemCount]
  );

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        refreshCart,
        addToCart,
        removeFromCart,
        getItemCount,
        isInCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}


