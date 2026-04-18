import { SectionHeader } from "./section-header";
import { VectorIcon } from "./vector-icons";
import { VECTORS } from "@/lib/vectors";

export function Anatomy() {
  return (
    <section id="anatomy" className="relative border-b border-rule">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:py-32 lg:px-10">
        <SectionHeader
          number="1"
          label="Anatomy"
          title="The anatomy of a Thumbstop."
          lede="Five measurable vectors determine whether a thumb stops. The Lab scores each — so you can engineer the hook instead of guessing at it."
        />

        <div className="mt-16 grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
          {VECTORS.map((v, i) => {
            const total = VECTORS.length;
            const notLast = i < total - 1;
            const evenNotLast = i % 2 === 0 && i < total - 1;
            return (
            <div
              key={v.key}
              className={`flex flex-col gap-5 border-rule p-6 lg:p-7 ${
                notLast ? "border-b lg:border-b-0 lg:border-r" : ""
              } ${evenNotLast ? "sm:border-r" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-medium tabular-nums tracking-[0.12em] text-signal">
                  /{v.number}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-4">
                  Vector
                </span>
              </div>

              <div className="text-ink">
                <VectorIcon vector={v.key} className="h-12 w-12" />
              </div>

              <div>
                <h3 className="font-serif text-[26px] leading-[1.1] tracking-[-0.01em]">
                  {v.name}
                </h3>
                <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                  {v.definition}
                </p>
              </div>

              <p className="text-[14px] leading-[1.55] text-ink-2">{v.body}</p>

              {/* Range indicator */}
              <div className="mt-auto pt-4">
                <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-4">
                  <span>Typical range</span>
                  <span className="tabular-nums text-ink">
                    {v.range[0]}–{v.range[1]}
                  </span>
                </div>
                <div className="mt-2 relative h-[3px] w-full bg-off">
                  <div
                    className="absolute inset-y-0 bg-ink"
                    style={{
                      left: `${v.range[0]}%`,
                      width: `${v.range[1] - v.range[0]}%`,
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between font-mono text-[9px] tabular-nums text-ink-4">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
