import sql from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleSubmit(data: any) {
  try {
    console.log('ello')
    // if (req.method !== "POST") {
    //   return res.status(405).send("Method Not Allowed");
    // }
    // const data = await req.body;
    // const {
    //   ipaData,
    //   shouldSubmit,
    // } = data;
    //
    // const pdfBytes = await fetch('/api/generate-ipa-award/route', {
    //   method: 'POST',
    //   body: JSON.stringify((ipaData)),
    // })

    const pdf = await fetch('/api/generate-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(data)
    })

    const foo = await pdf.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(foo))
    const { ipaData } = data

    // console.log(buffer)
    // console.log(ipaData)

    const payload = {
      ipaData,
      buffer
    }

    const temp = await fetch('/api/post-ipa-award/route', {
      method: "POST",
      body: JSON.stringify(payload)
    })



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
    // return result
    // return res.status(200).json(result);
    // return res.status(200).;

  } catch (err) {
    console.error(err);
    // return res.status(500).json(`Internal Server Error, ${err}`);
  }
}
