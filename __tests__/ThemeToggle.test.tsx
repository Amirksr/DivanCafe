import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ThemeToggle from "@/components/ThemeToggle";

function mockMatchMedia(prefersLight: boolean) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes("light") ? prefersLight : !prefersLight,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove("light");
  mockMatchMedia(false); // system prefers dark by default in tests
});

describe("ThemeToggle", () => {
  it("resolves to the dark-mode icon/label after mount when no theme is stored", async () => {
    render(<ThemeToggle />);
    await waitFor(() =>
      expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Switch to light mode")
    );
  });

  it("resolves to the light-mode label when 'light' was previously stored", async () => {
    window.localStorage.setItem("theme", "light");
    render(<ThemeToggle />);
    await waitFor(() =>
      expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Switch to dark mode")
    );
  });

  it("toggles the document's light class and persists the choice on click", async () => {
    render(<ThemeToggle />);
    await waitFor(() => expect(screen.getByRole("button")).toHaveAttribute("data-theme-ready", "true"));

    expect(document.documentElement.classList.contains("light")).toBe(false);

    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(window.localStorage.getItem("theme")).toBe("light");

    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.classList.contains("light")).toBe(false);
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });

  it("toggles based on the DOM's actual current theme class, not a stale internal copy", async () => {
    // Regression test for a bug where clicking right after this component
    // remounted (e.g. from a locale switch) could be a no-op: the click
    // handler computed the next theme from React state that starts out
    // `null` before the post-mount effect resolves it, and treated `null`
    // the same as "dark" -- so a click while the page was already light did
    // nothing until a second click.
    window.localStorage.setItem("theme", "light");
    render(<ThemeToggle />);
    await waitFor(() => expect(screen.getByRole("button")).toHaveAttribute("data-theme-ready", "true"));

    // Force the DOM out from under the component's own state, standing in
    // for "internal state hasn't caught up with the real page theme yet".
    document.documentElement.classList.remove("light");

    fireEvent.click(screen.getByRole("button"));

    // A single click must flip the *actual* (now-dark) DOM state to light,
    // not fall back to always landing on "light" regardless of where it started.
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });
});
