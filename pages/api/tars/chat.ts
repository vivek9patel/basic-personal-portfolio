import type { NextApiRequest, NextApiResponse } from 'next';
import { getTarsEndpoint } from '@/lib/tars-endpoint';
import { isChatErrorResponse } from '@/lib/tars-types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const endpoint = getTarsEndpoint();
  if (!endpoint) {
    return res.status(503).json({ message: 'TARS endpoint is not configured' });
  }

  try {
    const response = await fetch(`${endpoint}/api`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (isChatErrorResponse(data)) {
        return res.status(response.status).json(data);
      }

      return res
        .status(response.status)
        .json({ message: 'TARS request failed' });
    }

    return res.status(200).json(data);
  } catch {
    return res.status(503).json({ message: 'TARS service unavailable' });
  }
}
