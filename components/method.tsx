import { SectionHeader } from "./section-header";
import { FileText, Sparkles, Download } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Input context.",
    body: "Niche, angle, brand voice, taboo list. One paragraph is enough. The Lab infers tone, constraints, and audience before a single hook is written.",
    Icon: FileText,
    meta: "Input · seconds",
  },
  {
    step: "02",
    title: "Generate & rank.",
    body: "Twenty hook candidates, each scored across five behavioral vectors. Top three surface instantly. The others stay ranked in the dossier for A/B rotation.",
    Icon: Sparkles,
    meta: "Process · 6–8s",
  },
  {
    step: "03",
    title: "Export with script.",
    body: "Full thirty-second script, shot list, on-screen text, and CTA. One click to Google Docs, Notion, or your CMS. The hook arrives production-ready.",
    Icon: Download,
    meta: "Output · formatted",
  },
];

export function Method() {
  return (
    <section
      id="method"
      className="relative border-b border-rule bg-off"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:py-32 lg:px-10">
        <SectionHeader
          number="2"
          label="Method"
          title="From topic to thumb-stopper in eight seconds."
          lede="A three-step protocol built for content teams shipping volume. No blank-page paralysis. No committee reviews. No prompt engineering."
        />

        <div className="mt-16 grid grid-cols-1 border border-rule bg-paper md:grid-cols-3 lg:mt-20">
          {STEPS.map((s, i) => (
            <div
              key={s.step}
              className={`relative flex flex-col gap-6 p-8 lg:p-10 ${
                i < STEPS.length - 1
                  ? "border-b border-rule md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
                  <span>Step {s.step}</span>
                  <span className="text-ink-4">/ 03</span>
                </div>
                <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-4">
                  {s.meta}
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span
                  className="font-serif italic text-[80px] leading-[0.9] tracking-[-0.03em] text-ink-4"
                  aria-hidden
                >
                  {s.step}
                </span>
                <div className="mt-3 border border-rule p-2.5 text-ink">
                  <s.Icon size={18} strokeWidth={1.25} />
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="font-serif text-[30px] leading-[1.08] tracking-[-0.015em]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-ink-2">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
