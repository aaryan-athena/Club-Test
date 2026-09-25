import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function NumberTheoryIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M32 4 54 17v30L32 60 10 47V17L32 4Z" />
      <path d="M25 42V22l14 20V22" stroke="#c58b12" strokeWidth="2.6" />
    </svg>
  );
}

export function GeometryIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M32 6 57 55H7L32 6Z" />
      <path d="M36 55a17 17 0 0 1 14-16.7" stroke="#c58b12" />
      <path d="M15 55h38" />
    </svg>
  );
}

export function CombinatoricsIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="21" cy="20" r="7" />
      <circle cx="45" cy="20" r="7" />
      <path d="M9 54v-8c0-10 4.8-17 12-17s12 7 12 17v8H9ZM33 54v-8c0-10 4.8-17 12-17s12 7 12 17v8H33Z" />
      <path d="M21 8V5M45 8V5" stroke="#c58b12" />
    </svg>
  );
}

export function AlgebraIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <text
        x="32"
        y="47"
        fill="currentColor"
        stroke="none"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="51"
        fontStyle="italic"
      >
        x
      </text>
      <text
        x="48"
        y="21"
        fill="#c58b12"
        stroke="none"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="18"
        fontWeight="700"
      >
        2
      </text>
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="7" y="12" width="50" height="46" rx="5" />
      <path d="M7 25h50M19 6v12M45 6v12" />
      <path d="m32 32 3.2 6.5 7.2 1-5.2 5 1.2 7.2-6.4-3.4-6.4 3.4 1.2-7.2-5.2-5 7.2-1L32 32Z" fill="#c58b12" stroke="#c58b12" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="5" y="8" width="43" height="48" rx="4" />
      <path d="M14 21h24M14 30h18M14 39h12" />
      <circle cx="43" cy="45" r="10" stroke="#c58b12" />
      <path d="m50 52 8 8" stroke="#c58b12" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M32 15c-6-6-15-7-25-4v40c10-3 19-2 25 4 6-6 15-7 25-4V11c-10-3-19-2-25 4Z" />
      <path d="M32 15v40M14 23c5-1 9 0 13 2M14 31c5-1 9 0 13 2M37 25c4-2 8-3 13-2M37 33c4-2 8-3 13-2" stroke="#c58b12" />
      <path d="M3 17v40c10-3 20-2 29 2 9-4 19-5 29-2V17" />
    </svg>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M14 7a14 14 0 0 0 16 19l26 26a6 6 0 0 1-8 8L22 34A14 14 0 0 1 5 16l9 9 8-8-8-10Z" />
      <path d="m13 55 19-19M8 60l9-2-7-7-2 9ZM39 24l8-8 5 5-8 8" />
      <path d="m47 16 6-6a4 4 0 0 1 6 6l-7 5" stroke="#c58b12" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
