import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/config/db";
import { SubmissionLog } from "@/lib/types";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
    const data = JSON.parse(await req.body);
    const {
      ipaData,
      buffer,
    } = data;

    const foo = Buffer.from(buffer)

    const initialLog: SubmissionLog[] = [
      {
        action: 'SUBMITTED',
        remarks: '',
        date: Date().toLocaleString(),
      }
    ]

    const teachingId = null;
    const nonTeachingId = 1;

    const result = await sql`
        INSERT INTO PendingAwards 
          (submitter_type, submitter_teaching_id, submitter_nonteaching_id, award_id, attached_files, status, date_submitted, pdf_json_data, logs)
        VALUES 
          ( ${"NONTEACHING"}, ${teachingId}, ${nonTeachingId}, 1, ${foo}, 'PENDING', CURRENT_DATE, ${JSON.stringify(ipaData)}, ${JSON.stringify(initialLog)})
        RETURNING *;
      `;

    return res.status(200).json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json(`Internal Server Error, ${err}`);
  }
}
