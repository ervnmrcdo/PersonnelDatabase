import sql from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getPublications(
  req: NextApiRequest, res: NextApiResponse,
) {
  const { id, submitterType } = req.body

  try {
    const result = await sql`
      SELECT * FROM nonteachingpersonnel ntp 
      INNER JOIN publicationauthors pa ON ntp.nonteaching_id = pa.author_nonteaching_id
      INNER JOIN publications p ON pa.author_nonteaching_id = p.publication_id
      WHERE ntp.nonteaching_id = ${id};
    `
    const formatted = result.map((r) => ({
      name: `${r.first_name} ${r.last_name}`,
      id: r.submission_id,
      submitterType: r.submitter_type,
      dateSubmitted: r.date_submitted,
      status: r.status,
      awardId: r.award_id,
      awardTitle: r.title,
    }))
    return res.status(200).json(result)

  } catch (err) {
    return res.status(500).json(`Internal Server Error: ${err}`)
  }
}
