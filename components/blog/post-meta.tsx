import { cn } from '@/lib/utils';
import { formatPostDate } from '@/lib/blog-utils';

interface PostMetaProps {
  publishedAt: string;
  readingTimeMinutes: number;
  className?: string;
  showReadSuffix?: boolean;
}

export function PostMeta({
  publishedAt,
  readingTimeMinutes,
  className,
  showReadSuffix = false,
}: PostMetaProps) {
  const readLabel = showReadSuffix
    ? `${readingTimeMinutes} min read`
    : `${readingTimeMinutes} min`;

  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {formatPostDate(publishedAt)} · {readLabel}
    </p>
  );
}
