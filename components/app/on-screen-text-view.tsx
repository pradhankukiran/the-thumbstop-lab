"use client";

import type { Script } from "@/lib/app/types";
import { SectionLabel } from "./script-view";

export function OnScreenTextView({ script }: { script: Script }) {
  return (
    <div>
      <SectionLabel letter="C" title="On-screen text" />
      <ul className="mt-3 flex flex-col gap-2">
        {script.onScreenText.map((t, i) => (
          <li
            key={i}
            className="flex items-start gap-3 border border-rule bg-off px-3 py-2"
          >
            <span className="font-mono text-[10px] tabular-nums tracking-[0.12em] text-ink-4">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-serif text-[16px] italic leading-[1.3] text-ink">
              &ldquo;{t}&rdquo;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
