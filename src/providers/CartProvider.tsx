"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItem, Product, Coupon } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  coupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  discount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "bbc-cart";
const COUPON_KEY = "bbc-coupon";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

function loadCouponFromStorage(): Coupon | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(COUPON_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return null;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCartFromStorage());
    setCoupon(loadCouponFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event("cart-updated"));
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (hydrated) {
      if (coupon) {
        localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    }
  }, [coupon, hydrated]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const getItemCount = useCallback(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const getSubtotal = useCallback(() => {
    return items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [items]);

  const discount = useMemo(() => {
    if (!coupon) return 0;
    const subtotal = getSubtotal();
    if (coupon.minValue && subtotal < coupon.minValue) return 0;
    if (coupon.discountType === "PERCENTAGE") {
      return subtotal * (coupon.discount / 100);
    }
    return coupon.discount;
  }, [coupon, getSubtotal]);

  const getTotal = useCallback(() => {
    return Math.max(0, getSubtotal() - discount);
  }, [getSubtotal, discount]);

  const applyCoupon = useCallback((newCoupon: Coupon) => {
    setCoupon(newCoupon);
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
  }, []);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemCount,
      getSubtotal,
      getTotal,
      coupon,
      applyCoupon,
      removeCoupon,
      discount,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemCount,
      getSubtotal,
      getTotal,
      coupon,
      applyCoupon,
      removeCoupon,
      discount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
