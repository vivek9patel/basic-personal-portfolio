# Frontmatter schema

Every post starts with YAML frontmatter. Fields parsed by `lib/mdx.ts`:

```yaml
---
title: "Building a MDX-Based Blog with Next.js in 2026"  # string, required
description: "A practical walkthrough of shipping a file-based MDX blog on the Pages Router."  # string, required — meta tags + blog index blurb
publishedAt: "2026-07-09"  # string, required — ISO date YYYY-MM-DD
tags: ["nextjs", "mdx", "typescript"]  # string[], required — lowercase, kebab or single words
draft: false  # boolean, required — true → 404 in production, hidden from indexes
coverImage: "/images/blog/my-post/cover.png"  # string, optional — omit the key entirely if unused
---
```

- There is **no `slug` field**. The slug is the filename without `.mdx`.
- Do not set optional fields to empty string / null / undefined — omit them.
- `draft: true` is for WIP posts; only ship with `draft: false`.

# File conventions

- **Posts:** `content/blog/<slug>.mdx`
- **Images on disk:** `public/images/blog/<slug>/...`
- **URLs in posts:** `/images/blog/<slug>/...`
- **Filename:** kebab-case, descriptive, often with year — e.g. `building-mdx-blog-nextjs-2026.mdx` → `/blog/building-mdx-blog-nextjs-2026`

**Body syntax**

- Markdown + MDX. Use `##` / `###` headings (H1 is the page title from frontmatter — don't repeat it as `#` in the body).
- Prefer the site's MDX components over raw HTML:

```mdx
<Callout type="note">
Use note / tip / warning for asides. Authors write these directly in the .mdx file.
</Callout>

<Media
  src="/images/blog/building-mdx-blog-nextjs-2026/diagram.png"
  alt="Content pipeline from disk to MDXRemote"
  caption="Optional caption under the figure"
/>

<Media
  src="/images/blog/building-mdx-blog-nextjs-2026/demo.mp4"
  alt="Short demo"
  type="video"
/>
```

- Standard markdown images work (`![alt](/images/blog/...)`) but `Media` is preferred for bordered figures + captions.
- Code: fenced blocks with a language tag (`ts`, `tsx`, `css`, `yaml`, etc.). Keep examples simplified but realistic — no line-number chrome or fake “filename tabs.”
- Tables and GFM (strikethrough, task lists) are fine via `remark-gfm`.

# Example post

Excerpt from the real post `content/blog/building-mdx-blog-nextjs-2026.mdx` (match this shape and density):

```mdx
---
title: "Building a MDX-Based Blog with Next.js in 2026"
description: "A practical walkthrough of shipping a file-based MDX blog on the Pages Router: content pipeline, syntax highlighting, table of contents, and the tradeoffs worth knowing before you commit."
publishedAt: "2026-07-09"
tags: ["nextjs", "mdx", "typescript"]
draft: false
---

## Introduction

I wanted a writing section on my portfolio without bolting on a CMS, a database, or a comment system I would never maintain. The goal was simple: markdown files in the repo, compiled at build time, rendered with good typography and syntax highlighting.

This post walks through how I set that up on Next.js (Pages Router) in 2026. If you are weighing Contentlayer, a headless CMS, or rolling your own pipeline, I hope this saves you a few wrong turns.

## Why file-based MDX

The case for keeping posts as `.mdx` files next to your application code is straightforward.

You get version control for free. Every edit is a diff. You can review posts in pull requests the same way you review code. There is no separate deploy step for content, no API keys for a CMS, and no runtime dependency on a third-party service staying online.

MDX specifically is worth it when you want more than plain markdown. A `<Callout>` component, a custom image wrapper, or an embedded demo can live inside a post without inventing a shortcode parser.

<Callout type="note">
Info blocks like this one are just React components registered in your MDX component map. Authors write `<Callout type="note">...</Callout>` directly in the `.mdx` file. No admin UI required.
</Callout>

The main downside is that non-technical collaborators cannot publish without touching git. For a personal site, that is usually fine.
```

For a full-length reference, open that file in the repo.

# Voice / style notes

- **First person, casual-professional.** Write as Vivek: “I wanted…”, “I chose not to…”, “I hit this on the first build.” Practical and opinionated — not third-person, not corporate blog voice, not tutorial-bot (“In this article we will…”).
- **Long-form technical walkthroughs.** Clear H2/H3 sections, short paragraphs, concrete tradeoffs and explicit non-goals. Open with why you cared; close with a tight wrap-up. Typical posts are several thousand words, not listicles.
- **Code and asides.** Fenced blocks with language tags; simplify real code without dumbing it down. Use `<Callout type="note|tip|warning">` for tips and gotchas instead of emoji callouts. Small markdown tables for comparisons are fine.
- **Tone constraints.** No fluff, no engagement bait, no “as an AI,” no hype. Prefer “scope discipline” and honest downsides over selling every feature.
