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
          <a href="#how-it-works">How it works</a>
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
        <span className="hero-badge">Local-first &middot; Multi-session &middot; Open source</span>
        <h1>
          Review what your
          <br />
          <span className="accent">agents built</span>
        </h1>
        <p className="hero-sub">
          DiffPrism gives you a browser-based review dashboard for agent-generated code.
          Spin up multiple AI coding sessions, review them all from one place,
          and ship with structured decisions.
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
                <path d="M1.5 3.25a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zm5.677-.177L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm0 9.5a.75.75 0 100 1.5.75.75 0 000-1.5z" />
              </svg>
            </span>
            <span className="demo-pr-title">DiffPrism Review Dashboard</span>
            <span className="demo-pr-number">3 active sessions</span>
          </div>

          <div className="demo-sessions">
            <div className="demo-session demo-session-active">
              <div className="demo-session-status demo-status-review" />
              <div className="demo-session-info">
                <span className="demo-session-title">feat: add retry logic to API client</span>
                <span className="demo-session-meta">feature/api-retry &middot; 4 files &middot; +87 -12</span>
              </div>
              <span className="demo-session-badge demo-badge-review">in review</span>
            </div>
            <div className="demo-session">
              <div className="demo-session-status demo-status-pending" />
              <div className="demo-session-info">
                <span className="demo-session-title">fix: resolve auth token refresh race condition</span>
                <span className="demo-session-meta">fix/auth-race &middot; 2 files &middot; +23 -8</span>
              </div>
              <span className="demo-session-badge demo-badge-pending">pending</span>
            </div>
            <div className="demo-session">
              <div className="demo-session-status demo-status-approved" />
              <div className="demo-session-info">
                <span className="demo-session-title">refactor: extract shared validation utils</span>
                <span className="demo-session-meta">refactor/validation &middot; 6 files &middot; +142 -89</span>
              </div>
              <span className="demo-session-badge demo-badge-approved">approved</span>
            </div>
          </div>

          <div className="demo-review-pane">
            <div className="demo-comment demo-comment-review">
              <div className="demo-comment-body">
                <div className="demo-inline-comment demo-severity-red">
                  <div className="demo-inline-file">src/api/client.ts:47</div>
                  <p>
                    <strong>Must fix:</strong> This catch block swallows the error silently.
                    The retry logic needs to propagate the final error after exhausting attempts.
                  </p>
                </div>
                <div className="demo-inline-comment demo-severity-yellow">
                  <div className="demo-inline-file">src/api/client.ts:31</div>
                  <p>
                    <strong>Suggestion:</strong> The retry delay is hardcoded to 1000ms.
                    Consider exponential backoff to avoid overwhelming the server on sustained failures.
                  </p>
                </div>
                <div className="demo-inline-comment demo-severity-green">
                  <div className="demo-inline-file">src/api/client.ts:15</div>
                  <p>
                    <strong>Looks good:</strong> Clean use of <code>AbortController</code> for
                    timeout handling. Consistent with the rest of the API layer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="demo-caption">
          Multiple agents, one dashboard. Review every session before it ships.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <span className="section-label">How it works</span>
        <h2>From install to reviewing in under a minute</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Install</h3>
            <p>
              One command to install, one command to integrate with Claude Code.
              DiffPrism registers as an MCP server and adds the <code>/review</code> skill automatically.
            </p>
            <code>diffprism setup</code>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Work</h3>
            <p>
              Run multiple Claude Code sessions across worktrees, branches, or projects.
              Each agent works independently. When they're ready for review, DiffPrism catches it.
            </p>
            <code>Agents call /review</code>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Review</h3>
            <p>
              All sessions appear in one browser dashboard. Review diffs with syntax highlighting,
              leave inline comments, approve or request changes. The agent acts on your decision.
            </p>
            <code>Approve & ship</code>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatMakesItDifferent() {
  return (
    <section className="differentiators">
      <div className="container">
        <span className="section-label">Why DiffPrism</span>
        <h2>You shouldn't have to read diffs in a terminal.</h2>
        <p className="differentiators-sub">
          AI agents write code fast. Reviewing it shouldn't be the bottleneck.
          DiffPrism gives you a real review UI that keeps up with your workflow.
        </p>
        <div className="diff-grid">
          <div className="diff-card">
            <span className="diff-icon">{"[]"}</span>
            <h3>Multi-session</h3>
            <p>
              Run 3 agents on 3 tasks. Review them all from one persistent dashboard
              instead of context-switching between terminals.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"><"}</span>
            <h3>Local-first</h3>
            <p>
              Everything runs on your machine. No code leaves your laptop.
              A background server manages sessions and serves the review UI.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"!!"}</span>
            <h3>Structured decisions</h3>
            <p>
              Approve, request changes, or dismiss. Typed inline comments — must_fix, suggestion,
              question, nitpick. The agent reads your decision and acts on it.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"<>"}</span>
            <h3>Syntax-highlighted diffs</h3>
            <p>
              Unified or split view with full syntax highlighting.
              Click any line to comment. Keyboard shortcuts for fast navigation.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"~>"}</span>
            <h3>MCP-native</h3>
            <p>
              Integrates with Claude Code via MCP. Agents can open reviews,
              push annotations, flag files for attention, and poll for your decision.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"++"}</span>
            <h3>Deterministic analysis</h3>
            <p>
              Complexity scores, security pattern flags, test coverage gaps, and
              module impact — computed locally with no AI, before you even open the diff.
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
      "diffprism setup registers the MCP server, configures permissions, and installs the /review skill for Claude Code. Works globally or per-project.",
  },
  {
    icon: "[]",
    title: "Multi-session dashboard",
    description:
      "All active review sessions in one browser tab. Status badges, file counts, and branch info at a glance. Desktop notifications when new reviews arrive.",
  },
  {
    icon: "{}",
    title: "9 MCP tools",
    description:
      "open_review, get_review_result, analyze_diff, add_annotation, flag_for_attention, and more. Agents can self-review, annotate findings, and wait for human decisions.",
  },
  {
    icon: "!!",
    title: "Typed inline comments",
    description:
      "Four comment types: must_fix, suggestion, question, nitpick. Your agent reads the structured decision and knows exactly what to fix.",
  },
  {
    icon: "<>",
    title: "GitHub PR review",
    description:
      "Review pull requests with the full DiffPrism UI. Post comments back to GitHub. Works with diffprism review owner/repo#123.",
  },
  {
    icon: "->",
    title: "Watch mode",
    description:
      "Diffs update in real-time as the agent iterates. No need to re-open the browser — the review UI stays in sync via WebSocket.",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <span className="section-label">Features</span>
        <h2>Everything you need. Nothing you don't.</h2>
        <p className="features-sub">
          A focused review tool for agent-generated code.
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
          A persistent local server that bridges your agents and a browser-based review UI.
        </p>
        <div className="arch-diagram">
          <div className="arch-actor">
            <div className="arch-actor-icon">{">_"}</div>
            <h4>Claude Code</h4>
            <p>Agent calls /review via MCP</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">MCP</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">DP</div>
            <h4>DiffPrism Server</h4>
            <p>HTTP + WebSocket daemon</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">WS</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">UI</div>
            <h4>Review UI</h4>
            <p>Browser-based diff viewer</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">Decision</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">{">_"}</div>
            <h4>Agent acts</h4>
            <p>Commits, fixes, or opens PR</p>
          </div>
        </div>
        <div className="arch-details">
          <div>
            <code>Global server</code>
            <p>Auto-starts on first review, manages all sessions, cleans up stale state</p>
          </div>
          <div>
            <code>WebSocket sync</code>
            <p>Real-time updates between agents and the review UI — diffs, annotations, decisions</p>
          </div>
          <div>
            <code>Structured output</code>
            <p>ReviewResult JSON with decision, typed comments, and file statuses the agent can parse</p>
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
        <h2>Works how you'd expect</h2>
        <div className="cli-grid">
          <div className="cli-example">
            <code className="cli-cmd">diffprism review</code>
            <p>Review your working copy (staged + unstaged changes)</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review --staged</code>
            <p>Review only staged changes</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review HEAD~3</code>
            <p>Review the last 3 commits</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review main..feature</code>
            <p>Review a branch diff</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review owner/repo#123</code>
            <p>Review a GitHub pull request</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism setup --global</code>
            <p>One-command Claude Code integration</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    q: "What is DiffPrism?",
    a: "A local-first code review tool for agent-generated changes. It opens a browser-based review UI where you can inspect diffs, leave inline comments, and make structured decisions that your AI agent acts on.",
  },
  {
    q: "How does multi-session work?",
    a: "A persistent background server manages all review sessions. Multiple Claude Code instances (across worktrees, branches, or projects) submit reviews to the same server. You see all sessions in one browser dashboard.",
  },
  {
    q: "Does my code leave my machine?",
    a: "No. DiffPrism runs entirely locally. The server, UI, and analysis all run on your machine. The only external calls are if you choose to review or post to a GitHub PR.",
  },
  {
    q: "How does it integrate with Claude Code?",
    a: "Run diffprism setup to register as an MCP server. This gives Claude Code 9 tools for opening reviews, pushing annotations, and polling for your decisions. It also installs a /review skill.",
  },
  {
    q: "Can I use it without Claude Code?",
    a: "Yes. The CLI works standalone — diffprism review opens the browser UI for any git diff. The MCP integration is optional.",
  },
  {
    q: "What does the analysis include?",
    a: "Deterministic (no AI) analysis: complexity scores per file, security pattern flags (hardcoded secrets, SQL injection, XSS), test coverage gaps, affected modules, and breaking change detection.",
  },
  {
    q: "Is it free?",
    a: "Yes. DiffPrism is open source and free to use. Install it with npm install -g diffprism.",
  },
  {
    q: "What languages are supported?",
    a: "DiffPrism works with any language that git can diff. Syntax highlighting covers all major languages via refractor. The deterministic analysis has enhanced support for TypeScript, JavaScript, Python, Go, and Rust.",
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
          <h2>Stop reading diffs in your terminal</h2>
          <p>Install DiffPrism and review agent-generated code the way it deserves.</p>
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
          DiffPrism &mdash; code review for the age of agents.{" "}
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
      <HowItWorks />
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
