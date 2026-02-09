import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/config/db";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
    const data = await req.body;

    const {
      ipaData,
      shouldSubmit,
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
    page0.drawText(ipaData.articleTitle || "", {
      x: 130,
      y: height - 530,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });

    page0.drawText(ipaData.completeCitation || "", {
      x: 100,
      y: height - 570,
      size: 11,
      font,
    });

    page0.drawText(ipaData.author1NameLastFirst || "", {
      x: 100,
      y: height - 625,
      size: 11,
      font,
    });

    page0.drawText(ipaData.author1UniversityAndDept || "", {
      x: 303,
      y: height - 625,
      size: 11,
      font,
    });

    page0.drawText(ipaData.totalAuthorNumber || "", {
      x: 270,
      y: height - 720,
      size: 11,
      font,
    });

    page0.drawText(ipaData.journalName || "", {
      x: 100,
      y: height - 750,
      size: 11,
      font,
    });

    if (ipaData.WSCC) {
      page1.drawSquare({
        x: 55,
        y: height - 110,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.AHCI) {
      page1.drawSquare({
        x: 69,
        y: height - 123,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.SCIE) {
      page1.drawSquare({
        x: 69,
        y: height - 134,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.SSCI) {
      page1.drawSquare({
        x: 69,
        y: height - 147,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.CPCI) {
      page1.drawSquare({
        x: 69,
        y: height - 162,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.scopus) {
      page1.drawSquare({
        x: 55,
        y: height - 186,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    page1.drawText(ipaData.impactFactor || "", {
      x: 350,
      y: height - 198,
      size: 11,
      font,
    });

    page1.drawText(ipaData.impactFactorYear || "", {
      x: 415,
      y: height - 198,
      size: 11,
      font,
    });

    page1.drawText(ipaData.dateOfPublication || "", {
      x: 100,
      y: height - 233,
      size: 11,
      font,
    });

    page1.drawText(ipaData.publisherName || "", {
      x: 100,
      y: height - 260,
      size: 11,
      font,
    });

    if (ipaData.upSystemFunding) {
      page1.drawSquare({
        x: 55,
        y: height - 285,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.upCUGrant) {
      page1.drawSquare({
        x: 55,
        y: height - 297,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.dost) {
      page1.drawSquare({
        x: 55,
        y: height - 310,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.otherFunding) {
      page1.drawSquare({
        x: 55,
        y: height - 323,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    page1.drawText(ipaData.otherFundingSpecfics || "", {
      x: 170,
      y: height - 323,
      size: 11,
      font,
    });

    page2.drawText(ipaData.author1Name || "", {
      x: 100,
      y: height - 110,
      size: 11,
      font,
    });
    page2.drawText(ipaData.author1University || "", {
      x: 170,
      y: height - 135,
      size: 11,
      font,
    });

    page2.drawText(ipaData.author1College || "", {
      x: 100,
      y: height - 155,
      size: 11,
      font,
    });
    page2.drawText(ipaData.author1Department || "", {
      x: 170,
      y: height - 175,
      size: 11,
      font,
    });
    page2.drawText(ipaData.author1Contact || "", {
      x: 430,
      y: height - 175,
      size: 11,
      font,
    });
    page2.drawText(ipaData.author1Position || "", {
      x: 150,
      y: height - 200,
      size: 11,
      font,
    });



    // page2.drawText(applicant.emailAddress || "", {
    //   x: 150,
    //   y: height - 470,
    //   size: 11,
    //   font,
    // });

    const pdfBytes = await pdfDoc.save();

    if (shouldSubmit) {
      const buffer = Buffer.from(pdfBytes);
      console.log(buffer)
      const teachingId = null;
      const nonTeachingId = 1;

      const result = await sql`
        INSERT INTO PendingAwards (
          submitter_type,
          submitter_teaching_id,
          submitter_nonteaching_id,
          award_id,
          attached_files,
          status,
          date_submitted
        )
        VALUES (
          ${"NONTEACHING"},
          ${teachingId},
          ${nonTeachingId},
          1,
          ${buffer},
          'Pending',
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
      return res.status(200).json(result);
    }

    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
    return res.status(200).send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    return res.status(500).json(`Internal Server Error, ${err}`);
  }
}
