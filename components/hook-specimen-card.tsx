import type { Hook } from "@/lib/hooks-data";
import { VECTORS } from "@/lib/vectors";

type HookSpecimenCardProps = {
  hook: Hook;
  className?: string;
};

export function HookSpecimenCard({
  hook,
  className = "",
}: HookSpecimenCardProps) {
  return (
    <article
      className={`flex h-[280px] w-[340px] shrink-0 flex-col justify-between border border-rule bg-paper p-5 transition-colors hover:border-ink ${className}`}
      aria-label={`Specimen ${hook.id}`}
    >
      <div>
        <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-3">
          <span>{hook.id}</span>
          <span className="border border-rule px-1.5 py-[2px] text-ink-2">
            {hook.niche}
          </span>
        </div>
        <p className="mt-4 font-serif text-[20px] leading-[1.18] tracking-[-0.01em]">
          &ldquo;{hook.text}&rdquo;
        </p>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-3">
            Score
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className="font-mono tabular-nums text-[40px] font-medium leading-none text-signal"
              style={{ letterSpacing: "-0.04em" }}
            >
              {hook.total}
            </span>
            <span className="font-mono text-[11px] text-ink-4">/100</span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {VECTORS.map((v) => {
            const value = hook.scores[v.key];
            return (
              <div key={v.key} className="flex flex-col gap-1">
                <div className="relative h-[4px] w-full bg-off">
                  <div
                    className="absolute inset-y-0 left-0 bg-ink"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-4">
                  {v.abbr}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
