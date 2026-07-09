import type { GetServerSideProps } from 'next';
import { getAllPosts, getAllTags } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/site-config';

interface SitemapEntry {
  path: string;
  lastmod?: string;
  priority?: string;
  changefreq?: string;
}

function buildUrlEntry({
  path,
  lastmod,
  priority,
  changefreq,
}: SitemapEntry): string {
  const lines = [`<url>`, `  <loc>${absoluteUrl(path)}</loc>`];

  if (lastmod) lines.push(`  <lastmod>${lastmod}</lastmod>`);
  if (changefreq) lines.push(`  <changefreq>${changefreq}</changefreq>`);
  if (priority) lines.push(`  <priority>${priority}</priority>`);

  lines.push(`</url>`);
  return lines.join('\n');
}

function buildSitemap(entries: SitemapEntry[]): string {
  const body = entries.map(buildUrlEntry).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = [
    { path: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { path: '/blog', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    {
      path: '/projects',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    },
    ...posts.map(post => ({
      path: `/blog/${post.slug}`,
      lastmod: post.publishedAt,
      changefreq: 'monthly',
      priority: '0.8',
    })),
    ...tags.map(({ tag }) => ({
      path: `/blog/tags/${encodeURIComponent(tag)}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.5',
    })),
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate'
  );
  res.write(buildSitemap(entries));
  res.end();

  return { props: {} };
};
