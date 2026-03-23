import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ONLYOFFICE usually makes a GET request to fetch the file
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 1. Path to your template in the public folder
    const filePath = path.join(process.cwd(), 'public', '4.1-template-new.pdf');
    const buffer = fs.readFileSync(filePath);

    // 2. Load the PDF and Get the Form
    const pdfDoc = await PDFDocument.load(buffer);
    const form = pdfDoc.getForm();

    // 3. Fill the fields (Using the keys you found in your previous log test)
    // Wrap in try-catch if you aren't sure a field exists to prevent 500 errors
    try {
      form.getTextField('article-title').setText('Ervin Mercado');
      form.getTextField('complete-citation').setText('UP Diliman - CS Project');

      // Example: If you have checkboxes or radio buttons
      // form.getCheckBox('check-box-name').check();
    } catch (fieldError) {
      console.warn("One or more fields were not found in the PDF:", fieldError);
    }

    // 4. Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    // 5. Set Headers so ONLYOFFICE knows it's a PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="filled-report.pdf"');

    // 6. Send the Buffer
    return res.send(Buffer.from(pdfBytes));

  } catch (error) {
    console.error("PDF Generation Error:", error);
    return res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
}
