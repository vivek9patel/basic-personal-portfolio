import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SOCIAL_WALL_SIZE_CLASSES } from '@/components/social-wall/social-wall-grid';
import { SocialWallImageItem } from '@/interfaces/social-wall.interface';

interface SocialWallImageTileProps {
  item: SocialWallImageItem;
  onOpen: () => void;
}

export default function SocialWallImageTile({
  item,
  onOpen,
}: SocialWallImageTileProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'group relative h-full min-h-0 overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        SOCIAL_WALL_SIZE_CLASSES[item.size]
      )}
      aria-label={
        item.caption ? `View photo: ${item.caption}` : `View photo: ${item.alt}`
      }
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 50vw, 33vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      {item.caption && (
        <p className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {item.caption}
        </p>
      )}
    </button>
  );
}
