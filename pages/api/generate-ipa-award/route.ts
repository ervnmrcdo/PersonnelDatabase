import { IPAFormData } from "@/lib/types";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default async function generateIPAPDF(
  req: NextApiRequest, res: NextApiResponse
) {
  const { ipaData } = JSON.parse(await req.body)
  try {

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

    if (ipaData.author1Personnel) {
      page2.drawSquare({
        x: 56,
        y: height - 242,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1Faculty) {
      page2.drawSquare({
        x: 69,
        y: height - 254,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1ResearchFaculty) {
      page2.drawSquare({
        x: 69,
        y: height - 266,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1REPS) {
      page2.drawSquare({
        x: 69,
        y: height - 280,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1AdminStaff) {
      page2.drawSquare({
        x: 69,
        y: height - 293,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1UpAffiliated) {
      page2.drawSquare({
        x: 56,
        y: height - 317,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1Student) {
      page2.drawSquare({
        x: 68,
        y: height - 343,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1ProjectPersonnell) {
      page2.drawSquare({
        x: 68,
        y: height - 357,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1Permanent) {
      page2.drawSquare({
        x: 69,
        y: height - 407,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1Temporary) {
      page2.drawSquare({
        x: 69,
        y: height - 421,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1UpContractual) {
      page2.drawSquare({
        x: 69,
        y: height - 432,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    if (ipaData.author1NonUpContractual) {
      page2.drawSquare({
        x: 69,
        y: height - 445,
        size: 8,
        color: rgb(0, 0, 0),
      })
    }

    page2.drawText(ipaData.author1EmailAddress || "", {
      x: 150,
      y: height - 470,
      size: 11,
      font,
    });

    const pdfBytes = await pdfDoc.save();

    return res.status(200).send(Buffer.from(pdfBytes))

  } catch (err) {
    return res.status(500).json(`Internal Server error: ${err}`)
  }

}
