import sql from "@/config/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function AcceptAward(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = await req.body;
	const { admin_id, submission_id, pdfBytes } = data
	const pdf = Buffer.from(pdfBytes)
	try {

		const post = await sql`
			UPDATE pendingawards
			SET attached_files = ${pdf}, status = 'PENDING', reviewed_by_admin_id = ${admin_id}
			WHERE submission_id = ${submission_id} AND status = 'ACCEPTED'
			`
		return res.status(200);


	} catch (err) {
		console.log("Error sending signed award", err)
		return res.status(500).json(`Error submitting award', ${err}`)

	}
}
