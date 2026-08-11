import { act, render, screen, waitFor } from "@testing-library/react";
import { CartProvider, useCart } from "@/components/CartProvider";
import CartView from "@/components/CartView";
import { getMessages } from "@/lib/i18n";
import { menuItems } from "@/lib/data";

const espresso = menuItems.find((i) => i.id === "espresso")!;
const baklava = menuItems.find((i) => i.id === "baklava")!;

function Seed({ children }: { children?: React.ReactNode }) {
  const { addItem } = useCart();
  return (
    <>
      <button type="button" onClick={() => addItem(espresso.id, 2)}>
        seed-espresso
      </button>
      <button type="button" onClick={() => addItem(baklava.id, 1)}>
        seed-baklava
      </button>
      {children}
    </>
  );
}

function renderCart() {
  return render(
    <CartProvider>
      <Seed>
        <CartView locale="en" dict={getMessages("en")} />
      </Seed>
    </CartProvider>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("CartView", () => {
  it("shows the empty state with a link to the menu when there are no items", async () => {
    renderCart();
    await waitFor(() => expect(screen.getByText("Your cart is empty.")).toBeInTheDocument());
    expect(screen.getByText("Browse the menu")).toHaveAttribute("href", "/en/menu");
  });

  it("renders a line per cart item with name and line total", () => {
    renderCart();
    act(() => screen.getByText("seed-espresso").click());
    expect(screen.getByText("Espresso")).toBeInTheDocument();
    // line total for 2x espresso (65,000 each) = 130,000
    expect(screen.getByTestId("line-total")).toHaveTextContent("130,000");
  });

  it("increments quantity and updates the line total", () => {
    renderCart();
    act(() => screen.getByText("seed-espresso").click());
    const plusButtons = screen.getAllByLabelText("+");
    act(() => plusButtons[0]?.click());
    // now 3x espresso = 195,000
    expect(screen.getByTestId("line-total")).toHaveTextContent("195,000");
  });

  it("removes a line item and falls back to the empty state when it was the only one", () => {
    renderCart();
    act(() => screen.getByText("seed-espresso").click());
    expect(screen.getByText("Espresso")).toBeInTheDocument();

    act(() => screen.getByLabelText("Remove").click());
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("shows the grand total across multiple items", () => {
    renderCart();
    act(() => screen.getByText("seed-espresso").click());
    act(() => screen.getByText("seed-baklava").click());
    const expectedTotal = espresso.price * 2 + baklava.price;
    expect(screen.getByTestId("cart-total")).toHaveTextContent(expectedTotal.toLocaleString("en-US"));
  });

  it("renders the checkout button as disabled with an explanatory note", () => {
    renderCart();
    act(() => screen.getByText("seed-espresso").click());
    const checkoutButton = screen.getByRole("button", { name: "Place Order" });
    expect(checkoutButton).toBeDisabled();
    expect(screen.getByText(/This is a demo/)).toBeInTheDocument();
  });
});
