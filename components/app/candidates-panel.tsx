"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Candidate } from "@/lib/app/types";
import { CandidateCard } from "./candidate-card";

type CandidatesPanelProps = {
  candidates: Candidate[];
  selectedId?: string;
  savedIds: string[];
  generating: boolean;
  targetCount: number;
  onSelect: (id: string) => void;
  onToggleSave: (id: string) => void;
};

export function CandidatesPanel({
  candidates,
  selectedId,
  savedIds,
  generating,
  targetCount,
  onSelect,
  onToggleSave,
}: CandidatesPanelProps) {
  const reduced = useReducedMotion();
  const savedSet = new Set(savedIds);

  return (
    <section className="flex min-h-[50vh] flex-1 flex-col bg-off md:h-full md:min-h-0">
      <header className="flex items-center justify-between border-b border-rule bg-paper px-6 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="text-signal">§2</span>
          <span className="text-ink">Candidates</span>
          <span className="text-ink-4">·</span>
          <span className="tabular-nums text-ink-3">
            {candidates.length} generated
          </span>
          <span className="text-ink-4">·</span>
          <span className="text-ink-3">sorted by score</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          <span className="hidden md:inline">
            Saved:{" "}
            <span className="tabular-nums text-ink">{savedIds.length}</span>
          </span>
          <span className="hidden md:inline text-ink-4">·</span>
          <span className="hidden md:inline">
            Median:{" "}
            <span className="tabular-nums text-ink">
              {candidates.length
                ? Math.round(
                    candidates.reduce((a, b) => a + b.total, 0) /
                      candidates.length,
                  )
                : 0}
            </span>
          </span>
        </div>
      </header>

      <div className="flex-1 px-6 py-6 md:overflow-y-auto">
        {candidates.length === 0 && !generating && (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-[42ch] text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                No candidates yet
              </div>
              <p className="mt-4 font-serif text-[24px] leading-[1.2] tracking-[-0.01em] text-ink">
                Write a brief, then hit <span className="italic">Generate</span>.
              </p>
              <p className="mt-3 text-[14px] leading-[1.55] text-ink-3">
                The engine will stream twenty candidates ranked by Thumbstop Score.
              </p>
            </div>
          </div>
        )}

        {generating && candidates.length === 0 && (
          <MeasuringList count={Math.min(targetCount, 8)} />
        )}

        {candidates.length > 0 && (
          <ul className="flex flex-col gap-3">
            {candidates.map((c, i) => (
              <motion.li
                key={c.id}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: reduced ? 0 : Math.min(i * 0.04, 0.5),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CandidateCard
                  candidate={c}
                  rank={i + 1}
                  isSaved={savedSet.has(c.id)}
                  isSelected={selectedId === c.id}
                  onSelect={() => onSelect(c.id)}
                  onToggleSave={(e) => {
                    e.stopPropagation();
                    onToggleSave(c.id);
                  }}
                />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function MeasuringList({ count }: { count: number }) {
  return (
    <ul className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="flex h-[110px] items-center gap-4 border border-rule bg-paper px-4"
        >
          <div className="w-[40px] font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
            #{String(i + 1).padStart(2, "0")}
          </div>
          <div className="flex-1">
            <div className="h-[10px] w-[60%] bg-off" />
            <div className="mt-3 h-[14px] w-[85%] bg-off" />
            <div className="mt-3 grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-[3px] w-full bg-off" />
              ))}
            </div>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-4">
            · · ·
          </div>
        </li>
      ))}
    </ul>
  );
}
