import { cn, formatNumber, formatPrice, ledgerNumber } from "@/lib/utils";

describe("cn", () => {
  it("joins truthy class fragments with a space", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("returns an empty string when nothing is truthy", () => {
    expect(cn(false, null, undefined)).toBe("");
  });
});

describe("formatPrice", () => {
  it("formats with Western digits and grouping for en", () => {
    expect(formatPrice(320000, "en")).toBe("320,000");
  });

  it("formats with Persian digits for fa", () => {
    // fa-IR grouping uses Eastern Arabic digits and a Persian thousands separator
    const result = formatPrice(320000, "fa");
    expect(result).toMatch(/[۰-۹]/);
    expect(result).not.toMatch(/[0-9]/);
  });

  it("rounds fractional amounts", () => {
    expect(formatPrice(99999.6, "en")).toBe("100,000");
  });

  it("throws on negative amounts", () => {
    expect(() => formatPrice(-10, "en")).toThrow(RangeError);
  });

  it("throws on non-finite amounts", () => {
    expect(() => formatPrice(Number.NaN, "en")).toThrow(RangeError);
    expect(() => formatPrice(Number.POSITIVE_INFINITY, "en")).toThrow(RangeError);
  });

  it("accepts zero", () => {
    expect(formatPrice(0, "en")).toBe("0");
  });
});

describe("formatNumber", () => {
  it("preserves one decimal place for fractional values", () => {
    expect(formatNumber(4.9, "en")).toBe("4.9");
  });

  it("does not add a decimal point to whole numbers", () => {
    expect(formatNumber(120000, "en")).toBe("120,000");
    expect(formatNumber(4, "en")).toBe("4");
  });

  it("rounds to one decimal place rather than truncating further precision", () => {
    expect(formatNumber(4.87, "en")).toBe("4.9");
  });

  it("formats fractional values with Persian digits for fa", () => {
    const result = formatNumber(4.9, "fa");
    expect(result).toMatch(/[۰-۹]/);
    expect(result).not.toMatch(/[0-9]/);
  });

  it("throws on non-finite values", () => {
    expect(() => formatNumber(Number.NaN, "en")).toThrow(RangeError);
    expect(() => formatNumber(Number.POSITIVE_INFINITY, "en")).toThrow(RangeError);
  });
});

describe("ledgerNumber", () => {
  it("zero-pads single-digit indices for en", () => {
    expect(ledgerNumber(3, "en")).toBe("03");
  });

  it("does not pad indices already two digits or more", () => {
    expect(ledgerNumber(12, "en")).toBe("12");
    expect(ledgerNumber(123, "en")).toBe("123");
  });

  it("converts padded digits to Persian numerals for fa", () => {
    expect(ledgerNumber(3, "fa")).toBe("۰۳");
    expect(ledgerNumber(12, "fa")).toBe("۱۲");
  });
});
