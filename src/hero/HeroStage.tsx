import { useEffect, useRef, useState, type RefObject } from "react";
import { BrandMark } from "../BrandMark";
import {
  CHAPTERS,
  DIFF,
  DOJO_SPEEDUP,
  FILE,
  FINDINGS,
  FIXED_LINES,
  LOOP_MS,
  SEATS,
  STILL_MS,
  T,
  TERMINAL,
  type DiffLine,
  type Finding,
  type Seat,
  type SeatId,
  type TerminalLine,
} from "./timeline";
import "./HeroStage.css";

// The stage is drawn at a fixed size and scaled to fit, so every frame looks the
// same at any width. Below COMPACT_BELOW it switches to a stacked layout without
// the diff pane, because the wide one would scale down past readable.
const WIDE = { w: 1160, h: 640 };
const COMPACT = { w: 420, h: 720 };
const COMPACT_BELOW = 720;
// Height the section spends around the stage: the fixed nav, padding and the chapter strip.
const CHROME_H = 64 + 32 + 64 + 24;
// On a very short screen, scroll rather than shrink the stage past readable.
const MIN_SCALE = 0.6;

// Where the "sent" pill flies, from the Send button to the author's terminal, in stage pixels.
const FLY = {
  wide: { from: { x: 830, y: 170 }, to: { x: 190, y: 520 } },
  compact: { from: { x: 210, y: 330 }, to: { x: 210, y: 150 } },
};

const SEAT_BY_ID = Object.fromEntries(SEATS.map((s) => [s.id, s])) as Record<SeatId, Seat>;
const VOTING_STARTS = Math.max(...SEATS.map((s) => s.reviewDone));

/**
 * The stage's clock in ms. Runs on requestAnimationFrame while the stage is on
 * screen, and holds still when motion is reduced. `?t=<ms>` pins it to one frame,
 * for checking a moment of the story without waiting for it.
 */
function useStageClock(ref: RefObject<HTMLElement | null>): number {
  const [fixed] = useState<number | null>(() => {
    const pinned = new URLSearchParams(window.location.search).get("t");
    if (pinned !== null && Number.isFinite(Number(pinned))) return Number(pinned);
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? STILL_MS : null;
  });
  const [t, setT] = useState(fixed ?? 0);

  useEffect(() => {
    const el = ref.current;
    if (fixed !== null || !el) return;
    let raf = 0;
    let last = 0;
    let elapsed = 0;
    const tick = (now: number) => {
      // Cap the step so a stalled frame jumps forward a little, not a whole beat.
      if (last) elapsed = (elapsed + Math.min(now - last, 100)) % LOOP_MS;
      last = now;
      setT(elapsed);
      raf = requestAnimationFrame(tick);
    };
    // Start only once enough of the stage is in view to follow the story from its first beat.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [fixed, ref]);

  return t;
}

/**
 * Fits the stage to the section's width and to the viewport's height, so the
 * whole review is in view on the first screen. `ref` is the element whose width
 * the stage may use.
 */
function useStageLayout(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(WIDE.w);
  const [viewportH, setViewportH] = useState(() => window.innerHeight);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    const onResize = () => setViewportH(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
  const compact = width < COMPACT_BELOW;
  const size = compact ? COMPACT : WIDE;
  const fitHeight = (viewportH - CHROME_H) / size.h;
  return { compact, size, scale: Math.max(MIN_SCALE, Math.min(1, width / size.w, fitHeight)) };
}

// ── Helpers ──

function typed(text: string, start: number, t: number, charsPerSec = 45): string {
  return text.slice(0, Math.max(0, Math.floor(((t - start) / 1000) * charsPerSec)));
}

function clock(ms: number): string {
  const s = Math.max(0, Math.floor((ms * DOJO_SPEEDUP) / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function easeInOut(p: number): number {
  return p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
}

function clamp01(p: number): number {
  return Math.min(1, Math.max(0, p));
}

// ── Shared bits ──

function DojoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M2.5 2.5l8 8M13.5 2.5l-8 8M9 12l3 3M7 12l-3 3M11.5 9.5L14 12M4.5 9.5L2 12" />
    </svg>
  );
}

function Spinner() {
  return <span className="hs-spinner" aria-hidden />;
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

function Cross({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/** A mouse pointer that drifts onto its button and clicks it at `at`. Render it inside the button. */
function Pointer({ t, at }: { t: number; at: number }) {
  if (t < at - 900 || t > at + 600) return null;
  const p = easeInOut(clamp01((t - (at - 900)) / 700));
  const pressed = t >= at && t < at + 200;
  return (
    <span
      className="hs-pointer"
      style={{ transform: `translate(${(1 - p) * 70}px, ${(1 - p) * 46}px) scale(${pressed ? 0.85 : 1})`, opacity: p }}
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M5 3l14 8-6.5 1.6L9.6 19z" fill="#fff" stroke="#07090e" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      {pressed && <span className="hs-click-ring" />}
    </span>
  );
}

// ── The author's terminal ──

function TerminalRow({ line, t }: { line: TerminalLine; t: number }) {
  switch (line.kind) {
    case "prompt":
      return (
        <div className="hs-term-prompt">
          <span className="hs-term-caret">&gt;</span> {typed(line.text, line.at, t)}
          {t < line.at + 1100 && <span className="hs-term-cursor" />}
        </div>
      );
    case "tool":
      return (
        <div className="hs-term-tool">
          <span className="hs-term-dot" />
          <span className="hs-term-tool-name">{line.name}</span>({typed(line.arg, line.at, t, 70)})
        </div>
      );
    case "result":
      return <div className={`hs-term-result${line.tone ? ` is-${line.tone}` : ""}`}>⎿ {line.text}</div>;
  }
}

function Terminal({ t }: { t: number }) {
  const waiting = t >= 2700 && t < T.pickedUp;
  return (
    <div className="hs-terminal">
      <div className="hs-window-bar">
        <span className="hs-dots"><span /><span /><span /></span>
        <span className="hs-window-title">
          <span className="hs-glyph">&gt;_</span> Claude Code · the agent writing the code
        </span>
      </div>
      <div className="hs-term-body">
        {TERMINAL.filter((l) => t >= l.at).map((l) => (
          <TerminalRow key={`${l.kind}-${l.at}`} line={l} t={t} />
        ))}
        {waiting && (
          <div className="hs-term-wait">
            <Spinner /> Waiting on the review…
          </div>
        )}
      </div>
    </div>
  );
}

// ── The diff ──

function scanLine(t: number): { line: number; seat: SeatId } | null {
  for (const s of SEATS) {
    if (t >= s.scan.from && t < s.scan.to) {
      const p = (t - s.scan.from) / (s.scan.to - s.scan.from);
      return { line: 1 + Math.floor(p * DIFF.length), seat: s.id };
    }
  }
  return null;
}

function InlineAnnotation({ f, t }: { f: Finding; t: number }) {
  const fixed = f.fixedAt !== undefined && t >= f.fixedAt;
  return (
    <div className={`hs-inline-note sev-${f.severity}${fixed ? " is-fixed" : ""}`}>
      <div className="hs-inline-row">
        <span className={`hs-chip sev-${f.severity}`}>{f.severity}</span>
        <span className="hs-inline-title">{f.title}</span>
      </div>
      <div className="hs-inline-row hs-inline-meta">
        <span>{SEAT_BY_ID[f.raisedBy].label}</span>
        {t >= f.vote.at && (
          <span className={`hs-inline-vote is-${f.vote.stance}`}>
            {f.vote.stance === "agree" ? <Check /> : <Cross />}
            {SEAT_BY_ID[f.vote.by].label} {f.vote.stance === "agree" ? "agrees" : "disagrees"}
          </span>
        )}
        {fixed && <span className="hs-inline-fixed">Fixed by the agent</span>}
      </div>
    </div>
  );
}

function DiffPane({ t }: { t: number }) {
  const scan = scanLine(t);
  const updated = t >= T.diffUpdated;
  const lines: (DiffLine & { isNew?: boolean })[] = updated
    ? [...DIFF.slice(0, 7), ...FIXED_LINES.map((l) => ({ ...l, isNew: true })), ...DIFF.slice(8).map((l) => ({ ...l, n: l.n + 1 }))]
    : DIFF;
  // A finding hangs under its line; after the fix, line 8's note follows the new code.
  const noteAfter = (n: number) =>
    FINDINGS.filter((f) => t >= f.raisedAt && (updated && f.line === 8 ? n === 9 : f.line === n));

  return (
    <div className="hs-diff">
      <div className="hs-diff-file">
        <span className="hs-diff-badge">A</span>
        <span>{FILE}</span>
        {updated && <span className="hs-new-tag">New since you last looked</span>}
        <span className="hs-diff-stats">+{updated ? 11 : 10}</span>
      </div>
      <div className="hs-diff-lines">
        {lines.map((l) => (
          <div key={`${l.n}-${l.code}`}>
            <div
              className={[
                "hs-diff-line",
                l.added && "is-add",
                l.isNew && "is-new",
                scan?.line === l.n && !updated && `is-scan scan-${scan.seat}`,
                noteAfter(l.n).length > 0 && "is-flagged",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="hs-ln">{l.n}</span>
              <span className="hs-sign">+</span>
              <code>{l.code}</code>
            </div>
            {noteAfter(l.n).map((f) => (
              <InlineAnnotation key={f.id} f={f} t={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── The review dojo ──

function DojoPicker({ t }: { t: number }) {
  return (
    <div className="hs-dojo-body">
      <p className="hs-muted">Tick the agents to review this change.</p>
      {SEATS.map((s) => (
        <label key={s.id} className="hs-pick">
          <span className="hs-checkbox is-on"><Check /></span>
          {s.label} <span className="hs-muted">· {s.model}</span>
        </label>
      ))}
      <span className="hs-btn hs-btn-dojo">
        Start the dojo
        <Pointer t={t} at={T.dojoStart} />
      </span>
    </div>
  );
}

function seatStatus(s: Seat, t: number): { done: boolean; stage: string; detail?: string; since: number } {
  const reviewed = `raised ${s.raised} · reviewed in ${clock(s.reviewDone - s.reviewStart)}`;
  if (t < s.reviewStart) return { done: false, stage: "Starting", since: T.seatsIn };
  if (t < s.reviewDone) {
    const doing = [...s.activity].reverse().find((a) => t >= a.at);
    return { done: false, stage: "Reviewing", detail: doing?.text ?? "Thinking", since: s.reviewStart };
  }
  if (t < VOTING_STARTS) {
    const busy = SEATS.filter((o) => o !== s && t < o.reviewDone).map((o) => o.label);
    return { done: false, stage: `Waiting for ${busy.join(" and ")} · ${reviewed}`, since: s.reviewDone };
  }
  if (t < s.voteDone) return { done: false, stage: `Voting on the others' findings · ${reviewed}`, since: VOTING_STARTS };
  return { done: true, stage: `Done · ${reviewed} · voted in ${clock(s.voteDone - VOTING_STARTS)}`, since: s.voteDone };
}

function DojoRunning({ t }: { t: number }) {
  return (
    <div className="hs-dojo-body">
      <div className="hs-dojo-intro">
        <span>
          Each agent reviews on its own, then votes on the others&apos; findings. Running for{" "}
          <b className="hs-mono">{clock(t - T.seatsIn)}</b>.
        </span>
        <span className="hs-stop"><span className="hs-checkbox" /> Stop</span>
      </div>
      {SEATS.map((s, i) => {
        const st = seatStatus(s, t);
        return (
          <div key={s.id} className={`hs-seat seat-${s.id}`} style={{ animationDelay: `${i * 120}ms` }}>
            <div className="hs-seat-head">
              {st.done ? <Check className="hs-ok" /> : <Spinner />}
              <span className="hs-seat-name">{s.label}</span>
              {!st.done && <span className="hs-mono hs-muted">{clock(t - st.since)}</span>}
            </div>
            <div className="hs-muted hs-seat-stage">{st.stage}</div>
            {st.detail && <div className="hs-mono hs-seat-detail">{st.detail}</div>}
          </div>
        );
      })}
    </div>
  );
}

function FindingCard({ f, t, index }: { f: Finding; t: number; index: number }) {
  const sent = f.consensus === "agreed";
  const vote = f.vote;
  const status =
    f.fixedAt !== undefined && t >= f.fixedAt
      ? { text: "Fixed by the agent", cls: "is-fixed" }
      : sent && t >= T.pickedUp
        ? { text: "Sent to the agent — it has it", cls: "" }
        : sent && t >= T.flyStart
          ? { text: "Sent to the agent", cls: "" }
          : null;
  return (
    <div
      className={`hs-card${t >= T.results + 250 + index * 200 ? " is-in" : ""}${status?.cls === "is-fixed" ? " is-fixed" : ""}`}
    >
      <span className={`hs-checkbox${sent ? " is-on" : ""}`}>{sent && <Check />}</span>
      <div className="hs-card-main">
        <div className="hs-card-title">
          <span className={`hs-chip sev-${f.severity}`}>{f.severity}</span>
          {f.title}
        </div>
        <div className="hs-mono hs-muted hs-card-path">
          {FILE}:{f.line}
        </div>
        <div className="hs-muted hs-card-by">Raised by {SEAT_BY_ID[f.raisedBy].label}</div>
        <div className="hs-vote">
          {vote.stance === "agree" ? <Check className="hs-ok" /> : <Cross className="hs-bad" />}
          <span>
            <b>
              {SEAT_BY_ID[vote.by].label} {vote.stance === "agree" ? "agrees" : "disagrees"} ({vote.severity})
            </b>
            : {vote.why}
          </span>
        </div>
        {status && <div className={`hs-card-status ${status.cls}`}>{status.text}</div>}
      </div>
    </div>
  );
}

function DojoResults({ t }: { t: number }) {
  const agreed = FINDINGS.filter((f) => f.consensus === "agreed");
  const disputed = FINDINGS.filter((f) => f.consensus === "disputed");
  const sent = t >= T.sendClick;
  return (
    <div className="hs-dojo-body hs-results">
      <div className="hs-results-head">
        <span>
          {FINDINGS.length} findings from {SEATS.map((s) => s.label).join(" and ")}.
        </span>
        <span className="hs-link">Run again</span>
      </div>
      <div className="hs-send">
        <p className="hs-muted">Send the ticked findings to the agent that made this change. It fixes each one without committing and marks it fixed.</p>
        <span className={`hs-send-btn${sent ? " is-sent" : ""}`}>
          {sent ? `Sent to the agent (${agreed.length})` : `Send to the agent to fix (${agreed.length})`}
          <Pointer t={t} at={T.sendClick} />
        </span>
      </div>
      <div className="hs-group">Agreed ({agreed.length})</div>
      {agreed.map((f, i) => (
        <FindingCard key={f.id} f={f} t={t} index={i} />
      ))}
      <div className="hs-group">Disputed ({disputed.length})</div>
      {disputed.map((f, i) => (
        <FindingCard key={f.id} f={f} t={t} index={agreed.length + i} />
      ))}
    </div>
  );
}

function DojoPanel({ t }: { t: number }) {
  return (
    <div className="hs-dojo">
      <div className="hs-dojo-header">
        <DojoIcon /> Review dojo
      </div>
      {t < T.seatsIn ? <DojoPicker t={t} /> : t < T.results ? <DojoRunning t={t} /> : <DojoResults t={t} />}
    </div>
  );
}

// ── The DiffPrism window ──

function reviewState(t: number): { text: string; tone: string } {
  if (t >= T.approveClick) return { text: "Approved · committed", tone: "ok" };
  if (t >= T.diffUpdated) return { text: "Your turn", tone: "you" };
  if (t >= T.flyStart) return { text: "Waiting on the agent", tone: "agent" };
  return { text: "Commit gate · waiting on you", tone: "you" };
}

function DiffPrismWindow({ t }: { t: number }) {
  const state = reviewState(t);
  return (
    <div className="hs-app">
      <div className="hs-window-bar hs-app-bar">
        <span className="hs-dots"><span /><span /><span /></span>
        <span className="hs-app-title">Add a rate limiter</span>
        <span className="hs-muted hs-mono hs-app-branch">main · staged</span>
        <span className={`hs-state is-${state.tone}`}>{state.text}</span>
      </div>
      <div className="hs-app-body">
        <DiffPane t={t} />
        <DojoPanel t={t} />
      </div>
      <div className="hs-app-foot">
        <span className="hs-muted">
          {t >= T.committed ? "Committed as 3f2a91c" : "git commit is waiting on your decision"}
        </span>
        <span className="hs-btn">Request changes</span>
        <span className={`hs-btn hs-btn-approve${t >= T.approveClick ? " is-done" : ""}`}>
          {t >= T.approveClick ? "Approved" : "Approve"}
          <Pointer t={t} at={T.approveClick} />
        </span>
      </div>
    </div>
  );
}

function FlyingFindings({ t, compact }: { t: number; compact: boolean }) {
  if (t < T.flyStart || t > T.flyEnd) return null;
  const { from, to } = compact ? FLY.compact : FLY.wide;
  const p = easeInOut((t - T.flyStart) / (T.flyEnd - T.flyStart));
  const x = from.x + (to.x - from.x) * p;
  const y = from.y + (to.y - from.y) * p - Math.sin(Math.PI * p) * 90;
  return (
    <div className="hs-fly" style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${1 - p * 0.25})` }}>
      <Check /> 2 findings to fix
    </div>
  );
}

function Chapters({ t }: { t: number }) {
  return (
    <ol className="hs-chapters" aria-hidden>
      {CHAPTERS.map((c, i) => {
        const end = CHAPTERS[i + 1]?.at ?? T.stageOut;
        const p = clamp01((t - c.at) / (end - c.at));
        return (
          <li key={c.label} className={t >= c.at && t < end ? "is-active" : t >= end ? "is-done" : ""}>
            <span className="hs-chapter-bar"><span style={{ transform: `scaleX(${p})` }} /></span>
            <span className="hs-chapter-label">
              <span className="hs-chapter-num">{i + 1}</span>
              {c.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** The card the loop ends on: the mark, the name and the line, in that order, then out. */
function BrandCard({ t }: { t: number }) {
  if (t < T.brandIn) return null;
  const out = 1 - clamp01((t - T.brandOut) / 500);
  const part = (delay: number) => {
    const p = 1 - (1 - clamp01((t - T.brandIn - delay) / 700)) ** 3;
    return { opacity: p * out, transform: `translateY(${(1 - p) * 14}px) scale(${0.96 + p * 0.04})` };
  };
  return (
    <div className="hs-brand">
      <span className="hs-brand-mark" style={part(0)}>
        <BrandMark size={72} />
      </span>
      <span className="hs-brand-name" style={part(150)}>
        DiffPrism
      </span>
      <span className="hs-brand-line" style={part(450)}>
        Human review for AI-written code.
      </span>
    </div>
  );
}

export function HeroStage() {
  const fitRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const t = useStageClock(frameRef);
  const { compact, size, scale } = useStageLayout(fitRef);
  // 0 while the review plays, rising to 1 as it gives way to the brand card.
  const leaving = clamp01((t - T.stageOut) / 500);
  const opacity = (t < 400 ? t / 400 : 1) * (1 - leaving);

  return (
    <section className="hs" aria-label="How a DiffPrism review works">
      <div ref={fitRef} className="hs-fit">
        <div className="hs-inner" style={{ width: size.w * scale }}>
          <div
            ref={frameRef}
            className="hs-frame"
            style={{ height: size.h * scale }}
            role="img"
            aria-label="Claude Code commits a rate limiter. DiffPrism holds the commit and opens a review. Claude Code and Cursor each review the change, reading files and raising findings on the diff, then vote on each other's findings. The two agreed findings go back to the agent that wrote the code, which fixes them, and the commit goes through once approved."
          >
            <div
              className={[
                "hs-stage",
                compact ? "is-compact" : "is-wide",
                t >= T.windowIn && "is-gate",
                t < 120 && "is-reset",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                width: size.w,
                height: size.h,
                transform: `scale(${scale * (1 - leaving * 0.03)})`,
                filter: leaving > 0 ? `blur(${leaving * 6}px)` : undefined,
                opacity,
              }}
            >
              <Terminal t={t} />
              <DiffPrismWindow t={t} />
              <FlyingFindings t={t} compact={compact} />
            </div>
            <BrandCard t={t} />
          </div>
          <div style={{ opacity }}>
            <Chapters t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}
