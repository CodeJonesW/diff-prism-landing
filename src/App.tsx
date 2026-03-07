import { Link } from "react-router-dom";
import "./App.css";

const GITHUB_URL = "https://github.com/CodeJonesW/diffprism";
const GITHUB_APP_URL = "https://github.com/apps/diffprism";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
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
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
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
        <span className="hero-badge">GitHub App &middot; Pattern-aware &middot; Powered by Claude</span>
        <h1>
          Code review that knows
          <br />
          <span className="accent">your codebase</span>
        </h1>
        <p className="hero-sub">
          DiffPrism indexes your repo and reviews PRs with awareness of your existing patterns,
          conventions, and architecture. Not just correctness — consistency.
        </p>
        <div className="hero-actions">
          <a href={GITHUB_APP_URL} className="btn-primary" target="_blank" rel="noopener">
            <GitHubIcon />
            Install on GitHub
          </a>
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
                <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
              </svg>
            </span>
            <span className="demo-pr-title">feat: add retry logic to API client</span>
            <span className="demo-pr-number">#142</span>
          </div>

          <div className="demo-comment demo-comment-trigger">
            <div className="demo-comment-header">
              <span className="demo-avatar">DV</span>
              <span className="demo-comment-author">developer</span>
              <span className="demo-comment-time">2 minutes ago</span>
            </div>
            <div className="demo-comment-body">
              <code>/review</code>
            </div>
          </div>

          <div className="demo-comment demo-comment-review">
            <div className="demo-comment-header">
              <span className="demo-avatar demo-avatar-bot">DP</span>
              <span className="demo-comment-author">diffprism</span>
              <span className="demo-comment-badge">bot</span>
              <span className="demo-comment-time">12 seconds ago</span>
            </div>
            <div className="demo-comment-body">
              <div className="demo-inline-comment demo-severity-red">
                <div className="demo-inline-file">src/api/client.ts:47</div>
                <p>
                  <strong>Critical:</strong> This catch block swallows the error silently.
                  Every other API method in this file uses the <code>handleApiError()</code> wrapper
                  from <code>src/utils/errors.ts:12</code>. Use the same pattern here.
                </p>
              </div>
              <div className="demo-inline-comment demo-severity-yellow">
                <div className="demo-inline-file">src/api/client.ts:31</div>
                <p>
                  <strong>Suggestion:</strong> The retry delay is hardcoded to 1000ms.
                  The existing retry logic in <code>src/api/auth.ts:58</code> uses exponential
                  backoff via <code>retryWithBackoff()</code>. Consider reusing that utility.
                </p>
              </div>
              <div className="demo-inline-comment demo-severity-green">
                <div className="demo-inline-file">src/api/client.ts:15</div>
                <p>
                  <strong>Praise:</strong> Good use of the <code>AbortController</code> pattern
                  consistent with the timeout handling elsewhere in the API layer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="demo-caption">
          Reviews reference actual patterns from your codebase — not generic advice.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Install</h3>
            <p>
              Add DiffPrism to your GitHub repo.
              Your codebase is indexed automatically — AST-aware chunking
              at function and class boundaries.
            </p>
            <code>Indexed in ~15 seconds</code>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Review</h3>
            <p>
              Comment <strong>/review</strong> on any PR.
              DiffPrism fetches the diff, finds related patterns
              via vector search, and sends both to Claude.
            </p>
            <code>/review</code>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Ship</h3>
            <p>
              Read the review, address critical findings,
              merge with confidence. Clean PRs get clean approvals — no noise.
            </p>
            <code>Merge with confidence</code>
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
        <h2>AI review tools don't know your codebase. DiffPrism does.</h2>
        <p className="differentiators-sub">
          Most AI reviewers see only the diff. DiffPrism indexes your entire repo
          and references your actual patterns in every review.
        </p>
        <div className="diff-grid">
          <div className="diff-card">
            <span className="diff-icon">{"{ }"}</span>
            <h3>Pattern-aware</h3>
            <p>
              Not just "is this code correct?" but "does this code match how you do things?"
              Reviews reference specific files and lines from your codebase.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"--"}</span>
            <h3>Zero noise</h3>
            <p>
              Clean code gets a clean approval. No filler comments,
              no praise-for-the-sake-of-it. Signal only.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">@</span>
            <h3>Contextual</h3>
            <p>
              References specific files and line numbers from your codebase.
              Not "consider error handling" — "use handleApiError() like in src/utils/errors.ts:12."
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">{"~>"}</span>
            <h3>Fast</h3>
            <p>
              Reviews complete in ~10 seconds. Async queue processing
              means no webhook timeouts and instant acknowledgment.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">||</span>
            <h3>Scoped</h3>
            <p>
              Your code context is isolated per repo. No cross-contamination
              between projects. Each repo has its own vector index.
            </p>
          </div>
          <div className="diff-card">
            <span className="diff-icon">++</span>
            <h3>Incremental</h3>
            <p>
              Only changed files are re-indexed when you push to main.
              Your index stays fresh without full re-processing.
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
    title: "/review command",
    description:
      "Comment on any PR to trigger a review. On-demand, not automatic noise. You control when DiffPrism reviews.",
  },
  {
    icon: "{}",
    title: "Pattern-aware reviews",
    description:
      "Vector search finds related code patterns from your repo. Reviews reference your conventions, not generic best practices.",
  },
  {
    icon: "<>",
    title: "AST-aware indexing",
    description:
      "Code chunked at function and class boundaries, not arbitrary character splits. Semantic units stay intact.",
  },
  {
    icon: "!!",
    title: "Severity-tagged comments",
    description:
      "Critical bugs in red. Suggestions in yellow. Genuine praise in green — used sparingly. Visual severity right on the PR.",
  },
  {
    icon: "->",
    title: "Incremental indexing",
    description:
      "On push to main, only changed files are re-indexed. Your codebase context stays current without full re-processing.",
  },
  {
    icon: "^",
    title: "Usage tiers",
    description:
      "Free tier with 10 reviews/month and 1 repo. Pro and Team tiers scale to unlimited reviews and repos.",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2>Features</h2>
        <p className="features-sub">
          Everything you need for pattern-aware PR reviews. Nothing you don't.
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
        <h2>Under the hood</h2>
        <p className="arch-subtitle">
          Cloudflare Workers all the way down. Webhook to review in ~10 seconds.
        </p>
        <div className="arch-diagram">
          <div className="arch-actor">
            <div className="arch-actor-icon">/</div>
            <h4>/review</h4>
            <p>Developer comments on PR</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">Webhook</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">{">_"}</div>
            <h4>DiffPrism Worker</h4>
            <p>Queue + fetch diff + query context</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">Vectorize</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">AI</div>
            <h4>Claude</h4>
            <p>Diff + patterns to structured review</p>
          </div>
          <div className="arch-arrow">
            <span className="arch-arrow-label">GitHub API</span>
            <div className="arch-arrow-line" />
          </div>
          <div className="arch-actor">
            <div className="arch-actor-icon">PR</div>
            <h4>Inline comments</h4>
            <p>Severity-tagged review on the PR</p>
          </div>
        </div>
        <div className="arch-details">
          <div>
            <code>Vectorize</code>
            <p>Semantic search for related code patterns, scoped per repo</p>
          </div>
          <div>
            <code>AST chunking</code>
            <p>Functions and classes as atomic units, not arbitrary character splits</p>
          </div>
          <div>
            <code>Service binding</code>
            <p>Worker-to-worker calls for context retrieval, no public internet hop</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2>Pricing</h2>
        <p className="pricing-sub">Start free. Scale when you need to.</p>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="pricing-price">$0</div>
            <ul className="pricing-features">
              <li>10 reviews / month</li>
              <li>5 context chunks per review</li>
              <li>1 repo</li>
            </ul>
            <a href={GITHUB_APP_URL} className="btn-secondary" target="_blank" rel="noopener">
              Install free
            </a>
          </div>
          <div className="pricing-card pricing-card-highlight">
            <h3>Pro</h3>
            <div className="pricing-price">$19<span>/mo</span></div>
            <ul className="pricing-features">
              <li>100 reviews / month</li>
              <li>15 context chunks per review</li>
              <li>Unlimited repos</li>
            </ul>
            <a href={GITHUB_APP_URL} className="btn-primary" target="_blank" rel="noopener">
              Get Pro
            </a>
          </div>
          <div className="pricing-card">
            <h3>Team</h3>
            <div className="pricing-price">$49<span>/mo</span></div>
            <ul className="pricing-features">
              <li>Unlimited reviews</li>
              <li>20 context chunks per review</li>
              <li>Unlimited repos</li>
            </ul>
            <a href={GITHUB_APP_URL} className="btn-secondary" target="_blank" rel="noopener">
              Get Team
            </a>
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
          <h2>Reviews that understand your code</h2>
          <p>Install DiffPrism on your repo. First 10 reviews are free.</p>
          <a href={GITHUB_APP_URL} className="btn-primary" target="_blank" rel="noopener">
            <GitHubIcon />
            Install on GitHub
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
          DiffPrism &mdash; pattern-aware code reviews for GitHub.{" "}
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
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}
