import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/config/db";
import { createPagesServerClient } from "@/lib/supabase/pager-server";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
    const payload = JSON.parse(await req.body);
    const {
      ipaData,
      buffer,
      submission_id,
      newLogs
    } = payload;


    const foo = Buffer.from(buffer)
    const supabase = createPagesServerClient(req, res);

    // Upload new PDF to Supabase Storage bucket
    const fileName = `${submission_id}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('submissions-documents')
      .upload(fileName, foo, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (uploadError) {
      return res.status(400).json({ error: uploadError.message });
    }

    // Update with new file path
    const { data, error } = await supabase
      .from('submissions')
      .update({
        attached_file_path: uploadData.path,
        pdf_json_data: JSON.stringify(ipaData),
        status: 'PENDING',
        logs: newLogs
      })
      .eq('submission_id', submission_id)
      .eq('status', 'RETURNED')
      .select()

    // === OLD CODE (commented out) ===
    // const { data, error } = await supabase
    //   .from('submissions')
    //   .update({
    //     attached_files: foo,
    //     pdf_json_data: JSON.stringify(ipaData),
    //     status: 'PENDING',
    //     logs: newLogs
    //   })
    //   .eq('submission_id', submission_id)
    //   .eq('status', 'RETURNED')
    //   .select()

    // const foo = Buffer.from(buffer)
    // const supabase = createPagesServerClient(req, res);

    // const { data, error } = await supabase
    //   .from('submissions')
    //   .update({
    //     attached_files: foo,
    //     pdf_json_data: JSON.stringify(ipaData),
    //     status: 'PENDING',
    //     logs: newLogs
    //   })
    //   .eq('submission_id', submission_id)
    //   .eq('status', 'RETURNED')
    //   .select()

    // const result = await sql`
    //  	UPDATE 
    //       pendingawards
    //  	SET 
    //       attached_files = ${foo}, pdf_json_data = ${JSON.stringify(ipaData)}, status = 'PENDING',
    //       reviewed_by_admin_id = ${admin_id}, logs = ${JSON.stringify(newLogs)}
    //  	WHERE 
    //       submission_id = ${submission_id} AND status = 'RETURNED'
    //     RETURNING *;
    //   `;
    // === END OLD CODE ===

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json(`Internal Server Error, ${err}`);
  }
}
