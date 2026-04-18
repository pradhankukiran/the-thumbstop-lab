"use client";

import type { Candidate } from "@/lib/app/types";
import { VECTORS } from "@/lib/vectors";

type CandidateCardProps = {
  candidate: Candidate;
  rank: number;
  isSaved: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onToggleSave: (e: React.MouseEvent) => void;
};

export function CandidateCard({
  candidate,
  rank,
  isSaved,
  isSelected,
  onSelect,
  onToggleSave,
}: CandidateCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        // Only fire on direct keydown — don't double-activate when Enter is
        // pressed on the nested star button inside this card.
        if (e.key === "Enter" && e.target === e.currentTarget) {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group grid w-full cursor-pointer grid-cols-[40px_1fr_auto] items-start gap-4 border border-rule bg-paper px-4 py-4 text-left transition-colors hover:border-ink ${
        isSelected ? "border-ink" : ""
      }`}
      aria-label={`${candidate.id} · score ${candidate.total}`}
    >
      {/* Rank */}
      <div className="flex flex-col items-start gap-1">
        <span className="font-mono text-[10px] tabular-nums tracking-[0.12em] text-ink-4">
          #{String(rank).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={onToggleSave}
          aria-label={isSaved ? "Unstar" : "Star"}
          className={`text-[14px] leading-none transition-colors ${
            isSaved
              ? "text-signal"
              : "text-ink-4 hover:text-ink"
          }`}
        >
          {isSaved ? "★" : "☆"}
        </button>
      </div>

      {/* Middle: metadata + text + bars */}
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
          <span className="text-ink">{candidate.id}</span>
          <span className="text-ink-4">·</span>
          <span>{candidate.niche}</span>
          <span className="text-ink-4">·</span>
          <span>{candidate.date}</span>
        </div>

        <p className="font-serif text-[18px] leading-[1.25] tracking-[-0.01em] text-ink">
          &ldquo;{candidate.text}&rdquo;
        </p>

        <div className="mt-1 grid grid-cols-5 gap-2">
          {VECTORS.map((v) => {
            const val = candidate.scores[v.key];
            return (
              <div key={v.key} className="flex items-center gap-2">
                <span className="w-[28px] font-mono text-[9px] uppercase tracking-[0.12em] text-ink-4">
                  {v.abbr}
                </span>
                <div className="relative h-[3px] flex-1 bg-off">
                  <div
                    className="absolute inset-y-0 left-0 bg-ink"
                    style={{ width: `${val}%` }}
                  />
                </div>
                <span className="w-[18px] text-right font-mono text-[10px] tabular-nums text-ink-2">
                  {val}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: score */}
      <div className="flex flex-col items-end gap-1">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-3">
          Score
        </span>
        <div className="flex items-baseline gap-1">
          <span
            className="font-mono text-[36px] font-medium leading-none tabular-nums text-signal"
            style={{ letterSpacing: "-0.04em" }}
          >
            {candidate.total}
          </span>
          <span className="font-mono text-[10px] text-ink-4">/100</span>
        </div>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-4 opacity-0 transition-opacity group-hover:opacity-100">
          Open →
        </span>
      </div>
    </article>
  );
}
