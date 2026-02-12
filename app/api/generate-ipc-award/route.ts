import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      applicant,
      authors,
      selectedPublication,
      selectedAward,
      shouldSubmit,
      ipaData
    } = data;

    const templatePath = path.join(process.cwd(), "public/ipc-template.pdf");
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);

    // Get the pages of the PDF
    const pages = pdfDoc.getPages();
    const page0 = pages[0];
    const page1 = pages[1];
    const page2 = pages[2];
    const page4 = pages[4];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page0.getSize();


    // 🖋️ Write text at specific coordinates (you’ll tweak these values)
    page0.drawText(selectedPublication.title || "", {
      x: 130,
      y: height - 530,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    page0.drawText(applicant.applicantName || "", {
      x: 100,
      y: height - 625,
      size: 11,
      font,
    });
    page0.drawText(selectedPublication.journalName || "", {
      x: 100,
      y: height - 750,
      size: 11,
      font,
    });
    page1.drawText(selectedPublication.date || "", {
      x: 100,
      y: height - 233,
      size: 11,
      font,
    });
    page1.drawText(selectedPublication.publisher || "", {
      x: 100,
      y: height - 260,
      size: 11,
      font,
    });
    page2.drawText(applicant.applicantName || "", {
      x: 100,
      y: height - 110,
      size: 11,
      font,
    });
    page2.drawText(applicant.university || "", {
      x: 170,
      y: height - 135,
      size: 11,
      font,
    });
    page2.drawText(applicant.college || "", {
      x: 100,
      y: height - 155,
      size: 11,
      font,
    });
    page2.drawText(applicant.department || "", {
      x: 170,
      y: height - 175,
      size: 11,
      font,
    });
    page2.drawText(applicant.contact_no || "", {
      x: 430,
      y: height - 175,
      size: 11,
      font,
    });
    page2.drawText(applicant.position || "", {
      x: 150,
      y: height - 200,
      size: 11,
      font,
    });
    page2.drawText(applicant.emailAddress || "", {
      x: 150,
      y: height - 470,
      size: 11,
      font,
    });
    const pdfBytes = await pdfDoc.save();

    if (shouldSubmit) {
      const buffer = Buffer.from(pdfBytes);
      console.log(buffer)
      const teachingId = null;
      const nonTeachingId = 1;

      const jsonData = {
        applicant,
        authors,
        selectedPublication,
        selectedAward,
        ipaData,
        submittedAt: new Date().toISOString()
      };

      const result = await sql`
        INSERT INTO PendingAwards (
          submitter_type,
          submitter_teaching_id,
          submitter_nonteaching_id,
          award_id,
          attached_files,
          pdf_json_data,
          status,
          date_submitted
        )
        VALUES (
          ${"NONTEACHING"},
          ${teachingId},
          ${nonTeachingId},
          1,
          ${buffer},
          ${JSON.stringify(jsonData)},
          'PENDING',
          CURRENT_DATE
        )
        RETURNING *;
      `;
      console.log('INSERT result:', result);

      // Verify what was actually inserted
      const check = await sql`
        SELECT submission_id, status, date_submitted, submitter_type, award_id
        FROM PendingAwards 
        WHERE submission_id = ${result[0].submission_id};
      `;
      console.log('Verification query:', check);  

      // res.setHeader("Content-Type", "application/pdf");
      // res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
      return NextResponse.json({ success: true, data: result[0] });
    }

    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
    return new NextResponse(Buffer.from(pdfBytes), {
                headers: {
                  "Content-Type": "application/pdf",
                  "Content-Disposition": "attachment; filename=ipc-award-form.pdf",
                },
});
  } catch (err) {
    console.error(err);
    return NextResponse.json(
  { error: `Internal Server Error ${err}` },
  { status: 500 }
);
  }
}
