import sql from "@/config/db"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

export default async function AcceptAward(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = await req.body;
	const { id, pdfBytes } = data
	const buffer = Buffer.from(pdfBytes)

	try {

		const post = await sql`
			UPDATE pendingawards
			SET attached_files = ${buffer}
			WHERE submission_id = ${id}
			`
		return res.status(200).json(post);


	} catch (err) {
		console.log("Error sending signed award", err)
		return NextResponse.json({ error: "Failed submission" }, { status: 500 })

	}
}
