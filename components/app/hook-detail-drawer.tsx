"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo } from "react";
import type { Candidate } from "@/lib/app/types";
import { buildScript, scriptToMarkdown } from "@/lib/app/mock-scripts";
import { ThumbstopScoreCard } from "@/components/thumbstop-score-card";
import { ScriptView } from "./script-view";
import { ShotListView } from "./shot-list-view";
import { OnScreenTextView } from "./on-screen-text-view";
import { CtaOptionsView } from "./cta-options-view";

type HookDetailDrawerProps = {
  candidate: Candidate | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: () => void;
  onToast: (msg: string) => void;
};

export function HookDetailDrawer({
  candidate,
  isSaved,
  onClose,
  onToggleSave,
  onToast,
}: HookDetailDrawerProps) {
  const reduced = useReducedMotion();
  const script = useMemo(
    () => (candidate ? buildScript(candidate) : null),
    [candidate],
  );

  useEffect(() => {
    if (!candidate) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [candidate, onClose]);

  const handleCopy = async () => {
    if (!candidate || !script) return;
    const md = scriptToMarkdown(candidate, script);
    try {
      await navigator.clipboard.writeText(md);
      onToast("Script copied to clipboard");
    } catch {
      onToast("Clipboard blocked — select and copy manually");
    }
  };

  const handleExport = async () => {
    if (!candidate || !script) return;
    const md = scriptToMarkdown(candidate, script);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${candidate.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
    onToast("Exported as markdown");
  };

  return (
    <AnimatePresence>
      {candidate && script && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/20"
            aria-hidden
          />
          <motion.aside
            initial={reduced ? false : { x: "100%" }}
            animate={reduced ? undefined : { x: 0 }}
            exit={reduced ? undefined : { x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 26,
              mass: 0.9,
            }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[640px] flex-col border-l border-rule bg-paper shadow-[-24px_0_40px_-20px_rgba(0,0,0,0.08)]"
            role="dialog"
            aria-label={`${candidate.id} detail`}
          >
            <header className="flex items-center justify-between border-b border-rule px-6 py-3">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                <span className="text-ink">{candidate.id}</span>
                <span className="text-ink-4">·</span>
                <span className="text-ink-3">{candidate.niche}</span>
                <span className="text-ink-4">·</span>
                <span className="text-ink-3">{candidate.date}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center border border-rule bg-paper font-mono text-[14px] text-ink-3 transition-colors hover:border-ink hover:text-ink"
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ThumbstopScoreCard hook={candidate} size="md" animated />

              <div className="mt-8 flex flex-col gap-8">
                <ScriptView script={script} />
                <ShotListView script={script} />
                <OnScreenTextView script={script} />
                <CtaOptionsView script={script} />
              </div>
            </div>

            <footer className="flex items-center justify-between gap-3 border-t border-rule bg-off px-6 py-4">
              <button
                type="button"
                onClick={onToggleSave}
                className={`flex h-10 items-center gap-2 border px-3.5 font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors ${
                  isSaved
                    ? "border-signal bg-paper text-signal"
                    : "border-rule bg-paper text-ink-2 hover:border-ink hover:text-ink"
                }`}
              >
                <span>{isSaved ? "★" : "☆"}</span>
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="h-10 border border-rule bg-paper px-3.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-signal-ink"
                >
                  Copy script
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className="group flex h-10 items-center gap-2 bg-signal px-3.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-signal-ink transition-colors hover:bg-ink"
                >
                  <span>Export .md</span>
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
