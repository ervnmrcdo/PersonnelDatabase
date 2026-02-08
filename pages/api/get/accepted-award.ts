import sql from '@/config/db'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function RetrieveAcceptedForms(
  req: NextApiRequest, res: NextApiResponse
) {
  const { id, submitterType } = req.body
  console.log(id, submitterType)

  try {

    if (submitterType === 'NONTEACHING') {
      const result = await sql`
        SELECT * FROM PendingAwards pa INNER JOIN NonTeachingPersonnel ntp
        ON pa.submitter_nonteaching_id = ntp.nonteaching_id
        WHERE submitter_nonteaching_id = ${id} AND status = 'ACCEPTED'
      `
      return res.status(200).json(result)
    } else if (submitterType === 'TEACHING') {
      const result = await sql`
        SELECT * FROM PendingAwards pa INNER JOIN TeachingPersonnel tp
        ON pa.submitter_nonteaching_id = tp.nonteaching_id
        WHERE submitter_nonteaching_id = ${id} AND status = 'ACCEPTED'
      `
      return res.status(200).json(result)
    }


  } catch (err) {
    return res.status(500).json(`Internal Server error: ${err}`)
  }

}
