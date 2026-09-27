import { defineConfig, createServer, type Plugin, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const SITE_URL = 'https://diffprism.com'
const DEFAULT_IMAGE = '/gh-review-1.png'

// The fields of BlogPost (src/blog/posts.tsx) that go into link previews.
interface PostMeta {
  slug: string
  title: string
  summary: string
  image?: string
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function setMeta(html: string, attr: 'name' | 'property', key: string, value: string) {
  const tag = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`)
  if (!tag.test(html)) throw new Error(`index.html has no <meta ${attr}="${key}"> to fill in`)
  return html.replace(tag, (_, open: string, close: string) => open + escapeAttr(value) + close)
}

function postHtml(indexHtml: string, post: PostMeta) {
  const url = `${SITE_URL}/blog/${post.slug}`
  const image = SITE_URL + (post.image ?? DEFAULT_IMAGE)
  const title = `${post.title} | DiffPrism`

  if (!/<title>[^<]*<\/title>/.test(indexHtml)) throw new Error('index.html has no <title> to fill in')
  let html = indexHtml.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeAttr(title)}</title>`)
  html = setMeta(html, 'name', 'description', post.summary)
  html = setMeta(html, 'property', 'og:type', 'article')
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:title', post.title)
  html = setMeta(html, 'property', 'og:description', post.summary)
  html = setMeta(html, 'property', 'og:image', image)
  html = setMeta(html, 'name', 'twitter:url', url)
  html = setMeta(html, 'name', 'twitter:title', post.title)
  html = setMeta(html, 'name', 'twitter:description', post.summary)
  html = setMeta(html, 'name', 'twitter:image', image)
  return html
}

// Link previews (Slack, X, iMessage) read the HTML and never run the app, so
// each post gets its own copy of index.html with its title, summary and image
// in the meta tags. Cloudflare Pages serves dist/blog/<slug>.html at
// /blog/<slug>; every other route falls back to index.html.
function blogMetaPages(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'blog-meta-pages',
    apply: 'build',
    configResolved(resolved) {
      config = resolved
    },
    async closeBundle() {
      const server = await createServer({
        configFile: false,
        root: config.root,
        logLevel: 'error',
        appType: 'custom',
        server: { middlewareMode: true, hmr: false },
        plugins: [react()],
      })
      try {
        const { posts } = (await server.ssrLoadModule('/src/blog/posts.tsx')) as { posts: PostMeta[] }
        const outDir = path.resolve(config.root, config.build.outDir)
        const indexHtml = await readFile(path.join(outDir, 'index.html'), 'utf8')
        await mkdir(path.join(outDir, 'blog'), { recursive: true })
        for (const post of posts) {
          await writeFile(path.join(outDir, 'blog', `${post.slug}.html`), postHtml(indexHtml, post))
        }
        config.logger.info(`blog-meta-pages: wrote ${posts.length} post pages`)
      } finally {
        await server.close()
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), blogMetaPages()],
})
