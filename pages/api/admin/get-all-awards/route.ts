import { createPagesServerClient } from "@/lib/supabase/pager-server";
import { NextApiRequest, NextApiResponse } from "next";

interface SubmissionRow {
	submission_id: number;
	date_submitted: string;
	status: string;
	attached_files: Buffer | null;
	users: { first_name: string; last_name: string }[];
	awards: { award_id: number; title: string }[];
}

export default async function RetrieveAllAwards(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const supabase = createPagesServerClient(req, res);

	//TODO: make sure to check user calling has admin role through useAuth maybe

	try {
		const { data, error } = await supabase
			.from('submissions')
			.select(`
				submission_id, date_submitted, status, attached_files,
				users!submitter_id!inner(first_name, last_name),
				awards!inner(award_id, title)
			`);

		if (error) {
			return res.status(400).json({ error: error.message });
		}

		const formatted = data.map((r: SubmissionRow) => ({
			first_name: `${r.users[0].first_name} `,
			last_name: `${r.users[0].last_name}`,
			id: r.submission_id,
			dateSubmitted: r.date_submitted,
			status: r.status,
			awardId: r.awards[0].award_id,
			pdfBase64: r.attached_files
				? Buffer.from(r.attached_files).toString("base64")
				: null,
			awardTitle: r.awards[0].title,
		}));


		return res.status(200).json(formatted);
	} catch (error) {
		console.error("Error fetching pending awards:", error);
		return res.status(500).json({ error: "Failed to fetch" });
	}
}
