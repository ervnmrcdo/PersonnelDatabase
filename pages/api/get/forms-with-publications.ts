import { createPagesServerClient } from "@/lib/supabase/pager-server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function func(req: NextApiRequest, res: NextApiResponse) {

  try {

    const supabase = createPagesServerClient(req, res);

    const { data, error } = await supabase
      .from('awards')
      .select(`
        *,
        publication_per_award!inner(*,...publication_type!id(*,publications!inner(*)))

        `)

    if (error) {
      console.log(error)
    }

    return res.status(200).json(data)

  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error: ${err}` })
  }

}
