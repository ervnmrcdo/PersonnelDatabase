import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/config/db";
import { IPAFormData } from "@/lib/types";

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

    //
    //
    // const pdfBytes = await fetch('/api/generate-ipa-award/route', {
    //   method: 'POST',
    //   body: JSON.stringify((ipaData)),
    // })

    // console.log(ipaData)
    // console.log(Buffer.from(buffer))
    // console.log(buffer)
    const foo = Buffer.from(buffer)


    const teachingId = null;
    const nonTeachingId = 1;

    const result = await sql`
        INSERT INTO PendingAwards 
          (submitter_type, submitter_teaching_id, submitter_nonteaching_id, award_id, attached_files, status, date_submitted, pdf_json_data)
        VALUES 
          ( ${"NONTEACHING"}, ${teachingId}, ${nonTeachingId}, 1, ${foo}, 'PENDING', CURRENT_DATE, ${JSON.stringify(ipaData)})
        RETURNING *;
      `;



    // const buffer = pdfBytes.body;
    // console.log(buffer)
    // const teachingId = null;
    // const nonTeachingId = 1;
    //
    // const result = await sql`
    //     INSERT INTO PendingAwards 
    //       (submitter_type, submitter_teaching_id, submitter_nonteaching_id, award_id, attached_files, status, date_submitted, pdf_json_data)
    //     VALUES 
    //       ( ${"NONTEACHING"}, ${teachingId}, ${nonTeachingId}, 1, ${buffer}, 'PENDING', CURRENT_DATE, ${JSON.stringify(ipaData)})
    //     RETURNING *;
    //   `;
    //
    // return res.status(200);
    return res.status(200).json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json(`Internal Server Error, ${err}`);
  }
}
