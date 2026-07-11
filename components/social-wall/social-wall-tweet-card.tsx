import { cn } from '@/lib/utils';
import { SOCIAL_WALL_SIZE_CLASSES } from '@/components/social-wall/social-wall-grid';
import SocialWallEngagementBar from '@/components/social-wall/social-wall-engagement';
import SocialWallPostMedia from '@/components/social-wall/social-wall-post-media';
import SocialWallPostExcerpt from '@/components/social-wall/social-wall-post-excerpt';
import { SocialWallTweetItem } from '@/interfaces/social-wall.interface';
import { SITE_AUTHOR } from '@/lib/site-config';

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function avatarInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

interface SocialWallTweetCardProps {
  item: SocialWallTweetItem;
  onClick: () => void;
}

export default function SocialWallTweetCard({
  item,
  onClick,
}: SocialWallTweetCardProps) {
  const handle = item.handle ?? SITE_AUTHOR.twitter;
  const displayName = item.displayName ?? SITE_AUTHOR.name;
  const isOwnTweet = handle === SITE_AUTHOR.twitter;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={cn(
        'group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/25',
        SOCIAL_WALL_SIZE_CLASSES[item.size]
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background"
            aria-hidden
          >
            {avatarInitials(displayName)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {displayName}
            </p>
            <p className="truncate text-xs text-muted-foreground">@{handle}</p>
          </div>
        </div>
        <XLogo className="h-4 w-4 shrink-0 text-foreground/70" />
      </div>

      {item.quoteText && item.quoteHandle && !isOwnTweet && (
        <p className="mt-3 text-xs font-medium text-muted-foreground">
          Quoted @{item.quoteHandle}
        </p>
      )}

      <SocialWallPostExcerpt
        text={item.text}
        maxLines={3}
        truncateAfter={120}
        className="mt-2 shrink-0"
      />

      {item.mediaUrl && (
        <SocialWallPostMedia
          src={item.mediaUrl}
          alt={`Media from post by ${displayName}`}
          type={item.mediaType}
          width={item.mediaWidth}
          height={item.mediaHeight}
          cardSize={item.size}
          className="mt-auto"
        />
      )}

      {item.date && (
        <p className="mt-2 shrink-0 text-xs text-muted-foreground">
          {item.date}
        </p>
      )}

      <SocialWallEngagementBar
        engagement={item.engagement}
        variant="tweet"
        className="shrink-0"
      />
    </a>
  );
}
