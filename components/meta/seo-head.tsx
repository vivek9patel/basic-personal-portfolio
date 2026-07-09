import Head from 'next/head';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  resolveImageUrl,
  SITE_NAME,
  SITE_TWITTER,
} from '@/lib/site-config';

interface SeoHeadArticle {
  publishedAt: string;
  tags?: string[];
}

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  article?: SeoHeadArticle;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function SeoHead({
  title,
  description,
  path,
  ogImage,
  ogType = 'website',
  noindex = false,
  article,
  jsonLd,
}: SeoHeadProps) {
  const canonical = absoluteUrl(path);
  const pageTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const image = ogImage
    ? resolveImageUrl(ogImage)
    : resolveImageUrl(DEFAULT_OG_IMAGE);
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow'}
      />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {article && (
        <>
          <meta
            property="article:published_time"
            content={new Date(article.publishedAt).toISOString()}
          />
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_TWITTER} />
      <meta name="twitter:creator" content={SITE_TWITTER} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}
