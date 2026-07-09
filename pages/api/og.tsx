export const config = {
  runtime: 'edge',
};

import { ImageResponse } from '@vercel/og';

const FALLBACK_TITLE = 'vivek9patel.com';

function createOgImage(title: string) {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '80px',
        background: '#0a0a0a',
        color: '#fafafa',
        fontSize: 56,
        fontWeight: 700,
      }}
    >
      {title}
    </div>,
    { width: 1200, height: 630 }
  );
}

export default function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawTitle = searchParams.get('title');
    const title =
      rawTitle && rawTitle.trim().length > 0 ? rawTitle.trim() : FALLBACK_TITLE;

    return createOgImage(title);
  } catch {
    return createOgImage(FALLBACK_TITLE);
  }
}
