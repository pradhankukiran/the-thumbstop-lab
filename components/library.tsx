import { SectionHeader } from "./section-header";
import { HookLibraryStrip } from "./hook-library-strip";
import { HOOKS } from "@/lib/hooks-data";
import { PulsingDot } from "./pulsing-dot";

export function Library() {
  const avg = Math.round(
    HOOKS.reduce((a, b) => a + b.total, 0) / HOOKS.length,
  );
  const niches = new Set(HOOKS.map((h) => h.niche)).size;

  return (
    <section id="library" className="relative border-b border-rule">
      <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-24 md:pt-32 lg:px-10">
        <SectionHeader
          number="3"
          label="Library"
          title="Specimens from the lab."
          lede="A rotating slice of hooks analyzed by the Lab, across fifteen niches. Every card is real output. Scored by the same engine that will score yours."
        />

        <div className="mt-10 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
          <div className="flex items-center gap-2">
            <PulsingDot size={5} />
            <span>Streaming · live sample</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span>
              Median score:{" "}
              <span className="tabular-nums text-ink">{avg}</span>
            </span>
            <span className="text-ink-4">·</span>
            <span>
              Niches sampled:{" "}
              <span className="tabular-nums text-ink">{niches}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="border-y border-rule bg-off py-10">
        <HookLibraryStrip />
      </div>

      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3 lg:px-10">
        <span>All specimens illustrative · scores are calibrated to niche</span>
        <a
          href="/app"
          className="group flex items-center gap-1.5 text-ink transition-colors hover:text-signal"
        >
          <span>View the full catalog</span>
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
