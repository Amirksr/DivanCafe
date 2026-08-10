import {
  applyTheme,
  getPreferredTheme,
  getStoredTheme,
  resolveInitialTheme,
  themeInitScript,
} from "@/lib/theme";

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
});

describe("getStoredTheme", () => {
  it("returns null when nothing is stored", () => {
    expect(getStoredTheme()).toBeNull();
  });

  it("returns the stored value when it is a valid theme", () => {
    window.localStorage.setItem("theme", "light");
    expect(getStoredTheme()).toBe("light");
    window.localStorage.setItem("theme", "dark");
    expect(getStoredTheme()).toBe("dark");
  });

  it("returns null for a garbage stored value", () => {
    window.localStorage.setItem("theme", "banana");
    expect(getStoredTheme()).toBeNull();
  });

  it("returns null instead of throwing when localStorage access fails", () => {
    const spy = jest.spyOn(window.localStorage.__proto__, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(getStoredTheme()).toBeNull();
    spy.mockRestore();
  });
});

describe("getPreferredTheme", () => {
  it("returns light when the OS prefers light", () => {
    mockMatchMedia(true);
    expect(getPreferredTheme()).toBe("light");
  });

  it("returns dark when the OS prefers dark", () => {
    mockMatchMedia(false);
    expect(getPreferredTheme()).toBe("dark");
  });
});

describe("resolveInitialTheme", () => {
  it("prefers the stored choice over the system preference", () => {
    mockMatchMedia(true); // system says light
    window.localStorage.setItem("theme", "dark"); // user explicitly chose dark
    expect(resolveInitialTheme()).toBe("dark");
  });

  it("falls back to the system preference when nothing is stored", () => {
    mockMatchMedia(true);
    expect(resolveInitialTheme()).toBe("light");
  });
});

describe("applyTheme", () => {
  it("adds the light class and persists 'light'", () => {
    applyTheme("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(window.localStorage.getItem("theme")).toBe("light");
  });

  it("removes the light class and persists 'dark'", () => {
    document.documentElement.classList.add("light");
    applyTheme("dark");
    expect(document.documentElement.classList.contains("light")).toBe(false);
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });
});

describe("themeInitScript", () => {
  it("is a non-empty, self-contained script string", () => {
    expect(typeof themeInitScript).toBe("string");
    expect(themeInitScript).toContain("localStorage");
    expect(themeInitScript).toContain("classList");
  });

  it("adds the light class when evaluated with a stored 'light' preference", () => {
    window.localStorage.setItem("theme", "light");
    // eslint-disable-next-line no-new-func
    new Function(themeInitScript)();
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("does not add the light class when evaluated with a stored 'dark' preference", () => {
    window.localStorage.setItem("theme", "dark");
    // eslint-disable-next-line no-new-func
    new Function(themeInitScript)();
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  it("falls back to system preference when nothing is stored", () => {
    mockMatchMedia(true);
    // eslint-disable-next-line no-new-func
    new Function(themeInitScript)();
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });
});
