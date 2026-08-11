import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import MenuTicket from "@/components/MenuTicket";
import { CartProvider } from "@/components/CartProvider";
import { getMessages } from "@/lib/i18n";
import { menuItems } from "@/lib/data";

const sampleItem = menuItems.find((item) => item.id === "espresso")!;
const itemWithUnsplashPhoto = menuItems.find((item) => item.id === "baklava")!;
const itemWithLocalPhoto = menuItems.find((item) => item.id === "mirza")!;

function renderTicket(el: ReactElement) {
  return render(<CartProvider>{el}</CartProvider>);
}

describe("MenuTicket", () => {
  it("renders the English name, description, and formatted price", () => {
    renderTicket(<MenuTicket item={sampleItem} index={1} locale="en" dict={getMessages("en")} />);
    expect(screen.getByText("Espresso")).toBeInTheDocument();
    expect(screen.getByText(/Single-origin Ethiopian Doluch/)).toBeInTheDocument();
    expect(screen.getByTestId("price")).toHaveTextContent("65,000");
  });

  it("renders the Persian name and Persian-digit price", () => {
    renderTicket(<MenuTicket item={sampleItem} index={1} locale="fa" dict={getMessages("fa")} />);
    expect(screen.getByText("اسپرسو")).toBeInTheDocument();
    const price = screen.getByTestId("price");
    expect(price.textContent).toMatch(/[۰-۹]/);
  });

  it("shows the signature tag for popular items", () => {
    renderTicket(<MenuTicket item={sampleItem} index={1} locale="en" dict={getMessages("en")} />);
    expect(screen.getByText("Divan signature")).toBeInTheDocument();
  });

  it("does not render tags for an item with no flags", () => {
    const plainItem = { ...sampleItem, popular: false, isNew: false, vegetarian: false };
    renderTicket(<MenuTicket item={plainItem} index={1} locale="en" dict={getMessages("en")} />);
    expect(screen.queryByText("Divan signature")).not.toBeInTheDocument();
    expect(screen.queryByText("New")).not.toBeInTheDocument();
    expect(screen.queryByText("Vegetarian")).not.toBeInTheDocument();
  });

  it("zero-pads the ledger index", () => {
    renderTicket(<MenuTicket item={sampleItem} index={4} locale="en" dict={getMessages("en")} />);
    expect(screen.getByText("04")).toBeInTheDocument();
  });

  it("falls back to the category icon when the item has no photo", () => {
    const photolessItem = { ...sampleItem, unsplashId: undefined, localPhoto: undefined };
    const { container } = renderTicket(
      <MenuTicket item={photolessItem} index={1} locale="en" dict={getMessages("en")} />
    );
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders a real photo thumbnail when the item has a confirmed unsplashId", () => {
    expect(itemWithUnsplashPhoto.unsplashId).toBeDefined();
    const { container } = renderTicket(
      <MenuTicket item={itemWithUnsplashPhoto} index={1} locale="en" dict={getMessages("en")} />
    );
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute("src")).toContain(itemWithUnsplashPhoto.unsplashId);
  });

  it("renders a real photo thumbnail when the item has a local photo", () => {
    expect(itemWithLocalPhoto.localPhoto).toBeDefined();
    const { container } = renderTicket(
      <MenuTicket item={itemWithLocalPhoto} index={1} locale="en" dict={getMessages("en")} />
    );
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute("src")).toContain("mirza.webp");
  });

  it("renders an order button that opens the quick-view for this item", () => {
    renderTicket(<MenuTicket item={sampleItem} index={1} locale="en" dict={getMessages("en")} />);
    expect(screen.getByRole("button", { name: getMessages("en").quick_view.order_button })).toBeInTheDocument();
  });
});
