"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type NotebookEntryProps = {
  number: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export function NotebookEntry({
  number,
  question,
  answer,
  defaultOpen = false,
}: NotebookEntryProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-rule last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-5 py-6 text-left md:py-7"
        aria-expanded={open}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 group-hover:text-signal">
          Note {number}
        </span>
        <span className="font-serif text-[24px] leading-[1.2] tracking-[-0.01em] text-ink group-hover:text-ink sm:text-[28px]">
          {question}
        </span>
        <span
          aria-hidden
          className={`ml-4 flex h-7 w-7 items-center justify-center border border-ink text-[14px] transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.22 },
            }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-[auto_1fr] items-start gap-5 pb-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
                A.
              </span>
              <p className="max-w-[72ch] text-[15.5px] leading-[1.65] text-ink-2">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
