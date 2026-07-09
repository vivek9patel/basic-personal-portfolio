import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import ThemeControls from '@/components/theme-controls';
import { PostCard } from '@/components/blog/post-card';
import { SeoHead } from '@/components/meta/seo-head';
import { getAllPosts } from '@/lib/mdx';
import { groupPostsByYear } from '@/lib/blog-utils';
import { ogImageUrl } from '@/lib/site-config';
import { buildBlogIndexJsonLd } from '@/lib/seo';
import type { PostSummary } from '@/interfaces/post.interface';

interface BlogIndexProps {
  posts: PostSummary[];
}

const BlogIndex: NextPage<BlogIndexProps> = ({ posts }) => {
  const postsByYear = groupPostsByYear(posts);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/blog', title: 'Writing' });
  }, []);

  return (
    <>
      <SeoHead
        title="Writing"
        description="Essays and notes on software engineering, open source, and building things."
        path="/blog"
        ogImage={ogImageUrl('Writing')}
        jsonLd={buildBlogIndexJsonLd()}
      />

      <div className="relative min-h-screen">
        <div className="fixed right-6 top-6 z-50">
          <ThemeControls />
        </div>
        <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-24">
          <section className="space-y-8">
            <div className="space-y-2">
              <Link href="/" passHref>
                <a
                  className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
                  data-cursor={true}
                >
                  ← Home
                </a>
              </Link>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Writing
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

export default BlogIndex;

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const posts = await getAllPosts();
  return { props: { posts } };
};
