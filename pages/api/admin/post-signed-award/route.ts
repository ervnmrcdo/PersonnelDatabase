import sql from "@/config/db"
import { NextApiRequest, NextApiResponse } from "next"
import { createPagesServerClient } from "@/lib/supabase/pager-server"
import { createServiceRoleClient } from "@/lib/supabase/service-role"

export default async function ValidateAward(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = await req.body;
	const { admin_id, submission_id, newLogs, form41Url, form42Url, form43Url, form44Url } = data

	try {
		const supabase = createPagesServerClient(req, res);
		const supabaseAdmin = createServiceRoleClient();

		const formPaths: Record<string, { url: string | undefined; bucket: string; path: string }> = {};

		if (form41Url) {
			const form41Response = await fetch(form41Url);
			const form41Buffer = Buffer.from(await form41Response.arrayBuffer());
			const fileName = `${submission_id}-form41.pdf`;
			const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
				.from('submissions-pdf')
				.upload(fileName, form41Buffer, {
					contentType: 'application/pdf',
					upsert: true
				});
			if (uploadError) {
				return res.status(400).json({ error: 'Failed to upload form 4.1: ' + uploadError.message });
			}
			formPaths['form41'] = { url: form41Url, bucket: 'submissions-pdf', path: uploadData.path };
		}

		if (form44Url) {
			const form44Response = await fetch(form44Url);
			const form44Buffer = Buffer.from(await form44Response.arrayBuffer());
			const fileName = `${submission_id}-form44.pdf`;
			const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
				.from('submissions-pdf')
				.upload(fileName, form44Buffer, {
					contentType: 'application/pdf',
					upsert: true
				});
			if (uploadError) {
				return res.status(400).json({ error: 'Failed to upload form 4.4: ' + uploadError.message });
			}
			formPaths['form44'] = { url: form44Url, bucket: 'submissions-pdf', path: uploadData.path };
		}

		if (form42Url) {
			const form42Response = await fetch(form42Url);
			const form42Buffer = Buffer.from(await form42Response.arrayBuffer());
			const fileName = `${submission_id}-form42.docx`;
			const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
				.from('submissions-docx')
				.upload(fileName, form42Buffer, {
					contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					upsert: true
				});
			if (uploadError) {
				return res.status(400).json({ error: 'Failed to upload form 4.2: ' + uploadError.message });
			}
			formPaths['form42'] = { url: form42Url, bucket: 'submissions-docx', path: uploadData.path };
		}

		if (form43Url) {
			const form43Response = await fetch(form43Url);
			const form43Buffer = Buffer.from(await form43Response.arrayBuffer());
			const fileName = `${submission_id}-form43.docx`;
			const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
				.from('submissions-docx')
				.upload(fileName, form43Buffer, {
					contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					upsert: true
				});
			if (uploadError) {
				return res.status(400).json({ error: 'Failed to upload form 4.3: ' + uploadError.message });
			}
			formPaths['form43'] = { url: form43Url, bucket: 'submissions-docx', path: uploadData.path };
		}

		const updateData: Record<string, any> = {
			status: 'VALIDATED',
			reviewed_by_admin_id: admin_id,
			logs: newLogs
		};

		if (formPaths['form41']) updateData.form41_path = formPaths['form41'].path;
		if (formPaths['form44']) updateData.form44_path = formPaths['form44'].path;
		if (formPaths['form42']) updateData.form42_path = formPaths['form42'].path;
		if (formPaths['form43']) updateData.form43_path = formPaths['form43'].path;

		const { data: updateResult, error: updateError } = await supabase
			.from('submissions')
			.update(updateData)
			.eq('submission_id', submission_id)
			.eq('status', 'PENDING')
			.select();

		if (updateError) {
			return res.status(400).json({ error: updateError.message });
		}

		const pdfFiles = [
			`drafts/${admin_id}/${submission_id}/form41.pdf`,
			`drafts/${admin_id}/${submission_id}/form44.pdf`
		];
		const docxFiles = [
			`drafts/${admin_id}/${submission_id}/form42.docx`,
			`drafts/${admin_id}/${submission_id}/form43.docx`
		];

		await supabaseAdmin.storage.from("drafts-pdf").remove(pdfFiles);
		await supabaseAdmin.storage.from("drafts-docx").remove(docxFiles);

		return res.status(200).json(updateResult);

	} catch (err) {
		console.log("Error sending signed award", err)
		return res.status(500).json(`Error submitting award', ${err}`)

	}
}
