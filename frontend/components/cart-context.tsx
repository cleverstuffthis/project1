"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: number;
  sku: string;
  lineId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity" | "lineId">) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "summit-ride-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        setItems(JSON.parse(stored) as CartItem[]);
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      addItem: (item) => {
        setItems((prev) => {
          const lineId = `${item.sku}-${item.size}`;
          const existing = prev.find((entry) => entry.lineId === lineId);
          if (existing) {
            return prev.map((entry) =>
              entry.lineId === lineId ? { ...entry, quantity: entry.quantity + 1 } : entry
            );
          }
          return [...prev, { ...item, lineId, quantity: 1 }];
        });
      },
      removeItem: (lineId) => {
        setItems((prev) => prev.filter((entry) => entry.lineId !== lineId));
      },
      updateQuantity: (lineId, quantity) => {
        setItems((prev) =>
          prev
            .map((entry) => (entry.lineId === lineId ? { ...entry, quantity } : entry))
            .filter((entry) => entry.quantity > 0)
        );
      },
      clear: () => {
        setItems([]);
      }
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
