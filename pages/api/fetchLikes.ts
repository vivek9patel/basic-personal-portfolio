import { NextApiRequest, NextApiResponse } from 'next';
import { get } from '@vercel/edge-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const likes = await get('portfolio-likes');
    const parsedLikes =
      typeof likes === 'number' ? likes : parseInt(String(likes ?? '0'), 10);

    return res.status(200).json({
      likes: Number.isNaN(parsedLikes) ? 0 : parsedLikes,
    });
  } catch {
    return res.status(200).json({ likes: 0 });
  }
}
