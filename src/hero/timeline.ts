// The hero's script. Everything on the stage is a pure function of the clock `t`
// (ms since the loop started), read from the times and data below. Changing the
// story means editing this file, not the components.

export const LOOP_MS = 23600;
/** The frame shown when motion is reduced: the finished review, every finding fixed. */
export const STILL_MS = 21500;
/** The dojo's clock runs faster than ours, so the times it shows look like a real run. */
export const DOJO_SPEEDUP = 9;

export const T = {
  windowIn: 3000,
  dojoStart: 3900,
  seatsIn: 4200,
  results: 13400,
  sendClick: 15600,
  flyStart: 15700,
  flyEnd: 16500,
  pickedUp: 16600,
  diffUpdated: 18200,
  approveClick: 19800,
  committed: 20300,
  fadeOut: 23000,
} as const;

export type Chapter = { label: string; at: number };

export const CHAPTERS: Chapter[] = [
  { label: "Your agent commits", at: 0 },
  { label: "Agents review", at: T.seatsIn },
  { label: "They vote", at: 10200 },
  { label: "The author fixes", at: T.sendClick - 600 },
];

// ── The author: Claude Code in a terminal ──

export type TerminalLine =
  | { kind: "prompt"; at: number; text: string }
  | { kind: "tool"; at: number; name: string; arg: string }
  | { kind: "result"; at: number; text: string; tone?: "ok" | "gate" };

export const TERMINAL: TerminalLine[] = [
  { kind: "prompt", at: 0, text: "add a sliding-window rate limiter to the API" },
  { kind: "tool", at: 1100, name: "Write", arg: "src/rate-limit.ts" },
  { kind: "result", at: 1400, text: "Wrote 10 lines" },
  { kind: "tool", at: 1900, name: "Bash", arg: 'git commit -m "Add a rate limiter"' },
  { kind: "result", at: 2700, text: "diffprism: review open, waiting for your decision", tone: "gate" },
  { kind: "result", at: T.pickedUp, text: "The review sent 2 findings to fix" },
  { kind: "tool", at: 17100, name: "Update", arg: "src/rate-limit.ts" },
  { kind: "result", at: 17350, text: "Forget a user once their window is empty" },
  { kind: "tool", at: 17700, name: "Write", arg: "test/rate-limit.test.ts" },
  { kind: "result", at: 17950, text: "Test the edge of the window" },
  { kind: "tool", at: 18400, name: "Bash", arg: "diffprism reply --fixed (2)" },
  { kind: "tool", at: 19100, name: "Bash", arg: 'git commit -m "Add a rate limiter"' },
  { kind: "result", at: T.committed, text: "Approved in DiffPrism · [main 3f2a91c] Add a rate limiter", tone: "ok" },
];

// ── The change under review ──

export type DiffLine = { n: number; code: string; added?: boolean };

export const FILE = "src/rate-limit.ts";

export const DIFF: DiffLine[] = [
  { n: 1, code: "const hits = new Map<string, number[]>();", added: true },
  { n: 2, code: "", added: true },
  { n: 3, code: "export function allow(user: string, limit = 10, windowMs = 60_000) {", added: true },
  { n: 4, code: "  const now = Date.now();", added: true },
  { n: 5, code: "  const recent = (hits.get(user) ?? []).filter((t) => now - t < windowMs);", added: true },
  { n: 6, code: "  if (recent.length >= limit) return false;", added: true },
  { n: 7, code: "  recent.push(now);", added: true },
  { n: 8, code: "  hits.set(user, recent);", added: true },
  { n: 9, code: "  return true;", added: true },
  { n: 10, code: "}", added: true },
];

/** What the author's fix puts in place of line 8, shown once the diff updates. */
export const FIXED_LINES: DiffLine[] = [
  { n: 8, code: "  if (recent.length === 0) hits.delete(user);", added: true },
  { n: 9, code: "  else hits.set(user, recent);", added: true },
];

// ── The reviewers ──

export type SeatId = "claude" | "cursor";

export type Seat = {
  id: SeatId;
  label: string;
  model: string;
  /** What the seat is doing, newest last. Shown under "Reviewing". */
  activity: { at: number; text: string }[];
  /** Diff lines the seat's "Reading the diff" pass sweeps over. */
  scan: { from: number; to: number };
  reviewStart: number;
  reviewDone: number;
  voteDone: number;
  raised: number;
};

export const SEATS: Seat[] = [
  {
    id: "claude",
    label: "Claude Code",
    model: "opus",
    activity: [
      { at: 4800, text: `Reading the diff of ${FILE}` },
      { at: 6300, text: "Reading src/server.ts" },
      { at: 7200, text: "Searching for allow(" },
      { at: 8000, text: "Thinking" },
      { at: 9300, text: "Reading test/" },
    ],
    scan: { from: 4800, to: 6200 },
    reviewStart: 4500,
    reviewDone: 10200,
    voteDone: 12600,
    raised: 2,
  },
  {
    id: "cursor",
    label: "Cursor",
    model: "gpt-5",
    activity: [
      { at: 4900, text: "Thinking" },
      { at: 6500, text: `Reading the diff of ${FILE}` },
      { at: 8000, text: "Searching for rate-limit" },
      { at: 8900, text: "Reading test/server.test.ts" },
    ],
    scan: { from: 6500, to: 7900 },
    reviewStart: 4600,
    reviewDone: 10700,
    voteDone: 13000,
    raised: 1,
  },
];

// ── What they found ──

export type Severity = "major" | "minor" | "nit";

export type Finding = {
  id: string;
  line: number;
  severity: Severity;
  title: string;
  raisedBy: SeatId;
  /** When the finding lands on its line in the diff. */
  raisedAt: number;
  vote: { by: SeatId; at: number; stance: "agree" | "disagree"; severity: Severity; why: string };
  consensus: "agreed" | "disputed";
  /** When the card says the author fixed it. Agreed findings only: those are the ones sent. */
  fixedAt?: number;
};

export const FINDINGS: Finding[] = [
  {
    id: "evict",
    line: 8,
    severity: "major",
    title: "hits never forgets a user, so memory grows with every caller",
    raisedBy: "claude",
    raisedAt: 8300,
    vote: {
      by: "cursor",
      at: 11900,
      stance: "agree",
      severity: "major",
      why: "Nothing deletes a key, so an idle user's array stays forever.",
    },
    consensus: "agreed",
    fixedAt: 18600,
  },
  {
    id: "edge-test",
    line: 5,
    severity: "minor",
    title: "No test covers a request at the edge of the window",
    raisedBy: "cursor",
    raisedAt: 9500,
    vote: {
      by: "claude",
      at: 11200,
      stance: "agree",
      severity: "minor",
      why: "The < vs <= on windowMs is exactly what a test should pin.",
    },
    consensus: "agreed",
    fixedAt: 18900,
  },
  {
    id: "clock",
    line: 4,
    severity: "nit",
    title: "Date.now() can jump backwards when the clock is adjusted",
    raisedBy: "claude",
    raisedAt: 9900,
    vote: {
      by: "cursor",
      at: 12300,
      stance: "disagree",
      severity: "nit",
      why: "A backwards jump keeps a timestamp longer; it can't let extra requests through.",
    },
    consensus: "disputed",
  },
];
