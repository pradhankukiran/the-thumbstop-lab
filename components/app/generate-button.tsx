"use client";

import { useEffect, useState } from "react";
import { PulsingDot } from "@/components/pulsing-dot";

type GenerateButtonProps = {
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
  count?: number;
};

export function GenerateButton({
  loading,
  disabled,
  onClick,
  count = 20,
}: GenerateButtonProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const startedAt = performance.now();
    const totalMs = 2000;
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const n = Math.min(count, Math.round((elapsed / totalMs) * count));
      setProgress(n);
      if (elapsed < totalMs) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loading, count]);

  if (loading) {
    return (
      <button
        type="button"
        disabled
        className="group flex h-11 w-full items-center justify-between border border-ink bg-ink px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-signal-ink"
      >
        <span className="flex items-center gap-2.5">
          <PulsingDot size={5} />
          <span>Measuring hook</span>
          <span className="tabular-nums">
            {String(progress).padStart(2, "0")}/{count}
          </span>
        </span>
        <span className="font-mono text-ink-4">···</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex h-11 w-full items-center justify-between bg-signal px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-signal-ink transition-colors hover:bg-ink disabled:bg-rule disabled:text-ink-4"
    >
      <span>Generate {count}</span>
      <span className="transition-transform group-hover:translate-x-0.5">→</span>
    </button>
  );
}
