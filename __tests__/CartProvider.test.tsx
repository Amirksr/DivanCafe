import { act, renderHook, waitFor } from "@testing-library/react";
import { CartProvider, useCart } from "@/components/CartProvider";
import { menuItems } from "@/lib/data";

const espresso = menuItems.find((i) => i.id === "espresso")!;
const baklava = menuItems.find((i) => i.id === "baklava")!;

function wrapper({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("useCart", () => {
  it("throws when used outside a CartProvider", () => {
    // Suppress the expected React error-boundary console noise for this one case.
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow("useCart must be used within a CartProvider");
    spy.mockRestore();
  });

  it("starts empty", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.lines).toEqual([]));
    expect(result.current.totalCount).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("adds an item and reflects it in lines/totals", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.lines).toEqual([]));

    act(() => result.current.addItem(espresso.id, 2));

    expect(result.current.totalCount).toBe(2);
    expect(result.current.totalPrice).toBe(espresso.price * 2);
    expect(result.current.lines).toHaveLength(1);
    expect(result.current.lines[0]?.item.id).toBe(espresso.id);
  });

  it("updates quantity and removes an item", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.lines).toEqual([]));

    act(() => result.current.addItem(baklava.id, 1));
    act(() => result.current.setQuantity(baklava.id, 4));
    expect(result.current.totalCount).toBe(4);

    act(() => result.current.removeItem(baklava.id));
    expect(result.current.lines).toEqual([]);
  });

  it("persists the cart to localStorage and rehydrates it on next mount", async () => {
    const { result, unmount } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.lines).toEqual([]));
    act(() => result.current.addItem(espresso.id, 3));
    await waitFor(() => expect(window.localStorage.getItem("divan-cart")).toContain(espresso.id));
    unmount();

    const { result: result2 } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result2.current.totalCount).toBe(3));
  });

  it("manages quick-view open/close state", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.quickViewItemId).toBeNull();

    act(() => result.current.openQuickView(espresso.id));
    expect(result.current.quickViewItemId).toBe(espresso.id);

    act(() => result.current.closeQuickView());
    expect(result.current.quickViewItemId).toBeNull();
  });
});
