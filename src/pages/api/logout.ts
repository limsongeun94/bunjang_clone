import type { NextApiRequest, NextApiResponse } from 'next'
import withIronSession from '@/libs/session'

// endpoint: /api/logout
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  await req.session.destroy()

  res.redirect('/')
};

export default withIronSession(handler)