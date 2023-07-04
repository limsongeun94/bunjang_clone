import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@/interface'
import withIronSession from '@/libs/session'

const userDB: Record<string, User> = {
  'seoly0173@naver.com': {
    id: 1000,
    email: 'seoly0173@naver.com',
    password: 'qwer123!',
    name: '김영서'
  },
  'coco@naver.com': {
    id: 1001,
    email: 'coco@naver.com',
    password: 'qwer123!',
    name: '임송은'
  }
}
Object.freeze(userDB)

// endpoint: /api/login
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method == 'POST') {
    const { email, password }: {email: string, password: string } = req.body

    const user = userDB[email]

    if (user.password == password) {
      delete user.password
      req.session.user = user

      await req.session.save()
    
      res.redirect("/")
      return
    }
  }

  res.redirect("/error")
};

export default withIronSession(handler)