import { categoryCounts, categoryOrder, menuItems } from "@/lib/data";

describe("categoryCounts", () => {
  it("has an entry for every category in categoryOrder", () => {
    for (const key of categoryOrder) {
      expect(categoryCounts[key]).toBeDefined();
    }
  });

  it("matches the actual number of menu items in each category", () => {
    for (const key of categoryOrder) {
      const actual = menuItems.filter((item) => item.category === key).length;
      expect(categoryCounts[key]).toBe(actual);
    }
  });

  it("sums to the total number of menu items", () => {
    const total = categoryOrder.reduce((sum, key) => sum + categoryCounts[key], 0);
    expect(total).toBe(menuItems.length);
  });

  it("has no empty categories", () => {
    for (const key of categoryOrder) {
      expect(categoryCounts[key]).toBeGreaterThan(0);
    }
  });
});
