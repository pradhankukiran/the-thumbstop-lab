"use client";

import type { Script } from "@/lib/app/types";
import { SectionLabel } from "./script-view";

export function CtaOptionsView({ script }: { script: Script }) {
  return (
    <div>
      <SectionLabel letter="D" title="CTA options" />
      <ul className="mt-3 flex flex-col gap-2">
        {script.ctaOptions.map((c, i) => (
          <li
            key={i}
            className="grid grid-cols-[28px_1fr] items-start gap-3 border-b border-rule pb-2 last:border-b-0"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-[14.5px] leading-[1.5] text-ink-2">
              {c}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
