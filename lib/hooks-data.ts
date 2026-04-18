import type { VectorKey } from "./vectors";

export type Hook = {
  id: string;
  text: string;
  niche: string;
  scores: Record<VectorKey, number>;
  total: number;
  date: string;
};

const hooks: Omit<Hook, "total">[] = [
  {
    id: "SUBJECT-0042",
    text: "I fired my top salesperson. Revenue went up 40% the next quarter.",
    niche: "SaaS",
    scores: {
      curiosity: 94,
      specificity: 88,
      patternInterrupt: 91,
      emotion: 82,
      stakes: 89,
    },
    date: "2026-04-11",
  },
  {
    id: "SUBJECT-0118",
    text: "I lost 30 pounds eating the foods my doctor told me to avoid.",
    niche: "Fitness",
    scores: {
      curiosity: 90,
      specificity: 84,
      patternInterrupt: 88,
      emotion: 79,
      stakes: 83,
    },
    date: "2026-04-09",
  },
  {
    id: "SUBJECT-0207",
    text: "The $12 bank fee that's quietly costing you $47,000 in retirement.",
    niche: "Finance",
    scores: {
      curiosity: 92,
      specificity: 96,
      patternInterrupt: 71,
      emotion: 85,
      stakes: 93,
    },
    date: "2026-04-07",
  },
  {
    id: "SUBJECT-0291",
    text: "We hid our 'Add to Cart' button for 48 hours. Sales tripled.",
    niche: "Ecommerce",
    scores: {
      curiosity: 93,
      specificity: 82,
      patternInterrupt: 94,
      emotion: 74,
      stakes: 80,
    },
    date: "2026-04-05",
  },
  {
    id: "SUBJECT-0344",
    text: "Restaurant pasta hits different because of one ingredient you can buy for $4.",
    niche: "Food",
    scores: {
      curiosity: 89,
      specificity: 87,
      patternInterrupt: 68,
      emotion: 71,
      stakes: 62,
    },
    date: "2026-04-03",
  },
  {
    id: "SUBJECT-0408",
    text: "I had 200k followers and made zero dollars. Then I changed one line in my bio.",
    niche: "Creator",
    scores: {
      curiosity: 95,
      specificity: 86,
      patternInterrupt: 77,
      emotion: 78,
      stakes: 84,
    },
    date: "2026-04-02",
  },
  {
    id: "SUBJECT-0471",
    text: "This $180k fixer-upper sold for $1.2M. The buyer never renovated it.",
    niche: "Real Estate",
    scores: {
      curiosity: 91,
      specificity: 92,
      patternInterrupt: 86,
      emotion: 73,
      stakes: 88,
    },
    date: "2026-03-31",
  },
  {
    id: "SUBJECT-0523",
    text: "Harvard studied 268 men for 75 years. The #1 predictor of happiness wasn't money.",
    niche: "Education",
    scores: {
      curiosity: 93,
      specificity: 94,
      patternInterrupt: 64,
      emotion: 76,
      stakes: 85,
    },
    date: "2026-03-29",
  },
  {
    id: "SUBJECT-0589",
    text: "I journaled every day for a year. I don't recommend it.",
    niche: "Personal Dev",
    scores: {
      curiosity: 87,
      specificity: 70,
      patternInterrupt: 93,
      emotion: 72,
      stakes: 67,
    },
    date: "2026-03-26",
  },
  {
    id: "SUBJECT-0637",
    text: "Our churn dropped 60% after we deleted our onboarding emails.",
    niche: "B2B SaaS",
    scores: {
      curiosity: 90,
      specificity: 89,
      patternInterrupt: 92,
      emotion: 66,
      stakes: 81,
    },
    date: "2026-03-24",
  },
  {
    id: "SUBJECT-0702",
    text: "The interview question that gets you hired isn't about you.",
    niche: "Career",
    scores: {
      curiosity: 91,
      specificity: 64,
      patternInterrupt: 80,
      emotion: 72,
      stakes: 84,
    },
    date: "2026-03-22",
  },
  {
    id: "SUBJECT-0768",
    text: "My 4-year-old ended our dinner-table fights with one question.",
    niche: "Parenting",
    scores: {
      curiosity: 94,
      specificity: 68,
      patternInterrupt: 89,
      emotion: 86,
      stakes: 71,
    },
    date: "2026-03-20",
  },
  {
    id: "SUBJECT-0815",
    text: "Our worst-performing ad made us $2M. We're running it again.",
    niche: "Marketing",
    scores: {
      curiosity: 92,
      specificity: 83,
      patternInterrupt: 91,
      emotion: 70,
      stakes: 78,
    },
    date: "2026-03-17",
  },
  {
    id: "SUBJECT-0884",
    text: "Your sleep isn't the problem. Your bedroom is lying to you.",
    niche: "Health",
    scores: {
      curiosity: 88,
      specificity: 61,
      patternInterrupt: 87,
      emotion: 81,
      stakes: 76,
    },
    date: "2026-03-15",
  },
  {
    id: "SUBJECT-0946",
    text: "I cancelled every recurring meeting on my calendar. Nobody noticed.",
    niche: "Productivity",
    scores: {
      curiosity: 86,
      specificity: 72,
      patternInterrupt: 90,
      emotion: 68,
      stakes: 73,
    },
    date: "2026-03-13",
  },
];

function computeTotal(scores: Hook["scores"]): number {
  const values = Object.values(scores);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.round(avg);
}

export const HOOKS: Hook[] = hooks.map((h) => ({
  ...h,
  total: computeTotal(h.scores),
}));

export const FEATURED_HOOK: Hook =
  HOOKS.find((h) => h.id === "SUBJECT-0042") ?? HOOKS[0];
