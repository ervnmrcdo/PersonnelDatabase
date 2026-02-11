import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/config/db";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
    const data = JSON.parse(await req.body);
    const {
      ipaData,
      buffer,
      submission_id
    } = data;

    const foo = Buffer.from(buffer)
    const admin_id = 1;

    const result = await sql`
     	UPDATE pendingawards
     	SET attached_files = ${foo}, pdf_json_data = ${JSON.stringify(ipaData)}, status = 'PENDING', reviewed_by_admin_id = ${admin_id}
     	WHERE submission_id = ${submission_id} AND status = 'RETURNED'
        RETURNING *;
      `;

    return res.status(200).json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json(`Internal Server Error, ${err}`);
  }
}
