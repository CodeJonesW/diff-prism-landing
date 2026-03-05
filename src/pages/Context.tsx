import { Link } from "react-router-dom";
import "./Context.css";

const GITHUB_URL = "https://github.com/CodeJonesW/diffprism";
const NPM_URL = "https://www.npmjs.com/package/diffprism";
const CONTEXT_REPO_URL = "https://github.com/CodeJonesW/repo-context-service";

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
          <Link to="/why">Why DiffPrism</Link>
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

export function Context() {
  return (
    <>
      <Nav />
      <article className="ctx-page">
        <div className="container">
          {/* ── Hero ── */}
          <header className="ctx-header">
            <span className="ctx-badge">Repo Context Service</span>
            <h1>
              AI reviews that understand
              <br />
              <span className="accent">your entire project</span>
            </h1>
            <p className="ctx-lead">
              Index your codebase once. Every review gets architecture,
              conventions, import graph, and related files — so suggestions
              match how your team actually writes code.
            </p>
            <div className="ctx-header-actions">
              <a href="#pricing" className="btn-primary">
                View pricing
              </a>
              <a href={CONTEXT_REPO_URL} className="btn-secondary" target="_blank" rel="noopener">
                <GitHubIcon />
                View on GitHub
              </a>
            </div>
          </header>

          {/* ── The Problem ── */}
          <section className="ctx-section">
            <h2>Every AI review tool has the same blind spot</h2>
            <p>
              They see the diff. They don't see the project. So you get
              generic suggestions — "add error handling", "consider edge
              cases", "missing tests" — that could apply to any codebase
              in any language.
            </p>
            <p>
              The best human reviewers don't do this. They know the
              codebase. They know that your team wraps handlers in
              tryCatch(), that auth logic lives in middleware, that this
              module has a test file that needs updating. That context
              is what makes a review useful.
            </p>
          </section>

          {/* ── Before / After ── */}
          <section className="ctx-section">
            <h2>Context changes everything</h2>
            <div className="ctx-comparison">
              <div className="ctx-compare-card">
                <div className="ctx-compare-label">Without context</div>
                <div className="ctx-compare-item">
                  <span className="ctx-compare-icon ctx-compare-generic">~</span>
                  <p>"Consider adding error handling to this function."</p>
                </div>
                <div className="ctx-compare-item">
                  <span className="ctx-compare-icon ctx-compare-generic">~</span>
                  <p>"This change might affect other parts of the codebase."</p>
                </div>
                <div className="ctx-compare-item">
                  <span className="ctx-compare-icon ctx-compare-generic">~</span>
                  <p>"Consider adding tests for this new feature."</p>
                </div>
              </div>
              <div className="ctx-compare-card ctx-compare-card-good">
                <div className="ctx-compare-label ctx-compare-label-good">With project context</div>
                <div className="ctx-compare-item">
                  <span className="ctx-compare-icon ctx-compare-specific">{">"}</span>
                  <p>"This bypasses the tryCatch() wrapper used in every other route handler. See src/middleware/error.ts."</p>
                </div>
                <div className="ctx-compare-item">
                  <span className="ctx-compare-icon ctx-compare-specific">{">"}</span>
                  <p>"UserService imports this module — changing the return type will break src/services/user.ts:47."</p>
                </div>
                <div className="ctx-compare-item">
                  <span className="ctx-compare-icon ctx-compare-specific">{">"}</span>
                  <p>"Related test file exists at test/auth.test.ts covering the session validation this PR modifies."</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── How It Works ── */}
          <section className="ctx-section">
            <h2>How it works</h2>
            <div className="ctx-how-steps">
              <div className="ctx-how-step">
                <span className="ctx-how-num">1</span>
                <div>
                  <strong>Index your repo</strong>
                  <p>
                    Point the service at your GitHub repo or local directory.
                    It analyzes every file — language, framework, imports,
                    exports, conventions — and splits code into semantic
                    chunks with vector embeddings.
                  </p>
                </div>
              </div>
              <div className="ctx-how-step">
                <span className="ctx-how-num">2</span>
                <div>
                  <strong>PR triggers a review</strong>
                  <p>
                    When a PR opens, DiffPrism queries the context service
                    for architecture, conventions, and related files for
                    every changed path. The review model sees the diff
                    plus the full project picture.
                  </p>
                </div>
              </div>
              <div className="ctx-how-step">
                <span className="ctx-how-num">3</span>
                <div>
                  <strong>Re-index stays fast</strong>
                  <p>
                    Incremental indexing diffs tree SHAs and file SHAs.
                    Only changed files are reprocessed. A re-index after
                    a typical PR takes seconds, not minutes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── What Gets Indexed ── */}
          <section className="ctx-section">
            <h2>What gets indexed</h2>
            <div className="ctx-tools-grid">
              <div className="ctx-tool-card">
                <code>get_architecture</code>
                <p>
                  Languages, frameworks, directory structure, entry points,
                  build tools. The structural overview a new team member
                  would need on day one.
                </p>
              </div>
              <div className="ctx-tool-card">
                <code>get_conventions</code>
                <p>
                  Naming patterns, test file structure, import style,
                  error handling patterns, tooling choices. How your
                  team actually writes code.
                </p>
              </div>
              <div className="ctx-tool-card">
                <code>get_file_context</code>
                <p>
                  Exports, imports, dependents, and code chunks for any
                  file. Understand what a file does and what depends on it
                  before reviewing changes.
                </p>
              </div>
              <div className="ctx-tool-card">
                <code>get_related_files</code>
                <p>
                  Import graph traversal plus vector similarity. Find
                  files that are structurally or semantically related to
                  the changed paths in a PR.
                </p>
              </div>
              <div className="ctx-tool-card">
                <code>search_codebase</code>
                <p>
                  Semantic search across all indexed code chunks. Find
                  relevant patterns, implementations, or examples
                  anywhere in the repo.
                </p>
              </div>
              <div className="ctx-tool-card">
                <code>index_repo</code>
                <p>
                  Full indexing from GitHub API or local filesystem.
                  Incremental re-indexing only processes changed files.
                  Supports 18 languages.
                </p>
              </div>
            </div>
          </section>

          {/* ── Architecture ── */}
          <section className="ctx-section">
            <h2>Built on Cloudflare</h2>
            <p>
              The context service runs on Cloudflare Workers — globally
              distributed, serverless, fast. Your indexed data stays in
              D1 (SQLite), embeddings in Vectorize, and file snapshots
              in R2.
            </p>
            <div className="ctx-arch-grid">
              <div className="ctx-arch-item">
                <strong>D1</strong>
                <p>Files, chunks, imports, exports, metadata</p>
              </div>
              <div className="ctx-arch-item">
                <strong>Vectorize</strong>
                <p>Semantic embeddings for code search</p>
              </div>
              <div className="ctx-arch-item">
                <strong>Workers AI</strong>
                <p>Embedding generation at index time</p>
              </div>
              <div className="ctx-arch-item">
                <strong>R2</strong>
                <p>Tree snapshots for incremental diffing</p>
              </div>
              <div className="ctx-arch-item">
                <strong>KV</strong>
                <p>Cached architecture and convention results</p>
              </div>
              <div className="ctx-arch-item">
                <strong>Queues</strong>
                <p>Async indexing jobs for large repos</p>
              </div>
            </div>
          </section>

          {/* ── Pricing ── */}
          <section className="ctx-section" id="pricing">
            <h2>Pricing</h2>
            <p>
              DiffPrism's review UI is free and open source. The context
              service — the layer that makes reviews project-aware — is
              a hosted service with usage-based tiers.
            </p>
            <div className="ctx-pricing-grid">
              <div className="ctx-pricing-card">
                <div className="ctx-pricing-tier">Free</div>
                <div className="ctx-pricing-price">$0</div>
                <ul className="ctx-pricing-features">
                  <li>3 repos</li>
                  <li>100 queries / day</li>
                  <li>Manual indexing</li>
                  <li>All MCP tools</li>
                </ul>
              </div>
              <div className="ctx-pricing-card ctx-pricing-card-accent">
                <div className="ctx-pricing-tier">Pro</div>
                <div className="ctx-pricing-price">$15<span>/mo</span></div>
                <ul className="ctx-pricing-features">
                  <li>Unlimited repos</li>
                  <li>10,000 queries / day</li>
                  <li>Auto-reindex on push</li>
                  <li>Priority indexing</li>
                </ul>
              </div>
              <div className="ctx-pricing-card">
                <div className="ctx-pricing-tier">Team</div>
                <div className="ctx-pricing-price">$10<span>/user/mo</span></div>
                <ul className="ctx-pricing-features">
                  <li>Shared org repos</li>
                  <li>50,000 queries / day</li>
                  <li>Usage dashboard</li>
                  <li>Team management</li>
                </ul>
              </div>
            </div>
            <p className="ctx-pricing-note">
              Coming soon. <a href={CONTEXT_REPO_URL} target="_blank" rel="noopener">Star the repo</a> to get notified.
            </p>
          </section>

          {/* ── CTA ── */}
          <section className="ctx-cta">
            <h2>Stop reviewing diffs blind</h2>
            <p>
              Index your repo. Get reviews that understand your project.
            </p>
            <div className="ctx-cta-actions">
              <a href={CONTEXT_REPO_URL} className="btn-primary" target="_blank" rel="noopener">
                Get started on GitHub
              </a>
              <Link to="/" className="btn-secondary">
                Back to DiffPrism
              </Link>
            </div>
          </section>
        </div>
      </article>
      <Footer />
    </>
  );
}
