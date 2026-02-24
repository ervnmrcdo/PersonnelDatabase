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
      actor_name,
    } = payload;


    const foo = Buffer.from(buffer)

    const initialLog: SubmissionLog[] = [
      {
        action: 'SUBMITTED',
        remarks: '',
        date: Date().toLocaleString(),
        actor_name: actor_name || 'Unknown',
      }
    ]

    const supabase = createPagesServerClient(req, res);

    // Create submission first to get submission_id
    const { data: submissionData, error: submissionError } = await supabase
      .from('submissions')
      .insert([
        {
          submitter_id: submitter_id,
          award_id: award_id,
          publication_id: publication_id,
          // NEW: Upload to Supabase Storage bucket
          status: 'PENDING',
          pdf_json_data: ipaData,
          logs: initialLog,
        }
      ])
      .select();

    if (submissionError) {
      return res.status(400).json({ error1: submissionError.message });
    }

    const submission_id = submissionData[0].submission_id;

    // Upload PDF to Supabase Storage bucket
    const fileName = `${submission_id}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('submissions-documents')
      .upload(fileName, foo, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (uploadError) {
      // Rollback submission if upload fails
      await supabase.from('submissions').delete().eq('submission_id', submission_id);
      return res.status(400).json({ error2: uploadError.message });
    }

    // Update submission with file path
    const { error: updateError } = await supabase
      .from('submissions')
      .update({ attached_file_path: uploadData.path })
      .eq('submission_id', submission_id);

    if (updateError) {
      return res.status(400).json({ error3: updateError.message });
    }

    // === OLD CODE ( ===
    // constcommented out) { data, error } = await supabase
    //   .from('submissions')
    //   .insert([
    //     {
    //       submitter_id: submitter_id,
    //       award_id: award_id,
    //       publication_id: publication_id,
    //       attached_files: foo,
    //       status: 'PENDING',
    //       pdf_json_data: ipaData,
    //       logs: initialLog,
    //     }
    //   ])
    //   .select();
    // if (error) {
    //   return res.status(400).json({ error: error.message });
    // }
    // const submission_id = data[0].submission_id;
    // === END OLD CODE ===

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
    return res.status(200).json(submissionData);


  } catch (err) {
    console.error(err);
    return res.status(500).json(`Internal Server Error, ${err}`);
  }
}
