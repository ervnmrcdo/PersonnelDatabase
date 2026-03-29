import { NextApiRequest, NextApiResponse } from "next";
import { SubmissionLog } from "@/lib/types";
import { createPagesServerClient } from "@/lib/supabase/pager-server";
import formidable from "formidable";
import fs from "fs";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const form = formidable({ maxFileSize: 50 * 1024 * 1024 });

    const [fields, files] = await form.parse(req);

    const submitter_id = Array.isArray(fields.submitter_id) ? fields.submitter_id[0] : fields.submitter_id || "";
    const award_id = Array.isArray(fields.award_id) ? fields.award_id[0] : fields.award_id || "";
    const publication_id = Array.isArray(fields.publication_id) ? fields.publication_id[0] : fields.publication_id || "";
    const actor_name = Array.isArray(fields.actor_name) ? fields.actor_name[0] : fields.actor_name || "";
    const ipaData = fields.ipaData ? JSON.parse(Array.isArray(fields.ipaData) ? fields.ipaData[0] : fields.ipaData) : {};

    const pdfFile = files.pdf?.[0];
    if (!pdfFile) {
      return res.status(400).json({ error: "PDF file is required" });
    }
    const pdfBuffer = fs.readFileSync(pdfFile.filepath);

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
      .from('submissions-pdf')
      .upload(fileName, pdfBuffer, {
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
    const docxPaths: { form42_path?: string; form43_path?: string } = {};
    let form44PdfPath: string | null = null;

    const form42File = files.form42?.[0];
    const form43File = files.form43?.[0];
    const form44File = files.form44?.[0];

    if (form42File) {
      const form42Buffer = fs.readFileSync(form42File.filepath);
      const form42FileName = `${submission_id}_form42.docx`;
      const { data: form42Upload, error: form42Error } = await supabase.storage
        .from('submissions-docx')
        .upload(form42FileName, form42Buffer, {
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          upsert: true
        });
      
      if (!form42Error && form42Upload) {
        docxPaths.form42_path = form42Upload.path;
      }
    }

    if (form43File) {
      const form43Buffer = fs.readFileSync(form43File.filepath);
      const form43FileName = `${submission_id}_form43.docx`;
      const { data: form43Upload, error: form43Error } = await supabase.storage
        .from('submissions-docx')
        .upload(form43FileName, form43Buffer, {
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          upsert: true
        });
      
      if (!form43Error && form43Upload) {
        docxPaths.form43_path = form43Upload.path;
      }
    }

    if (form44File) {
      const form44Buffer = fs.readFileSync(form44File.filepath);
      const form44FileName = `${submission_id}_form44.pdf`;
      const { data: form44Upload, error: form44Error } = await supabase.storage
        .from('submissions-pdf')
        .upload(form44FileName, form44Buffer, {
          contentType: 'application/pdf',
          upsert: true
        });
      
      if (!form44Error && form44Upload) {
        form44PdfPath = form44Upload.path;
      }
    }

    // Update submission with DOCX file paths if any
    const updateData: Record<string, string | null> = { ...docxPaths };
    if (form44PdfPath) {
      updateData.form44_path = form44PdfPath;
    }
    
    if (Object.keys(updateData).length > 0) {
      const { error: docxUpdateError } = await supabase
        .from('submissions')
        .update(updateData)
        .eq('submission_id', submission_id);

      if (docxUpdateError) {
        console.error('Failed to update file paths:', docxUpdateError);
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
