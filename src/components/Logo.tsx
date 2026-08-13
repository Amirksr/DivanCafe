import { cn } from "@/lib/utils";

interface LogoProps {
  wordmark: string;
  isFa: boolean;
  className?: string;
  markClassName?: string;
}

/**
 * Logo mark: a coffee cup inside a seal/stamp ring, echoing the site's
 * signature coffee-ring motif (see RingStamp.tsx, the hero's "open now"
 * badge). Paired with the "دیوان" wordmark in the display font.
 */
export default function Logo({ wordmark, isFa, className, markClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className={cn("h-8 w-8 shrink-0 text-copper-bright", markClassName)}
      >
        <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
        <circle cx="20" cy="20" r="14.5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path
          d="M11 17h14v6.5a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V17Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M25 18.5h1.6a2.4 2.4 0 0 1 0 4.8H25" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M15 12c-.5.6-.5 1.1 0 1.7s.5 1.1 0 1.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M18.3 12c-.5.6-.5 1.1 0 1.7s.5 1.1 0 1.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
      <span className={cn("text-xl tracking-widest2 text-parchment", isFa ? "font-display-fa" : "font-display")}>
        {wordmark}
      </span>
    </span>
  );
}
