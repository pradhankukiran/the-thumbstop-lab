"use client";

type BaseProps = {
  label: string;
  hint?: string;
  number?: string;
};

type InputAsInputProps = BaseProps & {
  as?: "input";
} & React.InputHTMLAttributes<HTMLInputElement>;

type InputAsTextareaProps = BaseProps & {
  as: "textarea";
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputBlockProps = InputAsInputProps | InputAsTextareaProps;

export function InputBlock(props: InputBlockProps) {
  const { label, hint, number } = props;

  return (
    <div className="flex flex-col">
      <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
        <div className="flex items-center gap-2">
          {number && <span className="text-signal">/{number}</span>}
          <span>{label}</span>
        </div>
        {hint && <span className="text-ink-4">{hint}</span>}
      </div>
      {props.as === "textarea" ? (
        <textarea
          rows={props.rows ?? 3}
          className={`w-full resize-none border border-rule bg-paper px-3 py-2 font-sans text-[14px] leading-[1.5] text-ink placeholder:text-ink-4 focus:border-ink focus:outline-none ${
            props.className ?? ""
          }`}
          {...(extractTextareaProps(props) as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={`h-9 w-full border border-rule bg-paper px-3 font-sans text-[14px] text-ink placeholder:text-ink-4 focus:border-ink focus:outline-none ${
            props.className ?? ""
          }`}
          {...(extractInputProps(props) as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}

function extractInputProps(p: InputAsInputProps): React.InputHTMLAttributes<HTMLInputElement> {
  const { label: _l, hint: _h, number: _n, as: _a, className: _c, ...rest } = p;
  void _l;
  void _h;
  void _n;
  void _a;
  void _c;
  return rest as React.InputHTMLAttributes<HTMLInputElement>;
}

function extractTextareaProps(
  p: InputAsTextareaProps,
): React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  const { label: _l, hint: _h, number: _n, as: _a, rows: _r, className: _c, ...rest } = p;
  void _l;
  void _h;
  void _n;
  void _a;
  void _r;
  void _c;
  return rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}
