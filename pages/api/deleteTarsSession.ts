import { NextApiRequest, NextApiResponse } from 'next';
import { getTarsEndpoint } from '@/lib/tars-endpoint';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const endpoint = getTarsEndpoint();
  if (!endpoint) {
    return res.status(503).json({ message: 'TARS endpoint is not configured' });
  }

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    delete_token: process.env.DELETE_SESSION_TOKEN,
    session_id: req.query.sessionId,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const result = await fetch(`${endpoint}/delete-session`, requestOptions);
  console.log('tars session delete request ', result.status);
  return res.status(result.status);
}
