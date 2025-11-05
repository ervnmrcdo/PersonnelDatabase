import sql from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function PendingAwards(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const rows = await sql`
      SELECT submission_id, submitter_type, date_submitted, status, award_id, attached_files
      FROM PendingAwards
      WHERE status = 'Pending';
    `;

    const formatted = rows.map((r) => ({
      id: r.submission_id,
      submitterType: r.submitter_type,
      dateSubmitted: r.date_submitted,
      status: r.status,
      awardId: r.award_id,
      pdfBase64: r.attached_files
        ? Buffer.from(r.attached_files).toString("base64")
        : null,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching pending awards:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
