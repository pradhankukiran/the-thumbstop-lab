"use client";

import type { Script } from "@/lib/app/types";
import { SectionLabel } from "./script-view";

export function ShotListView({ script }: { script: Script }) {
  const total = script.shots.reduce((a, s) => a + s.seconds, 0);
  return (
    <div>
      <SectionLabel
        letter="B"
        title="Shot list"
        meta={`${script.shots.length} shots · ${total}s`}
      />
      <ol className="mt-3 flex flex-col">
        {script.shots.map((s) => (
          <li
            key={s.id}
            className="grid grid-cols-[40px_100px_1fr_40px] items-start gap-3 border-b border-rule py-2.5 last:border-b-0"
          >
            <span className="font-mono text-[10px] tabular-nums tracking-[0.12em] text-ink-3">
              {s.id}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-2">
              {s.kind}
            </span>
            <span className="text-[14px] leading-[1.45] text-ink">
              {s.description}
            </span>
            <span className="text-right font-mono text-[11px] tabular-nums text-ink-3">
              {s.seconds}s
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
