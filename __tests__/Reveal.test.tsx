import { render, screen } from "@testing-library/react";
import Reveal from "@/components/Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(
      <Reveal>
        <p>hello</p>
      </Reveal>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("falls back to immediately visible when IntersectionObserver is unavailable", () => {
    // jsdom does not implement IntersectionObserver by default, exercising the fallback path.
    const { container } = render(
      <Reveal>
        <span>content</span>
      </Reveal>
    );
    expect(container.firstChild).toHaveClass("opacity-100");
  });
});
