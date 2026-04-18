"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Script } from "@/lib/app/types";

export function ScriptView({ script }: { script: Script }) {
  const reduced = useReducedMotion();
  return (
    <div>
      <SectionLabel letter="A" title="Script" meta={`${script.runtimeSeconds}s`} />
      <ol className="mt-3 flex flex-col gap-3">
        {script.beats.map((b, i) => (
          <motion.li
            key={i}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: reduced ? 0 : 0.15 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-[92px_1fr] gap-4 border-b border-rule pb-3 last:border-b-0"
          >
            <div className="flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.16em]">
              <span className="tabular-nums text-signal">{b.timecode}</span>
              <span className="text-ink-3">{b.label}</span>
            </div>
            <div>
              <p className="font-serif text-[17px] leading-[1.35] text-ink">
                {b.body}
              </p>
              {b.performance && (
                <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-4">
                  Performance · {b.performance}
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function SectionLabel({
  letter,
  title,
  meta,
}: {
  letter: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-rule pb-2">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
        <span className="text-signal">§{letter}</span>
        <span className="text-ink">{title}</span>
      </div>
      {meta && (
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3 tabular-nums">
          {meta}
        </span>
      )}
    </div>
  );
}
