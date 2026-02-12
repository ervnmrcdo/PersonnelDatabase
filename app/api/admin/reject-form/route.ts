import sql from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { admin_id, submission_id } = await req.json();

    const result = await sql`
      UPDATE pendingawards
      SET status = 'RETURNED', 
          reviewed_by_admin_id = ${admin_id}
      WHERE submission_id = ${submission_id} 
        AND status = 'PENDING'
      RETURNING *;
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Submission not found or already processed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: result[0] 
    });

  } catch (err) {
    console.error("Error rejecting award:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Error rejecting award: ${errorMessage}` },
      { status: 500 }
    );
  }
}