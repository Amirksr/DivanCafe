"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { easeOutCubic, formatNumber } from "@/lib/utils";

interface CountUpProps {
  target: number;
  locale: Locale;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Renders a number that counts up from 0 to `target` the first time it
 * scrolls into view, then holds at `target` (it never re-triggers).
 * Falls back to showing the final value immediately if IntersectionObserver
 * or requestAnimationFrame aren't available, and respects
 * prefers-reduced-motion by skipping straight to the final value.
 */
export default function CountUp({
  target,
  locale,
  decimals = 0,
  suffix = "",
  duration = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const runCountUp = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (prefersReducedMotion || typeof requestAnimationFrame === "undefined") {
        setDisplay(target);
        return;
      }

      const startTime = performance.now();
      let frame: number;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = easeOutCubic(elapsed / duration);
        setDisplay(target * progress);
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setDisplay(target);
        }
      };

      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    };

    if (typeof IntersectionObserver === "undefined") {
      runCountUp();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            runCountUp();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(display, locale, decimals)}
      {suffix}
    </span>
  );
}
