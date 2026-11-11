"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  colorId: string;
  colorName: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (productId: string, colorId: string) => void;
  updateQuantity: (productId: string, colorId: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.colorId === item.colorId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.colorId === item.colorId
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        }),
      removeItem: (productId, colorId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.colorId === colorId)
          ),
        })),
      updateQuantity: (productId, colorId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter(
                  (i) =>
                    !(i.productId === productId && i.colorId === colorId)
                )
              : state.items.map((i) =>
                  i.productId === productId && i.colorId === colorId
                    ? { ...i, quantity: qty }
                    : i
                ),
        })),
      clearCart: () => set({ items: [] }),
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "dentasage-cart" }
  )
);
