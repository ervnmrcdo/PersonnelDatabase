import sql from "@/config/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function AcceptAward(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = await req.body;
	const { id, buffer } = data
	// const buffer = Buffer.from(pdfBytes)

	try {

		const post = await sql`
			UPDATE pendingawards
			SET attached_files = ${buffer}
			WHERE submission_id = ${id}
			`
		return res.status(200).json(post);


	} catch (err) {
		console.log("Error sending signed award", err)
		return res.status(500).json(`Error submitting award', ${err}`)

	}
}
