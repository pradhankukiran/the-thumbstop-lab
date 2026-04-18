import { PulsingDot } from "./pulsing-dot";

export function CtaBand() {
  return (
    <section id="launch" className="relative border-b border-rule bg-paper">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:py-32 lg:px-10">
        <div className="grid grid-cols-12 items-end gap-x-6 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-9">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
              <PulsingDot size={6} />
              <span>The Lab is open</span>
            </div>
            <h2 className="mt-6 font-serif text-[48px] leading-[1] tracking-[-0.025em] sm:text-[72px] md:text-[96px] lg:text-[104px]">
              Stop making thumbs
              <br />
              <span className="italic">scroll past.</span>
            </h2>
          </div>
          <div className="col-span-12 mt-10 flex flex-col items-start gap-5 lg:col-span-3 lg:mt-0 lg:items-end">
            <a
              href="/app"
              className="group inline-flex h-14 items-center gap-3 bg-signal px-6 font-mono text-[13px] uppercase tracking-[0.2em] text-signal-ink transition-colors hover:bg-ink"
            >
              <span>Launch app</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#research"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 transition-colors hover:text-ink"
            >
              <span>Follow the research</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 border-t border-rule pt-8 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3 md:grid-cols-3">
          <div>
            <span className="text-ink-4">Filed under</span>{" "}
            <span className="text-ink">Short-form · Growth · Creative Ops</span>
          </div>
          <div>
            <span className="text-ink-4">Review cohort</span>{" "}
            <span className="text-ink">Agencies · in-house teams · operators</span>
          </div>
          <div className="md:text-right">
            <span className="text-ink-4">Engine</span>{" "}
            <span className="text-ink">v1.0 · calibrated 2026-04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
