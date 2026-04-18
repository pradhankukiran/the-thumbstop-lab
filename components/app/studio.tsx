"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSessions } from "@/lib/app/use-sessions";
import { SEED_SESSIONS } from "@/lib/app/mock-sessions";
import { buildScript, scriptToMarkdown } from "@/lib/app/mock-scripts";
import type { Candidate } from "@/lib/app/types";
import { TopBar } from "./top-bar";
import { SessionSidebar } from "./session-sidebar";
import { BriefPanel } from "./brief-panel";
import { CandidatesPanel } from "./candidates-panel";
import { HookDetailDrawer } from "./hook-detail-drawer";

const FALLBACK_POOL_SIZE = 12;

function getPoolFor(sessionId: string): Candidate[] {
  const seed = SEED_SESSIONS.find((s) => s.id === sessionId);
  if (seed) return seed.candidates;
  return SEED_SESSIONS.flatMap((s) => s.candidates).slice(0, FALLBACK_POOL_SIZE);
}

export function Studio() {
  const {
    sessions,
    activeSession,
    setActiveSession,
    createSession,
    updateBrief,
    replaceCandidates,
    setSelectedCandidate,
    toggleSaved,
  } = useSessions();

  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Pool and count are derived from the active session's seed. Memoed so
  // the Generate button can show an accurate target count per session.
  const pool = useMemo(() => getPoolFor(activeSession.id), [activeSession.id]);
  const targetCount = pool.length;

  // Mock generation: clear, delay, repopulate with seed for session.
  const handleGenerate = useCallback(() => {
    if (generating) return;
    setGenerating(true);
    replaceCandidates([]);

    window.setTimeout(() => {
      replaceCandidates(pool);
      setGenerating(false);
      showToast(`${pool.length} candidates generated`);
    }, 2000);
  }, [generating, pool, replaceCandidates, showToast]);

  const handleExportSession = useCallback(() => {
    const saved = activeSession.candidates.filter((c) =>
      activeSession.savedCandidateIds.includes(c.id),
    );
    if (saved.length === 0) {
      showToast("Star a hook first, then export");
      return;
    }
    const parts: string[] = [
      `# ${activeSession.title}`,
      `Session: ${activeSession.id}`,
      `Saved: ${saved.length} hook${saved.length === 1 ? "" : "s"}`,
      "",
      "---",
      "",
    ];
    for (const c of saved) {
      parts.push(scriptToMarkdown(c, buildScript(c)));
      parts.push("");
      parts.push("---");
      parts.push("");
    }
    const md = parts.join("\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeSession.id}-saved-hooks.md`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${saved.length} saved hooks`);
  }, [
    activeSession.candidates,
    activeSession.id,
    activeSession.savedCandidateIds,
    activeSession.title,
    showToast,
  ]);

  const handleSelectCandidate = useCallback(
    (id: string) => {
      setSelectedCandidate(id);
    },
    [setSelectedCandidate],
  );

  const handleCloseDrawer = useCallback(() => {
    setSelectedCandidate(undefined);
  }, [setSelectedCandidate]);

  const selectedCandidate = activeSession.selectedCandidateId
    ? activeSession.candidates.find(
        (c) => c.id === activeSession.selectedCandidateId,
      ) ?? null
    : null;

  const saved = new Set(activeSession.savedCandidateIds);

  return (
    <div className="flex h-full flex-col">
      <TopBar
        sessionId={activeSession.id}
        sessionTitle={activeSession.title}
        savedCount={activeSession.savedCandidateIds.length}
        onSave={() => showToast("Auto-saved · localStorage v1")}
        onExport={handleExportSession}
      />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <SessionSidebar
          sessions={sessions}
          activeSessionId={activeSession.id}
          disabled={generating}
          onSelect={setActiveSession}
          onNew={createSession}
        />

        <div className="flex min-w-0 flex-1 flex-col md:flex-row">
          <BriefPanel
            brief={activeSession.brief}
            generating={generating}
            targetCount={targetCount}
            onChange={updateBrief}
            onGenerate={handleGenerate}
          />

          <CandidatesPanel
            candidates={activeSession.candidates}
            selectedId={activeSession.selectedCandidateId}
            savedIds={activeSession.savedCandidateIds}
            generating={generating}
            targetCount={targetCount}
            onSelect={handleSelectCandidate}
            onToggleSave={toggleSaved}
          />
        </div>
      </div>

      <HookDetailDrawer
        candidate={selectedCandidate}
        isSaved={
          selectedCandidate ? saved.has(selectedCandidate.id) : false
        }
        onClose={handleCloseDrawer}
        onToggleSave={() => {
          if (selectedCandidate) toggleSaved(selectedCandidate.id);
        }}
        onToast={showToast}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2"
          >
            <div className="flex items-center gap-2 border border-ink bg-paper px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]">
              <span className="h-2 w-2 bg-signal" />
              <span>{toast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
