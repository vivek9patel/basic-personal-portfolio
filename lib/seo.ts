import {
  absoluteUrl,
  ogImageUrl,
  resolveImageUrl,
  SITE_AUTHOR,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site-config';
import type { PostSummary } from '@/interfaces/post.interface';

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildBlogPostingJsonLd(post: PostSummary, path: string) {
  const url = absoluteUrl(path);
  const image = post.coverImage
    ? resolveImageUrl(post.coverImage)
    : ogImageUrl(post.title);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      url: SITE_AUTHOR.url,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      url: SITE_AUTHOR.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image,
    keywords: post.tags.join(', '),
    url,
    inLanguage: 'en-US',
  };
}

export function buildBlogIndexJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Writing',
    description:
      'Essays and notes on software engineering, open source, and building things.',
    url: absoluteUrl('/blog'),
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      url: SITE_AUTHOR.url,
    },
    inLanguage: 'en-US',
  };
}

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_AUTHOR.name,
    url: SITE_URL,
    sameAs: [
      'https://github.com/vivek9patel',
      'https://www.linkedin.com/in/vivek9patel/',
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Portfolio and writing by Vivek Patel: open-source projects, experience, and software engineering.',
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      url: SITE_AUTHOR.url,
    },
    inLanguage: 'en-US',
  };
}
