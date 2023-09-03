import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.query as { id: string }

  const dist = path.join(process.cwd(), 'data')
  const data: Record<string, any> = JSON.parse(await fs.readFile(`${dist}/detail.json`, 'utf8'))
  //

  const ret = data[id];

  res.status(200).json(ret);
};
