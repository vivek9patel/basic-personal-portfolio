import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import type {
  Post,
  PostFrontmatter,
  PostSummary,
} from '@/interfaces/post.interface';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

const isProduction = process.env.NODE_ENV === 'production';

function shouldIncludeDrafts(includeDrafts?: boolean): boolean {
  if (isProduction) return false;
  return includeDrafts ?? false;
}

function stripMarkdownForPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function parseFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  const frontmatter: PostFrontmatter = {
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    publishedAt: String(data.publishedAt ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
  };

  if (data.coverImage) {
    frontmatter.coverImage = String(data.coverImage);
  }

  return frontmatter;
}

async function serializeMdx(content: string) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: { className: ['anchor'] },
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: {
              light: 'github-light',
              dark: 'github-dark',
            },
            defaultColor: false,
            keepBackground: false,
          },
        ],
      ],
    },
  });
}

function readPostFile(
  slug: string
): { frontmatter: PostFrontmatter; body: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  return {
    frontmatter: parseFrontmatter(data),
    body: content,
  };
}

async function buildPost(
  slug: string,
  includeDrafts: boolean,
  withContent: boolean
): Promise<Post | null> {
  const parsed = readPostFile(slug);
  if (!parsed) return null;

  const { frontmatter, body } = parsed;
  if (frontmatter.draft && !includeDrafts) return null;

  const stats = readingTime(body);
  const readingTimeMinutes = Math.max(1, Math.ceil(stats.minutes));

  const summary: PostSummary = {
    slug,
    ...frontmatter,
    readingTimeMinutes,
  };

  if (!withContent) {
    return {
      ...summary,
      content: {} as Post['content'],
      plainText: '',
    };
  }

  const content = await serializeMdx(body);
  const plainText = stripMarkdownForPlainText(body);

  return {
    ...summary,
    content,
    plainText,
  };
}

export async function getPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return buildPost(slug, shouldIncludeDrafts(false), true);
}

export async function getAllPosts(options?: {
  includeDrafts?: boolean;
}): Promise<PostSummary[]> {
  const includeDrafts = shouldIncludeDrafts(options?.includeDrafts);
  const slugs = await getPostSlugs();

  const posts = await Promise.all(
    slugs.map(slug => buildPost(slug, includeDrafts, false))
  );

  return posts
    .filter((post): post is Post => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map(({ content: _content, plainText: _plainText, ...summary }) => summary);
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllPosts();
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}
