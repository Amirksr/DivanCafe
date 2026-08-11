"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import {
  cartReducer,
  computeTotals,
  getCartLineDetails,
  initialCartState,
  type CartLineDetails,
  type CartState,
} from "@/lib/cart";

const STORAGE_KEY = "divan-cart";

interface CartContextValue {
  lines: CartLineDetails[];
  totalCount: number;
  totalPrice: number;
  addItem: (itemId: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  quickViewItemId: string | null;
  openQuickView: (itemId: string) => void;
  closeQuickView: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartState {
  if (typeof window === "undefined") return initialCartState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialCartState;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return initialCartState;
    return parsed.filter(
      (line): line is { itemId: string; quantity: number } =>
        line && typeof line.itemId === "string" && typeof line.quantity === "number" && line.quantity > 0
    );
  } catch {
    return initialCartState;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [quickViewItemId, setQuickViewItemId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Cart starts empty on the server; hydrate from localStorage after mount
  // so server and first client render match (no hydration warning).
  useEffect(() => {
    dispatch({ type: "HYDRATE", state: readStoredCart() });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage failures (private browsing, quota, etc.) — cart still works for the session.
    }
  }, [state, hydrated]);

  const addItem = useCallback((itemId: string, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", itemId, quantity });
  }, []);
  const removeItem = useCallback((itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", itemId });
  }, []);
  const setQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: "SET_QUANTITY", itemId, quantity });
  }, []);
  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);
  const openQuickView = useCallback((itemId: string) => setQuickViewItemId(itemId), []);
  const closeQuickView = useCallback(() => setQuickViewItemId(null), []);

  const lines = useMemo(() => getCartLineDetails(state), [state]);
  const { totalCount, totalPrice } = useMemo(() => computeTotals(state), [state]);

  const value: CartContextValue = {
    lines,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    quickViewItemId,
    openQuickView,
    closeQuickView,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
