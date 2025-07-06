import { getAllBlogPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles and thoughts on web development, programming, and technology',
};

export default async function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Articles and thoughts on web development, programming, and technology
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            publishedAt={post.publishedAt}
            tags={post.tags}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )}
    </div>
  );
}
