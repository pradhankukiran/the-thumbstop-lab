"use client";

import type { Angle, Brief, Platform } from "@/lib/app/types";
import { ANGLE_LABELS, PLATFORM_LABELS } from "@/lib/app/types";
import { InputBlock } from "./input-block";
import { SelectBlock } from "./select-block";
import { GenerateButton } from "./generate-button";
import { PulsingDot } from "@/components/pulsing-dot";

type BriefPanelProps = {
  brief: Brief;
  generating: boolean;
  targetCount: number;
  onChange: (patch: Partial<Brief>) => void;
  onGenerate: () => void;
};

export function BriefPanel({
  brief,
  generating,
  targetCount,
  onChange,
  onGenerate,
}: BriefPanelProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !generating) {
      e.preventDefault();
      onGenerate();
    }
  };

  const disabled = !brief.niche.trim();

  return (
    <section
      onKeyDown={handleKeyDown}
      className="flex w-full shrink-0 flex-col border-b border-rule bg-paper md:h-full md:w-[360px] md:border-b-0 md:border-r"
    >
      <header className="flex items-center justify-between border-b border-rule px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="text-signal">§1</span>
          <span className="text-ink">Brief</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-3">
          <PulsingDot size={4} />
          <span>Live</span>
        </div>
      </header>

      <div className="flex-1 px-5 py-5 md:overflow-y-auto">
        <div className="flex flex-col gap-5">
          <InputBlock
            label="Niche"
            number="01"
            as="textarea"
            rows={3}
            value={brief.niche}
            onChange={(e) => onChange({ niche: e.target.value })}
            placeholder="e.g. Fitness coach for busy moms who want results without giving up date nights"
            hint={`${brief.niche.length}/200`}
          />

          <InputBlock
            label="Brand voice"
            number="02"
            value={brief.voice}
            onChange={(e) => onChange({ voice: e.target.value })}
            placeholder="Direct, warm, zero fluff"
          />

          <SelectBlock
            label="Angle"
            number="03"
            value={brief.angle ?? "contrarian"}
            options={(Object.keys(ANGLE_LABELS) as Angle[]).map((a) => ({
              value: a,
              label: ANGLE_LABELS[a],
            }))}
            onChange={(v) => onChange({ angle: v as Angle })}
          />

          <InputBlock
            label="Taboo list"
            number="04"
            as="textarea"
            rows={2}
            value={brief.taboo ?? ""}
            onChange={(e) => onChange({ taboo: e.target.value })}
            placeholder="No weight-loss guilt. No crash-diet language."
          />

          <SelectBlock
            label="Platform"
            number="05"
            value={brief.platform ?? "tiktok"}
            variant="radio"
            options={(Object.keys(PLATFORM_LABELS) as Platform[]).map((p) => ({
              value: p,
              label: PLATFORM_LABELS[p],
            }))}
            onChange={(v) => onChange({ platform: v as Platform })}
          />
        </div>
      </div>

      <footer className="border-t border-rule px-5 py-4">
        <GenerateButton
          loading={generating}
          disabled={disabled}
          onClick={onGenerate}
          count={targetCount}
        />
        <div className="mt-3 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-4">
          <span>⌘ + Enter to run</span>
          <span>Engine · v1.0</span>
        </div>
      </footer>
    </section>
  );
}
