import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import type { PostSummary } from '@/interfaces/post.interface';

interface WritingSectionProps {
  posts: PostSummary[];
}

export default function WritingSection({ posts }: WritingSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Writing
        </h2>
        <Link href="/blog" passHref>
          <a
            className="text-sm font-medium text-primary hover:underline shrink-0"
            data-cursor={true}
          >
            All blogs
          </a>
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
