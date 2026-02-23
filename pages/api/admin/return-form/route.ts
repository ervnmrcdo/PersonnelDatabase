import { createPagesServerClient } from "@/lib/supabase/pager-server"
import { NextApiRequest, NextApiResponse } from "next"

export default async function ReturnAward(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = await req.body;
	const { admin_id, submission_id, remarks, logs } = JSON.parse(data)
	console.log(admin_id, submission_id, remarks, logs)

	try {
		const supabase = createPagesServerClient(req, res);

		const { data, error } = await supabase
			.from('submissions')
			.update({
				status: 'RETURNED',
				reviewed_by_admin_id: admin_id,
				remarks: remarks,
				logs: JSON.stringify(logs)
			})
			.eq('submission_id', submission_id)
			.eq('status', 'PENDING')
			.select()

		console.log(error)
		if (error) {
			return res.status(400).json({ message: error })
		}

		//
		// const post = await sql`
		// 	UPDATE pendingawards
		// 	SET status = 'RETURNED', reviewed_by_admin_id = ${admin_id}, remarks = ${remarks}, logs = ${JSON.stringify(logs)}
		// 	WHERE submission_id = ${submission_id} AND status = 'PENDING'
		// 	`
		return res.status(200).json(data);


	} catch (err) {
		console.log("Error sending signed award", err)
		return res.status(500).json(`Error submitting award', ${err}`)

	}
}
