"use client";

import { useEffect, useState } from "react";
import { applyTheme, resolveInitialTheme, type Theme } from "@/lib/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Resolve the real theme only after mount so the server-rendered markup
  // (which can't know localStorage/system preference) never mismatches.
  useEffect(() => {
    setTheme(resolveInitialTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-parchment/70 transition-colors hover:text-gold"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      // Render a neutral icon until mounted; avoids a hydration flash/mismatch.
      data-theme-ready={theme !== null}
    >
      {theme === "light" ? <MoonIcon className="h-[18px] w-[18px]" /> : <SunIcon className="h-[18px] w-[18px]" />}
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5v2.3M12 19.2v2.3M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 14.2A8.5 8.5 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
