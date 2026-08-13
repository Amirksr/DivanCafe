import { act, fireEvent, render, screen } from "@testing-library/react";
import MobileNav from "@/components/MobileNav";
import { CartProvider } from "@/components/CartProvider";
import { getMessages } from "@/lib/i18n";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/fa",
}));

function renderNav(locale: "fa" | "en" = "fa") {
  return render(
    <CartProvider>
      <MobileNav locale={locale} dict={getMessages(locale)} />
    </CartProvider>
  );
}

beforeEach(() => {
  mockPush.mockClear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("MobileNav", () => {
  it("panel is closed by default", () => {
    renderNav();
    const panel = document.getElementById("mobile-nav-panel");
    expect(panel).toHaveClass("translate-x-full");
  });

  it("opens the panel when the toggle button is clicked", () => {
    renderNav();
    fireEvent.click(screen.getByLabelText("Open menu"));
    const panel = document.getElementById("mobile-nav-panel");
    expect(panel).toHaveClass("translate-x-0");
  });

  it("renders every nav link with its label and an icon", () => {
    const dict = getMessages("fa");
    renderNav();
    fireEvent.click(screen.getByLabelText("Open menu"));
    for (const label of [dict.nav.home, dict.nav.menu, dict.nav.about, dict.nav.contact]) {
      const link = screen.getByText(label).closest("a");
      expect(link).toBeInTheDocument();
      expect(link?.querySelector("svg")).toBeInTheDocument();
    }
  });

  it("closes the panel when the backdrop is clicked", () => {
    renderNav();
    fireEvent.click(screen.getByLabelText("Open menu"));
    expect(document.getElementById("mobile-nav-panel")).toHaveClass("translate-x-0");

    fireEvent.click(document.querySelector('[aria-hidden="true"].fixed.inset-0')!);
    expect(document.getElementById("mobile-nav-panel")).toHaveClass("translate-x-full");
  });

  it("closes via the explicit close button inside the panel", () => {
    const dict = getMessages("fa");
    renderNav();
    fireEvent.click(screen.getByLabelText("Open menu"));
    fireEvent.click(screen.getByLabelText(dict.quick_view.close));
    expect(document.getElementById("mobile-nav-panel")).toHaveClass("translate-x-full");
  });

  it("highlights a link immediately on click, then navigates and closes after a delay", () => {
    const dict = getMessages("fa");
    renderNav();
    fireEvent.click(screen.getByLabelText("Open menu"));

    const menuLink = screen.getByText(dict.nav.menu).closest("a")!;
    fireEvent.click(menuLink);

    // Immediately: highlighted, but not yet navigated/closed.
    expect(menuLink).toHaveClass("text-copper-bright");
    expect(mockPush).not.toHaveBeenCalled();
    expect(document.getElementById("mobile-nav-panel")).toHaveClass("translate-x-0");

    // After the delay: navigated and closed.
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(mockPush).toHaveBeenCalledWith("/fa/menu");
    expect(document.getElementById("mobile-nav-panel")).toHaveClass("translate-x-full");
  });

  it("does not navigate before the delay elapses", () => {
    const dict = getMessages("fa");
    renderNav();
    fireEvent.click(screen.getByLabelText("Open menu"));
    fireEvent.click(screen.getByText(dict.nav.about).closest("a")!);

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(mockPush).not.toHaveBeenCalled();
  });
});
