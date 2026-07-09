import Link from 'next/link';
import type { PostSummary } from '@/interfaces/post.interface';

interface RelatedPostsProps {
  posts: PostSummary[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="space-y-4 border-t border-border pt-8">
      <h2 className="text-sm font-medium text-muted-foreground">Related</h2>
      <ul className="space-y-2">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} passHref>
              <a
                className="text-sm text-foreground hover:underline"
                data-cursor={true}
              >
                → {post.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
