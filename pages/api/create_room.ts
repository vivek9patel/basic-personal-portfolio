import { v4 } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next'
var jwt = require('jsonwebtoken');

const generateManagementToken = () => {
    var app_access_key = process.env.HMS_ACCESS_KEY;
    var app_secret = process.env.HMS_SECRET;

    return jwt.sign(
        {
            access_key: app_access_key,
            type: 'management',
            version: 2,
            iat: Math.floor(Date.now() / 1000),
            nbf: Math.floor(Date.now() / 1000)
        },
        app_secret,
        {
            algorithm: 'HS256',
            expiresIn: '24h',
            jwtid: v4()
        }
    );

}

export default async function createRoom(req:NextApiRequest, res:NextApiResponse) {
  try {
    const { name, description } = JSON.parse(req.body);
    const management_token = generateManagementToken();

    await fetch(`https://prod-in2.100ms.live/api/v2/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${management_token}`,
      },
      body: JSON.stringify({
        name,
        description,
        template: 'meet_createown_a9bb894f-fc82-4f62-95ae-8526b7364eed'
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