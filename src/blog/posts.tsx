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
    slug: "reviewing-a-day-of-parallel-agents",
    title: "Reviewing a day of parallel agents",
    date: "2026-09-16",
    summary:
      "Plan a few tasks in Claude Code, hand them to agents, and go answer Slack. DiffPrism holds each commit until you've read it, and keeps the agent around to answer your questions on the diff.",
    content: () => (
      <>
        <p>
          A day with coding agents doesn't look like one long session. It looks
          like a handful of tasks running at once, and a lot of other work in
          between. This post walks through that day and where DiffPrism fits
          into it.
        </p>

        <h2>Plans First</h2>
        <p>
          You open Claude Code with three things on the list. A signup form on
          the landing page. The backend that form needs. And a bug where opening
          Find closes the help sheet.
        </p>
        <p>
          You don't start with code. You go task by task and make a plan for
          each one. Switching between them is cheap at this stage, since a plan
          is just text. You read it, push back on the parts that are wrong, and
          move to the next task.
        </p>

        <h2>Hand It Off</h2>
        <p>
          Once the plans look right, each task gets its own agent session on its
          own branch. Three agents, three branches. And then you leave them
          alone.
        </p>

        <h2>While They Work</h2>
        <p>
          There's a Slack thread from a teammate waiting on an answer, so you
          answer it. A deploy went out this morning, so you open the canary logs
          and make sure it's healthy before it rolls out wider.
        </p>
        <p>
          None of that means watching a terminal. The agents don't need you
          until they're done, and DiffPrism is how you find out they're done.
        </p>

        <h2>Agents Finish One by One</h2>
        <p>
          Earlier you ran <code>diffprism hook install</code> in the repo. So
          when an agent finishes and runs <code>git commit</code>, the
          pre-commit hook holds the commit. It opens the staged diff in
          DiffPrism and waits for your decision. The agent waits with it. Small
          commits pass straight through, and you set that threshold.
        </p>
        <p>
          The agents don't finish at the same time. One lands, then a few
          minutes later another. Each one shows up in the sidebar marked In
          Review. You don't have to catch the moment. When you're done with
          Slack, you switch to the DiffPrism tab in Chrome and everything that's
          ready is sitting there.
        </p>
        <figure className="blog-figure">
          <img
            src="/blog/parallel-agent-workflow/sessions-ready.png"
            alt="DiffPrism dashboard with three sessions in review in the sidebar and a six-file diff open"
            loading="lazy"
          />
          <figcaption>
            Every review in one sidebar, whether it came from the commit gate
            or a pull request.
          </figcaption>
        </figure>

        <h2>Ask on the Line</h2>
        <p>
          You click into the Find fix. The header gives you a quick briefing
          first: how many modules the change touches, and what's untested. Then
          in <code>MapScreen.tsx</code> you hit a deleted block, and it isn't
          obvious why it's gone. So you leave a comment on the line: why are we
          removing this?
        </p>
        <figure className="blog-figure">
          <img
            src="/blog/parallel-agent-workflow/question-thread.png"
            alt="A comment on a removed line in MapScreen.tsx asking why it was removed, waiting for the agent to reply"
            loading="lazy"
          />
          <figcaption>
            The question sits on the line it's about, waiting on the agent that
            wrote it.
          </figcaption>
        </figure>
        <p>
          The agent that wrote the change is still around. Your question
          interrupts its wait, so it reads the thread and answers right there.
          Turns out the block didn't go away. It moved a few lines down, out of
          the state updater, so the same branch can close the shell's sheets
          too.
        </p>
        <div className="blog-callout">
          <p>
            You don't copy the line into a terminal. You don't go hunt for the
            session that wrote it. You ask in the diff and the answer shows up
            in the diff.
          </p>
        </div>

        <h2>Comments, Fixes, Approve</h2>
        <p>
          From there it's a normal review. You leave a few more comments. Some
          are questions, some are changes you want. When you request changes,
          they go straight back to the agent that made them. It makes the fixes,
          and the diff updates live while it works.
        </p>
        <p>
          You read what changed and approve. On a pre-commit review, that lets
          the commit through. On a pull request, it posts a real GitHub review,
          and you pick which of your threads go public. Then you move on to the
          next session in the sidebar.
        </p>

        <h2>Why This Shape Works</h2>
        <p>
          Running several agents isn't the hard part. Keeping track of what each
          one did is. The commit gate means nothing lands without you reading
          it. The sidebar means you review when you're ready, not when the agent
          happens to finish. And the thread means the agent that wrote the code
          is right there to explain it.
        </p>

        <h2>Try It</h2>
        <p>
          Install with <code>npm install -g diffprism</code>, run{" "}
          <code>diffprism setup</code> to connect Claude Code, then{" "}
          <code>diffprism hook install</code> in your repo. The next big commit
          your agent makes will open in DiffPrism. For pull requests, run{" "}
          <code>diffprism review owner/repo#123</code>.
        </p>
      </>
    ),
  },
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
