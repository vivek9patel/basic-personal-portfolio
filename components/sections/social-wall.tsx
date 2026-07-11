import { useState } from 'react';
import SocialWallImageDialog from '@/components/social-wall/social-wall-image-dialog';
import SocialWallImageTile from '@/components/social-wall/social-wall-image-tile';
import SocialWallLinkedInCard from '@/components/social-wall/social-wall-linkedin-card';
import SocialWallTweetCard from '@/components/social-wall/social-wall-tweet-card';
import {
  SocialWallImageItem,
  SocialWallItem,
} from '@/interfaces/social-wall.interface';
import { trackEvent } from '@/lib/analytics';
import { useSectionView } from '@/hooks/useSectionView';

function trackSocialWallClick(item: SocialWallItem) {
  trackEvent('social_wall_click', {
    item_id: item.id,
    item_type: item.type,
  });
}

interface SocialWallSectionProps {
  items: SocialWallItem[];
}

export default function SocialWallSection({ items }: SocialWallSectionProps) {
  const sectionRef = useSectionView<HTMLElement>('socialwall');
  const [activeImage, setActiveImage] = useState<SocialWallImageItem | null>(
    null
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="socialwall"
      ref={sectionRef}
      className="space-y-6 scroll-mt-24"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        #socialwall
      </h2>

      <div className="grid auto-rows-[88px] grid-cols-2 gap-3 sm:auto-rows-[96px] md:grid-cols-3">
        {items.map(item => {
          if (item.type === 'image') {
            return (
              <SocialWallImageTile
                key={item.id}
                item={item}
                onOpen={() => {
                  trackSocialWallClick(item);
                  setActiveImage(item);
                }}
              />
            );
          }

          if (item.type === 'tweet') {
            return (
              <SocialWallTweetCard
                key={item.id}
                item={item}
                onClick={() => trackSocialWallClick(item)}
              />
            );
          }

          return (
            <SocialWallLinkedInCard
              key={item.id}
              item={item}
              onClick={() => trackSocialWallClick(item)}
            />
          );
        })}
      </div>

      <SocialWallImageDialog
        item={activeImage}
        open={activeImage !== null}
        onOpenChange={open => {
          if (!open) {
            setActiveImage(null);
          }
        }}
      />
    </section>
  );
}
