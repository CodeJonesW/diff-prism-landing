import { Link } from "react-router-dom";
import "./App.css";

const GITHUB_URL = "https://github.com/CodeJonesW/diffprism";
const NPM_URL = "https://www.npmjs.com/package/diffprism";
const INSTALL_CMD = "npm install -g diffprism";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25V2.75zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25H1.75zM7.25 8a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L5.44 8 3.72 6.28a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm1.5 1.5a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
    </svg>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="/" className="nav-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#111520" />
            <path d="M8 10h16M8 16h12M8 22h8" stroke="#63abff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="26" cy="16" r="3" fill="#7ee787" opacity="0.9" />
          </svg>
          DiffPrism
        </a>
        <div className="nav-links">
          <Link to="/why">Why DiffPrism</Link>
          <Link to="/blog">Blog</Link>
          <a href="#how-it-works">Workflows</a>
          <a href="#agents">Multi-agent</a>
          <a href="#features">Features</a>
          <a href={GITHUB_URL} className="btn-github" target="_blank" rel="noopener">
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <span className="hero-badge">Open source &middot; Runs on your machine &middot; Claude Code &amp; Cursor</span>
        <h1>
          Catch it before the commit.
          <br />
          <span className="accent">Discuss it before the merge.</span>
        </h1>
        <p className="hero-sub">
          DiffPrism puts AI-written code in front of you at the two moments that matter:
          when your agent is about to commit, and when a pull request is waiting on you.
          Read the diff, ask the agent about any line, and get the answer right there in the thread.
        </p>
        <div className="hero-actions">
          <a href={NPM_URL} className="btn-primary" target="_blank" rel="noopener">
            <TerminalIcon />
            Get started
          </a>
          <a href={GITHUB_URL} className="btn-secondary" target="_blank" rel="noopener">
            <GitHubIcon />
            View on GitHub
          </a>
        </div>
        <div className="hero-install">
          <code>{INSTALL_CMD}</code>
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="demo-section">
      <div className="container">
        <div className="demo-pr">
          <div className="demo-pr-header">
            <span className="demo-pr-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
              </svg>
            </span>
            <span className="demo-pr-title">Add a rate limiter</span>
            <span className="demo-pr-number">working copy &middot; waiting on your review</span>
          </div>

          <div className="demo-diff-view">
            <div className="demo-diff-file">
              <span className="demo-diff-file-icon">M</span>
              <span>src/rate-limit.ts</span>
              <span className="demo-diff-stats"><span className="demo-stat-add">+8</span> <span className="demo-stat-del">-2</span></span>
            </div>
            <div className="demo-diff-lines">
              <div className="demo-diff-line demo-diff-add">
                <span className="demo-line-num"></span>
                <span className="demo-line-num">3</span>
                <code>{"export function allow(user: string, limit = 10, windowMs = 60_000) {"}</code>
              </div>
              <div className="demo-diff-line demo-diff-add">
                <span className="demo-line-num"></span>
                <span className="demo-line-num">4</span>
                <code>{"  const now = Date.now();"}</code>
              </div>
              <div className="demo-diff-line demo-diff-add">
                <span className="demo-line-num"></span>
                <span className="demo-line-num">5</span>
                <code>{"  const recent = (hits.get(user) ?? []).filter((t) => now - t < windowMs);"}</code>
              </div>
            </div>

            {/* A thread on the line: the reviewer asks, the agent answers */}
            <div className="demo-thread">
              <div className="demo-thread-msg">
                <span className="demo-thread-author demo-thread-you">You</span>
                <p>Why keep every timestamp instead of a simple counter?</p>
              </div>
              <div className="demo-thread-msg demo-thread-reply">
                <span className="demo-thread-author demo-thread-agent">
                  <span className="demo-ai-badge">AI</span>
                  claude-code
                </span>
                <p>
                  A counter resets on the minute, so a user could send 10 requests at 0:59 and
                  10 more at 1:00. Timestamps give a true sliding window: never more
                  than <code>limit</code> in the last 60 seconds.
                </p>
              </div>
              <div className="demo-thread-msg demo-thread-reply">
                <span className="demo-thread-author demo-thread-you">You</span>
                <p>Makes sense. Add a test for the edge of the window.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-terminal">
          <div className="demo-terminal-header">
            <div className="demo-terminal-dots">
              <span /><span /><span />
            </div>
            <span className="demo-terminal-title">Claude Code</span>
          </div>
          <div className="demo-terminal-body">
            <div className="demo-terminal-line demo-terminal-tool">
              <span className="demo-tool-icon">{"~>"}</span>
              <span>diffprism <span className="demo-tool-name">open_review</span> <span className="demo-tool-args">(title: "Add a rate limiter")</span></span>
            </div>
            <div className="demo-terminal-line demo-terminal-response">
              <span>The reviewer asked about <code>src/rate-limit.ts:5</code> before deciding.</span>
            </div>
            <div className="demo-terminal-line demo-terminal-tool">
              <span className="demo-tool-icon">{"~>"}</span>
              <span>diffprism <span className="demo-tool-name">reply</span> <span className="demo-tool-args">(explains the sliding window)</span></span>
            </div>
            <div className="demo-terminal-line demo-terminal-tool">
              <span className="demo-tool-icon">{"~>"}</span>
              <span>diffprism <span className="demo-tool-name">get_review_result</span> <span className="demo-tool-args">(wait: true)</span></span>
            </div>
            <div className="demo-terminal-line demo-terminal-response">
              <span>Changes requested: add a test for the edge of the window. Writing it now.</span>
            </div>
          </div>
        </div>

        <p className="demo-caption">
          You ask in the diff. The agent answers in the diff. Nobody copies text between a browser and a terminal.
        </p>
      </div>
    </section>
  );
}

function Workflows() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <span className="section-label">Two workflows</span>
        <h2>One review loop, wherever the code is</h2>
        <div className="workflows">
          <div className="workflow">
            <span className="workflow-tag">Before it&apos;s committed</span>
            <h3>Review your agent&apos;s changes locally</h3>
            <p className="workflow-lede">
              The cheapest place to catch a wrong turn is before it becomes a commit, a CI run,
              and a teammate&apos;s review. When your agent commits, DiffPrism opens the diff in your
              browser and holds the commit until you decide.
            </p>
            <ol className="workflow-steps">
              <li>
                <strong>Your agent runs <code>git commit</code>.</strong> The commit gate opens the
                staged diff for review.
              </li>
              <li>
                <strong>You read it and ask.</strong> Question a line, and the agent answers in the
                thread while you keep reading.
              </li>
              <li>
                <strong>Request changes or approve.</strong> Your feedback goes straight back to the
                agent that wrote the code. When you approve, the commit goes through.
              </li>
            </ol>
            <code className="workflow-cmd">diffprism hook install</code>
          </div>

          <div className="workflow">
            <span className="workflow-tag">Before it&apos;s merged</span>
            <h3>Review pull requests with an agent that read the code</h3>
            <p className="workflow-lede">
              Open any GitHub PR and DiffPrism starts an agent for it. The agent reads whole files
              from your local clone, not just the hunks, and answers your questions on any line.
            </p>
            <ol className="workflow-steps">
              <li>
                <strong>Open the PR.</strong> DiffPrism fetches the diff, finds your local clone,
                and starts Claude Code or Cursor, whichever you picked.
              </li>
              <li>
                <strong>Ask about any line.</strong> The agent replies in the thread, with the
                context of the whole codebase behind it. It can read your code, but it can&apos;t
                edit files or run commands.
              </li>
              <li>
                <strong>Approve, request changes, or comment.</strong> It posts to GitHub as a real
                review, and you choose which of your threads go public.
              </li>
            </ol>
            <code className="workflow-cmd">diffprism review owner/repo#123</code>
          </div>
        </div>
        <p className="workflows-note">
          New to reviewing agent code? <Link to="/why">Why review locally, before the push &rarr;</Link>
        </p>
      </div>
    </section>
  );
}

function MultiAgent() {
  return (
    <section className="differentiators agents" id="agents">
      <div className="container">
        <span className="section-label">More than one agent</span>
        <h2>Every coding agent you pay for, on one review.</h2>
        <p className="differentiators-sub">
          Put Claude Code and Cursor on the same pull request. Each one reviews it, then votes on
          what the others found, and you read one list sorted by how much they agree.
        </p>
        <figure className="agents-shot">
          <img
            src="/blog/every-coding-agent-in-one-review/review-dojo.png"
            alt="DiffPrism reviewing a pull request with the Review dojo panel open, showing 22 findings from Claude Code and Cursor, 17 of them agreed, with each agent's vote under every finding."
            loading="lazy"
          />
        </figure>
        <div className="diff-grid">
          <div className="diff-card">
            <span className="diff-icon">{"vs"}</span>
            <h3>The review dojo</h3>
            <p>
              Tick the agents installed on your machine. Each reviews the PR on its own, then
              votes on the others&apos; findings: agreed, disputed, or raised by one reviewer. Every
              finding also lands as a thread on its line.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"=="}</span>
            <h3>Counted, not summarized</h3>
            <p>
              DiffPrism counts the votes itself. No agent writes up the others, so what you see
              is what each one actually said.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"->"}</span>
            <h3>Pick who answers</h3>
            <p>
              Choose Claude Code or Cursor to answer your questions, with a model for each. Set it
              in the dashboard, or for one review with <code>--agent cursor --model gpt-5</code>.
            </p>
          </div>
        </div>
        <p className="workflows-note">
          Works with Claude Code and Cursor today. Codex, Grok Build and Antigravity are next on
          the list.{" "}
          <Link to="/blog/every-coding-agent-in-one-review">Read how it came together &rarr;</Link>
        </p>
      </div>
    </section>
  );
}

function WhatMakesItDifferent() {
  return (
    <section className="differentiators">
      <div className="container">
        <span className="section-label">Why DiffPrism</span>
        <h2>Review is a conversation, not a handoff.</h2>
        <p className="differentiators-sub">
          Most AI review tools leave a pile of comments and walk away. DiffPrism keeps the agent
          in the room, so it can explain, defend, or fix what it wrote while you&apos;re still reading.
        </p>
        <div className="diff-grid">
          <div className="diff-card">
            <span className="diff-icon">{"<>"}</span>
            <h3>Threads on every line</h3>
            <p>
              Ask on any line of a local diff or a PR. The agent answers in the thread, and you
              can reply back. It works the same in both workflows.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"||"}</span>
            <h3>A commit gate that waits for you</h3>
            <p>
              <code>git commit</code> opens the review and waits for your decision. Your
              questions and requested changes go straight to the agent that made them.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"><"}</span>
            <h3>Whole-codebase context</h3>
            <p>
              Your agent reads full files from your local clone with <code>git show</code>, not just
              diff hunks: imports, callers, and the code around the change.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"ok"}</span>
            <h3>Decisions that land on GitHub</h3>
            <p>
              Approve, request changes, or comment from the dashboard, and it posts a real GitHub
              review. Your back-and-forth with the agent stays private unless you pick it.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"[]"}</span>
            <h3>Bring your own AI</h3>
            <p>
              No model API keys and no vendor SDK. Works with Claude Code, Cursor, or any MCP
              client, through the plan you already pay for.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"++"}</span>
            <h3>Runs on your machine</h3>
            <p>
              The server, dashboard, and analysis all run locally. DiffPrism only contacts GitHub to
              fetch a PR you open or to post a review you submit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: "/",
    title: "One-command setup",
    description:
      "diffprism setup registers the MCP server, grants its tool permissions, and installs the /review skill for Claude Code.",
  },
  {
    icon: "||",
    title: "Commit gate",
    description:
      "diffprism hook install holds large commits for a human review. Small commits pass straight through, and you set the threshold.",
  },
  {
    icon: "<>",
    title: "Conversation threads",
    description:
      "The agent answers with reply and listens with wait_for_comments. A question you ask mid-review interrupts its wait, so it can answer right away.",
  },
  {
    icon: "PR",
    title: "GitHub PR review",
    description:
      "Full or shorthand PR refs. A syntax-highlighted diff, file browser, and briefing bar, with your local clone found automatically.",
  },
  {
    icon: "AI",
    title: "Agent annotations",
    description:
      "annotate puts findings inline on the diff in real time. Warnings flag the session in the sidebar so nothing slips by.",
  },
  {
    icon: "[]",
    title: "Multi-session dashboard",
    description:
      "Every agent and every PR you're reviewing, in one persistent dashboard. Diffs update live as agents keep working.",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <span className="section-label">Features</span>
        <h2>Everything you need. Nothing you don&apos;t.</h2>
        <p className="features-sub">
          Local agent review and GitHub PR review. One tool, one loop, 14 MCP tools.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section className="arch-flow">
      <div className="container">
        <span className="section-label">Architecture</span>
        <h2>Under the hood</h2>
        <p className="arch-subtitle">
          Your browser shows the diff. Your agent reads the code. MCP connects them.
        </p>
        <div className="arch-diagram">
          <div className="arch-actor">
            <div className="arch-actor-icon">{">_"}</div>
            <h4>AI Tool</h4>
            <p>Claude Code, Cursor, or any MCP client</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">MCP</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">DP</div>
            <h4>DiffPrism Server</h4>
            <p>HTTP + WebSocket + MCP server</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">WS</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">UI</div>
            <h4>Browser UI</h4>
            <p>Diff viewer, threads and decisions</p>
          </div>
        </div>
        <div className="arch-details">
          <div>
            <code>GitHub API</code>
            <p>Fetches the PRs you open, and posts your review when you decide</p>
          </div>
          <div>
            <code>Local repo</code>
            <p>Reads full files via git show for complete context — not just diff hunks</p>
          </div>
          <div>
            <code>Real-time sync</code>
            <p>Threads, findings, focus and diff updates stream over WebSocket</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CLI() {
  return (
    <section className="cli-section" id="cli">
      <div className="container">
        <span className="section-label">CLI</span>
        <h2>Works how you&apos;d expect</h2>
        <div className="cli-grid">
          <div className="cli-example">
            <code className="cli-cmd">diffprism setup</code>
            <p>Connect DiffPrism to Claude Code in one command</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism hook install</code>
            <p>Hold your agent&apos;s large commits for a human review</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review</code>
            <p>Review everything uncommitted, staged and unstaged</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review owner/repo#123</code>
            <p>Review a GitHub PR with your agent</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review owner/repo#123 --agent cursor</code>
            <p>Pick the agent that answers on this review</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review HEAD~3..HEAD</code>
            <p>Review a range of commits</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism doctor</code>
            <p>Check that what DiffPrism installed matches the version you run</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism feedback</code>
            <p>Share feedback or report a bug. You see the issue before anything is sent.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    q: "What is DiffPrism?",
    a: "A local code review tool for AI-written code. It opens your agent's changes before they're committed, or any GitHub PR, in a browser diff view. It connects your AI assistant to that review over MCP, so the agent can point out problems, answer your questions, and fix what you ask for.",
  },
  {
    q: "What are the two workflows?",
    a: "Local: your agent's uncommitted changes, opened by the commit gate or the /review skill, with your decision going back to the agent. PR: any GitHub pull request, opened with diffprism review, with your decision posted to GitHub. Threads work in both.",
  },
  {
    q: "How can the agent answer while it waits for my decision?",
    a: "In a local review, asking a question ends the agent's wait. It answers in the thread, then goes back to waiting for your decision. On a PR, DiffPrism starts an agent for the review and runs it each time a new question comes in.",
  },
  {
    q: "What is the review dojo?",
    a: "A panel on PR reviews that puts several agents on the same pull request. Each one reviews it on its own, then votes on what the others found. You get one list grouped by agreement, with every agent's vote under each finding.",
  },
  {
    q: "Does it cost anything to run the AI?",
    a: "DiffPrism never calls a model API itself. It runs the Claude Code or Cursor you already have installed, on the plan you already pay for. There are no API keys to configure and no per-token bills from DiffPrism.",
  },
  {
    q: "Does my code leave my machine?",
    a: "No. The server, dashboard, and analysis run locally. DiffPrism only talks to GitHub to fetch a PR you open and, when you decide, to post your review. Your threads with the agent are only posted if you tick them.",
  },
  {
    q: "What AI tools are supported?",
    a: "Claude Code and Cursor can answer your questions on a PR and take part in the review dojo, each with a model you choose. Any MCP-compatible tool can use DiffPrism's review tools. DiffPrism provides the review. You bring the AI.",
  },
  {
    q: "Is it free?",
    a: "Yes. DiffPrism is open source and free to use. Install it with npm install -g diffprism.",
  },
  {
    q: "What languages are supported?",
    a: "Anything git can diff. Syntax highlighting covers all major languages, and the analysis has extra support for TypeScript, JavaScript, Python, Go, and Rust.",
  },
];

function FAQ() {
  return (
    <section className="faq" id="faq">
      <div className="container">
        <span className="section-label">FAQ</span>
        <h2>Frequently asked questions</h2>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <div className="faq-item" key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-box">
          <h2>Keep a human in the loop without slowing it down</h2>
          <p>Review your agent&apos;s work before the commit and before the merge, and talk it through right on the diff.</p>
          <div className="hero-actions">
            <a href={NPM_URL} className="btn-primary" target="_blank" rel="noopener">
              <TerminalIcon />
              Get started
            </a>
            <a href={GITHUB_URL} className="btn-secondary" target="_blank" rel="noopener">
              <GitHubIcon />
              View source
            </a>
          </div>
          <div className="hero-install">
            <code>{INSTALL_CMD}</code>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          DiffPrism &mdash; human review for AI-written code.{" "}
          <a href={GITHUB_URL} target="_blank" rel="noopener">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <>
      <Nav />
      <Hero />
      <DemoSection />
      <Workflows />
      <MultiAgent />
      <WhatMakesItDifferent />
      <Features />
      <Architecture />
      <CLI />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
