import { createPagesServerClient } from "@/lib/supabase/pager-server"
import { Publication } from "@/lib/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function trial(req: NextApiRequest, res: NextApiResponse) {
  const { id } = await req.body

  console.log(id)

  try {

    const supabase = createPagesServerClient(req, res);

    const { data, error } = await supabase
      .from('publications')
      .select(`
    *,
    publication_authors!inner(*),
    users!inner(*),
    publication_award_applications(*)
  `)
      .eq(`users.id`, `${id}`)
    // Add filter after fetching (before mapping):

    const newdata = data?.filter(p => !p.publication_award_applications?.length)

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const formatted: Publication[] = newdata!.map((r: any) => ({
      type: r.type,
      publication_id: r.publication_id,
      users: r.users,
      title: r.title,
      date_published: r.date_published,
      journal_name: r.journal_name,
      volume_number: r.volume_number,
      page_numbers: r.page_numbers,
      publisher: r.publisher,
      issue_number: r.issue_number,
      publication_status: r.publication_status,
    }))

    return res.status(200).json(newdata);

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
