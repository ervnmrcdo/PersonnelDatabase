import { NextApiRequest, NextApiResponse } from 'next'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import path from 'path'
import { createPagesServerClient } from '@/lib/supabase/pager-server'

export default async function(
	req: NextApiRequest, res: NextApiResponse
) {

	const { pdfBase64, admin_id } = await req.body
	try {
		// body here should receive the pdf in bytes


		const supabase = createPagesServerClient(req, res);


		const { data, error, status } = await supabase
			.from('users')
			.select(`signature_path`)
			.eq('id', admin_id)
			.single()


		if (data === null) {
			return res.status(500).json({ message: 'No Uploaded Signature' })
		}

		const { data: signatureData, error: downloadError } = await supabase
			.storage
			.from('signatures')
			.download(data.signature_path)
		if (downloadError || !signatureData) {
			return res.status(500).json({ message: 'Failed to download signature' })
		}

		// Convert to buffer
		const signatureBuffer = await signatureData.arrayBuffer()

		// Embed the signature PNG
		const pdf = await PDFDocument.load(pdfBase64);
		const signature = await pdf.embedPng(Buffer.from(signatureBuffer))
		const signatureDims = signature.scale(0.1)


		const lastPage = pdf.getPages()[pdf.getPages().length - 1]
		const height = lastPage.getSize().height

		lastPage.drawImage(signature, {
			x: 230,
			y: 680,
			height: signatureDims.height,
			width: signatureDims.width,
		})

		lastPage.drawText(new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'Asia/Manila'
		}), {
			x: 85,
			y: height - 208,
			size: 10,
		})

		const pdfInBytes = await pdf.save()

		// return res.status(200).send(Buffer.from(pdfInBytes)) //temp fix to try downloading

		return res.status(200).json({ pdfInBytes: Buffer.from(pdfInBytes).toString('base64') }); //  correct

	} catch (err) {
		return res.status(500).json(`Internal Server error: ${err}`)
	}
}
