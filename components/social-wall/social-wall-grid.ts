import { SocialWallItemSize } from '@/interfaces/social-wall.interface';

export const SOCIAL_WALL_SIZE_CLASSES: Record<SocialWallItemSize, string> = {
  square: 'col-span-1 row-span-2 sm:col-span-1 sm:row-span-2',
  wide: 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2',
  tall: 'col-span-1 row-span-3 sm:col-span-1 sm:row-span-4',
  large: 'col-span-2 row-span-3 sm:col-span-2 sm:row-span-4',
};
