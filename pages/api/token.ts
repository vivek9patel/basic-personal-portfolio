import { uuid } from 'uuidv4';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getAuthToken(req:NextApiRequest, res:NextApiResponse) {
  try {
    const { role, roomId } = JSON.parse(req.body);

    await fetch(`${process.env.NEXT_PUBLIC_HMS_TOKEN_ENDPOINT}api/token`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: uuid(),
        room_id: roomId,
        role,
      }),
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      }).then((data) => {
        res.status(200).json(data);
      });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error });
  }
} 