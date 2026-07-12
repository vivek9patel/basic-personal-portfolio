import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import ThemeControls from '@/components/theme-controls';
import { AnimatedSection } from '@/components/animated-section';
import { BlogPostSidebar } from '@/components/blog/blog-post-sidebar';
import { PostMeta } from '@/components/blog/post-meta';
import { TagPill } from '@/components/blog/tag-pill';
import { RelatedPosts } from '@/components/blog/related-posts';
import { ListenToPost } from '@/components/blog/listen-to-post';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { SeoHead } from '@/components/meta/seo-head';
import { getAllPosts, getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { getRelatedPosts } from '@/lib/blog-utils';
import { ogImageUrl, SITE_AUTHOR } from '@/lib/site-config';
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo';
import { useBlogScrollDepth } from '@/hooks/useBlogScrollDepth';
import type { Post, PostSummary } from '@/interfaces/post.interface';

interface BlogPostPageProps {
  post: Post;
  relatedPosts: PostSummary[];
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, relatedPosts }) => {
  const postPath = `/blog/${post.slug}`;

  useBlogScrollDepth(post.slug);

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.description}
        path={postPath}
        ogImage={post.coverImage ? post.coverImage : ogImageUrl(post.title)}
        ogType="article"
        article={{
          publishedAt: post.publishedAt,
          tags: post.tags,
        }}
        jsonLd={[
          buildBlogPostingJsonLd(post, postPath),
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Writing', path: '/blog' },
            { name: post.title, path: postPath },
          ]),
        ]}
      />

      <div className="relative min-h-screen">
        <div className="fixed right-6 top-6 z-50">
          <ThemeControls />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-24">
          <Link
            href="/blog"
            className="inline-block mb-8 text-sm text-muted-foreground hover:text-foreground hover:underline"
            data-cursor={true}
          >
            ← Writing
          </Link>

          <div className="lg:grid lg:grid-cols-[1fr_minmax(0,56rem)_1fr] lg:gap-x-16 xl:gap-x-20">
            <BlogPostSidebar />

            <AnimatedSection className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none">
              <article className="space-y-8">
                <header className="space-y-4">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {post.title}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    By{' '}
                    <a
                      href={SITE_AUTHOR.url}
                      className="text-foreground hover:underline"
                      rel="author"
                      data-cursor={true}
                    >
                      {SITE_AUTHOR.name}
                    </a>
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <PostMeta
                      publishedAt={post.publishedAt}
                      readingTimeMinutes={post.readingTimeMinutes}
                      showReadSuffix
                    />
                    <ListenToPost text={post.plainText} slug={post.slug} />
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <TagPill key={tag} tag={tag} source="post_header" />
                      ))}
                    </div>
                  )}
                </header>

                <div
                  id="post-content"
                  className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary"
                >
                  <MDXRemote {...post.content} components={mdxComponents} />
                </div>

                <RelatedPosts posts={relatedPosts} />
              </article>
            </AnimatedSection>

            <div className="hidden lg:block" aria-hidden />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPostSlugs();
  const posts = await getAllPosts();

  const publishedSlugs = new Set(posts.map(post => post.slug));

  return {
    paths: slugs
      .filter(slug => publishedSlugs.has(slug))
      .map(slug => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  const allPosts = await getAllPosts();
  const relatedPosts = getRelatedPosts(post, allPosts);

  return {
    props: {
      post,
      relatedPosts,
    },
  };
};
