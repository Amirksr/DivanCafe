import { render, screen } from "@testing-library/react";
import MenuTicket from "@/components/MenuTicket";
import { getMessages } from "@/lib/i18n";
import { menuItems } from "@/lib/data";

const sampleItem = menuItems.find((item) => item.id === "espresso")!;
const itemWithUnsplashPhoto = menuItems.find((item) => item.id === "baklava")!;
const itemWithLocalPhoto = menuItems.find((item) => item.id === "mirza")!;

describe("MenuTicket", () => {
  it("renders the English name, description, and formatted price", () => {
    render(<MenuTicket item={sampleItem} index={1} locale="en" dict={getMessages("en")} />);
    expect(screen.getByText("Espresso")).toBeInTheDocument();
    expect(screen.getByText(/Single-origin Ethiopian Doluch/)).toBeInTheDocument();
    expect(screen.getByTestId("price")).toHaveTextContent("65,000");
  });

  it("renders the Persian name and Persian-digit price", () => {
    render(<MenuTicket item={sampleItem} index={1} locale="fa" dict={getMessages("fa")} />);
    expect(screen.getByText("اسپرسو")).toBeInTheDocument();
    const price = screen.getByTestId("price");
    expect(price.textContent).toMatch(/[۰-۹]/);
  });

  it("shows the signature tag for popular items", () => {
    render(<MenuTicket item={sampleItem} index={1} locale="en" dict={getMessages("en")} />);
    expect(screen.getByText("Divan signature")).toBeInTheDocument();
  });

  it("does not render tags for an item with no flags", () => {
    const plainItem = { ...sampleItem, popular: false, isNew: false, vegetarian: false };
    render(<MenuTicket item={plainItem} index={1} locale="en" dict={getMessages("en")} />);
    expect(screen.queryByText("Divan signature")).not.toBeInTheDocument();
    expect(screen.queryByText("New")).not.toBeInTheDocument();
    expect(screen.queryByText("Vegetarian")).not.toBeInTheDocument();
  });

  it("zero-pads the ledger index", () => {
    render(<MenuTicket item={sampleItem} index={4} locale="en" dict={getMessages("en")} />);
    expect(screen.getByText("04")).toBeInTheDocument();
  });

  it("falls back to the category icon when the item has no photo", () => {
    const photolessItem = { ...sampleItem, unsplashId: undefined, localPhoto: undefined };
    const { container } = render(
      <MenuTicket item={photolessItem} index={1} locale="en" dict={getMessages("en")} />
    );
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders a real photo thumbnail when the item has a confirmed unsplashId", () => {
    expect(itemWithUnsplashPhoto.unsplashId).toBeDefined();
    const { container } = render(
      <MenuTicket item={itemWithUnsplashPhoto} index={1} locale="en" dict={getMessages("en")} />
    );
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute("src")).toContain(itemWithUnsplashPhoto.unsplashId);
  });

  it("renders a real photo thumbnail when the item has a local photo", () => {
    expect(itemWithLocalPhoto.localPhoto).toBeDefined();
    const { container } = render(
      <MenuTicket item={itemWithLocalPhoto} index={1} locale="en" dict={getMessages("en")} />
    );
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute("src")).toContain("mirza.webp");
  });
});
