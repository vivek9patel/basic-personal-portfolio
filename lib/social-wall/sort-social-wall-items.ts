import { SocialWallItem } from '@/interfaces/social-wall.interface';

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Newest social posts first; standalone images scattered at random slots. */
export function sortSocialWallItems(items: SocialWallItem[]): SocialWallItem[] {
  const posts = items.filter(
    (item): item is Exclude<SocialWallItem, { type: 'image' }> =>
      item.type !== 'image'
  );
  const images = items.filter(
    (item): item is Extract<SocialWallItem, { type: 'image' }> =>
      item.type === 'image'
  );

  posts.sort((a, b) => (b.postedAt ?? 0) - (a.postedAt ?? 0));

  if (images.length === 0) {
    return posts;
  }

  const result: SocialWallItem[] = [...posts];
  for (const image of shuffle(images)) {
    const index = Math.floor(Math.random() * (result.length + 1));
    result.splice(index, 0, image);
  }

  return result;
}
