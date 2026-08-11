import { act, render, screen, waitFor } from "@testing-library/react";
import { CartProvider, useCart } from "@/components/CartProvider";
import CartButton from "@/components/CartButton";
import { menuItems } from "@/lib/data";

const espresso = menuItems.find((i) => i.id === "espresso")!;

function AddTrigger() {
  const { addItem } = useCart();
  return (
    <button type="button" onClick={() => addItem(espresso.id, 3)}>
      add
    </button>
  );
}

function renderButton() {
  return render(
    <CartProvider>
      <AddTrigger />
      <CartButton locale="en" label="Cart" />
    </CartProvider>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("CartButton", () => {
  it("shows no badge when the cart is empty", async () => {
    renderButton();
    await waitFor(() => expect(screen.getByRole("link")).toBeInTheDocument());
    expect(screen.queryByTestId("cart-badge")).not.toBeInTheDocument();
  });

  it("shows the item count once items are added", async () => {
    renderButton();
    act(() => {
      screen.getByText("add").click();
    });
    await waitFor(() => expect(screen.getByTestId("cart-badge")).toHaveTextContent("3"));
  });

  it("links to the locale-prefixed cart page", () => {
    renderButton();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/en/cart");
  });
});
