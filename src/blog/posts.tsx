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
    slug: "diffprism-is-now-a-github-app",
    title: "DiffPrism is now a GitHub App",
    date: "2026-03-08",
    summary:
      "We rebuilt DiffPrism from the ground up as a GitHub App. Pattern-aware code reviews that reference your actual codebase — directly on your pull requests.",
    content: () => (
      <>
        <p>
          Today we're launching DiffPrism as a GitHub App. Comment{" "}
          <code>/review</code> on any pull request, and DiffPrism posts
          a structured review with inline comments that reference patterns
          from your actual codebase. No CLI. No browser tab. Reviews land
          directly on the PR.
        </p>

        <h2>Why we rebuilt</h2>
        <p>
          DiffPrism started as a local-first diff viewer for agent-generated
          code. You'd run <code>npx diffprism</code>, a browser tab would open,
          and you'd review changes before committing. It worked — but it was
          solving the wrong problem.
        </p>
        <p>
          The real pain isn't viewing diffs locally. Every IDE already does
          that. The real pain is that AI code review tools don't know your
          codebase. They see the diff in isolation. They give you generic
          advice like "consider adding error handling" when your repo already
          has a specific error handling pattern that every other file follows.
        </p>
        <p>
          We wanted reviews that could say: "this error handling differs from
          the pattern in <code>src/api/auth.ts:42</code>." That requires
          indexing the repo. And if you're indexing the repo, the natural
          surface is GitHub — where the code already lives and where reviews
          already happen.
        </p>

        <h2>How it works</h2>
        <p>
          Install the DiffPrism GitHub App on your repo. We automatically index
          your codebase using AST-aware chunking — splitting code at function
          and class boundaries, not arbitrary character counts. Each chunk gets
          a vector embedding and lands in a per-repo index.
        </p>
        <p>
          When you comment <code>/review</code> on a PR, DiffPrism:
        </p>
        <ol>
          <li>Fetches the diff and parses the changed files</li>
          <li>Builds a semantic query from the changes</li>
          <li>Queries the vector index for related code patterns in your repo</li>
          <li>Queries the import graph for connected files</li>
          <li>Sends the diff + context to Claude</li>
          <li>Posts inline comments tagged by severity — critical, suggestion, or praise</li>
        </ol>
        <p>
          The whole process takes about 10 seconds. The webhook responds
          immediately, and the review runs asynchronously via Cloudflare Queues.
        </p>

        <h2>Pattern-aware, not just correct</h2>
        <p>
          Most AI review tools check if your code is correct. DiffPrism checks
          if your code is <em>consistent</em>. There's a difference.
        </p>
        <p>
          Correct code might handle errors with a try/catch. Consistent code
          handles errors with <em>your</em> try/catch wrapper — the one defined
          in your utils, the one every other module imports. When a new
          contributor (or an AI agent) skips that pattern, DiffPrism catches it
          and tells you exactly where the established pattern lives.
        </p>
        <div className="blog-callout">
          <p>
            Generic AI review: "Consider adding error handling."
            <br />
            DiffPrism: "This bypasses the tryCatch() wrapper used in every
            other route handler. See src/middleware/error.ts:24."
          </p>
        </div>

        <h2>Zero noise</h2>
        <p>
          We're allergic to filler. If the code is clean, DiffPrism approves
          with a short summary and moves on. No "great job!" on every function.
          No restating what the code does. No suggesting improvements to code
          that's already fine.
        </p>
        <p>
          Comments are tagged by severity. Red for critical issues — bugs,
          security problems, broken patterns. Yellow for suggestions —
          consistency improvements, better approaches. Green for praise, used
          sparingly and only for genuinely good patterns worth calling out.
        </p>

        <h2>What we deprecated</h2>
        <p>
          The original DiffPrism — the local CLI, the MCP tools, the
          browser-based review UI, the multi-session dashboard — is deprecated.
          The npm package still exists but won't receive updates.
        </p>
        <p>
          We learned a lot building it. The daemon architecture, the
          WebSocket-based live updates, the agent self-review loop — all of
          that informed how we think about review workflows. But the GitHub App
          is the product now, and we're putting all our energy there.
        </p>

        <h2>Pricing</h2>
        <p>
          Free tier: 10 reviews per month, 1 repo. Enough to try it on a real
          project. Pro: 100 reviews, unlimited repos. Team: unlimited
          everything. We wanted the free tier to be genuinely useful, not a
          demo.
        </p>

        <h2>Try it</h2>
        <p>
          Install the{" "}
          <a
            href="https://github.com/apps/diffprism"
            target="_blank"
            rel="noopener"
          >
            DiffPrism GitHub App
          </a>
          , open a PR, and comment <code>/review</code>. Your first 10 reviews
          are free every month.
        </p>
      </>
    ),
  },
  {
    slug: "the-missing-layer-in-ai-code-review",
    title: "The missing layer in AI code review",
    date: "2026-02-20",
    summary:
      "PR-layer tools wait too long. CLI tools show too little. There's a gap between agent output and pull request — and it's a UI problem.",
    content: () => (
      <>
        <div className="blog-callout">
          <p>
            <strong>Update (March 2026):</strong> DiffPrism has since evolved
            into a GitHub App that delivers pattern-aware reviews directly on
            pull requests. The local CLI tool described below has been
            deprecated. Read the{" "}
            <a href="/blog/diffprism-is-now-a-github-app">launch post</a> for
            the full story.
          </p>
        </div>

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
            href="https://github.com/apps/diffprism"
            target="_blank"
            rel="noopener"
          >
            try DiffPrism
          </a>
          . Install the GitHub App and comment /review on your next PR.
        </p>
      </>
    ),
  },
];
