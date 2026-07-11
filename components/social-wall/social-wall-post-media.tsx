import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SocialWallItemSize } from '@/interfaces/social-wall.interface';

const MEDIA_MAX_HEIGHT: Record<SocialWallItemSize, string> = {
  square: 'max-h-56',
  wide: 'max-h-72',
  tall: 'max-h-64',
  large: 'max-h-80',
};

interface SocialWallPostMediaProps {
  src: string;
  alt: string;
  type?: 'photo' | 'video';
  width?: number;
  height?: number;
  cardSize?: SocialWallItemSize;
  className?: string;
}

export default function SocialWallPostMedia({
  src,
  alt,
  type = 'photo',
  width,
  height,
  cardSize = 'square',
  className,
}: SocialWallPostMediaProps) {
  const imageWidth = width && width > 0 ? width : 1200;
  const imageHeight = height && height > 0 ? height : 675;
  const isLinkedInCdn = src.includes('media.licdn.com');
  const maxHeightClass = MEDIA_MAX_HEIGHT[cardSize];

  return (
    <div
      className={cn(
        'mt-3 flex w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted/40',
        className
      )}
    >
      <div className={cn('relative w-full', maxHeightClass)}>
        <Image
          src={src}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          className={cn('mx-auto w-full object-contain', maxHeightClass)}
          sizes="(max-width: 768px) 50vw, 420px"
          unoptimized={isLinkedInCdn}
        />
        {type === 'video' && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15"
            aria-hidden
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white">
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
