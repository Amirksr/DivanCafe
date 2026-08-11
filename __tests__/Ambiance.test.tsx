import { render, screen } from "@testing-library/react";
import Ambiance from "@/components/Ambiance";
import { getMessages } from "@/lib/i18n";
import { ambianceFeatures } from "@/lib/data";

describe("Ambiance", () => {
  it("renders a link to each space's detail page", () => {
    render(<Ambiance locale="en" dict={getMessages("en")} />);
    for (const key of ambianceFeatures) {
      const feature = getMessages("en").ambiance.features[key];
      const link = screen.getByText(feature.title).closest("a");
      expect(link).toHaveAttribute("href", `/en/spaces/${key}`);
    }
  });

  it("localizes the space links for fa", () => {
    render(<Ambiance locale="fa" dict={getMessages("fa")} />);
    const feature = getMessages("fa").ambiance.features.interior;
    const link = screen.getByText(feature.title).closest("a");
    expect(link).toHaveAttribute("href", "/fa/spaces/interior");
  });

  it("has a section anchor that the space page's back-link targets", () => {
    const { container } = render(<Ambiance locale="en" dict={getMessages("en")} />);
    expect(container.querySelector("#ambiance")).toBeInTheDocument();
  });
});
