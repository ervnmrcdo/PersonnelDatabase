import sql from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { admin_id, submission_id, pdfBytes } = await req.json();
    
    // Convert pdfBytes to Buffer
    const pdf = Buffer.from(pdfBytes);

    const result = await sql`
      UPDATE pendingawards
      SET attached_files = ${pdf}, 
          status = 'VALIDATED', 
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
    console.error("Error accepting award:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Error accepting award: ${errorMessage}` },
      { status: 500 }
    );
  }
}