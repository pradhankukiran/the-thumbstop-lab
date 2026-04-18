import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thumbstop — The science of the scroll-stop",
  description:
    "Engineered hooks for short-form video. Every hook scored across five behavioral vectors — before it ever reaches a feed. Built at The Thumbstop Lab.",
  metadataBase: new URL("https://thumbstop.lab"),
  openGraph: {
    title: "Thumbstop — The science of the scroll-stop",
    description:
      "Engineered hooks for short-form video. Every hook scored across five behavioral vectors.",
    type: "website",
    siteName: "The Thumbstop Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thumbstop — The science of the scroll-stop",
    description:
      "Engineered hooks for short-form video. Every hook scored across five behavioral vectors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">{children}</body>
    </html>
  );
}
