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
    slug: "what-to-look-for-when-reviewing-agent-code",
    title: "What to look for when reviewing agent code",
    date: "2026-07-15",
    summary:
      "Some problems in agent code are easy to spot with a regex. The biggest one isn't. Here's the list I work through, and which parts DiffPrism checks before I ever open the diff.",
    content: () => (
      <>
        <p>
          Agent code doesn&apos;t usually fail in obvious ways. It compiles.
          The tests pass. So the problems I find in review tend to be quieter
          than a red CI run.
        </p>
        <p>
          I&apos;ve ended up with a rough list. Some of it a tool can check.
          Some of it only I can.
        </p>

        <h2>Did It Do What I Asked</h2>
        <p>
          This is the first thing I check, and no tool can check it for me. An
          agent working on a form might also restructure the form state, change
          how errors display, and add a debounce. Each change looks reasonable.
          None of them were part of the task.
        </p>
        <p>
          I call this intent drift. The code works, but it&apos;s doing more
          than I asked for. So before I look at any single line, I scan the
          list of changed files. If a file shows up that has nothing to do with
          the task, that&apos;s where I start.
        </p>

        <h2>Stuff Left Behind</h2>
        <p>
          Agents debug the same way people do. And sometimes the debugging
          doesn&apos;t get cleaned up.
        </p>
        <ul>
          <li>
            <strong>Debug logging.</strong> A <code>console.log</code> that was
            useful for one run and now ships.
          </li>
          <li>
            <strong>A stray debugger statement.</strong> Rare, but it happens.
          </li>
          <li>
            <strong>TODOs and FIXMEs.</strong> Sometimes they&apos;re real
            notes about unfinished work. Either way I want to know they&apos;re
            there before the commit.
          </li>
        </ul>

        <h2>Tests That Aren&apos;t Really Tests</h2>
        <p>
          A passing test suite is only worth something if the tests ran. Two
          things to look for.
        </p>
        <ul>
          <li>
            <strong>Skipped tests.</strong> A <code>.skip</code> or an{" "}
            <code>xit</code> is a quick way to get to green. It&apos;s easy to
            miss in a big diff.
          </li>
          <li>
            <strong>New code with no new tests.</strong> If a source file
            changed and nothing in its test file did, that&apos;s worth a
            question.
          </li>
        </ul>

        <h2>Security Basics</h2>
        <p>
          These don&apos;t show up often. But when they do, they matter more
          than anything else in the diff.
        </p>
        <ul>
          <li>
            <strong>Hardcoded secrets.</strong> A token or password assigned to
            a string.
          </li>
          <li>
            <strong>SQL built in a template string.</strong>
          </li>
          <li>
            <strong>eval, exec, and innerHTML.</strong> Sometimes needed.
            Always worth a second look.
          </li>
          <li>
            <strong>Plain http URLs</strong> that aren&apos;t pointing at
            localhost.
          </li>
        </ul>

        <h2>Size and Shape</h2>
        <ul>
          <li>
            <strong>New dependencies.</strong> A new package in{" "}
            <code>package.json</code> is a long-term decision. I want to make
            it on purpose.
          </li>
          <li>
            <strong>Big new files.</strong> A 500 line file usually means
            something should have been split up.
          </li>
          <li>
            <strong>Deep nesting and lots of branches.</strong> The logic might
            be right. It&apos;s still harder to maintain.
          </li>
        </ul>

        <h2>What DiffPrism Checks for Me</h2>
        <p>
          Most of this list is mechanical, so DiffPrism checks it. When a
          review opens, its analysis scans the added lines for debug logging,
          debugger statements, TODOs, skipped tests, and the security patterns
          above. It flags source files that changed without a matching test
          file in the diff. It lists new dependencies, and it scores each file
          for complexity.
        </p>
        <p>
          The <code>/review</code> skill also asks the agent to run that same
          analysis on its own changes first. So the leftover logs and missing
          tests often get fixed before I see the diff at all.
        </p>
        <p>
          That leaves the first item for me. Did the agent do what I asked, and
          only that? It&apos;s the most important question on the list, and
          it&apos;s the one a human still has to answer.
        </p>
      </>
    ),
  },
  {
    slug: "why-i-stopped-building-the-github-app",
    title: "Why I stopped building the GitHub App",
    date: "2026-06-10",
    summary:
      "In March I turned DiffPrism into a GitHub App. A week later I went back to the local tool. The reason was mostly about who pays for the model.",
    content: () => (
      <>
        <p>
          In March, DiffPrism was a GitHub App for about a week. If you visited
          the site then, you saw pricing tiers and a launch post. Then it went
          back to being a local review tool. I never wrote down why, so this is
          that post.
        </p>

        <h2>Why I Built It</h2>
        <p>
          The local tool had friction. You had to be in a Claude Code session.
          You had to have the MCP server running. And the agent had to decide
          to call the review tool, which it didn&apos;t always do.
        </p>
        <p>
          A GitHub App gets rid of most of that. PRs already live on GitHub.
          Reviews already happen there. So the idea was to meet developers on
          the pull request, not in another browser tab.
        </p>

        <h2>What It Did</h2>
        <p>
          Claude and I built the first version in a single session on March 6.
          It ran as a Cloudflare Worker. You commented <code>/review</code> on a
          PR. The worker fetched the diff, pulled related code from a separate
          repo context service, and sent all of it to Claude. Then it posted
          inline comments tagged critical, suggestion, or praise.
        </p>
        <p>
          The context service was the part I spent the most time on. It split
          the repo into chunks at function and class boundaries, embedded them,
          and stored them in a vector index. So a review could point at an
          existing pattern in the repo, not just give generic advice.
        </p>
        <p>
          It was live on my own repos by March 7. The next few days were
          hardening. Webhook dedup, rate limits, keeping comments on changed
          lines, a test suite, and an admin dashboard.
        </p>

        <h2>Who Pays for the Model</h2>
        <p>
          Here&apos;s where it stalled. A hosted app calls the model with an API
          key, and every review costs money. I was running Haiku to keep that
          cost down while testing. The plan was to move to Sonnet for
          production, which would cost more.
        </p>
        <p>
          The obvious fix is to charge for it. The site had a free tier and paid
          tiers. But billing was never built. And I didn&apos;t want to pay API
          costs to run reviews in the meantime.
        </p>
        <p>
          My Claude subscription didn&apos;t help either. It powers Claude Code,
          but it isn&apos;t something a third-party app can use for its own
          model calls. I&apos;d run into that problem back in February. I tried
          a chat feature inside the local tool, and it needed its own API key
          with separate billing.
        </p>

        <h2>Going Back to Local</h2>
        <p>
          So I went back to the local tool, with one big change. DiffPrism
          doesn&apos;t call a model at all. There&apos;s no SDK and no API key.
          The AI side runs through MCP, inside the agent you already have open.
          It uses the plan you already pay for.
        </p>
        <p>
          The last commit to the GitHub App was March 14. By March 22 the local
          tool could review GitHub PRs too, with the agent reading full files
          from your local clone. So the pull request part of the idea came
          along. The hosted part didn&apos;t.
        </p>

        <h2>What I Learned</h2>
        <p>
          The GitHub App mostly solved the friction problem, and it made a
          cost problem in its place. The local tool has the opposite trade. It costs
          nothing to run, but the agent still has to reach for it.
        </p>
        <p>
          I think the cost question is the one to answer first for any AI
          tool. Who pays for each model call, and is that sustainable before
          anyone pays you? I skipped that question in March. It turned out to
          be the one that mattered.
        </p>
      </>
    ),
  },
  {
    slug: "bring-your-own-ai",
    title: "Bring your own AI: why DiffPrism has no model SDK",
    date: "2026-05-06",
    summary:
      "DiffPrism doesn't call a model. There's no API key and no vendor SDK. The AI part runs through MCP, in whatever agent you already use.",
    content: () => (
      <>
        <p>
          Most AI review tools call a model for you. You give them an API key,
          or they run the model on their servers and charge you for it.
          DiffPrism does neither. It doesn&apos;t have a model SDK at all.
        </p>

        <h2>Where the AI Lives</h2>
        <p>
          DiffPrism is a local server, a browser dashboard, and an MCP server.
          The AI is whatever agent is connected to that MCP server. For me
          that&apos;s Claude Code. It should work with any MCP client, Cursor
          included, though Claude Code is what I use every day.
        </p>
        <p>
          So when I ask about a change, the agent I already have open does the
          thinking. It uses its own context and my own plan. DiffPrism gives it
          the tools to look at the review and talk to me in it.
        </p>

        <h2>The Tools</h2>
        <p>DiffPrism exposes 14 MCP tools. They fall into a few groups.</p>
        <ul>
          <li>
            <strong>Review lifecycle.</strong> <code>open_review</code> starts a
            review of local changes or a PR. <code>get_review_result</code>{" "}
            waits for my decision. <code>update_review_context</code> lets the
            agent explain its reasoning.
          </li>
          <li>
            <strong>Headless analysis.</strong> <code>get_diff</code> and{" "}
            <code>analyze_diff</code> let the agent check its own changes
            without opening the UI.
          </li>
          <li>
            <strong>Annotations.</strong> <code>add_annotation</code>,{" "}
            <code>flag_for_attention</code>, and{" "}
            <code>get_review_state</code> put the agent&apos;s notes on the
            diff while I&apos;m looking at it.
          </li>
          <li>
            <strong>PR review.</strong> <code>get_pr_context</code>,{" "}
            <code>get_file_diff</code>, <code>get_file_context</code>,{" "}
            <code>add_review_comment</code>,{" "}
            <code>get_review_comments</code>, and <code>get_user_focus</code>.
            The agent reads whole files from my local clone, posts comments
            that show up live in the browser, and can see which file and lines
            I&apos;m looking at.
          </li>
        </ul>

        <h2>Why No SDK</h2>
        <p>
          The first reason is cost. A tool that calls a model has to pay for
          every call. Either I pay, or you bring an API key with its own
          billing. A Claude subscription powers Claude Code, but it&apos;s
          separate from API billing. So even people already paying for Claude
          would pay twice.
        </p>
        <p>
          I ran into this directly. The GitHub App version of DiffPrism
          used the Anthropic SDK and an API key, and every review cost money.
          An early chat feature in the local tool hit the same wall.
        </p>
        <p>
          The second reason is context. The agent that wrote the code already
          knows why it made each choice. A separate model call starts from zero.
          Keeping the AI in your own agent means the one answering questions is
          the one that did the work.
        </p>
        <p>
          The third is lock-in. There&apos;s no model name to pick and no
          provider to depend on. If you switch agents, DiffPrism doesn&apos;t
          care.
        </p>

        <h2>The Trade</h2>
        <p>
          It isn&apos;t free of downsides. DiffPrism only works as well as the
          agent using it. And the agent has to actually call the tools, which
          it doesn&apos;t always do without a nudge. That&apos;s still the
          weakest step in the flow.
        </p>
        <p>
          But for a tool that runs on your machine, next to the agent you
          already pay for, I think not bringing a second model is the right
          call.
        </p>

        <h2>How to Try It</h2>
        <p>
          Install with <code>npm install -g diffprism</code> and run{" "}
          <code>diffprism setup</code>. That registers the MCP server with
          Claude Code. From there, ask your agent to open a review.
        </p>
      </>
    ),
  },
  {
    slug: "critical-notable-mechanical",
    title: "Critical, notable, mechanical",
    date: "2026-04-08",
    summary:
      "Not every file in a diff needs the same attention. DiffPrism sorts changed files into three groups so I read the risky ones first and approve the config churn in one click.",
    content: () => (
      <>
        <p>
          An agent diff that touches 18 files doesn&apos;t have 18 files worth
          reading closely. A few carry the real change. A few support it. And
          some are just a lockfile and a tsconfig.
        </p>
        <p>
          For a while DiffPrism showed every file the same way. So I started
          sorting them.
        </p>

        <h2>Three Groups</h2>
        <p>
          When a review opens, DiffPrism puts each changed file into one of
          three groups. The checks run in order, and the first match wins.
        </p>
        <p>
          <strong>Critical</strong> is anything that deserves a careful read.
        </p>
        <ul>
          <li>
            Security patterns in the added lines, like <code>eval</code>,{" "}
            <code>innerHTML</code>, shell execution, SQL in template strings,
            or a hardcoded secret.
          </li>
          <li>A complexity score of 8 or more out of 10.</li>
          <li>
            API surface, meaning a path with <code>/api/</code> or{" "}
            <code>/routes/</code> in it, or an index file with real additions.
          </li>
        </ul>
        <p>
          <strong>Mechanical</strong> is anything that doesn&apos;t change
          behavior.
        </p>
        <ul>
          <li>A pure rename.</li>
          <li>
            Formatting only, where every added line matches a deleted one once
            whitespace is ignored.
          </li>
          <li>
            Config files like <code>tsconfig.json</code>,{" "}
            <code>.eslintrc</code>, <code>.gitignore</code>, and lockfiles.
          </li>
          <li>Changes that only touch imports and re-exports.</li>
        </ul>
        <p>
          <strong>Notable</strong> is everything else. That&apos;s most real
          code, and it still needs a review.
        </p>

        <h2>How the Score Works</h2>
        <p>
          The complexity score is simple on purpose. A file gets points for a
          big diff and for a lot of separate hunks. It gets more for added
          branches, like if, switch, catch, and boolean logic. And it gets more
          for deeply nested lines. It&apos;s not a perfect measure of how hard
          code is to read. But it&apos;s pretty good at pointing out where I
          should slow down.
        </p>

        <h2>In the Review</h2>
        <p>
          The file list groups files under Critical, Notable, and Mechanical
          headers. I start at the top. The Mechanical group has an Approve all
          button, so the config churn takes one click.
        </p>
        <p>
          Above the diff, a briefing bar adds context. It shows how many
          modules the change touches, any new dependencies, how many files are
          complex or untested, and any security flags. Between the two, I know
          where to spend my time before I read a line.
        </p>

        <h2>What It Doesn&apos;t Do</h2>
        <p>
          It&apos;s all pattern matching. No model decides which group a file
          lands in. That keeps it fast and predictable, but it can be wrong. A
          risky change in a file without an <code>/api/</code> path won&apos;t
          show up as critical. So I treat the groups as a reading order, not a
          verdict. Notable files still get read.
        </p>
        <p>
          The mechanical group is where it saves the most time. A lockfile diff
          doesn&apos;t need a line by line read, and now it doesn&apos;t get
          one.
        </p>
      </>
    ),
  },
  {
    slug: "one-review-server-many-agents",
    title: "One review server, many agents",
    date: "2026-03-18",
    summary:
      "I run more than one Claude Code session at a time. So DiffPrism moved to a single local server that every session posts reviews to, with one dashboard to review them all.",
    content: () => (
      <>
        <p>
          DiffPrism started as one review per run. An agent opened a review, a
          browser tab showed the diff, and when I decided, it went away.
        </p>
        <p>
          That was fine with one agent. But I usually have a few Claude Code
          sessions going. Each one opened its own review, separate from the
          others. I wanted to flip back and forth between them in one place.
        </p>

        <h2>One Server</h2>
        <p>
          So DiffPrism got a global server. It&apos;s a small HTTP and
          WebSocket server that runs in the background on your machine. Every
          session talks to the same one.
        </p>
        <p>
          When it starts, it writes its ports and process ID to{" "}
          <code>~/.diffprism/server.json</code>. Anything that wants to open a
          review reads that file. It checks the process is still alive, pings
          the status endpoint, and uses that server. If the file is stale, it
          gets cleaned up.
        </p>
        <p>
          The server itself doesn&apos;t compute diffs. Each agent&apos;s MCP
          server runs in its own project directory. It builds the diff and the
          analysis there, then posts the whole thing to the global server. So
          the server is mostly a session manager and a relay to the browser.
        </p>

        <h2>Sessions</h2>
        <p>
          Each review is a session. The dashboard sidebar lists all of them.
          Each one shows its status, branch, file count, lines added and
          removed, and how long ago it came in.
        </p>
        <p>A few things make that list work with several agents.</p>
        <ul>
          <li>
            <strong>Live updates.</strong> Each session watches its project. If
            the agent keeps editing while the review is open, the diff updates
            and the session shows a new changes indicator.
          </li>
          <li>
            <strong>One session per project.</strong> If an agent opens another
            review for the same project, it updates the existing session in
            place. So the sidebar doesn&apos;t fill up with copies.
          </li>
          <li>
            <strong>Cleanup.</strong> Finished sessions expire after a few
            minutes. Pending ones expire after an hour.
          </li>
          <li>
            <strong>Notifications.</strong> A browser notification fires when a
            new review arrives, so I don&apos;t have to keep checking the tab.
          </li>
          <li>
            <strong>Attention flags.</strong> An agent can flag a session for
            attention, and it shows a warning in the sidebar.
          </li>
        </ul>

        <h2>Server First</h2>
        <p>
          Early on there were a few ways to run a review. Ephemeral mode, watch
          mode, and the server. That made the <code>/review</code> skill long,
          because it had to explain all of them to the agent.
        </p>
        <p>
          So I cut it down to one path. The server starts itself when
          it&apos;s needed, and the other modes are gone. The skill went from
          130 lines to 27. The model&apos;s only job is to call one tool.
        </p>
        <p>
          That matters more than it sounds. The agent calling the tool is the
          least reliable step in the whole flow. The less it has to decide, the
          more often it works.
        </p>

        <h2>How to Try It</h2>
        <p>
          Install with <code>npm install -g diffprism</code> and run{" "}
          <code>diffprism setup</code>. Then run <code>diffprism</code> to start
          the server and open the dashboard. Reviews from any Claude Code
          session will show up in the sidebar.
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
