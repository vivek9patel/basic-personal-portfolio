import { NextApiRequest, NextApiResponse } from 'next';
import { get } from '@vercel/edge-config';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  const rawLikes = await get('portfolio-likes');
  const currentLikes =
    typeof rawLikes === 'number'
      ? rawLikes
      : parseInt(String(rawLikes ?? '0'), 10);
  const likeIncrements = parseInt(req.query.increment as string, 10);

  if (
    likeIncrements < 0 ||
    likeIncrements > 9 ||
    Number.isNaN(likeIncrements)
  ) {
    return res.status(400).json({
      message: 'Invalid increment',
    });
  }

  if (Number.isNaN(currentLikes)) {
    return res.status(400).json({
      message: 'Error fetching or updating likes',
    });
  }

  const updatedLikes = currentLikes + likeIncrements;
  // @ts-ignore
  const updateEdgeConfig = await fetch(
    `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_TOKEN}/items`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            operation: 'update',
            key: 'portfolio-likes',
            value: updatedLikes,
          },
        ],
      }),
    }
  );
  const data = await updateEdgeConfig.json();
  if (!updateEdgeConfig.ok) {
    return res.status(500).json(data);
  }

  return res.status(200).json(data);
}
