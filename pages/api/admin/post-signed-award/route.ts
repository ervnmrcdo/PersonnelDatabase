import sql from "@/config/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function AcceptAward(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = await req.body;
	const { admin_id, submission_id, pdfBytes } = data

	try {

		const post = await sql`
			UPDATE pendingawards
			SET attached_files = ${pdfBytes}, status = 'ACCEPTED', 
				reviewed_by_admin_id = ${admin_id},
			WHERE submission_id = ${submission_id} and status = 'PENDING'
			`
		return res.status(200).json(post);


	} catch (err) {
		console.log("Error sending signed award", err)
		return res.status(500).json(`Error submitting award', ${err}`)

	}
}
