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
          <a href="#watch-mode">Watch Mode</a>
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
        <span className="hero-badge">Open source &middot; Local-first &middot; Watch Mode</span>
        <h1>
          Code review for
          <br />
          <span className="accent">agent-generated</span> changes
        </h1>
        <p className="hero-sub">
          Review while the agent works. DiffPrism Watch keeps a browser tab open
          that auto-refreshes diffs and analysis as files change.
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
            src="/ui-progress.png"
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
    icon: ">>",
    title: "Watch Mode",
    description:
      "Run once, review continuously. Watch mode auto-refreshes diffs in the browser as files change — no manual re-runs needed.",
  },
  {
    icon: "/",
    title: "Claude Code /review",
    description:
      "One command setup. Type /review in Claude Code and DiffPrism opens your changes in the browser via MCP.",
  },
  {
    icon: "~",
    title: "Syntax-highlighted diffs",
    description:
      "Unified diff viewer with line numbers, hunk headers, and language-aware syntax highlighting powered by refractor.",
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
    icon: "!",
    title: "Three-way decisions",
    description:
      "Approve, request changes, or approve with comments. Structured JSON results flow back to the calling agent.",
  },
];

function WatchMode() {
  return (
    <section className="watch-mode" id="watch-mode">
      <div className="container">
        <span className="watch-badge">New</span>
        <h2>Review while the agent works</h2>
        <div className="watch-comparison">
          <div className="watch-before">
            <div className="comparison-label">Without Watch</div>
            <ul className="comparison-steps">
              <li>Run /review manually each time</li>
              <li>Review changes, close the tab</li>
              <li>Agent keeps working, repeat the loop</li>
              <li>Context lost between reviews</li>
            </ul>
          </div>
          <div className="watch-after">
            <div className="comparison-label">With Watch</div>
            <ul className="comparison-steps">
              <li>Run once, diffs auto-update in the browser</li>
              <li>Review state persists across changes</li>
              <li>Comment and submit without leaving the tab</li>
              <li>Stay in flow while the agent iterates</li>
            </ul>
          </div>
        </div>
        <div className="watch-props">
          <div className="watch-prop">
            <h4>Zero manual intervention</h4>
            <p>Diffs refresh automatically as the agent writes code. No re-running commands.</p>
          </div>
          <div className="watch-prop">
            <h4>Persistent review state</h4>
            <p>Comments, scroll position, and file selection survive across updates.</p>
          </div>
          <div className="watch-prop">
            <h4>Claude Code native</h4>
            <p>MCP tool + stop hook integration. The agent knows when you submit a review.</p>
          </div>
          <div className="watch-prop">
            <h4>Submit and stay</h4>
            <p>Send your decision back to the agent and keep watching the next round of changes.</p>
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
        <h2>How Watch Mode connects</h2>
        <p className="arch-subtitle">Three actors, zero config.</p>
        <div className="arch-diagram">
          <div className="arch-actor">
            <div className="arch-actor-icon">$</div>
            <h4>Terminal</h4>
            <p>diffprism watch polls git diff</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">MCP + stop hook</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">{">_"}</div>
            <h4>Claude Code</h4>
            <p>update_review_context MCP tool</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">WebSocket</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">{"{ }"}</div>
            <h4>Browser</h4>
            <p>Live diffs, preserves state</p>
          </div>
        </div>
        <div className="arch-details">
          <div>
            <code>diffprism watch --staged</code>
            <p>WS + HTTP server, polls git diff on an interval</p>
          </div>
          <div>
            <code>update_review_context</code>
            <p>MCP tool that pushes context from the agent to the UI</p>
          </div>
          <div>
            <code>ws://localhost</code>
            <p>Browser receives real-time updates, no page reloads</p>
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
            <h3>Watch</h3>
            <p>
              Start watch mode and diffs auto-update as
              files change. Or use /review for one-shot.
            </p>
            <code>diffprism watch --staged</code>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Decide</h3>
            <p>
              Comment inline, check the briefing,
              then approve or request changes. Submit and stay.
            </p>
            <code>{"{ decision: \"approved\" }"}</code>
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
          <h2>Ready to try Watch Mode?</h2>
          <p>One command to install, one command to start.</p>
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
      <WatchMode />
      <ArchitectureFlow />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
}
