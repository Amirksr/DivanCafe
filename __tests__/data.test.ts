import { categoryCounts, categoryOrder, menuItems, ambianceFeatures, spacePhotos, galleryPhotos } from "@/lib/data";

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

describe("spacePhotos", () => {
  it("has an entry for every ambiance feature", () => {
    for (const key of ambianceFeatures) {
      expect(spacePhotos[key]).toBeDefined();
    }
  });

  it("gives every space at least one photo", () => {
    for (const key of ambianceFeatures) {
      expect(spacePhotos[key].length).toBeGreaterThan(0);
    }
  });

  it("every photo entry has a usable source (unsplashId or localPhoto)", () => {
    for (const key of ambianceFeatures) {
      for (const photo of spacePhotos[key]) {
        expect(photo.unsplashId ?? photo.localPhoto).toBeTruthy();
      }
    }
  });

  it("has the expected photo count per space", () => {
    expect(spacePhotos.interior).toHaveLength(7);
    expect(spacePhotos.courtyard).toHaveLength(6);
    expect(spacePhotos.roastery).toHaveLength(4);
    expect(spacePhotos.library).toHaveLength(4);
  });

  it("has no duplicate photo paths within a space", () => {
    for (const key of ambianceFeatures) {
      const paths = spacePhotos[key].map((p) => p.localPhoto ?? p.unsplashId);
      expect(new Set(paths).size).toBe(paths.length);
    }
  });
});

describe("galleryPhotos", () => {
  it("every photo has a usable source (unsplashId or localPhoto)", () => {
    for (const photo of galleryPhotos) {
      expect(photo.unsplashId ?? photo.localPhoto).toBeTruthy();
    }
  });

  it("has exactly 6 photos", () => {
    expect(galleryPhotos).toHaveLength(6);
  });

  it("has no duplicate ids", () => {
    const ids = galleryPhotos.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
