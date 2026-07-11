import { cn } from '@/lib/utils';

interface SocialWallPostExcerptProps {
  text: string;
  maxLines?: 3 | 4 | 5;
  truncateAfter?: number;
  className?: string;
}

export default function SocialWallPostExcerpt({
  text,
  maxLines = 4,
  truncateAfter = 140,
  className,
}: SocialWallPostExcerptProps) {
  const isLong = text.length > truncateAfter;
  const lineClampClass =
    maxLines === 3
      ? 'line-clamp-3'
      : maxLines === 5
        ? 'line-clamp-5'
        : 'line-clamp-4';

  return (
    <div className={cn('relative', className)}>
      <p
        className={cn(
          'text-sm leading-relaxed text-foreground/90 whitespace-pre-line',
          lineClampClass
        )}
      >
        {text}
      </p>
      {isLong && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent"
          aria-hidden
        />
      )}
    </div>
  );
}
