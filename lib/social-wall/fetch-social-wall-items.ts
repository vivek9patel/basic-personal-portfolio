import {
  SocialWallEngagement,
  SocialWallItem,
  SocialWallSource,
  SocialWallTweetItem,
  SocialWallLinkedInItem,
} from '@/interfaces/social-wall.interface';
import { formatTweetDate } from '@/lib/social-wall/format-engagement';
import { sortSocialWallItems } from '@/lib/social-wall/sort-social-wall-items';

const FXTWITTER_API = 'https://api.fxtwitter.com/status';
const TWITTER_EPOCH_MS = 1288834974657;
const LINKEDIN_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

type FxTwitterMediaItem = {
  type?: string;
  url?: string;
  thumbnail_url?: string;
  width?: number;
  height?: number;
};

type SocialWallMedia = {
  url: string;
  type: 'photo' | 'video';
  width?: number;
  height?: number;
};

type FxTwitterResponse = {
  code?: number;
  tweet?: {
    text?: string;
    url?: string;
    likes?: number;
    replies?: number;
    retweets?: number;
    views?: number | null;
    created_at?: string;
    created_timestamp?: number;
    author?: {
      name?: string;
      screen_name?: string;
    };
    media?: {
      photos?: Array<{ url?: string; width?: number; height?: number }>;
      all?: FxTwitterMediaItem[];
    };
    quote?: {
      text?: string;
      author?: {
        screen_name?: string;
      };
      media?: {
        photos?: Array<{ url?: string; width?: number; height?: number }>;
        all?: FxTwitterMediaItem[];
      };
    };
  };
};

function mergeEngagement(
  fetched?: SocialWallEngagement,
  fallback?: SocialWallEngagement
): SocialWallEngagement | undefined {
  const merged: SocialWallEngagement = {};

  const likes = fetched?.likes ?? fallback?.likes;
  const comments = fetched?.comments ?? fallback?.comments;
  const reposts = fetched?.reposts ?? fallback?.reposts;
  const views = fetched?.views ?? fallback?.views;

  if (likes !== undefined) merged.likes = likes;
  if (comments !== undefined) merged.comments = comments;
  if (reposts !== undefined) merged.reposts = reposts;
  if (views !== undefined) merged.views = views;

  return Object.keys(merged).length > 0 ? merged : undefined;
}

function extractTweetId(url: string): string | null {
  const match = url.match(/status\/(\d+)/);
  return match?.[1] ?? null;
}

function tweetIdToTimestampMs(id: string): number {
  return Number((BigInt(id) >> BigInt(22)) + BigInt(TWITTER_EPOCH_MS));
}

function parsePostedAtMs(value?: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function parseLinkedInPostedAt(
  html: string,
  url: string,
  fallback?: string
): number | undefined {
  const publishedTime =
    html.match(/property="article:published_time" content="([^"]+)"/)?.[1] ??
    html.match(/property="og:updated_time" content="([^"]+)"/)?.[1];

  const publishedMs = parsePostedAtMs(publishedTime);
  if (publishedMs !== undefined) {
    return publishedMs;
  }

  const mediaTimestamp = html.match(
    /media\.licdn\.com[^"']*\/0\/(\d{13})/
  )?.[1];
  if (mediaTimestamp) {
    return Number(mediaTimestamp);
  }

  const embeddedTimestamp = html.match(
    /"publishedAt":\{"\$date":\{"\$numberLong":"(\d{13})"/
  )?.[1];
  if (embeddedTimestamp) {
    return Number(embeddedTimestamp);
  }

  const fallbackMs = parsePostedAtMs(fallback);
  if (fallbackMs !== undefined) {
    return fallbackMs;
  }

  const activityId = url.match(/activity-(\d+)/)?.[1];
  if (activityId) {
    // Preserve relative LinkedIn ordering when no publish date is exposed.
    return Number(activityId.slice(0, 13));
  }

  return undefined;
}

function resolveTweetPostedAt(
  tweet: NonNullable<FxTwitterResponse['tweet']>,
  tweetId: string
): number {
  if (tweet.created_timestamp) {
    return tweet.created_timestamp * 1000;
  }

  const createdMs = parsePostedAtMs(tweet.created_at);
  if (createdMs !== undefined) {
    return createdMs;
  }

  return tweetIdToTimestampMs(tweetId);
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function cleanLinkedInText(description: string): string {
  const withoutEdit = description.split(/\nEDIT:/i)[0]?.trim() ?? description;
  return withoutEdit.replace(/\s+\n/g, '\n').trim();
}

function pickMediaFromItems(
  items?: FxTwitterMediaItem[]
): SocialWallMedia | undefined {
  if (!items?.length) {
    return undefined;
  }

  for (const item of items) {
    if (item.type === 'photo' && item.url) {
      return {
        url: item.url,
        type: 'photo',
        width: item.width,
        height: item.height,
      };
    }
    if (item.type === 'video' && item.thumbnail_url) {
      return {
        url: item.thumbnail_url,
        type: 'video',
        width: item.width,
        height: item.height,
      };
    }
  }

  return undefined;
}

function extractTweetMedia(
  tweet: NonNullable<FxTwitterResponse['tweet']>,
  preferQuoteMedia: boolean
): SocialWallMedia | undefined {
  if (preferQuoteMedia) {
    const quoteMedia = pickMediaFromItems(tweet.quote?.media?.all);
    if (quoteMedia) {
      return quoteMedia;
    }

    const quotePhoto = tweet.quote?.media?.photos?.[0];
    if (quotePhoto?.url) {
      return {
        url: quotePhoto.url,
        type: 'photo',
        width: quotePhoto.width,
        height: quotePhoto.height,
      };
    }
  }

  const directMedia = pickMediaFromItems(tweet.media?.all);
  if (directMedia) {
    return directMedia;
  }

  const directPhoto = tweet.media?.photos?.[0];
  if (directPhoto?.url) {
    return {
      url: directPhoto.url,
      type: 'photo',
      width: directPhoto.width,
      height: directPhoto.height,
    };
  }

  return undefined;
}

function parseLinkedInEngagement(
  html: string,
  description: string
): SocialWallEngagement {
  const commentsFromHtml = html.match(/(\d+)\s+Comments\b/i)?.[1];
  const commentsFromDescription = description.match(
    /(\d+)\s+comments on LinkedIn/i
  )?.[1];
  const reactionsFromHtml = html.match(/(\d+)\s+Reactions\b/i)?.[1];

  const engagement: SocialWallEngagement = {};

  if (commentsFromHtml) {
    engagement.comments = Number(commentsFromHtml);
  } else if (commentsFromDescription) {
    engagement.comments = Number(commentsFromDescription);
  }

  if (reactionsFromHtml) {
    engagement.likes = Number(reactionsFromHtml);
  }

  return engagement;
}

async function fetchTweet(
  source: SocialWallSource
): Promise<SocialWallTweetItem | null> {
  if (source.type !== 'tweet') {
    return null;
  }

  const tweetId = extractTweetId(source.url);
  if (!tweetId) {
    return null;
  }

  try {
    const response = await fetch(`${FXTWITTER_API}/${tweetId}`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as FxTwitterResponse;
    const tweet = payload.tweet;

    if (!tweet?.text) {
      return null;
    }

    const hasQuote = Boolean(tweet.quote?.text);
    const displayText =
      hasQuote && tweet.text.trim().length <= 4
        ? (tweet.quote?.text ?? tweet.text)
        : tweet.text;

    const preferQuoteMedia =
      hasQuote && tweet.text.trim().length <= 4 && Boolean(tweet.quote?.text);
    const media = extractTweetMedia(tweet, preferQuoteMedia);

    const item: SocialWallTweetItem = {
      id: source.id,
      type: 'tweet',
      size: source.size,
      url: tweet.url ?? source.url,
      text: displayText,
      postedAt: resolveTweetPostedAt(tweet, tweetId),
    };

    if (tweet.created_at) item.date = formatTweetDate(tweet.created_at);
    if (tweet.author?.screen_name) item.handle = tweet.author.screen_name;
    if (tweet.author?.name) item.displayName = tweet.author.name;
    if (hasQuote && tweet.quote?.text) item.quoteText = tweet.quote.text;
    if (hasQuote && tweet.quote?.author?.screen_name) {
      item.quoteHandle = tweet.quote.author.screen_name;
    }

    const engagement = mergeEngagement(
      {
        likes: tweet.likes,
        comments: tweet.replies,
        reposts: tweet.retweets,
        views: tweet.views ?? undefined,
      },
      source.engagement
    );
    if (engagement) item.engagement = engagement;
    if (media) {
      item.mediaUrl = media.url;
      item.mediaType = media.type;
      if (media.width) item.mediaWidth = media.width;
      if (media.height) item.mediaHeight = media.height;
    }

    return item;
  } catch {
    return null;
  }
}

async function fetchLinkedIn(
  source: SocialWallSource
): Promise<SocialWallLinkedInItem | null> {
  if (source.type !== 'linkedin') {
    return null;
  }

  try {
    const response = await fetch(source.url, {
      headers: {
        'User-Agent': LINKEDIN_USER_AGENT,
        'Accept-Language': 'en-US,en;q=0.9',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    const descriptionMatch = html.match(
      /<meta name="description" content="([^"]+)"/
    );

    if (!descriptionMatch?.[1]) {
      return null;
    }

    const description = decodeHtmlEntities(descriptionMatch[1]);
    const postedAt = parseLinkedInPostedAt(html, source.url, source.postedAt);
    const engagement = mergeEngagement(
      parseLinkedInEngagement(html, description),
      source.engagement
    );

    const item: SocialWallLinkedInItem = {
      id: source.id,
      type: 'linkedin',
      size: source.size,
      url: source.url,
      text: cleanLinkedInText(description),
    };

    if (postedAt !== undefined) {
      item.postedAt = postedAt;
      item.date = new Date(postedAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    }
    if (engagement) item.engagement = engagement;

    return item;
  } catch {
    return null;
  }
}

function resolveImage(source: SocialWallSource): SocialWallItem | null {
  if (source.type !== 'image') {
    return null;
  }

  return {
    id: source.id,
    type: 'image',
    size: source.size,
    src: source.src,
    alt: source.alt,
    ...(source.caption ? { caption: source.caption } : {}),
  };
}

export async function fetchSocialWallItems(
  sources: SocialWallSource[]
): Promise<SocialWallItem[]> {
  const results = await Promise.all(
    sources.map(async source => {
      if (source.type === 'tweet') {
        return fetchTweet(source);
      }
      if (source.type === 'linkedin') {
        return fetchLinkedIn(source);
      }
      return resolveImage(source);
    })
  );

  return sortSocialWallItems(
    results.filter((item): item is SocialWallItem => item !== null)
  );
}
