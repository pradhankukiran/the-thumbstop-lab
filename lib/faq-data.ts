export type ResearchNote = {
  id: string;
  question: string;
  answer: string;
};

export const RESEARCH_NOTES: ResearchNote[] = [
  {
    id: "note-01",
    question: "What is the Thumbstop Score?",
    answer:
      "A 0–100 composite measure of a hook's likelihood of halting a scroll within the first 0.8 seconds of exposure. The score aggregates five behavioral vectors — Curiosity, Specificity, Pattern Interrupt, Emotion, and Stakes — each calibrated against a corpus of two million short-form videos with labeled retention outcomes. 80+ outperforms the median by a measurable margin.",
  },
  {
    id: "note-02",
    question: "How can curiosity be measured?",
    answer:
      "Curiosity isn't guessed — it's modeled. The engine scores a hook's “knowable unknown” by detecting referential gaps (unspecified subjects, undefined outcomes, implicit questions) and weighting them against how answerable they feel within the video's expected runtime. Hooks that promise a resolution viewers can imagine but not predict score highest. Targeted curiosity converts. Vague curiosity fails.",
  },
  {
    id: "note-03",
    question: "Which niches does this cover?",
    answer:
      "Every niche where short-form video lives: SaaS, DTC, fitness, finance, food, education, personal brand, real estate, parenting, travel, creator economy, B2B marketing, and more. The scoring engine is niche-aware — a 91 in finance doesn't mean the same thing as a 91 in fitness, and the Library reflects that calibration.",
  },
  {
    id: "note-04",
    question: "Is this just a prompt wrapped around GPT?",
    answer:
      "No. Hook generation leans on language models, but scoring does not. The Thumbstop Score is a deterministic model trained on a labeled corpus of short-form hooks paired with retention and watch-through data. Two hooks with identical LLM outputs receive the same score — because the scoring function is independent of the generation step. That's the entire point.",
  },
  {
    id: "note-05",
    question: "When does the app open to the public?",
    answer:
      "Thumbstop is currently in closed pilot with a small set of content agencies and creator-economy operators. A broader release is planned in stages through late 2026. If you run a content team shipping volume and want early access, use Launch app — it routes to the current intake.",
  },
];
