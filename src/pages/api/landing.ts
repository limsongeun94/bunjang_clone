import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

// endpoint: /api/landing
export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  const dist = path.join(process.cwd(), 'data')
  const products: Array<never> = JSON.parse(await fs.readFile(`${dist}/index_products.json`, 'utf8')).slice(0,100)
  const categories = JSON.parse(await fs.readFile(`${dist}/categories.json`, 'utf8'))
  const ret = {
    banners: [
      {
        url: '/banners/bag_banner.jpg'
      },
      {
        url: '/banners/keyring_banner.jpg'
      },
      {
        url: '/banners/nuigurumi_banner.jpg'
      },
    ],
    products,
    categories
  }

  res.status(200).json(ret);
};
