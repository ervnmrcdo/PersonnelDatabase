import { createPagesServerClient } from "@/lib/supabase/pager-server"
import { NextApiRequest, NextApiResponse } from "next";

export default async function trial(req: NextApiRequest, res: NextApiResponse) {
  const { id } = await req.body

  console.log(id)

  try {

    const supabase = createPagesServerClient(req, res);

    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        publication_authors(author_rank, publications(*)) 
        `).eq(`user_id`, `${id}`);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data[0].publication_authors[0].publications);
    // return res.status(200).json(data);
  } catch (e) {
    // Casting e as Error to access the message safely
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return res.status(500).json({ error: `Server Error: ${errorMessage}` });
  }
}


// import sql from "@/config/db";
// import { NextApiRequest, NextApiResponse } from "next";
//
// export default async function getPublications(
//   req: NextApiRequest, res: NextApiResponse,
// ) {
//   const { id, submitterType } = req.body
//
//   try {
//     const result = await sql`
//       SELECT * FROM nonteachingpersonnel ntp 
//       INNER JOIN publicationauthors pa ON ntp.nonteaching_id = pa.author_nonteaching_id
//       INNER JOIN publications p ON pa.author_nonteaching_id = p.publication_id
//       WHERE ntp.nonteaching_id = ${id};
//     `
//     const formatted = result.map((r) => ({
//       name: `${r.first_name} ${r.last_name}`,
//       id: r.submission_id,
//       submitterType: r.submitter_type,
//       dateSubmitted: r.date_submitted,
//       status: r.status,
//       awardId: r.award_id,
//       awardTitle: r.title,
//     }))
//     return res.status(200).json(result)
//
//   } catch (err) {
//     return res.status(500).json(`Internal Server Error: ${err}`)
//   }
// }
