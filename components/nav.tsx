import Link from "next/link";

const ANCHORS = [
  { href: "#anatomy", label: "Anatomy", section: "§1" },
  { href: "#method", label: "Method", section: "§2" },
  { href: "#library", label: "Library", section: "§3" },
  { href: "#research", label: "Research", section: "§4" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.16em] text-ink"
        >
          <LabMark />
          <span className="hidden sm:inline">
            The&nbsp;Thumbstop&nbsp;Lab
          </span>
          <span className="sm:hidden">Thumbstop Lab</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {ANCHORS.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="group flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 transition-colors hover:text-ink"
            >
              <span className="text-ink-4 group-hover:text-signal">
                {a.section}
              </span>
              <span>{a.label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#launch"
          className="group flex h-9 items-center gap-2 bg-signal px-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-signal-ink transition-colors hover:bg-ink"
        >
          <span>Launch app</span>
          <span className="translate-x-0 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </header>
  );
}

function LabMark() {
  return (
    <span className="relative inline-flex h-5 w-5 items-center justify-center border border-ink">
      <span className="h-1.5 w-1.5 bg-signal" />
    </span>
  );
}
