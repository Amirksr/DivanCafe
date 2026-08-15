import fs from "fs";
import path from "path";
import { categoryCounts, categoryOrder, menuItems, ambianceFeatures, spacePhotos, galleryPhotos } from "@/lib/data";

describe("menuItems", () => {
  it("has no duplicate ids", () => {
    const ids = menuItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every item belongs to a known category", () => {
    for (const item of menuItems) {
      expect(categoryOrder).toContain(item.category);
    }
  });

  it("every item has a positive price", () => {
    for (const item of menuItems) {
      expect(item.price).toBeGreaterThan(0);
    }
  });

  it("every item has both fa and en name/desc text", () => {
    for (const item of menuItems) {
      expect(item.name.fa.length).toBeGreaterThan(0);
      expect(item.name.en.length).toBeGreaterThan(0);
      expect(item.desc.fa.length).toBeGreaterThan(0);
      expect(item.desc.en.length).toBeGreaterThan(0);
    }
  });
});

describe("main-course batch (brunch category expansion)", () => {
  const newIds = [
    "loobia-polo",
    "khoresh-havij",
    "khoresh-karafs",
    "ferni",
    "khoresh-lapeh",
    "khoresh-aloo-esfenaj",
    "omlet-sabzijat",
    "khoresh-khalal-badam",
    "kashk-bademjan",
    "komaj",
    "ash-shole-ghalamkar",
    "ash-reshteh",
    "ash-jo",
    "khoresh-gheimeh",
    "omlet-gharch",
    "khoresh-fesenjan",
    "kalam-polo-shirazi",
    "khoresh-aloo",
    "morassa-polo",
    "adas-polo",
    "sholeh-zard",
    "halim",
    "khoresh-ghormeh-sabzi",
    "joojeh-kabab",
    "kabab-koobideh",
    "zereshk-polo-morgh",
    "khoresh-bamieh",
    "meygoo-polo",
    "baghali-polo-machehe",
    "omlet-gojeh",
  ];

  it("added exactly 30 new items", () => {
    expect(newIds).toHaveLength(30);
  });

  it("every expected id is present in menuItems exactly once", () => {
    for (const id of newIds) {
      const matches = menuItems.filter((item) => item.id === id);
      expect(matches).toHaveLength(1);
    }
  });

  it("every new item is filed under the brunch (Mains) category", () => {
    for (const id of newIds) {
      const item = menuItems.find((i) => i.id === id);
      expect(item?.category).toBe("brunch");
    }
  });

  it("every new item points at a distinct local photo under /menu-photos/", () => {
    const paths = newIds.map((id) => menuItems.find((i) => i.id === id)?.localPhoto);
    for (const path of paths) {
      expect(path).toMatch(/^\/menu-photos\/[a-z0-9-]+\.webp$/);
    }
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("every new item's localPhoto file actually exists on disk", () => {
    for (const id of newIds) {
      const item = menuItems.find((i) => i.id === id);
      const relative = item?.localPhoto?.replace(/^\//, "");
      const abs = path.join(process.cwd(), "public", relative ?? "");
      expect(fs.existsSync(abs)).toBe(true);
    }
  });

  it("brunch category count grew by exactly 30 (existing 3 items preserved)", () => {
    const brunchCount = menuItems.filter((item) => item.category === "brunch").length;
    expect(brunchCount).toBe(33);
  });

  it("the pre-existing mirza item was not duplicated by the new batch", () => {
    const mirzaItems = menuItems.filter((item) => item.id === "mirza");
    expect(mirzaItems).toHaveLength(1);
    expect(mirzaItems[0]?.localPhoto).toBe("/menu-photos/mirza.webp");
  });
});

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
