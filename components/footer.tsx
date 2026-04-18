const LINKS = [
  { href: "#anatomy", label: "Anatomy" },
  { href: "#method", label: "Method" },
  { href: "#library", label: "Library" },
  { href: "#research", label: "Research" },
  { href: "/app", label: "Launch" },
];

export function Footer() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-12 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-rule pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative inline-flex h-5 w-5 items-center justify-center border border-ink">
                <span className="h-1.5 w-1.5 bg-signal" />
              </span>
              <span className="font-mono text-[12px] uppercase tracking-[0.16em]">
                The Thumbstop Lab
              </span>
            </div>
            <p className="mt-5 max-w-[44ch] font-serif text-[22px] leading-[1.2] tracking-[-0.01em] text-ink">
              Engineering the attention economy, one hook at a time.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4 md:grid-cols-3">
          <div>
            <span>© 2026 · The Thumbstop Lab</span>
          </div>
          <div className="md:text-center">
            <span>Est. 2026 · Engineered for short-form</span>
          </div>
          <div className="md:text-right">
            <span>All specimens illustrative · corpus v1.0</span>
          </div>
        </div>

        <div className="mt-8 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-4">
          <span className="text-ink-3">Lab notation:</span>{" "}
          T(score) = Σ w<sub>i</sub> · v<sub>i</sub> · niche-kernel(ω)
          &nbsp;·&nbsp; i ∈ &#123;cur, spec, pint, emo, stk&#125;
        </div>
      </div>
    </footer>
  );
}
