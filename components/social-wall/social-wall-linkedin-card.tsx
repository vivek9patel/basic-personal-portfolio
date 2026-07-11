import { Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SOCIAL_WALL_SIZE_CLASSES } from '@/components/social-wall/social-wall-grid';
import SocialWallEngagementBar from '@/components/social-wall/social-wall-engagement';
import SocialWallPostExcerpt from '@/components/social-wall/social-wall-post-excerpt';
import { SocialWallLinkedInItem } from '@/interfaces/social-wall.interface';
import { SITE_AUTHOR } from '@/lib/site-config';

interface SocialWallLinkedInCardProps {
  item: SocialWallLinkedInItem;
  onClick: () => void;
}

export default function SocialWallLinkedInCard({
  item,
  onClick,
}: SocialWallLinkedInCardProps) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={cn(
        'group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-[#0A66C2]/40',
        SOCIAL_WALL_SIZE_CLASSES[item.size]
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A66C2] text-xs font-semibold text-white"
            aria-hidden
          >
            VP
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {SITE_AUTHOR.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Software Engineer
            </p>
          </div>
        </div>
        <Linkedin className="h-4 w-4 shrink-0 text-[#0A66C2]" aria-hidden />
      </div>

      <SocialWallPostExcerpt
        text={item.text}
        maxLines={4}
        truncateAfter={180}
        className="mt-3 shrink-0"
      />

      {item.date && (
        <p className="mt-2 shrink-0 text-xs text-muted-foreground">
          {item.date}
        </p>
      )}

      <SocialWallEngagementBar
        engagement={item.engagement}
        variant="linkedin"
        className="shrink-0"
      />
    </a>
  );
}
