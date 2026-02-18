import { createPagesServerClient } from "@/lib/supabase/pager-server"
import { NextApiRequest, NextApiResponse } from "next";

export default async function trial(req: NextApiRequest, res: NextApiResponse) {
  try {
    // This helper specifically takes 'req' and 'res' to handle cookies correctly
    const supabase = createPagesServerClient(req, res);

    const { data, error } = await supabase
      .from('publications')
      .select('*');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (e) {
    // Casting e as Error to access the message safely
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return res.status(500).json({ error: `Server Error: ${errorMessage}` });
  }
}
