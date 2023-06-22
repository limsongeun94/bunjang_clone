import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

// endpoint: /api/user
export default async (req: NextApiRequest, res: NextApiResponse) => {

  const ret = {}

  res.status(200).json(ret);
};
