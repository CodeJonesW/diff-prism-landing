import type { ReactNode } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: () => ReactNode;
}

export const posts: BlogPost[] = [
  {
    slug: "the-missing-layer-in-ai-code-review",
    title: "The missing layer in AI code review",
    date: "2026-02-20",
    summary:
      "PR-layer tools wait too long. CLI tools show too little. There's a gap between agent output and pull request — and it's a UI problem.",
    content: () => (
      <>
        <p>
          The AI code review space has exploded. If you're shipping software in
          2026, you've probably used — or at least evaluated — at least one tool
          that reviews your code with an LLM. But the market has stratified into
          two clear tiers, and neither one is built for how developers actually
          work with coding agents today.
        </p>

        <h2>The two tiers</h2>
        <p>
          <strong>Tier 1: PR-layer tools.</strong> CodeRabbit, Qodo (formerly
          PR-Agent), GitHub Copilot PR Reviews, Bito. These hook into
          GitHub/GitLab webhooks and comment on pull requests after they're
          opened. They're mature, well-funded, and competing on context depth —
          cross-repo awareness, system-level reasoning, org-specific rules.
          CodeRabbit is the market leader for PR automation. Qodo is the
          enterprise play.
        </p>
        <p>
          <strong>Tier 2: Pre-PR / local tools.</strong> ZapCircle, diffray,
          various Claude Code plugins. These run <code>git diff</code> locally,
          pipe the output to an LLM, and give you feedback before you push.
          They're CLI-first, mostly single-developer tools.
        </p>
        <p>Both tiers have the same blind spot.</p>

        <h2>The moment nobody owns</h2>
        <p>
          When you run Claude Code or Cursor on a task, the agent doesn't write
          one line. It writes 400 lines across 8 files. It refactors a module,
          updates imports, adjusts tests, and changes configuration — all in a
          single session. The output is plausible. The types check. The tests
          pass.
        </p>
        <p>
          But you didn't write it, and you need to actually understand what
          changed before those changes become a pull request. That's not a CLI
          problem. A wall of green and red text in your terminal isn't how you
          comprehend a multi-file changeset. And it's not a PR problem either —
          by the time the code hits a pull request, you've already lost context
          on what the agent did and why.
        </p>
        <div className="blog-callout">
          <p>
            The gap is the moment between agent output and pull request. The
            moment where you need to look at the diff, understand it, and decide
            whether to ship it. That's a UI problem.
          </p>
        </div>

        <h2>Why local-first review matters</h2>
        <p>
          Reviewing the diff right after the agent writes it — while the task is
          still fresh in your head — is when you're most likely to spot things
          that don't belong. "I didn't ask for this" is easy to say in the
          moment. It's hard to say three PRs later.
        </p>
        <p>
          Agents don't make obvious mistakes. They make plausible ones. The code
          compiles, the types check, the tests pass. But the agent interpreted
          your prompt slightly differently than you meant, and now there's
          behavior in your app you never asked for. A visual diff viewer — with
          syntax highlighting, file tree navigation, and the ability to mark
          files as reviewed — is the only way to catch that consistently.
        </p>
        <p>
          Now multiply that by three parallel agent sessions, each touching
          different parts of your codebase. Session A modifies the user model.
          Session B rewrites middleware. Session C updates API routes. Each diff
          looks fine in isolation. But you didn't review any of them before
          committing.
        </p>

        <h2>What DiffPrism is building</h2>
        <p>
          DiffPrism is a browser-based diff viewer that opens the moment an
          agent finishes writing code. You see exactly what changed — syntax
          highlighted, with a summary of files touched and impact analysis. You
          approve or reject, and the result flows back to the calling agent.
        </p>
        <p>The core experience focuses on three things:</p>
        <ul>
          <li>
            <strong>Visual diff viewer</strong> — split/unified view, syntax
            highlighting, file tree navigation. This is what separates a review
            tool from a CLI dump.
          </li>
          <li>
            <strong>Session-based review</strong> — changes grouped by agent
            task, not just by <code>git diff</code>. When Claude Code runs a
            task and touches N files, DiffPrism treats that as a single
            reviewable unit.
          </li>
          <li>
            <strong>Local-first, zero config</strong> —{" "}
            <code>npx diffprism</code> in any git repo, opens in browser. No
            GitHub app install, no API keys, no accounts.
          </li>
        </ul>

        <h2>What comes next</h2>
        <p>
          Once we nail the local review experience, the natural extension is
          AI-powered analysis within the review surface itself — inline
          annotations for security issues and logic bugs, auto-generated PR
          descriptions, risk scoring for high-sensitivity files. Think what
          CodeRabbit does on PRs, but locally and before you push.
        </p>
        <p>
          Beyond that, we see DiffPrism becoming a purpose-built review
          environment — the place engineers go specifically to review code,
          whether it's local agent output or remote pull requests. Every other AI
          code review tool is either a GitHub bot (you review in GitHub's UI), a
          CLI (you review in your terminal), or an IDE extension (you review in
          VS Code). None of those are built for review. DiffPrism is.
        </p>
        <p>
          The progression: local diff viewer, then AI analysis layer, then PR
          integration, then team workflows. Bottom-up adoption from individual
          developers, expanding into teams who want a better review experience
          for agent-generated code.
        </p>
        <p>
          If you're using coding agents and want to actually understand what
          they're writing,{" "}
          <a
            href="https://github.com/CodeJonesW/diffprism"
            target="_blank"
            rel="noopener"
          >
            try DiffPrism
          </a>
          . It's free, open source, and installs in one command.
        </p>
      </>
    ),
  },
];
