export type SocialWallItemSize = 'square' | 'wide' | 'tall' | 'large';

export interface SocialWallEngagement {
  likes?: number;
  comments?: number;
  reposts?: number;
  views?: number;
}

interface SocialWallItemBase {
  id: string;
  size: SocialWallItemSize;
  /** Unix timestamp (ms) used for chronological sorting */
  postedAt?: number;
  engagement?: SocialWallEngagement;
}

export interface SocialWallImageItem extends SocialWallItemBase {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface SocialWallTweetItem extends SocialWallItemBase {
  type: 'tweet';
  text: string;
  url: string;
  date?: string;
  handle?: string;
  displayName?: string;
  quoteText?: string;
  quoteHandle?: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'video';
  mediaWidth?: number;
  mediaHeight?: number;
}

export interface SocialWallLinkedInItem extends SocialWallItemBase {
  type: 'linkedin';
  text: string;
  url: string;
  date?: string;
  mediaUrl?: string;
  mediaWidth?: number;
  mediaHeight?: number;
}

export type SocialWallItem =
  SocialWallImageItem | SocialWallTweetItem | SocialWallLinkedInItem;

export interface SocialWallTweetSource {
  id: string;
  type: 'tweet';
  url: string;
  size: SocialWallItemSize;
  /** Optional fallback when live fetch is unavailable */
  engagement?: SocialWallEngagement;
}

export interface SocialWallLinkedInSource {
  id: string;
  type: 'linkedin';
  url: string;
  size: SocialWallItemSize;
  /** ISO date fallback when LinkedIn metadata has no publish date */
  postedAt?: string;
  engagement?: SocialWallEngagement;
}

export interface SocialWallImageSource {
  id: string;
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  size: SocialWallItemSize;
}

export type SocialWallSource =
  SocialWallTweetSource | SocialWallLinkedInSource | SocialWallImageSource;
