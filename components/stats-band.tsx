import { CountUpNumber } from "./count-up-number";

const STATS = [
  {
    value: 0.8,
    decimals: 1,
    suffix: "s",
    label: "Median time before a thumb decides",
    meta: "Source · Lab corpus, 2026",
  },
  {
    value: 2.1,
    decimals: 1,
    suffix: "M+",
    label: "Short-form hooks analyzed",
    meta: "Corpus · rolling 24 months",
  },
  {
    value: 20,
    decimals: 0,
    suffix: "×",
    label: "Ideation speed vs. manual",
    meta: "Measured · pilot cohort",
  },
  {
    value: 5,
    decimals: 0,
    suffix: "",
    label: "Behavioral vectors scored per hook",
    meta: "Engine · v1.0",
  },
];

export function StatsBand() {
  return (
    <section className="relative border-b border-rule bg-paper">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:py-24 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-[52ch]">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
              For teams shipping volume
            </div>
            <h3 className="mt-4 font-serif text-[40px] leading-[1.05] tracking-[-0.02em] sm:text-[52px]">
              At a hundred videos a month, hook quality is not an art problem. It&rsquo;s a throughput problem.
            </h3>
          </div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-3">
            <div>Fig. 02 — Lab Telemetry</div>
            <div className="mt-1 text-ink-4">Updated 2026-04-17</div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col gap-3 bg-paper p-7 lg:p-8">
              <div
                className="font-mono tabular-nums text-[64px] font-medium leading-none text-ink lg:text-[80px]"
                style={{ letterSpacing: "-0.04em" }}
              >
                <CountUpNumber
                  to={s.value}
                  decimals={s.decimals}
                  suffix={s.suffix}
                />
              </div>
              <div className="text-[14px] leading-[1.45] text-ink-2">
                {s.label}
              </div>
              <div className="mt-auto border-t border-rule pt-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-4">
                {s.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
