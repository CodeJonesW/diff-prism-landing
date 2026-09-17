import type { BlogPost } from "../posts";

// Archived: retired from the blog index when DiffPrism moved back to local and PR review.
export const diffprismIsNowAGithubApp: BlogPost = {
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
};
