import sql from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { title } from "process";

export default async function PendingAwards(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const rows = await sql`
      SELECT 
        pa.submission_id,
        pa.submitter_type,
        pa.date_submitted,
        pa.status,
        pa.award_id,
        pa.attached_files,
        COALESCE(ntp.first_name, tp.first_name) as first_name,
        COALESCE(ntp.last_name, tp.last_name) as last_name,
        a.title
      FROM PendingAwards pa 
      LEFT JOIN NonTeachingPersonnel ntp ON pa.submitter_nonteaching_id = ntp.nonteaching_id
      LEFT JOIN TeachingPersonnel tp ON pa.submitter_teaching_id = tp.teaching_id
      LEFT JOIN Awards a ON pa.award_id = a.award_id;
    `;
    
    console.log('Pending awards query returned:', rows.length, 'rows');
    if (rows.length > 0) {
      console.log('Sample row:', rows[0]);
    }

    const formatted = rows.map((r) => ({
      name: `${r.first_name} ${r.last_name}`,
      id: r.submission_id,
      submitterType: r.submitter_type,
      dateSubmitted: r.date_submitted,
      status: r.status,
      awardId: r.award_id,
      pdfBase64: r.attached_files
        ? Buffer.from(r.attached_files).toString("base64")
        : null,
      awardTitle: r.title,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching pending awards:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
