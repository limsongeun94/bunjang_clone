import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

interface FlatCategory {
  id: string;
  title: string;
}

// endpoint: /api/category_name
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dist = path.join(process.cwd(), "data");
  const categories: Array<FlatCategory> = JSON.parse(
    await fs.readFile(`${dist}/categories_flat.json`, "utf8")
  );

  const id = req.query["id"];
  const result = categories.find((x) => x.id == id);
  const ret = !!result ? result.title : null;

  res.status(200).json(ret);
};
