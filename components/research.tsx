import { SectionHeader } from "./section-header";
import { NotebookEntry } from "./notebook-entry";
import { RESEARCH_NOTES } from "@/lib/faq-data";

export function Research() {
  return (
    <section id="research" className="relative border-b border-rule bg-off">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-12 px-6 py-24 md:py-32 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <SectionHeader
            number="4"
            label="Research"
            title="Notes from the Lab."
            lede="An open dossier on what the Lab is measuring, how, and why. Opened for review before the app opens for use."
          />
          <div className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
            <div>Volume 01 · Issue 04</div>
            <div className="mt-1 text-ink-4">Revised 2026-04-17</div>
          </div>
        </div>

        <div className="mt-12 lg:col-span-8 lg:mt-0">
          <div className="border border-rule bg-paper px-6 md:px-8">
            {RESEARCH_NOTES.map((n, i) => (
              <NotebookEntry
                key={n.id}
                number={String(i + 1).padStart(2, "0")}
                question={n.question}
                answer={n.answer}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
