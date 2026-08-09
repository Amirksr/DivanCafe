import { render, screen } from "@testing-library/react";
import MenuTicket from "@/components/MenuTicket";
import { getMessages } from "@/lib/i18n";
import { menuItems } from "@/lib/data";

const sampleItem = menuItems.find((item) => item.id === "espresso")!;

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
});
