import {
  cartReducer,
  computeTotals,
  getCartLineDetails,
  getMenuItem,
  initialCartState,
  localizedName,
  type CartState,
} from "@/lib/cart";
import { menuItems } from "@/lib/data";

const espresso = menuItems.find((i) => i.id === "espresso")!;
const baklava = menuItems.find((i) => i.id === "baklava")!;

describe("cartReducer", () => {
  it("starts empty", () => {
    expect(initialCartState).toEqual([]);
  });

  it("adds a new item with quantity 1 by default", () => {
    const state = cartReducer(initialCartState, { type: "ADD_ITEM", itemId: espresso.id });
    expect(state).toEqual([{ itemId: espresso.id, quantity: 1 }]);
  });

  it("adds a new item with an explicit quantity", () => {
    const state = cartReducer(initialCartState, { type: "ADD_ITEM", itemId: espresso.id, quantity: 3 });
    expect(state).toEqual([{ itemId: espresso.id, quantity: 3 }]);
  });

  it("increments quantity when adding an item already in the cart", () => {
    let state: CartState = [{ itemId: espresso.id, quantity: 2 }];
    state = cartReducer(state, { type: "ADD_ITEM", itemId: espresso.id, quantity: 1 });
    expect(state).toEqual([{ itemId: espresso.id, quantity: 3 }]);
  });

  it("ignores an ADD_ITEM with zero or negative quantity", () => {
    const state = cartReducer(initialCartState, { type: "ADD_ITEM", itemId: espresso.id, quantity: 0 });
    expect(state).toEqual([]);
  });

  it("removes an item", () => {
    const state: CartState = [
      { itemId: espresso.id, quantity: 1 },
      { itemId: baklava.id, quantity: 2 },
    ];
    const next = cartReducer(state, { type: "REMOVE_ITEM", itemId: espresso.id });
    expect(next).toEqual([{ itemId: baklava.id, quantity: 2 }]);
  });

  it("sets a new quantity for an existing item", () => {
    const state: CartState = [{ itemId: espresso.id, quantity: 1 }];
    const next = cartReducer(state, { type: "SET_QUANTITY", itemId: espresso.id, quantity: 5 });
    expect(next).toEqual([{ itemId: espresso.id, quantity: 5 }]);
  });

  it("removes the item when SET_QUANTITY drops to 0 or below", () => {
    const state: CartState = [{ itemId: espresso.id, quantity: 1 }];
    expect(cartReducer(state, { type: "SET_QUANTITY", itemId: espresso.id, quantity: 0 })).toEqual([]);
    expect(cartReducer(state, { type: "SET_QUANTITY", itemId: espresso.id, quantity: -1 })).toEqual([]);
  });

  it("clears the cart", () => {
    const state: CartState = [{ itemId: espresso.id, quantity: 1 }];
    expect(cartReducer(state, { type: "CLEAR_CART" })).toEqual([]);
  });

  it("replaces state wholesale on HYDRATE", () => {
    const hydrated: CartState = [{ itemId: baklava.id, quantity: 4 }];
    expect(cartReducer(initialCartState, { type: "HYDRATE", state: hydrated })).toEqual(hydrated);
  });
});

describe("getMenuItem", () => {
  it("finds a menu item by id", () => {
    expect(getMenuItem(espresso.id)).toBe(espresso);
  });

  it("returns undefined for an unknown id", () => {
    expect(getMenuItem("not-a-real-item")).toBeUndefined();
  });
});

describe("computeTotals", () => {
  it("sums count and price across lines", () => {
    const state: CartState = [
      { itemId: espresso.id, quantity: 2 },
      { itemId: baklava.id, quantity: 1 },
    ];
    const totals = computeTotals(state);
    expect(totals.totalCount).toBe(3);
    expect(totals.totalPrice).toBe(espresso.price * 2 + baklava.price);
  });

  it("returns zero totals for an empty cart", () => {
    expect(computeTotals([])).toEqual({ totalCount: 0, totalPrice: 0 });
  });

  it("skips a line referencing an item id that no longer exists", () => {
    const state: CartState = [{ itemId: "deleted-item", quantity: 5 }];
    expect(computeTotals(state)).toEqual({ totalCount: 0, totalPrice: 0 });
  });
});

describe("getCartLineDetails", () => {
  it("joins cart lines with their menu item data", () => {
    const state: CartState = [{ itemId: espresso.id, quantity: 2 }];
    const details = getCartLineDetails(state);
    expect(details).toEqual([{ itemId: espresso.id, quantity: 2, item: espresso }]);
  });

  it("drops lines whose item id no longer exists", () => {
    const state: CartState = [{ itemId: "deleted-item", quantity: 1 }];
    expect(getCartLineDetails(state)).toEqual([]);
  });
});

describe("localizedName", () => {
  it("returns the name in the requested locale", () => {
    expect(localizedName(espresso, "en")).toBe("Espresso");
    expect(localizedName(espresso, "fa")).toBe("اسپرسو");
  });
});
