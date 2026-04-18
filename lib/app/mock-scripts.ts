import type { Candidate, Script } from "./types";

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

const SETUP_TEMPLATES = [
  "For the last six weeks I tracked this obsessively. Spreadsheets, receipts, video review — everything. The pattern only showed up after I zoomed out.",
  "We've all been sold the wrong version of this story. I used to be the loudest person in the room selling it. Then the numbers came in.",
  "The first time someone told me this, I laughed. Two years later my whole approach is built around it — and I can prove every step of why.",
  "Every expert I'd followed said the opposite. I figured either they were all right or I'd missed something obvious. It was the second one.",
  "I'd already tried the obvious answer twice. The third time I stopped copying and actually looked at the data. The fix was smaller than I thought.",
];

const PAYOFF_TEMPLATES = [
  "The mechanism is simpler than the result suggests. Three constraints are doing all the work — and once you name them, the strategy picks itself. Constraint one is time. Constraint two is identity. Constraint three is the asymmetry between noise and signal. Let me show you what changes when you treat those three as inputs instead of afterthoughts.",
  "Here's the thing nobody says out loud: the lever isn't where the coaching industry points. It's one layer below. And it's cheaper, boring, and always available. In about six seconds I'll show you where it lives, what it replaces, and why you've almost certainly overlooked it three times this month.",
  "Skip the parts that feel like work. That's the trick. The part that felt like cheating was the part that actually moved the numbers. Once I stopped penalizing myself for the easy wins, the compounding showed up within fourteen days. I have the screenshots to prove it — and you're about to watch me break down exactly which wins count.",
  "You've been measuring the wrong thing. It's not effort, it's not willpower, it's not consistency. It's a single downstream signal that only shows up after you stop chasing the upstream ones. I'll show you how to find it in your own data in under a minute.",
  "The counterintuitive move is to do less of the thing everyone tells you to do more of. I stripped my routine down to three moves I can execute on a bad day. That's it. Bad-day-compatible beats ideal-day-optimal every time. The math isn't close.",
];

const CTA_TEMPLATES = [
  "Save this before you scroll past — you'll come back to it tonight. Follow so the next one lands in your feed first.",
  "Drop a ✓ in the comments if you're trying this. I'll pin the best result next week. Follow for the full breakdown.",
  "If this hit — the next three videos dig deeper into the exact scripts I used. Follow so the algorithm serves you the sequel.",
  "Screenshot this for the person in your life who needs to hear it. Follow for part two where we expose the spreadsheet.",
];

const SHOT_LIBRARY: Array<{
  kind: "close-up" | "wide" | "b-roll" | "overlay" | "voiceover";
  description: string;
  seconds: number;
}> = [
  { kind: "close-up", description: "Talent looks direct to camera. Hand on jaw. Slight raised brow.", seconds: 3 },
  { kind: "wide", description: "Pull back reveals the setting — kitchen counter, desk, studio.", seconds: 4 },
  { kind: "b-roll", description: "Over-shoulder on a notebook, handwriting the key phrase.", seconds: 3 },
  { kind: "overlay", description: "Bold on-screen text punctuates the claim. No emoji.", seconds: 2 },
  { kind: "close-up", description: "Hands manipulating an object relevant to the niche (dumbbell, cup, card).", seconds: 4 },
  { kind: "b-roll", description: "Short real-world cutaway: commute, gym floor, checkout counter.", seconds: 3 },
  { kind: "voiceover", description: "Audio-only beat over a clean static frame — lets the payoff breathe.", seconds: 3 },
  { kind: "overlay", description: "Stat card animates in — single number, monospace.", seconds: 2 },
  { kind: "close-up", description: "Eyes only. Cut to silence before the CTA lands.", seconds: 2 },
];

const ONSCREEN_TEMPLATES = [
  "Save this. Seriously.",
  "Most people stop watching here.",
  "This is the part they don't tell you.",
  "Not a hack. Not a trick. A constraint.",
  "The thing nobody posts about.",
  "Watch what happens in the last 8 seconds.",
];

export function buildScript(candidate: Candidate): Script {
  const seed = hashSeed(candidate.id);

  const setup = pick(SETUP_TEMPLATES, seed);
  const payoff = pick(PAYOFF_TEMPLATES, seed >> 3);
  const cta1 = pick(CTA_TEMPLATES, seed >> 5);
  const cta2 = pick(CTA_TEMPLATES, (seed >> 7) ^ 1);
  const cta3 = pick(CTA_TEMPLATES, (seed >> 11) ^ 2);

  const beats = [
    {
      timecode: "0:00–0:03",
      label: "Hook",
      body: candidate.text,
      performance: "Dead-stop delivery. No smile. Look directly at lens.",
    },
    {
      timecode: "0:03–0:10",
      label: "Setup",
      body: setup,
      performance: "Lower register. Pace 10% slower than the hook.",
    },
    {
      timecode: "0:10–0:22",
      label: "Payoff",
      body: payoff,
      performance: "Gesture once at the key word. Hold eye contact on the stat.",
    },
    {
      timecode: "0:22–0:30",
      label: "CTA",
      body: cta1,
      performance: "Warm tone. Quick. Don't linger.",
    },
  ];

  const shotStart = seed % (SHOT_LIBRARY.length - 5);
  const shots = SHOT_LIBRARY.slice(shotStart, shotStart + 6).map((s, i) => ({
    id: String(i + 1).padStart(2, "0"),
    kind: s.kind,
    description: s.description,
    seconds: s.seconds,
  }));

  const textIdx = seed % (ONSCREEN_TEMPLATES.length - 2);
  const onScreenText = [
    ONSCREEN_TEMPLATES[textIdx],
    ONSCREEN_TEMPLATES[textIdx + 1],
    ONSCREEN_TEMPLATES[textIdx + 2],
  ];

  const ctaOptions = [cta1, cta2, cta3];

  return {
    runtimeSeconds: 30,
    beats,
    shots,
    onScreenText,
    ctaOptions,
  };
}

export function scriptToMarkdown(
  candidate: Candidate,
  script: Script,
): string {
  const lines: string[] = [];
  lines.push(`# ${candidate.id} · ${candidate.niche}`);
  lines.push(`> ${candidate.text}`);
  lines.push("");
  lines.push(`**Thumbstop Score:** ${candidate.total}/100`);
  lines.push("");
  lines.push(`## Script · ${script.runtimeSeconds}s`);
  for (const b of script.beats) {
    lines.push("");
    lines.push(`**${b.timecode} · ${b.label}**`);
    lines.push(b.body);
    if (b.performance) {
      lines.push("");
      lines.push(`_Performance: ${b.performance}_`);
    }
  }
  lines.push("");
  lines.push("## Shot list");
  for (const s of script.shots) {
    lines.push(`- ${s.id}. [${s.kind}] ${s.description} — ${s.seconds}s`);
  }
  lines.push("");
  lines.push("## On-screen text");
  for (const t of script.onScreenText) {
    lines.push(`- ${t}`);
  }
  lines.push("");
  lines.push("## CTA options");
  for (const c of script.ctaOptions) {
    lines.push(`- ${c}`);
  }
  lines.push("");
  lines.push(`— The Thumbstop Lab`);
  return lines.join("\n");
}
