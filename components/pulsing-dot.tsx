type PulsingDotProps = {
  size?: number;
  className?: string;
};

export function PulsingDot({ size = 6, className = "" }: PulsingDotProps) {
  return (
    <span
      aria-hidden
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="animate-pulse-signal bg-signal"
        style={{ width: size, height: size, borderRadius: 1 }}
      />
    </span>
  );
}
