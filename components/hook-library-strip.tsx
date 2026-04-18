import { HookSpecimenCard } from "./hook-specimen-card";
import { HOOKS } from "@/lib/hooks-data";

export function HookLibraryStrip() {
  // Duplicate the set for seamless marquee loop
  const doubled = [...HOOKS, ...HOOKS];
  return (
    <div className="marquee-pause relative overflow-hidden">
      {/* Edge fades — match the off-white band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-[linear-gradient(to_right,var(--color-off),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-[linear-gradient(to_left,var(--color-off),transparent)]"
      />

      <div className="animate-marquee flex w-max gap-5">
        {doubled.map((hook, i) => (
          <HookSpecimenCard key={`${hook.id}-${i}`} hook={hook} />
        ))}
      </div>
    </div>
  );
}
