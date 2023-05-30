import { NextApiRequest, NextApiResponse } from "next";
import { get } from '@vercel/edge-config';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req});
    if(!session) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    const currentLikes = await get('portfolio-likes') as number ;
    const likeIncrements = parseInt(req.query.increment as string);

    if(likeIncrements < 0 || likeIncrements > 9){
        return res.status(200);
    }

    if(!currentLikes || !likeIncrements) {
        return res.status(400).json({
            message: 'Error fetching or updating likes'
        });
    }

    const updatedLikes = currentLikes+likeIncrements;
    // @ts-ignore
    const updateEdgeConfig = await fetch(`https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_TOKEN}/items`, {
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
    },);
    const data = await updateEdgeConfig.json()
    if (!updateEdgeConfig.ok) {
        return res.status(500).json(data);
    }

    return res.status(200).json(data);
    
}