import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CartProvider, useCart } from "@/components/CartProvider";
import QuickViewModal from "@/components/QuickViewModal";
import { getMessages } from "@/lib/i18n";
import { menuItems } from "@/lib/data";

const espresso = menuItems.find((i) => i.id === "espresso")!;

/** Exposes a button that opens the quick view for espresso, for tests to click. */
function OpenTrigger() {
  const { openQuickView } = useCart();
  return (
    <button type="button" onClick={() => openQuickView(espresso.id)}>
      open
    </button>
  );
}

function renderModal(locale: "en" | "fa" = "en") {
  return render(
    <CartProvider>
      <OpenTrigger />
      <QuickViewModal locale={locale} dict={getMessages(locale)} />
    </CartProvider>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("QuickViewModal", () => {
  it("renders nothing when no item is open", () => {
    renderModal();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the item's name, description, and price once opened", () => {
    renderModal();
    fireEvent.click(screen.getByText("open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Espresso")).toBeInTheDocument();
    expect(screen.getByText(/Single-origin Ethiopian Doluch/)).toBeInTheDocument();
    expect(screen.getByText(/65,000/)).toBeInTheDocument();
  });

  it("defaults quantity to 1 and increments/decrements with the stepper", () => {
    renderModal();
    fireEvent.click(screen.getByText("open"));
    expect(screen.getByText("1")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("+"));
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("-"));
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("does not let quantity go below 1", () => {
    renderModal();
    fireEvent.click(screen.getByText("open"));
    fireEvent.click(screen.getByLabelText("-"));
    fireEvent.click(screen.getByLabelText("-"));
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("adds the selected quantity to the cart and shows a confirmation", () => {
    renderModal();
    fireEvent.click(screen.getByText("open"));
    fireEvent.click(screen.getByLabelText("+")); // quantity -> 2

    fireEvent.click(screen.getByText("Add to cart"));
    expect(screen.getByText(/Added to cart/)).toBeInTheDocument();
  });

  it("closes when the close button is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByText("open"));
    fireEvent.click(screen.getByLabelText("Close"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the backdrop is clicked but not when the panel itself is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByText("open"));
    fireEvent.click(screen.getByText("Espresso")); // inside the panel
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("dialog")); // the backdrop itself
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    renderModal();
    fireEvent.click(screen.getByText("open"));
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("resets quantity when reopened", () => {
    renderModal();
    fireEvent.click(screen.getByText("open"));
    fireEvent.click(screen.getByLabelText("+"));
    fireEvent.click(screen.getByLabelText("Close"));

    fireEvent.click(screen.getByText("open"));
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
