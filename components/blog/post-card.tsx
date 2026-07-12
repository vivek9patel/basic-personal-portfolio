import Link from 'next/link';
import type { PostSummary } from '@/interfaces/post.interface';
import { PostMeta } from '@/components/blog/post-meta';
import { TagPill } from '@/components/blog/tag-pill';
import { trackBlogPostClick, type BlogPostSource } from '@/lib/analytics';

interface PostCardProps {
  post: PostSummary;
  source?: BlogPostSource;
}

export function PostCard({ post, source }: PostCardProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <Link
          href={`/blog/${post.slug}`}
          className="text-base font-medium text-foreground hover:underline"
          data-cursor={true}
          onClick={() => {
            if (source) {
              trackBlogPostClick(post.slug, post.title, source);
            }
          }}
        >
          {post.title}
        </Link>
        <PostMeta
          publishedAt={post.publishedAt}
          readingTimeMinutes={post.readingTimeMinutes}
          className="shrink-0"
        />
      </div>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map(tag => (
            <TagPill key={tag} tag={tag} source="post_card" />
          ))}
        </div>
      )}
    </div>
  );
}
