import { NextApiRequest, NextApiResponse } from "next";

export default async function trial(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json("hi");
  } catch (e) {
    res.status(500).json("Internal Server Error");
  }
}
