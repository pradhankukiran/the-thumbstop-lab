import type { VectorKey } from "@/lib/vectors";

type VectorIconProps = {
  vector: VectorKey;
  className?: string;
};

export function VectorIcon({ vector, className = "" }: VectorIconProps) {
  const common = {
    width: 56,
    height: 56,
    viewBox: "0 0 56 56",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (vector) {
    case "curiosity":
      return (
        <svg {...common} aria-hidden>
          <path d="M8 40 Q 28 8, 48 40" />
          <path d="M48 40 L 48 32" strokeDasharray="2 3" />
          <circle cx="28" cy="46" r="1.6" fill="currentColor" stroke="none" />
          <line x1="4" y1="50" x2="52" y2="50" stroke="currentColor" strokeOpacity="0.3" />
        </svg>
      );
    case "specificity":
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="10" width="44" height="36" />
          <line x1="6" y1="22" x2="50" y2="22" />
          <line x1="6" y1="34" x2="50" y2="34" />
          <line x1="20" y1="10" x2="20" y2="46" />
          <line x1="36" y1="10" x2="36" y2="46" />
          <rect x="20" y="22" width="16" height="12" fill="currentColor" stroke="none" />
        </svg>
      );
    case "patternInterrupt":
      return (
        <svg {...common} aria-hidden>
          <polyline points="4,30 10,30 14,30 18,30 22,30" />
          <polyline points="22,30 26,12 30,46 34,18 38,30" />
          <polyline points="38,30 42,30 46,30 52,30" />
        </svg>
      );
    case "emotion":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 38 Q 14 38, 18 28 Q 22 14, 28 14 Q 34 14, 38 28 Q 42 38, 52 38" />
          <line x1="4" y1="46" x2="52" y2="46" stroke="currentColor" strokeOpacity="0.3" />
          <circle cx="28" cy="14" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "stakes":
      return (
        <svg {...common} aria-hidden>
          <line x1="28" y1="10" x2="28" y2="46" />
          <line x1="10" y1="22" x2="46" y2="22" />
          <rect x="8" y="22" width="12" height="12" />
          <rect x="36" y="22" width="12" height="18" />
          <line x1="4" y1="50" x2="52" y2="50" stroke="currentColor" strokeOpacity="0.3" />
        </svg>
      );
  }
}
