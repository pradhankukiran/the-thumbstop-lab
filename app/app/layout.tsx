import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thumbstop Studio — The Thumbstop Lab",
  description:
    "Engineered hook generator. Score every candidate across five behavioral vectors before it ships.",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper text-ink md:h-screen md:overflow-hidden">
      {children}
    </div>
  );
}
