import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import { CartProvider } from "@/components/CartProvider";
import { getMessages } from "@/lib/i18n";

jest.mock("next/navigation", () => ({
  usePathname: () => "/fa",
  useRouter: () => ({ push: jest.fn() }),
}));

function renderHeader(locale: "fa" | "en" = "fa") {
  return render(
    <CartProvider>
      <Header locale={locale} dict={getMessages(locale)} />
    </CartProvider>
  );
}

describe("Header", () => {
  // Regression test: at md (768px, tablet portrait) the full desktop row
  // (4 nav links + theme toggle + cart + language switcher + reserve
  // button) didn't have room to fit without wrapping and uneven gaps. The
  // breakpoint was bumped from md to lg so tablets get the off-canvas nav
  // instead.
  it("shows the full desktop nav row only from the lg breakpoint up, not md", () => {
    renderHeader();
    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(primaryNav.className).toMatch(/\blg:flex\b/);
    expect(primaryNav.className).not.toMatch(/\bmd:flex\b/);
  });

  it("falls back to the off-canvas trigger below lg, not just below md", () => {
    renderHeader();
    const trigger = screen.getByLabelText("Open menu");
    // Walk up to the wrapper div that controls visibility for the mobile group.
    const mobileGroup = trigger.closest("div.flex.items-center.gap-3");
    expect(mobileGroup?.className).toMatch(/\blg:hidden\b/);
    expect(mobileGroup?.className).not.toMatch(/\bmd:hidden\b/);
  });

  it("still renders all four primary links and the reserve link", () => {
    const dict = getMessages("en");
    renderHeader("en");
    for (const label of [dict.nav.home, dict.nav.menu, dict.nav.about, dict.nav.contact]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.getAllByText(dict.nav.reserve).length).toBeGreaterThan(0);
  });
});
