interface RingStampProps {
  className?: string;
}

/**
 * The site's signature motif: an irregular coffee-cup ring stain,
 * used in place of generic numbered dividers between sections.
 */
export default function RingStamp({ className }: RingStampProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <ellipse
        cx="60"
        cy="62"
        rx="46"
        ry="40"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.55"
      />
      <ellipse
        cx="63"
        cy="58"
        rx="34"
        ry="30"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <path
        d="M20 70c8 10 70 14 84-4"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.25"
      />
    </svg>
  );
}
