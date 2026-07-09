import Link from 'next/link';
import type { PostSummary } from '@/interfaces/post.interface';
import { PostMeta } from '@/components/blog/post-meta';
import { TagPill } from '@/components/blog/tag-pill';

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <Link href={`/blog/${post.slug}`} passHref>
          <a
            className="text-base font-medium text-foreground hover:underline"
            data-cursor={true}
          >
            {post.title}
          </a>
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
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
