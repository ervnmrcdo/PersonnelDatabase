import sql from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function trial(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await sql`SELECT * FROM  awards`;

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json("Internal Server Error");
  }
}
