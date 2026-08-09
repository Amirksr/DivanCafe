import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CoffeeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
      <path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M7 3.5c-.6.7-.6 1.3 0 2s.6 1.3 0 2" />
      <path d="M11 3.5c-.6.7-.6 1.3 0 2s.6 1.3 0 2" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c8-1 13-6 14-14-8 1-13 6-14 14Z" />
      <path d="M5 19c1-4 3-7 6-9" />
    </svg>
  );
}

export function IceCubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" />
      <path d="M4 8.5 12 13l8-4.5" />
      <path d="M12 13v7" />
    </svg>
  );
}

export function EggIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="10" cy="14" rx="7" ry="5" />
      <circle cx="16" cy="9" r="3" />
    </svg>
  );
}

export function CroissantIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 15c1-6 6-10 10-10 2 0 4 1 5 2-2 0-4 1-5 3 2 0 3 1 4 2-2 0-3 0-4 1 1 1 1 2 1 3-1-1-2-1-3-1-3 4-6 5-8 0Z" />
    </svg>
  );
}

export function BowlIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11h18a9 8 0 0 1-9 7 9 8 0 0 1-9-7Z" />
      <path d="M8 11c0-2.5 1.8-4.5 4-4.5" />
      <path d="M12 4v2.5" />
    </svg>
  );
}

export const categoryIcons = {
  coffee: CoffeeIcon,
  tea: LeafIcon,
  cold: IceCubeIcon,
  breakfast: EggIcon,
  pastry: CroissantIcon,
  brunch: BowlIcon,
} as const;
