import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { trackBlogTagClick, type BlogTagSource } from '@/lib/analytics';

interface TagPillProps {
  tag: string;
  source?: BlogTagSource;
}

export function TagPill({ tag, source }: TagPillProps) {
  return (
    <Link href={`/blog/tags/${encodeURIComponent(tag)}`} passHref>
      <a
        data-cursor={true}
        onClick={() => {
          if (source) {
            trackBlogTagClick(tag, source);
          }
        }}
      >
        <Badge
          variant="outline"
          className="font-normal border-border bg-transparent hover:bg-muted"
        >
          {tag}
        </Badge>
      </a>
    </Link>
  );
}
