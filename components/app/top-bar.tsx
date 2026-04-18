"use client";

import { PulsingDot } from "@/components/pulsing-dot";

type TopBarProps = {
  sessionId: string;
  sessionTitle: string;
  savedNote?: string;
  onSave?: () => void;
  onExport?: () => void;
};

export function TopBar({
  sessionId,
  sessionTitle,
  savedNote = "Auto-saved",
  onSave,
  onExport,
}: TopBarProps) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-rule bg-paper px-4">
      <div className="flex items-center gap-3">
        {/* Lab mark */}
        <span className="relative inline-flex h-5 w-5 items-center justify-center border border-ink">
          <span className="h-1.5 w-1.5 bg-signal" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
          Thumbstop&nbsp;Lab
        </span>
        <span className="text-ink-4">/</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          Studio
        </span>
        <span className="mx-2 hidden h-4 w-px bg-rule sm:inline-block" />
        <div className="hidden items-center gap-2 sm:flex">
          <PulsingDot size={5} />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
            {sessionId}
          </span>
          <span className="text-ink-4">·</span>
          <span className="max-w-[280px] truncate font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            {sessionTitle}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4 md:inline">
          {savedNote}
        </span>
        <button
          type="button"
          onClick={onSave}
          className="h-8 border border-rule bg-paper px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-2 transition-colors hover:border-ink hover:text-ink"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onExport}
          className="h-8 border border-rule bg-paper px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-2 transition-colors hover:border-ink hover:text-ink"
        >
          Export
        </button>
        <div className="ml-2 flex h-8 w-8 items-center justify-center border border-ink bg-paper font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
          K
        </div>
      </div>
    </header>
  );
}
