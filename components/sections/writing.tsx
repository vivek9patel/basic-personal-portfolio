import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import { trackEvent } from '@/lib/analytics';
import { useSectionView } from '@/hooks/useSectionView';
import type { PostSummary } from '@/interfaces/post.interface';

interface WritingSectionProps {
  posts: PostSummary[];
}

export default function WritingSection({ posts }: WritingSectionProps) {
  const sectionRef = useSectionView<HTMLElement>('writing');

  if (posts.length === 0) return null;

  return (
    <section id="writing" ref={sectionRef} className="space-y-6 scroll-mt-24">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Writing
        </h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-primary hover:underline shrink-0"
          data-cursor={true}
          onClick={() =>
            trackEvent('blog_nav_click', {
              destination: '/blog',
              click_source: 'home_writing',
            })
          }
        >
          All blogs
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} source="home_writing" />
        ))}
      </div>
    </section>
  );
}
