type SectionHeaderProps = {
  number: string;
  label: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  number,
  label,
  title,
  lede,
  align = "left",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center" : "text-left";
  const mx = align === "center" ? "mx-auto" : "";
  return (
    <div className={`${alignment}`}>
      <div
        className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="text-signal">§{number}</span>
        <span aria-hidden className="h-px w-6 bg-rule" />
        <span>{label}</span>
      </div>
      <h2
        className={`mt-5 font-serif text-[44px] leading-[1.02] tracking-[-0.02em] sm:text-[56px] md:text-[64px] ${mx} max-w-[18ch]`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-5 max-w-[56ch] text-[17px] leading-[1.55] text-ink-3 ${mx}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
