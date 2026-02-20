import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const GITHUB_URL = "https://github.com/CodeJonesW/diffprism";
const NPM_URL = "https://www.npmjs.com/package/diffprism";
const INSTALL_CMD = "npm install -g diffprism";

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
        <span className="hero-badge">Open source &middot; Local-first</span>
        <h1>
          Code review for
          <br />
          <span className="accent">agent-generated</span> changes
        </h1>
        <p className="hero-sub">
          Review AI-written diffs in a browser-based viewer. Runs locally from
          your CLI or directly inside Claude Code.
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
            src="/diffprism-ss.png"
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
    icon: "~",
    title: "Unified diff viewer",
    description:
      "Syntax-highlighted diffs with line numbers, hunk headers, and word-level change detection.",
  },
  {
    icon: ">",
    title: "CLI + MCP",
    description:
      "Run from the terminal with diffprism review or let Claude Code trigger it via MCP tool.",
  },
  {
    icon: "#",
    title: "Review briefing",
    description:
      "Automatic summary of what changed: files modified, lines added/removed, impact analysis.",
  },
  {
    icon: "!",
    title: "Approve or reject",
    description:
      "One-click approve or request changes. Results flow back to the calling agent.",
  },
  {
    icon: "@",
    title: "Local-first",
    description:
      "Runs entirely on your machine. No data leaves your computer. No accounts or sign-ups.",
  },
  {
    icon: "*",
    title: "Open source",
    description:
      "MIT licensed. Inspect the code, contribute, or fork it for your own workflow.",
  },
];

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
        <h2>Three steps to review</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Install</h3>
            <p>Install DiffPrism globally from npm.</p>
            <code>npm i -g diffprism</code>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Run</h3>
            <p>Point it at your staged changes or any git ref.</p>
            <code>diffprism review --staged</code>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Review</h3>
            <p>A browser window opens with your diff. Approve or request changes.</p>
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
          <h2>Ready to try it?</h2>
          <p>Get started in under a minute. No sign-up required.</p>
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
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
}
