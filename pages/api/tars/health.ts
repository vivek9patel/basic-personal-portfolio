import type { NextApiRequest, NextApiResponse } from 'next';
import { getTarsEndpoint } from '@/lib/tars-endpoint';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const endpoint = getTarsEndpoint();
  if (!endpoint) {
    return res.status(503).json({ message: 'TARS endpoint is not configured' });
  }

  try {
    const response = await fetch(endpoint, { method: 'GET' });
    return res.status(response.ok ? 200 : response.status).json({
      online: response.ok,
    });
  } catch {
    return res.status(503).json({ message: 'TARS service unavailable' });
  }
}
