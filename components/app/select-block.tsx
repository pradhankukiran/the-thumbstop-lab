"use client";

type SelectOption = { value: string; label: string };

type SelectBlockProps = {
  label: string;
  number?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  variant?: "dropdown" | "radio";
};

export function SelectBlock({
  label,
  number,
  value,
  options,
  onChange,
  variant = "dropdown",
}: SelectBlockProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
        {number && <span className="text-signal">/{number}</span>}
        <span>{label}</span>
      </div>
      {variant === "dropdown" ? (
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-full appearance-none border border-rule bg-paper pl-3 pr-9 font-sans text-[14px] text-ink focus:border-ink focus:outline-none"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-ink-3"
          >
            ▾
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0 border border-rule">
          {options.map((o, i) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => onChange(o.value)}
                className={`relative flex h-9 items-center justify-center font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors ${
                  i > 0 ? "border-l border-rule" : ""
                } ${
                  active
                    ? "bg-ink text-signal-ink"
                    : "bg-paper text-ink-3 hover:bg-off hover:text-ink"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
