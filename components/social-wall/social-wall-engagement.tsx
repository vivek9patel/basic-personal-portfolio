import { Heart, MessageCircle, Repeat2, Eye } from 'lucide-react';
import { SocialWallEngagement } from '@/interfaces/social-wall.interface';
import { formatEngagementCount } from '@/lib/social-wall/format-engagement';
import { cn } from '@/lib/utils';

interface SocialWallEngagementBarProps {
  engagement?: SocialWallEngagement;
  variant: 'tweet' | 'linkedin';
  className?: string;
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Heart;
  label: string;
  value: number;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <Icon className="h-3.5 w-3.5" aria-hidden />
      <span>
        {formatEngagementCount(value)} {label}
      </span>
    </span>
  );
}

export default function SocialWallEngagementBar({
  engagement,
  variant,
  className,
}: SocialWallEngagementBarProps) {
  if (!engagement) {
    return null;
  }

  const metrics = [
    engagement.likes !== undefined
      ? {
          key: 'likes',
          icon: Heart,
          label: variant === 'linkedin' ? 'reactions' : 'likes',
          value: engagement.likes,
        }
      : null,
    engagement.comments !== undefined
      ? {
          key: 'comments',
          icon: MessageCircle,
          label: 'comments',
          value: engagement.comments,
        }
      : null,
    engagement.reposts !== undefined
      ? {
          key: 'reposts',
          icon: Repeat2,
          label: variant === 'linkedin' ? 'reposts' : 'reposts',
          value: engagement.reposts,
        }
      : null,
    engagement.views !== undefined
      ? {
          key: 'views',
          icon: Eye,
          label: 'views',
          value: engagement.views,
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    icon: typeof Heart;
    label: string;
    value: number;
  }>;

  if (metrics.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground',
        className
      )}
    >
      {metrics.map(metric => (
        <Metric
          key={metric.key}
          icon={metric.icon}
          label={metric.label}
          value={metric.value}
        />
      ))}
    </div>
  );
}
