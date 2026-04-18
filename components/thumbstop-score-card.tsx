"use client";

import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import type { Hook } from "@/lib/hooks-data";
import { VECTORS } from "@/lib/vectors";
import { PulsingDot } from "./pulsing-dot";

type ScoreCardProps = {
  hook: Hook;
  size?: "lg" | "md";
  animated?: boolean;
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ThumbstopScoreCard({
  hook,
  size = "lg",
  animated = false,
  className = "",
}: ScoreCardProps) {
  const isLarge = size === "lg";
  const shouldAnimate = animated;

  return (
    <article
      className={`relative border border-rule bg-paper ${className}`}
      aria-label={`Thumbstop Score Card for ${hook.id}`}
    >
      <CornerTicks />

      <header className="flex items-center justify-between border-b border-rule px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 sm:px-6">
        <div className="flex items-center gap-2">
          <PulsingDot size={5} />
          <span className="text-ink">{hook.id}</span>
          <span className="text-ink-4">·</span>
          <span>{hook.niche}</span>
          <span className="text-ink-4">·</span>
          <span>{hook.date}</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span>THUMBSTOP SCORE</span>
        </div>
      </header>

      <div className={`px-5 pt-8 sm:px-8 ${isLarge ? "sm:pt-12" : "sm:pt-8"}`}>
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className={`font-serif leading-none text-signal ${
              isLarge ? "text-[56px]" : "text-[34px]"
            }`}
          >
            &ldquo;
          </span>
          <p
            className={`font-serif leading-[1.12] tracking-[-0.015em] ${
              isLarge
                ? "text-[34px] sm:text-[42px] lg:text-[46px]"
                : "text-[22px] sm:text-[24px]"
            }`}
          >
            {hook.text}
          </p>
        </div>
      </div>

      <div className={`px-5 pt-8 sm:px-8 ${isLarge ? "sm:pt-12" : "sm:pt-10"}`}>
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
              Thumbstop Score
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span
                className={`font-mono tabular-nums font-medium leading-none text-signal ${
                  isLarge
                    ? "text-[96px] sm:text-[120px]"
                    : "text-[72px]"
                }`}
                style={{ letterSpacing: "-0.04em" }}
              >
                <AnimatedNumber
                  to={hook.total}
                  animate={shouldAnimate}
                  duration={1.6}
                  delay={0.4}
                />
              </span>
              <span
                className={`font-mono text-ink-4 ${
                  isLarge ? "text-[20px]" : "text-[14px]"
                }`}
              >
                /100
              </span>
            </div>
          </div>
          <div className="mb-3 hidden text-right font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3 sm:block">
            <div>Measured</div>
            <div className="mt-0.5 text-ink">v1.0 · engine</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-2.5 sm:mt-10">
          {VECTORS.map((v, i) => {
            const value = hook.scores[v.key];
            const barDelay = 0.25 + i * 0.09;
            return (
              <div
                key={v.key}
                className="grid grid-cols-[108px_1fr_36px] items-center gap-4"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                  {v.shortLabel}
                </div>
                <div className="relative h-[6px] w-full bg-off">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-ink"
                    initial={shouldAnimate ? { width: 0 } : false}
                    animate={shouldAnimate ? { width: `${value}%` } : undefined}
                    style={shouldAnimate ? undefined : { width: `${value}%` }}
                    transition={{
                      duration: 1.1,
                      delay: barDelay,
                      ease: EASE,
                    }}
                  />
                  <motion.div
                    className="absolute top-0 h-[6px] w-[1px] bg-signal"
                    initial={shouldAnimate ? { left: "0%", opacity: 0 } : false}
                    animate={
                      shouldAnimate
                        ? {
                            left: `calc(${value}% - 0.5px)`,
                            opacity: 1,
                          }
                        : undefined
                    }
                    style={
                      shouldAnimate
                        ? undefined
                        : { left: `calc(${value}% - 0.5px)` }
                    }
                    transition={{
                      duration: 1.1,
                      delay: barDelay,
                      ease: EASE,
                    }}
                  />
                </div>
                <div className="text-right font-mono tabular-nums text-[13px] text-ink">
                  <AnimatedNumber
                    to={value}
                    animate={shouldAnimate}
                    duration={1.1}
                    delay={barDelay}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="mt-8 flex items-center justify-between border-t border-rule px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4 sm:px-8">
        <span>Specimen · Illustrative</span>
        <span>THE THUMBSTOP LAB</span>
      </footer>
    </article>
  );
}

type AnimatedNumberProps = {
  to: number;
  animate: boolean;
  duration?: number;
  delay?: number;
};

function AnimatedNumber({
  to,
  animate: shouldAnimate,
  duration = 1.2,
  delay = 0,
}: AnimatedNumberProps) {
  const [value, setValue] = useState(shouldAnimate ? 0 : to);

  useEffect(() => {
    if (!shouldAnimate) return;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [shouldAnimate, to, duration, delay]);

  return <>{value}</>;
}

function CornerTicks() {
  const tick = "absolute h-2 w-2 border-ink";
  return (
    <>
      <span aria-hidden className={`${tick} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${tick} right-0 top-0 border-r border-t`} />
      <span aria-hidden className={`${tick} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${tick} bottom-0 right-0 border-b border-r`} />
    </>
  );
}
