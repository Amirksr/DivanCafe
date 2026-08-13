import { render, screen } from "@testing-library/react";
import Logo from "@/components/Logo";

describe("Logo", () => {
  it("renders the wordmark text", () => {
    render(<Logo wordmark="دیوان" isFa />);
    expect(screen.getByText("دیوان")).toBeInTheDocument();
  });

  it("renders an svg mark", () => {
    const { container } = render(<Logo wordmark="Divan" isFa={false} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies the Persian display font class for fa", () => {
    render(<Logo wordmark="دیوان" isFa />);
    expect(screen.getByText("دیوان")).toHaveClass("font-display-fa");
  });

  it("applies the Latin display font class for en", () => {
    render(<Logo wordmark="Divan" isFa={false} />);
    expect(screen.getByText("Divan")).toHaveClass("font-display");
  });
});
