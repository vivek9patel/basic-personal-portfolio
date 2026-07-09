export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivek9patel.com';

export const SITE_NAME = 'Vivek Patel';
export const SITE_TWITTER = '@vivek9patel';
export const SITE_LOCALE = 'en_US';

export const SITE_AUTHOR = {
  name: 'Vivek Patel',
  url: SITE_URL,
  twitter: 'vivek9patel',
} as const;

export const DEFAULT_OG_IMAGE = '/meta/meta-social-image.png';

export const SITE_DESCRIPTION =
  "Vivek's portfolio: open-source projects, experience, and software engineering work.";

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function ogImageUrl(title: string): string {
  return absoluteUrl(`/api/og?title=${encodeURIComponent(title)}`);
}

export function resolveImageUrl(imagePath: string): string {
  return imagePath.startsWith('http') ? imagePath : absoluteUrl(imagePath);
}
