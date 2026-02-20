import { Link } from "react-router-dom";
import "./Why.css";

const GITHUB_URL = "https://github.com/CodeJonesW/diffprism";
const NPM_URL = "https://www.npmjs.com/package/diffprism";

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
        <Link to="/" className="nav-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#161b22" />
            <path d="M8 10h16M8 16h12M8 22h8" stroke="#58a6ff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="26" cy="16" r="3" fill="#2ea043" opacity="0.8" />
          </svg>
          DiffPrism
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
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

export function Why() {
  return (
    <>
      <Nav />
      <article className="why-page">
        <div className="container">
          <header className="why-header">
            <span className="why-badge">The problem</span>
            <h1>
              Your agents are writing code.
              <br />
              <span className="accent">Who's reviewing it?</span>
            </h1>
            <p className="why-lead">
              AI coding agents are fast. They can spin up features, refactor
              modules, and fix bugs across your codebase in minutes. But speed
              without review is how unintended functionality ships to
              production.
            </p>
          </header>

          {/* ── The Shift ── */}
          <section className="why-section">
            <h2>The agentic coding shift</h2>
            <p>
              A year ago, AI helped you autocomplete lines. Today, you're
              running multiple Claude Code sessions in parallel — one
              refactoring auth, another adding an API endpoint, a third
              updating tests. Each session makes changes that look correct in
              isolation.
            </p>
            <p>
              But nobody is looking at the full picture. No one is asking: does
              this change actually do what I intended?
            </p>
          </section>

          {/* ── The Problem ── */}
          <section className="why-section">
            <h2>The unintended functionality problem</h2>
            <p>
              Agents don't make obvious mistakes. They make plausible ones.
              The code compiles, the types check, the tests pass. But the
              agent interpreted your prompt slightly differently than you
              meant, and now there's behavior in your app you never asked for.
            </p>
            <div className="why-examples">
              <div className="why-example">
                <div className="example-label">You said</div>
                <p>"Add input validation to the signup form"</p>
              </div>
              <div className="why-example">
                <div className="example-label">The agent did</div>
                <p>
                  Added validation, but also refactored the form state
                  management, changed the error display pattern, and added a
                  debounced uniqueness check that hits your database on every
                  keystroke.
                </p>
              </div>
            </div>
            <p>
              None of that is wrong per se. But it's not what you asked for,
              and if you push it without reading the diff, you've shipped
              functionality you don't fully understand.
            </p>
          </section>

          {/* ── Multiplied by parallel sessions ── */}
          <section className="why-section">
            <h2>Now multiply that by three sessions</h2>
            <p>
              When you're running multiple agents in parallel, each one is
              making its own interpretation of your intent. Session A touches
              the user model. Session B rewrites middleware. Session C updates
              the API routes. Each diff looks fine on its own.
            </p>
            <p>
              But you didn't review any of them before committing. You trusted
              the agent, merged the branches, and pushed. Now you have three
              sets of changes in production that you've never actually read.
            </p>
            <div className="why-callout">
              <p>
                The traditional PR review workflow assumes a human wrote the
                code and understands it. With agents, that assumption is gone.
                By the time the code hits a pull request, you've already lost
                context on what was actually changed and why.
              </p>
            </div>
          </section>

          {/* ── The Case for Local Review ── */}
          <section className="why-section">
            <h2>Why review locally, before the push</h2>
            <div className="why-points">
              <div className="why-point">
                <h3>You catch unintended changes at the source</h3>
                <p>
                  Reviewing the diff right after the agent writes it — while
                  the task is still fresh in your head — is when you're most
                  likely to spot things that don't belong. "I didn't ask for
                  this" is easy to say in the moment, hard to say three PRs
                  later.
                </p>
              </div>
              <div className="why-point">
                <h3>You stay in the loop on your own codebase</h3>
                <p>
                  Delegating coding to agents is powerful, but if you never
                  read the output, you lose understanding of your own system.
                  Local review keeps you aware of what's changing, even when
                  you're not the one writing it.
                </p>
              </div>
              <div className="why-point">
                <h3>You keep the feedback loop tight</h3>
                <p>
                  If an agent went in the wrong direction, you want to know
                  before you push — not after a teammate flags it in review.
                  Rejecting a local diff takes seconds. Reverting a merged PR
                  takes a conversation.
                </p>
              </div>
              <div className="why-point">
                <h3>You maintain intent, not just correctness</h3>
                <p>
                  Linters check syntax. Tests check behavior. But nothing
                  except a human can check whether the code matches what you
                  actually wanted. Local review is where intent meets
                  implementation.
                </p>
              </div>
            </div>
          </section>

          {/* ── How DiffPrism Fits ── */}
          <section className="why-section">
            <h2>This is what DiffPrism is for</h2>
            <p>
              DiffPrism opens a browser-based diff viewer the moment an agent
              finishes writing code. You see exactly what changed — syntax
              highlighted, with a summary of files touched and impact analysis.
              You approve or reject, and the result flows back to the agent.
            </p>
            <p>
              It runs from the CLI or directly inside Claude Code via MCP. No
              accounts, no cloud services, no data leaving your machine. Just
              you, the diff, and a decision.
            </p>
            <div className="why-workflow">
              <div className="workflow-step">
                <span className="workflow-num">1</span>
                <div>
                  <strong>Agent writes code</strong>
                  <p>Claude Code finishes a task and stages changes.</p>
                </div>
              </div>
              <div className="workflow-step">
                <span className="workflow-num">2</span>
                <div>
                  <strong>DiffPrism opens the diff</strong>
                  <p>
                    Browser window shows exactly what changed, with a review
                    briefing.
                  </p>
                </div>
              </div>
              <div className="workflow-step">
                <span className="workflow-num">3</span>
                <div>
                  <strong>You decide</strong>
                  <p>
                    Approve and the agent continues. Reject and it course
                    corrects. Either way, you know what shipped.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="why-cta">
            <h2>Your agents are fast. Make sure you keep up.</h2>
            <p>
              DiffPrism is free, open source, and installs in one command.
            </p>
            <div className="why-cta-actions">
              <a href={GITHUB_URL} className="btn-primary" target="_blank" rel="noopener">
                Get started on GitHub
              </a>
              <Link to="/" className="btn-secondary">
                Back to home
              </Link>
            </div>
          </section>
        </div>
      </article>
      <Footer />
    </>
  );
}
