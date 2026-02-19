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
        publication_authors(author_rank, publications(*, publication_authors(*, users(*))))
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
