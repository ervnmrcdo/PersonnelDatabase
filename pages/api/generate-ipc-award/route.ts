import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await req.body;
    const {
      applicantName,
      awardType,
      publicationTitle,
      publicationDate,
      description,
    } = data;

    const templatePath = path.join(process.cwd(), "public/ipc-template.pdf");
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);

    // Get the first page of the PDF
    const pages = pdfDoc.getPages();
    const page = pages[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize();

    // 🖋️ Write text at specific coordinates (you’ll tweak these values)
    page.drawText(applicantName || "", {
      x: 180,
      y: height - 220,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText(awardType || "", { x: 180, y: height - 260, size: 11, font });
    page.drawText(publicationTitle || "", {
      x: 180,
      y: height - 300,
      size: 11,
      font,
    });
    page.drawText(publicationDate || "", {
      x: 180,
      y: height - 340,
      size: 11,
      font,
    });
    page.drawText(description || "", {
      x: 180,
      y: height - 380,
      size: 10,
      font,
    });

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
