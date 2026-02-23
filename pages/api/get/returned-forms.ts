import sql from '@/config/db'
import { createPagesServerClient } from '@/lib/supabase/pager-server'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function RetrieveReturnedForms(
  req: NextApiRequest, res: NextApiResponse
) {
  // const { id, submitterType } = await req.body // more correct need to fix later
  const { id } = JSON.parse(req.body)
  console.log(id)

  try {
    const supabase = createPagesServerClient(req, res);
    const { data, error } = await supabase.from('submissions')
      .select(`
          *,
          authors:users!submitter_id(*),
          awards:awards!award_id(*)
           `)
      .eq('submitter_id', id);

    console.log(data)

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }

  // const result = await sql`
  //     SELECT * FROM PendingAwards pa INNER JOIN NonTeachingPersonnel ntp
  //     ON pa.submitter_nonteaching_id = ntp.nonteaching_id INNER JOIN 
  //     Awards a ON pa.award_id = a.award_id
  //     WHERE submitter_nonteaching_id = ${id} AND status = 'RETURNED'
  //   `




}
