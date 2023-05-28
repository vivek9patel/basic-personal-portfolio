import { NextApiRequest, NextApiResponse } from "next";
import { get } from '@vercel/edge-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const likes = await get('portfolio-likes');

    return res.status(200).json({
        likes
    });
}