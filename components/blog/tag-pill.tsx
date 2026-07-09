import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface TagPillProps {
  tag: string;
}

export function TagPill({ tag }: TagPillProps) {
  return (
    <Link href={`/blog/tags/${encodeURIComponent(tag)}`} passHref>
      <a data-cursor={true}>
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
