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
      "I planned three tasks in Claude Code, handed them to agents, and went back to Slack. DiffPrism put their local commits and a GitHub pull request in one sidebar, and the agents answered my questions right on the diff.",
    content: () => (
      <>
        <p>
          My coding days don't look like one long session anymore. They look
          like three agents running at once while I do other stuff. Here's what
          one of those days looked like in my Radius repo, with DiffPrism in the
          loop.
        </p>

        <h2>Plans First</h2>
        <p>
          I opened Claude Code with three things on the list. A signup form on
          the landing page. The backend that form needs. And a bug where opening
          Find closed the help sheet.
        </p>
        <p>
          I didn't start with code. I went task by task and made a plan with
          Claude for each one. Switching between tasks is cheap at this point,
          since a plan is just text. I read it, pushed back on the parts that
          were wrong, and moved on to the next one.
        </p>

        <h2>Handing It Off</h2>
        <p>
          Once the plans looked right, I started an agent session for each task.
          Each one got its own branch. Three agents, three branches. Then I left
          them alone.
        </p>

        <h2>While They Worked</h2>
        <p>
          I had Slack messages waiting, so I answered those. A deploy had gone
          out earlier, so I opened the canary logs and made sure it was healthy.
        </p>
        <p>
          None of that meant watching a terminal. The agents didn't need me
          until they were done. And DiffPrism is how I found out they were done.
        </p>

        <h2>Agents Finishing One by One</h2>
        <p>
          I'd already run <code>diffprism hook install</code> in the repo. So
          when an agent finished and ran <code>git commit</code>, the pre-commit
          hook held the commit. It opened the staged diff in DiffPrism and
          waited for my decision. The agent waited too. Small commits pass
          straight through, and you set that threshold.
        </p>
        <p>
          They didn't finish at the same time. One landed, then a few minutes
          later another. Each one showed up in the sidebar marked In Review. I
          didn't have to catch the moment. When I was done with Slack, I
          switched to the DiffPrism tab in Chrome and they were sitting there.
        </p>

        <h2>Two Kinds of Sessions, One Sidebar</h2>
        <p>
          DiffPrism has two workflows. The difference is where my review goes.
        </p>
        <p>
          <strong>Local agent changes.</strong> This is code on my machine that
          hasn't been committed yet. The commit gate opens it, and the agent
          that wrote it is waiting on me. Everything I send goes to that agent.
          Questions, feedback, requested changes. Nothing leaves my machine. I
          can approve, approve with comments, request changes, or dismiss. When
          I approve, the commit goes through.
        </p>
        <p>
          <strong>Remote pull requests.</strong> This is code that's already up
          on GitHub. I open one with{" "}
          <code>diffprism review owner/repo#123</code>. DiffPrism fetches the
          diff and finds my local clone, so the agent can read whole files and
          not just the changed lines. I can still ask the agent questions on
          any line. But my decision goes to GitHub. Approve, request changes, or
          comment posts a real review on the PR. My threads with the agent stay
          private unless I tick the ones I want posted as inline comments.
        </p>
        <p>
          The Find fix was already up as a pull request, so I opened it that
          way. That meant the sidebar had both kinds at once. Two pre-commit
          reviews for the signup work, and PR #362 for the Find fix. Same list,
          same diff view, same threads. The review bar at the bottom is what
          changes, since one decision goes back to an agent and the other goes
          to GitHub.
        </p>
        <figure className="blog-figure">
          <img
            src="/blog/parallel-agent-workflow/sessions-ready.png"
            alt="DiffPrism dashboard with two pre-commit reviews and one pull request review in the sidebar, with the pull request open"
            loading="lazy"
          />
          <figcaption>
            Two local pre-commit reviews and one GitHub pull request, side by
            side.
          </figcaption>
        </figure>

        <h2>Asking on the Line</h2>
        <p>
          I clicked into the backend session first. The header gives a quick
          briefing. Three modules touched, one new dependency, two untested
          changes. The files are sorted by how much attention they need. The
          signup endpoint was marked critical. The README and config changes
          were notable. A new <code>tsconfig.json</code> was mechanical, and I
          could've approved that whole group at once.
        </p>
        <p>
          But one line in that tsconfig wasn't obvious to me,{" "}
          <code>"noEmit": true</code>. So I left a comment on it asking what it
          does.
        </p>
        <p>
          The agent was still waiting on my decision. My question interrupted
          that wait, so it read the thread and answered right there.{" "}
          <code>noEmit</code> tells <code>tsc</code> to type-check only and
          write no JavaScript. The tsconfig only exists so{" "}
          <code>npm run typecheck</code> can check the signup function against
          the Cloudflare Workers types. Wrangler does the real build at deploy,
          so anything <code>tsc</code> wrote out would just be clutter.
        </p>
        <figure className="blog-figure">
          <img
            src="/blog/parallel-agent-workflow/agent-reply.png"
            alt="A pre-commit review in DiffPrism with a question on functions/tsconfig.json line 10 and the agent's reply explaining noEmit in the thread"
            loading="lazy"
          />
          <figcaption>
            I asked on the line. The agent answered in the same thread.
          </figcaption>
        </figure>
        <div className="blog-callout">
          <p>
            I didn't copy the line into a terminal. I didn't go find the session
            that wrote it. I asked in the diff and the answer showed up in the
            diff.
          </p>
        </div>
        <p>
          Then I switched over to PR #362. Threads work the same way there. A
          block in <code>MapScreen.tsx</code> got deleted and I couldn't tell
          why. So I asked on that line too, and the question sat there waiting
          for the agent.
        </p>
        <figure className="blog-figure">
          <img
            src="/blog/parallel-agent-workflow/question-thread.png"
            alt="A comment on a removed line in MapScreen.tsx asking why it was removed, waiting for the agent to reply"
            loading="lazy"
          />
          <figcaption>Same kind of thread, on a pull request.</figcaption>
        </figure>

        <h2>Comments, Fixes, Approve</h2>
        <p>
          Back in the backend review, I left a few more comments. Some
          were questions and some were changes I wanted. Requested changes go
          straight back to the agent that made them. It makes the fixes, and the
          diff updates live while it works.
        </p>
        <p>
          Once the fixes looked right, I approved and the commit went through.
          Then I went back to PR #362, and the review I submitted there landed
          on GitHub. Then I moved on to the next session in the sidebar.
        </p>

        <h2>Keeping Track of Three Agents</h2>
        <p>
          For me, running a few agents at once isn't the hard part. Keeping
          track of what each one did is. The commit gate means nothing lands
          without me reading it. The sidebar holds local changes and pull
          requests together, so I review when I'm ready, not whenever an agent
          happens to finish. And the agent that wrote the code is still around
          to explain it.
        </p>

        <h2>How to Try It</h2>
        <p>
          Install with <code>npm install -g diffprism</code>. Run{" "}
          <code>diffprism setup</code> to connect Claude Code, then{" "}
          <code>diffprism hook install</code> in your repo. The next big commit
          your agent makes will open in DiffPrism. For pull requests, run{" "}
          <code>diffprism review owner/repo#123</code>.
        </p>
        <p>
          Cheers,
          <br />
          Will
        </p>
      </>
    ),
  },
  {
    slug: "from-working-v1-to-production-ready",
    title: "From a working v1 to production ready",
    date: "2026-08-16",
    summary:
      "Agents are good at getting a feature to work. Review is where I find the small stuff that makes it ready to merge. DiffPrism makes that loop a lot shorter.",
    content: () => (
      <>
        <p>
          Coding agents are pretty good at getting to a working v1. I describe
          the feature, the agent builds it, the tests pass, and it runs. That
          part keeps getting better.
        </p>
        <p>
          But working isn&apos;t the same as ready to merge. When I sit down to
          review, I almost always find a list of small things. None of them
          break anything. All of them matter once the code has to live in the
          repo for a while.
        </p>

        <h2>What Review Turns Up</h2>
        <p>It&apos;s usually the same handful of things.</p>
        <ul>
          <li>
            <strong>Code that&apos;s hard to read.</strong> The logic works, but
            one function does three jobs, or a name doesn&apos;t say what the
            thing is. I have to read it twice to follow it.
          </li>
          <li>
            <strong>Too many comments.</strong> Agents like to narrate. There&apos;s
            a comment above every block saying what the next line does. Some of
            them help. A lot of them just need to go.
          </li>
          <li>
            <strong>Duplicate utility functions.</strong> The agent writes a new
            helper to format a date or build a URL. But the repo already has one
            in a utils folder. Now there are two, and they&apos;ll drift apart.
          </li>
          <li>
            <strong>Solutions built from scratch.</strong> The project already
            uses a component library, or a package that handles this exact
            thing. The agent writes its own modal or its own retry logic
            anyway.
          </li>
        </ul>
        <p>
          Each one is a small fix. But there are a lot of them, and they add up
          across every agent session.
        </p>

        <h2>The Slow Way</h2>
        <p>
          Without a review tool, the loop for this is long. The agent finishes,
          I open the diff, and I start writing notes. Then I go back to the
          terminal and type them all out. Something like, in{" "}
          <code>src/lib/api.ts</code> around line 40, use the existing fetch
          helper. Every note needs a file path and a line number so the agent
          can find the spot.
        </p>
        <p>
          That&apos;s slow, and it&apos;s easy to miss a note. And if I want to
          know why the agent did something, that turns into a back and forth
          in the terminal, away from the code I&apos;m asking about.
        </p>

        <h2>Reviewing in the Diff</h2>
        <p>
          DiffPrism shortens that loop. When the agent commits, the commit gate
          opens the diff in DiffPrism and the agent waits for me. I&apos;m the
          reviewer from the start, and the agent that wrote the code is still
          around.
        </p>
        <p>
          So I just comment on the line. No file paths, no line numbers. The
          comment is already attached to the code it&apos;s about. The agent
          reads it and replies in the thread.
        </p>
        <p>Those threads end up being a few different kinds of conversation.</p>
        <ul>
          <li>
            <strong>Asking for a change.</strong> Use the date helper in utils
            here. The agent makes the change, and the diff updates.
          </li>
          <li>
            <strong>Asking why.</strong> Sometimes the agent had a good reason.
            Sometimes it didn&apos;t, and asking is how I find out.
          </li>
          <li>
            <strong>Learning something.</strong> Every so often the answer
            teaches me something about a config flag or an API I hadn&apos;t
            used. I&apos;d rather learn that in the review than skip past it.
          </li>
          <li>
            <strong>Making a suggestion.</strong> Not every comment has to be a
            demand. I can float an idea, and the agent can tell me if it fits
            or why it might not.
          </li>
        </ul>

        <h2>A Shorter Loop</h2>
        <p>
          The fixes themselves don&apos;t change. It&apos;s still the same
          pruning, renaming, and swapping in the helper that already exists.
          What changes is how long each one takes. A comment on a line takes a
          few seconds. The agent makes the edit. I read the result right there.
        </p>
        <p>
          And it all happens before the commit. So the version that lands in
          the repo is the cleaned up one, not the v1 plus a follow up PR full
          of tweaks.
        </p>
        <p>
          I think that&apos;s where agents and review fit together best. The
          agent gets it working fast. The review gets it to something I&apos;d
          want to maintain.
        </p>

        <h2>How to Try It</h2>
        <p>
          Install with <code>npm install -g diffprism</code>. Run{" "}
          <code>diffprism setup</code> to connect Claude Code, then{" "}
          <code>diffprism hook install</code> in your repo. The next big commit
          your agent makes will open in DiffPrism for review.
        </p>
        <p>
          Cheers,
          <br />
          Will
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
            href="https://www.npmjs.com/package/diffprism"
            target="_blank"
            rel="noopener"
          >
            try DiffPrism
          </a>
          . Install it with <code>npm install -g diffprism</code>, run{" "}
          <code>diffprism setup</code>, and review your agent&apos;s next
          commit before it lands.
        </p>
      </>
    ),
  },
];
