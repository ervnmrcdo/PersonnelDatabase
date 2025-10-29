import sql from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function reviewData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const foo = await sql`SELECT * FROM position`;

    return res.status(200).json(foo);
  } catch (e) {
    return res.status(500).json(`Internal Server Error, ${e}`);
  }
}
