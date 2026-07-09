import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import ThemeControls from '@/components/theme-controls';
import { PostCard } from '@/components/blog/post-card';
import { SeoHead } from '@/components/meta/seo-head';
import { getAllPosts, getAllTags } from '@/lib/mdx';
import { groupPostsByYear } from '@/lib/blog-utils';
import { buildBreadcrumbJsonLd } from '@/lib/seo';
import type { PostSummary } from '@/interfaces/post.interface';

interface TagPageProps {
  tag: string;
  posts: PostSummary[];
}

const TagPage: NextPage<TagPageProps> = ({ tag, posts }) => {
  const postsByYear = groupPostsByYear(posts);
  const tagPath = `/blog/tags/${encodeURIComponent(tag)}`;
  const description = `All writing by Vivek Patel tagged with "${tag}".`;

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: tagPath,
      title: `Posts tagged "${tag}"`,
    });
  }, [tag, tagPath]);

  return (
    <>
      <SeoHead
        title={`Posts tagged "${tag}"`}
        description={description}
        path={tagPath}
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/blog' },
          { name: tag, path: tagPath },
        ])}
      />

      <div className="relative min-h-screen">
        <div className="fixed right-6 top-6 z-50">
          <ThemeControls />
        </div>
        <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-24">
          <section className="space-y-8">
            <div className="space-y-2">
              <Link href="/blog" passHref>
                <a
                  className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
                  data-cursor={true}
                >
                  ← Writing
                </a>
              </Link>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Posts tagged &ldquo;{tag}&rdquo;
              </h1>
              <p className="text-sm text-muted-foreground">
                {posts.length} posts.
              </p>
            </div>

            {Object.entries(postsByYear).map(([year, yearPosts]) => (
              <div key={year} className="space-y-4">
                <h2 className="text-sm font-medium text-muted-foreground">
                  {year}
                </h2>
                <div className="space-y-4">
                  {yearPosts.map(post => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </>
  );
};

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags();

  return {
    paths: tags.map(({ tag }) => ({
      params: { tag },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TagPageProps> = async ({
  params,
}) => {
  const tag = decodeURIComponent(params?.tag as string);
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(post => post.tags.includes(tag));

  if (posts.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      tag,
      posts,
    },
  };
};
