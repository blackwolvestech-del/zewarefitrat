"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  qty: number;
};

type CartState = { items: CartItem[] };

type Action =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string; color: string }
  | { type: "QTY"; id: string; color: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const key = (id: string, color: string) => `${id}::${color}`;

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (i) => key(i.id, i.color) === key(action.item.id, action.item.color)
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            key(i.id, i.color) === key(action.item.id, action.item.color)
              ? { ...i, qty: i.qty + action.item.qty }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (i) => key(i.id, i.color) !== key(action.id, action.color)
        ),
      };
    case "QTY":
      return {
        items: state.items.map((i) =>
          key(i.id, i.color) === key(action.id, action.color)
            ? { ...i, qty: Math.max(1, action.qty) }
            : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product, color: string, qty?: number) => void;
  remove: (id: string, color: string) => void;
  setQty: (id: string, color: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "zf-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", state: JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const count = state.items.reduce((n, i) => n + i.qty, 0);
  const subtotal = state.items.reduce((n, i) => n + i.price * i.qty, 0);

  const value: CartContextValue = {
    items: state.items,
    count,
    subtotal,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    add: (product, color, qty = 1) => {
      dispatch({
        type: "ADD",
        item: {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0],
          color,
          qty,
        },
      });
      setIsOpen(true);
    },
    remove: (id, color) => dispatch({ type: "REMOVE", id, color }),
    setQty: (id, color, qty) => dispatch({ type: "QTY", id, color, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
