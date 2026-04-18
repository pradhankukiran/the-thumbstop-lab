"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AppState, Brief, Session } from "./types";
import { DEFAULT_ACTIVE_SESSION_ID, SEED_SESSIONS } from "./mock-sessions";

const STORAGE_KEY = "thumbstop-app/v1";

function toMap(sessions: Session[]): Record<string, Session> {
  const out: Record<string, Session> = {};
  for (const s of sessions) out[s.id] = s;
  return out;
}

function readStoredState(): AppState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AppState;
    if (parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

function defaultState(): AppState {
  return {
    version: 1,
    activeSessionId: DEFAULT_ACTIVE_SESSION_ID,
    sessions: toMap(SEED_SESSIONS),
  };
}

function nextSessionId(sessions: Record<string, Session>): string {
  const nums = Object.keys(sessions)
    .map((id) => Number(id.replace("SESSION-", "")))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `SESSION-${String(max + 1).padStart(4, "0")}`;
}

export function useSessions() {
  const [state, setState] = useState<AppState>(defaultState);
  const hydratedRef = useRef(false);

  // Hydrate from localStorage once on mount. Queued via microtask so the
  // setState occurs outside the effect body (React 19's set-state-in-effect
  // rule flags direct synchronous setState).
  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      const stored = readStoredState();
      if (stored) setState(stored);
      hydratedRef.current = true;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  const sortedSessions = Object.values(state.sessions).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
  const activeSession =
    state.sessions[state.activeSessionId] ?? sortedSessions[0] ?? SEED_SESSIONS[0];

  const setActiveSession = useCallback((id: string) => {
    setState((s) => ({ ...s, activeSessionId: id }));
  }, []);

  const createSession = useCallback(() => {
    setState((s) => {
      const id = nextSessionId(s.sessions);
      const now = new Date().toISOString();
      const session: Session = {
        id,
        title: `New session · ${now.slice(0, 10)}`,
        createdAt: now,
        updatedAt: now,
        brief: { niche: "", voice: "" },
        candidates: [],
        savedCandidateIds: [],
      };
      return {
        ...s,
        activeSessionId: id,
        sessions: { ...s.sessions, [id]: session },
      };
    });
  }, []);

  const updateBrief = useCallback((patch: Partial<Brief>) => {
    setState((s) => {
      const cur = s.sessions[s.activeSessionId];
      if (!cur) return s;
      const brief = { ...cur.brief, ...patch };
      const niche = brief.niche.trim();
      const title = niche
        ? `${niche.slice(0, 40)} · ${new Date().toISOString().slice(0, 10)}`
        : cur.title;
      return {
        ...s,
        sessions: {
          ...s.sessions,
          [cur.id]: {
            ...cur,
            brief,
            title,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  const replaceCandidates = useCallback(
    (candidates: Session["candidates"]) => {
      setState((s) => {
        const cur = s.sessions[s.activeSessionId];
        if (!cur) return s;
        return {
          ...s,
          sessions: {
            ...s.sessions,
            [cur.id]: {
              ...cur,
              candidates,
              updatedAt: new Date().toISOString(),
            },
          },
        };
      });
    },
    [],
  );

  const setSelectedCandidate = useCallback((id: string | undefined) => {
    setState((s) => {
      const cur = s.sessions[s.activeSessionId];
      if (!cur) return s;
      return {
        ...s,
        sessions: {
          ...s.sessions,
          [cur.id]: { ...cur, selectedCandidateId: id },
        },
      };
    });
  }, []);

  const toggleSaved = useCallback((candidateId: string) => {
    setState((s) => {
      const cur = s.sessions[s.activeSessionId];
      if (!cur) return s;
      const saved = new Set(cur.savedCandidateIds);
      if (saved.has(candidateId)) saved.delete(candidateId);
      else saved.add(candidateId);
      return {
        ...s,
        sessions: {
          ...s.sessions,
          [cur.id]: {
            ...cur,
            savedCandidateIds: Array.from(saved),
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  return {
    sessions: sortedSessions,
    activeSession,
    setActiveSession,
    createSession,
    updateBrief,
    replaceCandidates,
    setSelectedCandidate,
    toggleSaved,
  };
}
