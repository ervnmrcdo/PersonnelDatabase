import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/config/db";
import { SubmissionLog } from "@/lib/types";
import { createPagesServerClient } from "@/lib/supabase/pager-server";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
    const payload = JSON.parse(await req.body);
    const {
      submitter_id,
      award_id,
      publication_id,
      ipaData,
      buffer,
    } = payload;


    const foo = Buffer.from(buffer)

    const initialLog: SubmissionLog[] = [
      {
        action: 'SUBMITTED',
        remarks: '',
        date: Date().toLocaleString(),
      }
    ]

    const supabase = createPagesServerClient(req, res);

    const { data, error } = await supabase
      .from('submissions')
      .insert([
        {
          submitter_id: submitter_id,
          award_id: award_id,
          publication_id: publication_id,
          attached_files: foo,
          status: 'PENDING',
          pdf_json_data: ipaData,
          logs: initialLog,
        }
      ])
      .select();
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const submission_id = data[0].submission_id;
    const { error: appError } = await supabase
      .from('publication_award_applications')
      .insert([
        {
          publication_id: publication_id,
          award_id: award_id,
          submission_id: submission_id,
        }
      ]);
    if (appError) {
      if (appError.code === '23505') {
        return res.status(409).json({
          error: 'This publication has already been applied for this award'
        });
      }
      return res.status(400).json({ error: appError.message });
    }
    return res.status(200).json(data);


  } catch (err) {
    console.error(err);
    return res.status(500).json(`Internal Server Error, ${err}`);
  }
}
