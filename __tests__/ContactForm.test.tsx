import { emptyContactForm, validateContactForm } from "@/components/ContactForm";

describe("validateContactForm", () => {
  it("flags an entirely empty form", () => {
    const errors = validateContactForm(emptyContactForm);
    expect(errors.name).toBe("required");
    expect(errors.email).toBe("invalid");
    expect(errors.message).toBe("required");
  });

  it("accepts a fully valid submission", () => {
    const errors = validateContactForm({
      ...emptyContactForm,
      name: "Amir",
      email: "amir@example.com",
      message: "Table for two on Friday please.",
    });
    expect(errors).toEqual({});
  });

  it("rejects malformed emails", () => {
    const errors = validateContactForm({
      ...emptyContactForm,
      name: "Amir",
      email: "not-an-email",
      message: "hi",
    });
    expect(errors.email).toBe("invalid");
  });

  it("treats whitespace-only name as missing", () => {
    const errors = validateContactForm({
      ...emptyContactForm,
      name: "   ",
      email: "amir@example.com",
      message: "hi",
    });
    expect(errors.name).toBe("required");
  });

  it("does not require phone, party size, or date", () => {
    const errors = validateContactForm({
      ...emptyContactForm,
      name: "Amir",
      email: "amir@example.com",
      message: "hi",
    });
    expect(errors).toEqual({});
  });
});
