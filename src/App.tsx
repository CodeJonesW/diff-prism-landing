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
        <span className="hero-badge">MCP-native &middot; AI-powered &middot; Open source</span>
        <h1>
          Review PRs with
          <br />
          <span className="accent">AI superpowers</span>
        </h1>
        <p className="hero-sub">
          Paste a GitHub PR URL. See the diff in your browser.
          Ask your AI tool questions about any line, file, or change.
          Findings appear inline on the diff in real-time.
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
            <span className="demo-pr-title">PR #457: Add block-no-verify PreToolUse hook</span>
            <span className="demo-pr-number">tupe12334 &middot; add-block-no-verify</span>
          </div>

          {/* Diff view mock */}
          <div className="demo-diff-view">
            <div className="demo-diff-file">
              <span className="demo-diff-file-icon">M</span>
              <span>.claude/settings.json</span>
              <span className="demo-diff-stats"><span className="demo-stat-add">+12</span> <span className="demo-stat-del">-0</span></span>
            </div>
            <div className="demo-diff-lines">
              <div className="demo-diff-line demo-diff-context">
                <span className="demo-line-num">3</span>
                <span className="demo-line-num">3</span>
                <code>{"  \"hooks\": {"}</code>
              </div>
              <div className="demo-diff-line demo-diff-add">
                <span className="demo-line-num"></span>
                <span className="demo-line-num">4</span>
                <code>{"    \"PreToolUse\": ["}</code>
              </div>
              <div className="demo-diff-line demo-diff-add">
                <span className="demo-line-num"></span>
                <span className="demo-line-num">5</span>
                <code>{"      {"}</code>
              </div>
              <div className="demo-diff-line demo-diff-add">
                <span className="demo-line-num"></span>
                <span className="demo-line-num">6</span>
                <code>{'        "matcher": "Bash(--no-verify)",'}</code>
              </div>
              <div className="demo-diff-line demo-diff-add">
                <span className="demo-line-num"></span>
                <span className="demo-line-num">7</span>
                <code>{'        "action": "block"'}</code>
              </div>
            </div>

            {/* AI annotation inline */}
            <div className="demo-ai-annotation">
              <div className="demo-ai-annotation-header">
                <span className="demo-ai-badge">AI</span>
                <span className="demo-ai-label">ai-reviewer via add_review_comment</span>
              </div>
              <p>
                This hook blocks <code>--no-verify</code> in Bash commands, which prevents
                skipping git hooks. Good security practice. Consider also blocking{" "}
                <code>--no-gpg-sign</code> to enforce commit signing.
              </p>
            </div>
          </div>
        </div>

        {/* Terminal mock below */}
        <div className="demo-terminal">
          <div className="demo-terminal-header">
            <div className="demo-terminal-dots">
              <span /><span /><span />
            </div>
            <span className="demo-terminal-title">Claude Code</span>
          </div>
          <div className="demo-terminal-body">
            <div className="demo-terminal-line">
              <span className="demo-prompt">{">"}</span>
              <span className="demo-input">Is the hook matcher pattern correct?</span>
            </div>
            <div className="demo-terminal-line demo-terminal-tool">
              <span className="demo-tool-icon">{"~>"}</span>
              <span>diffprism <span className="demo-tool-name">get_file_context</span> <span className="demo-tool-args">(file: ".claude/settings.json")</span></span>
            </div>
            <div className="demo-terminal-line demo-terminal-response">
              <span>The matcher <code>"Bash(--no-verify)"</code> will match any Bash tool use containing
              the <code>--no-verify</code> flag. This correctly catches <code>git commit --no-verify</code>,
              <code>git push --no-verify</code>, and similar.</span>
            </div>
          </div>
        </div>

        <p className="demo-caption">
          You see the diff. Your AI sees the full codebase. Review together.
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
        <h2>From PR URL to AI-powered review</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Install & setup</h3>
            <p>
              Install DiffPrism globally and run setup to register the MCP server
              with Claude Code or Cursor. One command.
            </p>
            <code>diffprism setup</code>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Open a PR</h3>
            <p>
              Paste any GitHub PR URL. DiffPrism fetches the diff, auto-detects
              your local clone via <code>git remote</code> matching, and opens the
              browser UI.
            </p>
            <code>diffprism review {"<PR URL>"}</code>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Ask your AI</h3>
            <p>
              Your AI tool calls MCP tools to get PR context, read full files from
              your local repo, and post findings that appear inline on the diff.
            </p>
            <code>14 MCP tools</code>
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
        <h2>Your AI sees the whole codebase, not just the diff.</h2>
        <p className="differentiators-sub">
          GitHub shows you the changed lines. DiffPrism gives your AI tool the full context
          to understand why those lines changed and whether they're correct.
        </p>
        <div className="diff-grid">
          <div className="diff-card">
            <span className="diff-icon">{"~>"}</span>
            <h3>MCP-powered</h3>
            <p>
              14 tools for your AI to explore PRs: get file diffs, read full files
              from your local clone, post inline findings, track user focus.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"><"}</span>
            <h3>Local repo context</h3>
            <p>
              Your AI reads the full file via <code>git show</code>, not just the
              diff hunks. It understands imports, function signatures, and surrounding code.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"!!"}</span>
            <h3>Live annotations</h3>
            <p>
              AI findings appear as inline annotations on the diff in real-time.
              Your AI calls <code>add_review_comment</code> and it shows up instantly.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"<>"}</span>
            <h3>Syntax-highlighted diffs</h3>
            <p>
              Unified or split view with full syntax highlighting via refractor.
              Keyboard shortcuts for file navigation.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"[]"}</span>
            <h3>No vendor lock-in</h3>
            <p>
              No Anthropic SDK baked in. Works with Claude Code, Cursor, or
              any MCP-compatible AI tool. Bring your own AI.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"++"}</span>
            <h3>Auto-detect local repo</h3>
            <p>
              Run the server from your clone. DiffPrism matches <code>git remote -v</code>
              against the PR's repo and connects automatically.
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
      "diffprism setup registers the MCP server, configures permissions, and installs the /review skill. Works globally or per-project.",
  },
  {
    icon: "PR",
    title: "GitHub PR review",
    description:
      "Paste any PR URL — full or shorthand (owner/repo#123). The diff loads in the browser with syntax highlighting, file browser, and briefing bar.",
  },
  {
    icon: "{}",
    title: "14 MCP tools",
    description:
      "get_pr_context, get_file_diff, get_file_context, add_review_comment, get_user_focus, analyze_diff, and more. Your AI has everything it needs.",
  },
  {
    icon: "AI",
    title: "AI annotations",
    description:
      "Your AI posts findings via MCP. They appear as inline annotations on the diff in real-time — concerns, suggestions, and questions right on the code.",
  },
  {
    icon: "[]",
    title: "Multi-session dashboard",
    description:
      "Also works for local agent review. Run multiple Claude Code sessions, review them all from one persistent dashboard.",
  },
  {
    icon: "->",
    title: "Watch mode",
    description:
      "Diffs update in real-time as agents iterate. The review UI stays in sync via WebSocket. No refresh needed.",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <span className="section-label">Features</span>
        <h2>Everything you need. Nothing you don't.</h2>
        <p className="features-sub">
          PR review with AI context. Local agent review. One tool.
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
          Your browser shows the diff. Your AI reads the code. MCP connects them.
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
            <p>Diff viewer + annotations</p>
          </div>
        </div>
        <div className="arch-details">
          <div>
            <code>GitHub API</code>
            <p>Fetches PR metadata and unified diff from any public or private repo</p>
          </div>
          <div>
            <code>Local repo</code>
            <p>Reads full files via git show for complete context — not just diff hunks</p>
          </div>
          <div>
            <code>Real-time sync</code>
            <p>AI findings, user focus, and diff updates stream over WebSocket</p>
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
            <code className="cli-cmd">diffprism review https://github.com/org/repo/pull/123</code>
            <p>Review a GitHub PR with full AI context</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review owner/repo#123</code>
            <p>Shorthand PR format works too</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review --staged</code>
            <p>Review staged local changes</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism review HEAD~3..HEAD</code>
            <p>Review a commit range</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism setup</code>
            <p>One-command MCP integration with Claude Code</p>
          </div>
          <div className="cli-example">
            <code className="cli-cmd">diffprism server</code>
            <p>Start the background server (or let it auto-start)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    q: "What is DiffPrism?",
    a: "A code review tool that connects your AI assistant to GitHub PRs. Paste a PR URL, see the diff in a browser UI, and use Claude Code or Cursor to ask questions. Your AI gets full codebase context via MCP tools.",
  },
  {
    q: "How does the AI integration work?",
    a: "DiffPrism runs an MCP server with 14 tools. Your AI tool (Claude Code, Cursor) calls these tools to get PR context, read files, and post findings. No Anthropic SDK — it works with any MCP-compatible client.",
  },
  {
    q: "Does my code leave my machine?",
    a: "No. DiffPrism runs entirely locally. The server, UI, and analysis all run on your machine. The only external calls are to GitHub's API to fetch PR data.",
  },
  {
    q: "How does local repo context work?",
    a: "Run the server from within your local clone. DiffPrism matches git remote -v against the PR's repo. Your AI can then read full files via git show — not just diff hunks.",
  },
  {
    q: "Does it work for local changes too?",
    a: "Yes. DiffPrism also supports reviewing local git diffs (staged, unstaged, commit ranges) with a multi-session dashboard. The original agent review workflow is fully supported.",
  },
  {
    q: "What AI tools are supported?",
    a: "Any MCP-compatible tool: Claude Code, Cursor, or custom MCP clients. No vendor lock-in. DiffPrism provides the context layer — bring your own AI.",
  },
  {
    q: "Is it free?",
    a: "Yes. DiffPrism is open source and free to use. Install it with npm install -g diffprism.",
  },
  {
    q: "What languages are supported?",
    a: "DiffPrism works with any language that git can diff. Syntax highlighting covers all major languages. The analysis has enhanced support for TypeScript, JavaScript, Python, Go, and Rust.",
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
          <h2>Review PRs like you have a second brain</h2>
          <p>Install DiffPrism and let your AI read the code you're reviewing.</p>
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
          DiffPrism &mdash; AI-powered code review for GitHub PRs.{" "}
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
