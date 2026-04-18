"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ThumbstopScoreCard } from "./thumbstop-score-card";
import { PulsingDot } from "./pulsing-dot";
import { CountUpNumber } from "./count-up-number";
import { FEATURED_HOOK } from "@/lib/hooks-data";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const fadeUp = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  return (
    <section className="relative border-b border-rule">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[1px] bg-rule lg:block"
        style={{ left: "max(24px, calc((100% - 1280px) / 2))" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[1px] bg-rule lg:block"
        style={{ right: "max(24px, calc((100% - 1280px) / 2))" }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
        className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 px-6 py-20 md:py-28 lg:gap-x-10 lg:px-10 lg:py-32"
      >
        {/* Copy column */}
        <div className="col-span-12 lg:col-span-7">
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3"
          >
            <PulsingDot size={6} />
            <span>Lab Active</span>
            <span className="text-ink-4">·</span>
            <span className="tabular-nums">
              <CountUpNumber to={2184553} duration={2.2} /> HOOKS ANALYZED
            </span>
            <span className="hidden text-ink-4 sm:inline">·</span>
            <span className="hidden sm:inline">V1.0</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-8 font-serif text-[46px] leading-[0.98] tracking-[-0.025em] text-ink sm:text-[72px] md:text-[96px] lg:text-[112px]"
          >
            The science of
            <br />
            <span className="italic">the scroll-stop.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-8 max-w-[58ch] text-[18px] leading-[1.55] text-ink-2 md:text-[20px]"
          >
            Engineered hooks for short-form video. Every hook scored across five
            behavioral vectors — before it ever reaches a feed.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#launch"
              className="group inline-flex h-12 items-center gap-2.5 bg-signal px-5 font-mono text-[12px] uppercase tracking-[0.18em] text-signal-ink transition-colors hover:bg-ink"
            >
              <span>Launch app</span>
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#anatomy"
              className="group inline-flex h-12 items-center gap-2 border border-ink bg-paper px-5 font-mono text-[12px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-signal-ink"
            >
              <span>Read the science</span>
              <span className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-14 grid grid-cols-2 gap-6 border-t border-rule pt-6 sm:grid-cols-4"
          >
            <StatMeta label="Median decision" to={0.8} decimals={1} suffix="s" />
            <StatMeta label="Vectors scored" to={5} />
            <StatMeta
              label="Corpus size"
              to={2.1}
              decimals={1}
              suffix="M+"
            />
            <StatMeta label="Engine version" staticValue="v1.0" />
          </motion.div>
        </div>

        {/* Score card column */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="col-span-12 mt-16 lg:col-span-5 lg:mt-0"
        >
          <div className="sticky top-28">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
              <span>Fig. 01 — Specimen analysis</span>
              <span className="flex items-center gap-1.5">
                <PulsingDot size={5} />
                <span>Measuring</span>
              </span>
            </div>
            <ThumbstopScoreCard
              hook={FEATURED_HOOK}
              size="lg"
              animated={!reduced}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

type StatMetaProps = {
  label: string;
  to?: number;
  decimals?: number;
  suffix?: string;
  staticValue?: string;
};

function StatMeta({ label, to, decimals, suffix, staticValue }: StatMetaProps) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
        {label}
      </div>
      <div className="mt-1 font-mono text-[22px] font-medium tabular-nums text-ink">
        {staticValue ? (
          staticValue
        ) : to !== undefined ? (
          <CountUpNumber to={to} decimals={decimals} suffix={suffix} />
        ) : null}
      </div>
    </div>
  );
}
