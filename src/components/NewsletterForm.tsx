"use client";

interface NewsletterFormProps {
  placeholder: string;
  cta: string;
}

export default function NewsletterForm({ placeholder, cta }: NewsletterFormProps) {
  return (
    <form className="mt-4 flex" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="newsletter-email" className="sr-only">
        {placeholder}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder={placeholder}
        className="focus-ring w-full border border-ink-line bg-transparent px-3 py-2 text-sm text-parchment placeholder:text-parchment/40"
      />
      <button
        type="submit"
        className="focus-ring shrink-0 border border-copper px-3 py-2 text-sm text-copper-bright hover:bg-copper hover:text-charcoal"
      >
        {cta}
      </button>
    </form>
  );
}
