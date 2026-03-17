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
      form42,
      form43,
      form44,
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
      await supabase.from('submissions').delete().eq('submission_id', submission_id);
      return res.status(400).json({ error2: uploadError.message });
    }

    // Update submission with PDF file path
    const { error: updateError } = await supabase
      .from('submissions')
      .update({ attached_file_path: uploadData.path })
      .eq('submission_id', submission_id);

    if (updateError) {
      return res.status(400).json({ error3: updateError.message });
    }

    // Upload DOCX files if present
    const docxPaths: { form42_path?: string; form43_path?: string; form44_path?: string } = {};

    if (form42) {
      const form42Buffer = Buffer.from(await form42.arrayBuffer());
      const form42FileName = `${submission_id}_form42.docx`;
      const { data: form42Upload, error: form42Error } = await supabase.storage
        .from('submissions-documents')
        .upload(form42FileName, form42Buffer, {
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          upsert: true
        });
      
      if (!form42Error && form42Upload) {
        docxPaths.form42_path = form42Upload.path;
      }
    }

    if (form43) {
      const form43Buffer = Buffer.from(await form43.arrayBuffer());
      const form43FileName = `${submission_id}_form43.docx`;
      const { data: form43Upload, error: form43Error } = await supabase.storage
        .from('submissions-documents')
        .upload(form43FileName, form43Buffer, {
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          upsert: true
        });
      
      if (!form43Error && form43Upload) {
        docxPaths.form43_path = form43Upload.path;
      }
    }

    if (form44) {
      const form44Buffer = Buffer.from(await form44.arrayBuffer());
      const form44FileName = `${submission_id}_form44.docx`;
      const { data: form44Upload, error: form44Error } = await supabase.storage
        .from('submissions-documents')
        .upload(form44FileName, form44Buffer, {
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          upsert: true
        });
      
      if (!form44Error && form44Upload) {
        docxPaths.form44_path = form44Upload.path;
      }
    }

    // Update submission with DOCX file paths if any
    if (Object.keys(docxPaths).length > 0) {
      const { error: docxUpdateError } = await supabase
        .from('submissions')
        .update(docxPaths)
        .eq('submission_id', submission_id);

      if (docxUpdateError) {
        console.error('Failed to update DOCX paths:', docxUpdateError);
      }
    }

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
