import { Link, useParams } from "react-router-dom";
import { posts } from "../blog/posts";
import "./Blog.css";

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
        <Link to="/" className="nav-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#161b22" />
            <path
              d="M8 10h16M8 16h12M8 22h8"
              stroke="#58a6ff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="26" cy="16" r="3" fill="#2ea043" opacity="0.8" />
          </svg>
          DiffPrism
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <a
            href={GITHUB_URL}
            className="btn-github"
            target="_blank"
            rel="noopener"
          >
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
          DiffPrism &mdash; pattern-aware code reviews for GitHub.{" "}
          <a href={GITHUB_APP_URL} target="_blank" rel="noopener">
            Install
          </a>
          {" · "}
          <a href={GITHUB_URL} target="_blank" rel="noopener">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogIndex() {
  return (
    <div className="blog-index">
      <header className="blog-index-header">
        <h1>Blog</h1>
        <p className="blog-index-sub">
          Thoughts on code review, AI agents, and building tools for developers.
        </p>
      </header>
      <div className="blog-post-list">
        {posts.map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.slug}
            className="blog-post-card"
          >
            <time className="blog-post-date">{formatDate(post.date)}</time>
            <h2 className="blog-post-title">{post.title}</h2>
            <p className="blog-post-summary">{post.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="blog-not-found">
        <h1>Post not found</h1>
        <p>
          <Link to="/blog">Back to blog</Link>
        </p>
      </div>
    );
  }

  const Content = post.content;

  return (
    <article className="blog-article">
      <header className="blog-article-header">
        <Link to="/blog" className="blog-back-link">
          &larr; All posts
        </Link>
        <time className="blog-post-date">{formatDate(post.date)}</time>
        <h1>{post.title}</h1>
      </header>
      <div className="blog-article-body">
        <Content />
      </div>
      <footer className="blog-article-footer">
        <Link to="/blog" className="btn-secondary">
          &larr; All posts
        </Link>
      </footer>
    </article>
  );
}

export function Blog() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <>
      <Nav />
      <main className="blog-page">
        <div className="container">
          {slug ? <BlogPost /> : <BlogIndex />}
        </div>
      </main>
      <Footer />
    </>
  );
}
