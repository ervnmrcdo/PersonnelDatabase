import sql from "@/config/db";
import { createPagesServerClient } from "@/lib/supabase/pager-server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function PendingAwards(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {

    const supabase = createPagesServerClient(req, res);

    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        authors:users!submitter_id(*),
        awards:awards!award_id(*)
        
       `)
      .eq('status', 'PENDING')


    if (error) {
      return res.status(400).json({ message: `Internal server error: ${error}` })
    }


    const formatted = data.map((r: any) => ({
      id: r.submission_id,
      name: `${r.authors.first_name} ${r.authors.last_name}`,
      dateSubmitted: r.date_submitted,
      status: r.status,
      awardId: r.awards.award_id,
      pdfBase64: r.attached_files
        ? Buffer.from(r.attached_files).toString("base64")
        : null,
      awardTitle: r.awards.title,
      logs: r.logs,
    }));



    return res.status(200).json(formatted);

  } catch (error) {
    console.error("Error fetching pending awards:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
