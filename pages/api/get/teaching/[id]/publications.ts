import { NextApiRequest, NextApiResponse } from "next";

export default async function getData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    return res.status(200).json(req.query);
  } catch (e) {
    return res;
  }
}
