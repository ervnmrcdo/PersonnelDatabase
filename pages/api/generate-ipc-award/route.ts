import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { ApplicantData, Author, Publication, Award } from "@/lib/types";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
    const data = await req.body;
    console.log(data);

    const { applicant, authors, selectedPublication, selectedAward } = data;

    const templatePath = path.join(process.cwd(), "public/ipc-template.pdf");
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);

    // Get the first page of the PDF
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
    page2.drawText(applicant.emailAddress || "", {
      x: 150,
      y: height - 470,
      size: 11,
      font,
    });
    // page1.drawText(description || "", {
    //   x: 180,
    //   y: height - 380,
    //   size: 10,
    //   font,
    // });
    //
    // Save edited PDF
    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
    return res.status(200).send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json(`Internal Server Error, ${err}`);
  }
}
