// pages/api/auth/session.ts
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session && session.user) {
    const userEmail = session.user.email;
    res.status(200).json({ userEmail });
  } else {
    res.status(401).end('Not authenticated');
  }
};
