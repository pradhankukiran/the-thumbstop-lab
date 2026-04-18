export type VectorKey =
  | "curiosity"
  | "specificity"
  | "patternInterrupt"
  | "emotion"
  | "stakes";

export type Vector = {
  key: VectorKey;
  number: string;
  abbr: string;
  shortLabel: string;
  name: string;
  definition: string;
  body: string;
  range: [number, number];
};

export const VECTORS: Vector[] = [
  {
    key: "curiosity",
    number: "01",
    abbr: "CUR",
    shortLabel: "CURIOSITY",
    name: "Curiosity Gap",
    definition: "The knowable unknown.",
    body: "A hook works when the viewer feels a question they need answered — and believes the answer is within reach. Vague curiosity loses. Targeted curiosity converts.",
    range: [40, 95],
  },
  {
    key: "specificity",
    number: "02",
    abbr: "SPC",
    shortLabel: "SPECIFICITY",
    name: "Specificity",
    definition: "Numbers, names, stakes.",
    body: "Precision at speed creates credibility. “$47,000” beats “a lot of money.” Every abstraction you leave in costs you a thumb.",
    range: [30, 98],
  },
  {
    key: "patternInterrupt",
    number: "03",
    abbr: "PAT",
    shortLabel: "PATTERN INT.",
    name: "Pattern Interrupt",
    definition: "A break from the expected.",
    body: "The brain prioritizes novelty. A visual, verbal, or structural break in the first frame forces the eye to process — and the thumb to pause.",
    range: [35, 92],
  },
  {
    key: "emotion",
    number: "04",
    abbr: "EMO",
    shortLabel: "EMOTION",
    name: "Emotional Charge",
    definition: "Arousal drives retention.",
    body: "Shock, delight, outrage, relief — the polarity matters less than the amplitude. Neutral hooks lose. Charged hooks compound.",
    range: [20, 96],
  },
  {
    key: "stakes",
    number: "05",
    abbr: "STK",
    shortLabel: "STAKES",
    name: "Stakes",
    definition: "What's lost or gained.",
    body: "Consequence anchors the watch. A hook without stakes is trivia. The viewer needs to feel that something changes if they keep watching — or if they don't.",
    range: [25, 94],
  },
];

export const VECTOR_BY_KEY: Record<VectorKey, Vector> = VECTORS.reduce(
  (acc, v) => {
    acc[v.key] = v;
    return acc;
  },
  {} as Record<VectorKey, Vector>,
);
