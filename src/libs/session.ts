import type { IronSessionOptions } from 'iron-session'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'

export const ironSessionOptions: IronSessionOptions = {
  cookieName: 'MYSESSION',
  password: 'So9lI3sfo32df5slSD833Aqwlka3LKDdk9dklfa25AS' 
}

export default (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
  return withIronSessionApiRoute(handler, ironSessionOptions)
}