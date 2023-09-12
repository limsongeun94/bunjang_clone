import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
// import { data } from "./index_products";
// endpoint: /api/product
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const page = parseInt(req.query.page as string) || 1;
  const size = parseInt(req.query.size as string) || 50;

  const { category } = req.query as { category: string }

  const dist = path.join(process.cwd(), "data");
  let data: Array<never> = JSON.parse(
    await fs.readFile(`${dist}/products.json`, "utf8")
  )
  
  if (category) data = data.filter((x: any) => {
    return x.category_id == category
  })

  const ret = {
    page,
    size,
    list: data.slice((page - 1) * size, page * size),
    total: data.length,
    pages: (data.length / size) + (data.length % size ? 1 : 0),
  };

  res.status(200).json(ret);
};
