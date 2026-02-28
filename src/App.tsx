import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const GITHUB_URL = "https://github.com/CodeJonesW/diffprism";
const NPM_URL = "https://www.npmjs.com/package/diffprism";
const INSTALL_CMD = "npx diffprism setup";

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="5" width="8" height="8" rx="1.5" />
      <path d="M3 11V3a1.5 1.5 0 0 1 1.5-1.5H11" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8.5l3.5 3.5 6.5-7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 0v16h16V0H0zm13.2 13.2H8V5.6H4.8v7.6H2.8V2.8h10.4v10.4z" />
    </svg>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="/" className="nav-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#161b22" />
            <path d="M8 10h16M8 16h12M8 22h8" stroke="#58a6ff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="26" cy="16" r="3" fill="#2ea043" opacity="0.8" />
          </svg>
          DiffPrism
        </a>
        <div className="nav-links">
          <Link to="/why">Why DiffPrism</Link>
          <Link to="/blog">Blog</Link>
          <a href="#workflows">Workflows</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href={NPM_URL} className="btn-github" target="_blank" rel="noopener">
            <NpmIcon />
            npm
          </a>
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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero">
      <div className="container">
        <span className="hero-badge">Open source &middot; Local-first &middot; Agent-native</span>
        <h1>
          Code review for
          <br />
          <span className="accent">agent-generated</span> changes
        </h1>
        <p className="hero-sub">
          Zero-config daemon auto-starts in the background. Agents self-review their changes,
          then you sign off in the browser — one session or many in parallel.
        </p>
        <div className="hero-actions">
          <a href="#how-it-works" className="btn-primary">
            Get started
          </a>
          <a href={GITHUB_URL} className="btn-secondary" target="_blank" rel="noopener">
            <GitHubIcon />
            View on GitHub
          </a>
        </div>
        <div className="install-block">
          <div className="install-snippet">
            <span className="prompt">$</span>
            <code>{INSTALL_CMD}</code>
            <button className="copy-btn" onClick={handleCopy} aria-label="Copy install command">
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoWindow() {
  return (
    <section className="demo-section">
      <div className="container">
        <div className="demo-window">
          <div className="demo-titlebar">
            <div className="demo-dot" />
            <div className="demo-dot" />
            <div className="demo-dot" />
          </div>
          <img
            src="/ui-progress-1.png"
            alt="DiffPrism review UI showing a diff with file sidebar, syntax-highlighted changes, and approve/reject buttons"
            className="demo-screenshot"
          />
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: "{}",
    title: "Auto-start daemon",
    description:
      "Server starts automatically the first time any client needs it. No manual setup, no background process to manage — it just works.",
  },
  {
    icon: "::",
    title: "Multi-session dashboard",
    description:
      "Review multiple Claude Code sessions from one browser tab. Status badges, branch info, desktop notifications — click to switch.",
  },
  {
    icon: "~",
    title: "Agent self-review",
    description:
      "Agents call analyze_diff to catch console.logs, security issues, missing tests, and high complexity before requesting human review.",
  },
  {
    icon: "PR",
    title: "GitHub PR review",
    description:
      "Review any GitHub pull request in DiffPrism's full UI. Optionally post the review decision back to GitHub.",
  },
  {
    icon: "@",
    title: "Multi-agent annotations",
    description:
      "Specialized agents — security, performance, convention — annotate the same review session with structured findings for the human reviewer.",
  },
  {
    icon: "->",
    title: "Quick actions",
    description:
      "Approve & Commit or Approve, Commit & PR directly from the review UI. One click from review to merged — no extra confirmation step.",
  },
  {
    icon: "||",
    title: "Split diff view",
    description:
      "Toggle between unified and side-by-side diffs. Language-aware syntax highlighting with line numbers and hunk headers.",
  },
  {
    icon: "/",
    title: "Claude Code /review",
    description:
      "One command setup. Type /review in Claude Code and DiffPrism opens your changes in the browser via MCP. Server auto-starts in the background.",
  },
  {
    icon: "+",
    title: "Inline commenting",
    description:
      "Click any line to leave a comment. Tag as must_fix, suggestion, question, or nitpick. Comments flow back to the agent.",
  },
  {
    icon: "#",
    title: "Review briefing",
    description:
      "Automatic analysis: complexity scoring, affected modules, test coverage gaps, pattern flags, and dependency changes.",
  },
  {
    icon: "^",
    title: "Keyboard shortcuts",
    description:
      "Navigate files with j/k, cycle file status with s, open the hotkey guide with ?. Stay on the keyboard the whole review.",
  },
  {
    icon: "?",
    title: "Agent reasoning",
    description:
      "Collapsible panel showing why the agent made each change. Understand the intent before you approve.",
  },
];

function Workflows() {
  return (
    <section className="modes" id="workflows">
      <div className="container">
        <span className="modes-badge">One architecture, zero config</span>
        <h2>Scales with your workflow</h2>
        <p className="modes-sub">
          A background daemon auto-starts on first use. Every review — CLI, MCP, or GitHub PR — routes through the same HTTP API.
        </p>
        <div className="modes-grid">
          <div className="mode-card">
            <div className="mode-header">
              <span className="mode-icon">/</span>
              <h3>Single review</h3>
            </div>
            <p className="mode-desc">
              Agent calls open_review, browser opens with the diff, you approve or request changes. Server auto-starts in the background.
            </p>
            <code>/review</code>
          </div>
          <div className="mode-card">
            <div className="mode-header">
              <span className="mode-icon">::</span>
              <h3>Multi-agent</h3>
            </div>
            <p className="mode-desc">
              Run multiple Claude Code sessions — in worktrees, branches, or repos. All reviews appear in one browser tab with a session dashboard.
            </p>
            <code>Multiple sessions → one tab</code>
          </div>
          <div className="mode-card">
            <div className="mode-header">
              <span className="mode-icon">~</span>
              <h3>Agent self-review</h3>
            </div>
            <p className="mode-desc">
              Agents call analyze_diff to check their own work before requesting human review. Catches console.logs, security issues, missing tests automatically.
            </p>
            <code>{"analyze_diff → fix → review"}</code>
          </div>
          <div className="mode-card">
            <div className="mode-header">
              <span className="mode-icon">PR</span>
              <h3>GitHub PR review</h3>
            </div>
            <p className="mode-desc">
              Review any GitHub PR in DiffPrism's full UI with briefing and analysis. Optionally post the review decision back to GitHub.
            </p>
            <code>{"review_pr(\"owner/repo#123\")"}</code>
          </div>
        </div>
        <div className="modes-callout">
          <h3>Run three Claude Code sessions in parallel. Review them all from one tab.</h3>
          <p>
            The session dashboard shows all pending reviews with status badges,
            branch names, file counts, and change stats. Click any session to review, then switch to the next.
          </p>
          <div className="modes-callout-screenshot">
            <img
              src="/multi-sessions.png"
              alt="DiffPrism multi-session dashboard showing multiple concurrent code reviews with status badges, branch info, and file counts"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureFlow() {
  return (
    <section className="arch-flow">
      <div className="container">
        <h2>How it connects</h2>
        <p className="arch-subtitle">Multiple agents, one review surface, zero config.</p>
        <div className="arch-diagram">
          <div className="arch-actor">
            <div className="arch-actor-icon">$</div>
            <h4>Agents & CLI</h4>
            <p>MCP tools or diffprism review</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">HTTP API</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">{">_"}</div>
            <h4>Auto-start Daemon</h4>
            <p>Starts on first use, runs in background</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">WebSocket</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">{"{ }"}</div>
            <h4>Browser</h4>
            <p>Session dashboard with live updates</p>
          </div>
        </div>
        <div className="arch-details">
          <div>
            <code>ensureServer()</code>
            <p>Daemon auto-starts on first use — no manual setup needed</p>
          </div>
          <div>
            <code>~/.diffprism/server.log</code>
            <p>Daemon output captured to log file, safe for MCP stdio</p>
          </div>
          <div>
            <code>diffprism server status | stop</code>
            <p>Check active sessions or shut down the daemon gracefully</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2>Built for reviewing AI code</h2>
        <p className="features-sub">
          Everything you need to review agent-generated changes, nothing you don't.
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

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <h2>Up and running in one command</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Setup</h3>
            <p>
              Configures MCP server, permissions, hooks,
              and the /review skill for Claude Code.
            </p>
            <code>npx diffprism setup</code>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Agent works</h3>
            <p>
              Agent writes code, optionally self-reviews
              with analyze_diff to catch issues early.
            </p>
            <code>{"analyze_diff → fix → clean"}</code>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>You decide</h3>
            <p>
              /review opens the browser — comment inline,
              check the briefing, approve or request changes.
            </p>
            <code>/review</code>
          </div>
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
          <h2>Ready to review agent code?</h2>
          <p>One command setup. Server auto-starts. Review in your browser.</p>
          <a href={GITHUB_URL} className="btn-primary" target="_blank" rel="noopener">
            View on GitHub
          </a>
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
          DiffPrism is open source under the MIT License.{" "}
          <a href={GITHUB_URL} target="_blank" rel="noopener">
            GitHub
          </a>
          {" · "}
          <a href={NPM_URL} target="_blank" rel="noopener">
            npm
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
      <DemoWindow />
      <Workflows />
      <ArchitectureFlow />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
}
