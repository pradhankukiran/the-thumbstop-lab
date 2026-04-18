import type { Hook } from "@/lib/hooks-data";

export type Platform = "tiktok" | "reels" | "shorts";
export type Angle =
  | "contrarian"
  | "educational"
  | "story"
  | "pov"
  | "list";

export type Brief = {
  niche: string;
  voice: string;
  angle?: Angle;
  taboo?: string;
  platform?: Platform;
};

export type Candidate = Hook;

export type ScriptBeat = {
  timecode: string;
  label: string;
  body: string;
  performance?: string;
};

export type ShotKind =
  | "close-up"
  | "wide"
  | "b-roll"
  | "overlay"
  | "voiceover";

export type Shot = {
  id: string;
  kind: ShotKind;
  description: string;
  seconds: number;
};

export type Script = {
  runtimeSeconds: number;
  beats: ScriptBeat[];
  shots: Shot[];
  onScreenText: string[];
  ctaOptions: string[];
};

export type Session = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  brief: Brief;
  candidates: Candidate[];
  selectedCandidateId?: string;
  savedCandidateIds: string[];
};

export type AppState = {
  version: 1;
  activeSessionId: string;
  sessions: Record<string, Session>;
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: "TikTok",
  reels: "Reels",
  shorts: "Shorts",
};

export const ANGLE_LABELS: Record<Angle, string> = {
  contrarian: "Contrarian",
  educational: "Educational",
  story: "Story",
  pov: "POV",
  list: "List",
};
