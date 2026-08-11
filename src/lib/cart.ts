import { menuItems, type MenuItem } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export interface CartLine {
  itemId: string;
  quantity: number;
}

export type CartState = CartLine[];

export type CartAction =
  | { type: "ADD_ITEM"; itemId: string; quantity?: number }
  | { type: "REMOVE_ITEM"; itemId: string }
  | { type: "SET_QUANTITY"; itemId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; state: CartState };

export const initialCartState: CartState = [];

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const amount = action.quantity ?? 1;
      if (amount <= 0) return state;
      const existing = state.find((line) => line.itemId === action.itemId);
      if (existing) {
        return state.map((line) =>
          line.itemId === action.itemId ? { ...line, quantity: line.quantity + amount } : line
        );
      }
      return [...state, { itemId: action.itemId, quantity: amount }];
    }
    case "REMOVE_ITEM":
      return state.filter((line) => line.itemId !== action.itemId);
    case "SET_QUANTITY": {
      if (action.quantity <= 0) {
        return state.filter((line) => line.itemId !== action.itemId);
      }
      return state.map((line) =>
        line.itemId === action.itemId ? { ...line, quantity: action.quantity } : line
      );
    }
    case "CLEAR_CART":
      return [];
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

/** Looks up the full menu item for a cart line; undefined if the id is unknown (defensive against stale storage). */
export function getMenuItem(itemId: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === itemId);
}

export interface CartTotals {
  totalCount: number;
  totalPrice: number;
}

/** Computes totals, silently skipping any line whose item id no longer exists in the menu. */
export function computeTotals(state: CartState): CartTotals {
  let totalCount = 0;
  let totalPrice = 0;
  for (const line of state) {
    const item = getMenuItem(line.itemId);
    if (!item) continue;
    totalCount += line.quantity;
    totalPrice += item.price * line.quantity;
  }
  return { totalCount, totalPrice };
}

export interface CartLineDetails extends CartLine {
  item: MenuItem;
}

/** Cart lines joined with their menu item data, in display order; drops any line with an unknown item id. */
export function getCartLineDetails(state: CartState): CartLineDetails[] {
  return state
    .map((line) => {
      const item = getMenuItem(line.itemId);
      return item ? { ...line, item } : null;
    })
    .filter((line): line is CartLineDetails => line !== null);
}

export function localizedName(item: MenuItem, locale: Locale): string {
  return item.name[locale];
}
