import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

// endpoint: /api/product
export default async (req: NextApiRequest, res: NextApiResponse) => {

  const page = parseInt(req.query.page as string ?? 1)
  const size = parseInt(req.query.size as string ?? 100)
  
  const dist = path.join(process.cwd(), 'data')
  const data: Array<never> = JSON.parse(await fs.readFile(`${dist}/index_products.json`, 'utf8'))

  const ret = {
    page,
    size,
    list: data.slice((page - 1) * size, page * size),
  }

  res.status(200).json(ret);
};