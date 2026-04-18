"use client";

import type { Session } from "@/lib/app/types";
import { PulsingDot } from "@/components/pulsing-dot";

type SessionSidebarProps = {
  sessions: Session[];
  activeSessionId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
};

export function SessionSidebar({
  sessions,
  activeSessionId,
  onSelect,
  onNew,
}: SessionSidebarProps) {
  return (
    <aside className="flex h-full w-[72px] shrink-0 flex-col border-r border-rule bg-off lg:w-[88px]">
      <div className="flex items-center justify-between border-b border-rule px-3 py-3">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-signal">
          §0
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-3">
          HIST
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {sessions.map((s) => {
          const shortId = s.id.replace("SESSION-", "");
          const isActive = s.id === activeSessionId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className={`group relative flex w-full flex-col items-center gap-1 px-2 py-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                isActive
                  ? "bg-paper text-ink"
                  : "text-ink-3 hover:bg-paper hover:text-ink"
              }`}
              title={s.title}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-signal" />
              )}
              <span className="flex items-center gap-1.5">
                {isActive && <PulsingDot size={4} />}
                <span className="tabular-nums">{shortId}</span>
              </span>
              <span className="max-w-full truncate text-[9px] text-ink-4">
                {s.title.split(" · ")[0].slice(0, 10)}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-rule p-2">
        <button
          type="button"
          onClick={onNew}
          className="flex w-full flex-col items-center gap-1 border border-ink bg-paper px-2 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-signal-ink"
        >
          <span className="text-[14px] leading-none">+</span>
          <span>New</span>
        </button>
      </div>
    </aside>
  );
}
