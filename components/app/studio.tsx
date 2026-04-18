"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSessions } from "@/lib/app/use-sessions";
import { SEED_SESSIONS } from "@/lib/app/mock-sessions";
import type { Candidate } from "@/lib/app/types";
import { TopBar } from "./top-bar";
import { SessionSidebar } from "./session-sidebar";
import { BriefPanel } from "./brief-panel";
import { CandidatesPanel } from "./candidates-panel";
import { HookDetailDrawer } from "./hook-detail-drawer";

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

  // Mock generation: clear, delay, repopulate with seed for session (or fallback pool).
  const handleGenerate = useCallback(() => {
    if (generating) return;
    setGenerating(true);

    // Look up matching seed (same session id, or fallback to pool).
    const seed = SEED_SESSIONS.find((s) => s.id === activeSession.id);
    const pool: Candidate[] =
      seed?.candidates ??
      SEED_SESSIONS.flatMap((s) => s.candidates).slice(0, 12);

    // Clear first so the stream-in animation triggers.
    replaceCandidates([]);

    window.setTimeout(() => {
      replaceCandidates(pool);
      setGenerating(false);
      showToast(`${pool.length} candidates generated`);
    }, 2000);
  }, [generating, activeSession.id, replaceCandidates, showToast]);

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
        onSave={() => showToast("Auto-saved · localStorage v1")}
        onExport={() => showToast("Export the opened hook from the drawer")}
      />

      <div className="flex min-h-0 flex-1">
        <SessionSidebar
          sessions={sessions}
          activeSessionId={activeSession.id}
          onSelect={setActiveSession}
          onNew={createSession}
        />

        <div className="flex min-w-0 flex-1 flex-col md:flex-row">
          <BriefPanel
            brief={activeSession.brief}
            generating={generating}
            onChange={updateBrief}
            onGenerate={handleGenerate}
          />

          <CandidatesPanel
            candidates={activeSession.candidates}
            selectedId={activeSession.selectedCandidateId}
            savedIds={activeSession.savedCandidateIds}
            generating={generating}
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
