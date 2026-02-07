import { NextApiRequest, NextApiResponse } from 'next'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import path from 'path'

export default async function(
	req: NextApiRequest, res: NextApiResponse
) {
	try {
		// body here should receive the pdf in bytes
		const data = await req.body

		const templatePath = path.join(process.cwd(), 'public/ipc-template.pdf')
		const signaturePath = path.join(process.cwd(), 'public/signature.png')
		const temp = fs.readFileSync(templatePath)
		const pdf = await PDFDocument.load(temp);

		const signature = await pdf.embedPng(fs.readFileSync(signaturePath))

		const lastPage = pdf.getPages()[pdf.getPages().length - 1]
		const height = lastPage.getSize().height

		lastPage.drawImage(signature, {
			x: 230,
			y: 680,
			width: 300,
			height: 300,
		})

		const pdfInBytes = await pdf.save()

		return res.status(200).send(Buffer.from(pdfInBytes));

	} catch (err) {
		return res.status(500).json(`Internal Server error: ${err}`)
	}
}
