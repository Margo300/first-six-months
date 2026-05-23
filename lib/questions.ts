export type ScaleOption = {
  label: string;
  value: number | null; // null = neutral (Not yet / N/A)
};

export type Question = {
  id: number;
  text: string;
  dimension: number | null; // null = opening question
  options?: ScaleOption[]; // override default options
};

export type Dimension = {
  id: number;
  title: string;
};

export const DEFAULT_OPTIONS: ScaleOption[] = [
  { label: "Rarely", value: 1 },
  { label: "Occasionally", value: 2 },
  { label: "Frequently", value: 3 },
  { label: "Almost always", value: 4 },
];

export const DIMENSIONS: Dimension[] = [
  { id: 1, title: "Self-doubt and inner questioning" },
  { id: 2, title: "Confidence and self-perception" },
  { id: 3, title: "Clarity and direction" },
  { id: 4, title: "Relationships and influence" },
];

export const QUESTIONS: Question[] = [
  {
    id: 0,
    text: "I am finding the demands of this role manageable.",
    dimension: null,
  },
  {
    id: 1,
    text: "I find myself wondering whether I am genuinely the right person for this role.",
    dimension: 1,
  },
  {
    id: 2,
    text: "I replay conversations or decisions, questioning whether I handled them well.",
    dimension: 1,
  },
  {
    id: 3,
    text: "When things go well, I put it down to luck or good timing rather than my own ability.",
    dimension: 1,
  },
  {
    id: 4,
    text: "When I have a difficult week, I find it hard to recover without it knocking my confidence.",
    dimension: 1,
  },
  {
    id: 5,
    text: "I feel confident in how I come across to the people around me.",
    dimension: 2,
  },
  {
    id: 6,
    text: "I can walk into a difficult conversation or meeting without significant dread beforehand.",
    dimension: 2,
  },
  {
    id: 7,
    text: "I have a clear sense of what I bring to this role that others do not.",
    dimension: 2,
  },
  {
    id: 8,
    text: "I have a clear sense of my own strengths and I am able to rely on them, even when my way of working differs from those around me.",
    dimension: 2,
  },
  {
    id: 9,
    text: "I know what success looks like for me in this role over the next six months.",
    dimension: 3,
    options: [
      { label: "Not at all", value: 1 },
      { label: "Partly", value: 2 },
      { label: "Mostly", value: 3 },
      { label: "Yes, clearly", value: 4 },
    ],
  },
  {
    id: 10,
    text: "When priorities shift or conflict, I have a clear enough sense of direction to make decisions without second-guessing myself.",
    dimension: 3,
  },
  {
    id: 11,
    text: "I feel in control of my own agenda rather than constantly reactive.",
    dimension: 3,
  },
  {
    id: 12,
    text: "I feel able to set limits on what I take on, even when the pressure to say yes is high.",
    dimension: 3,
  },
  {
    id: 13,
    text: "I am building the relationships I need to be effective in this role.",
    dimension: 4,
    options: [
      { label: "Not yet", value: 1 },
      { label: "Making a start", value: 2 },
      { label: "Mostly there", value: 3 },
      { label: "Yes, definitely", value: 4 },
    ],
  },
  {
    id: 14,
    text: "I feel confident raising challenge or disagreement with people senior to me.",
    dimension: 4,
  },
  {
    id: 15,
    text: "I have at least one person at work I can be honest with about how I am finding things.",
    dimension: 4,
    options: [
      { label: "Not yet", value: null },
      { label: "Not really", value: 1 },
      { label: "To some extent", value: 3 },
      { label: "Yes, definitely", value: 4 },
    ],
  },
  {
    id: 16,
    text: "If I have been promoted within the same organisation, I have successfully managed the shift in relationships with people who were previously my peers.",
    dimension: 4,
    options: [
      { label: "Rarely", value: 1 },
      { label: "Occasionally", value: 2 },
      { label: "Frequently", value: 3 },
      { label: "Almost always", value: 4 },
      { label: "N/A", value: null },
    ],
  },
];

// Dimensions 1 is reverse-scored (high score = more self-doubt = harder)
// For display we normalise so higher = better across all dimensions
export const REVERSE_SCORED_DIMENSIONS = [1];

export type Band = "finding-it-hard" | "in-the-middle" | "largely-settled";

export function scoreDimension(
  dimensionId: number,
  answers: Record<number, number | null>
): { band: Band; score: number; answeredCount: number } {
  const qs = QUESTIONS.filter((q) => q.dimension === dimensionId);
  const scored = qs
    .map((q) => answers[q.id])
    .filter((v): v is number => v !== undefined && v !== null);

  if (scored.length === 0) {
    return { band: "in-the-middle", score: 2.5, answeredCount: 0 };
  }

  const raw = scored.reduce((a, b) => a + b, 0) / scored.length;

  // Reverse dimension 1: low scores (lots of self-doubt) → high difficulty
  const normalised = REVERSE_SCORED_DIMENSIONS.includes(dimensionId)
    ? 5 - raw
    : raw;

  let band: Band;
  if (normalised < 2.25) band = "finding-it-hard";
  else if (normalised < 3.25) band = "in-the-middle";
  else band = "largely-settled";

  return { band, score: normalised, answeredCount: scored.length };
}
