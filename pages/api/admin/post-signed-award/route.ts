import sql from "@/config/db"
import { NextApiRequest, NextApiResponse } from "next"
import { createPagesServerClient } from "@/lib/supabase/pager-server"

export default async function ValidateAward(
 	req: NextApiRequest,
 	res: NextApiResponse
 ) {
 	const data = await req.body;
 	const { admin_id, submission_id, pdfBytes, newLogs } = data
 	const pdf = Buffer.from(pdfBytes)
 	console.log(newLogs)
 	try {

		const supabase = createPagesServerClient(req, res);

		// Upload signed PDF to Supabase Storage bucket
		const fileName = `${submission_id}.pdf`;
		const { data: uploadData, error: uploadError } = await supabase.storage
			.from('submissions-documents')
			.upload(fileName, pdf, {
				contentType: 'application/pdf',
				upsert: true
			});

		if (uploadError) {
			return res.status(400).json({ error: uploadError.message });
		}

		// Update submission with new file path and status
		const { data: updateData, error: updateError } = await supabase
			.from('submissions')
			.update({
				attached_file_path: uploadData.path,
				status: 'VALIDATED',
				reviewed_by_admin_id: admin_id,
				logs: newLogs
			})
			.eq('submission_id', submission_id)
			.eq('status', 'PENDING')
			.select();

		if (updateError) {
			return res.status(400).json({ error: updateError.message });
		}

		// === OLD CODE (commented out) ===
		// const post = await sql`
		// 	UPDATE pendingawards
		// 	SET 
		// 		attached_files = ${pdf}, status = 'VALIDATED', reviewed_by_admin_id = ${admin_id}, logs = ${JSON.stringify(newLogs)}
		// 	WHERE submission_id = ${submission_id} AND status = 'PENDING'
		// 	`
		// return res.status(200).json(post);
		// === END OLD CODE ===

		return res.status(200).json(updateData);


 	} catch (err) {
 		console.log("Error sending signed award", err)
 		return res.status(500).json(`Error submitting award', ${err}`)

 	}
 }
