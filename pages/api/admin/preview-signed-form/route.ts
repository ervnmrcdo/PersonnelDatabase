import { NextApiRequest, NextApiResponse } from 'next'
import { PDFDocument } from 'pdf-lib'
import { createPagesServerClient } from '@/lib/supabase/pager-server'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

export default async function(
	req: NextApiRequest, res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}

	const { pdfUrl, admin_id } = req.query

	if (!pdfUrl) {
		return res.status(400).json({ error: 'pdfUrl is required' })
	}

	if (!admin_id) {
		return res.status(400).json({ error: 'admin_id is required' })
	}

	try {
		const supabase = createServiceRoleClient();

		const response = await fetch(pdfUrl);
		if (!response.ok) {
			return res.status(404).json({ error: 'Failed to fetch PDF from URL' });
		}

		const arrayBuffer = await response.arrayBuffer();
		const pdfToSign = Buffer.from(arrayBuffer).toString('base64');

		const { data, error } = await supabase
			.from('users')
			.select('first_name, middle_name, last_name, signature_path')
			.eq('id', admin_id)
			.single()

		if (error || !data) {
			return res.status(404).json({ error: 'Admin user not found or has no signature' })
		}

		if (!data.signature_path) {
			return res.status(404).json({ error: 'Admin has no signature uploaded' })
		}

		const { data: signatureData, error: downloadError } = await supabase
			.storage
			.from('signatures')
			.download(data.signature_path)

		if (downloadError || !signatureData) {
			return res.status(500).json({ error: 'Failed to download signature' })
		}

		const signatureBuffer = await signatureData.arrayBuffer()
		const pdf = await PDFDocument.load(pdfToSign);
		const signature = await pdf.embedPng(Buffer.from(signatureBuffer))
		const signatureDims = signature.scale(0.1)

		const lastPage = pdf.getPages()[pdf.getPages().length - 1]
		const height = lastPage.getSize().height
		const fullName = data.first_name + ' ' + data.middle_name + ' ' + data.last_name

		lastPage.drawImage(signature, {
			x: 250,
			y: 680,
			height: signatureDims.height,
			width: signatureDims.width,
		})

		lastPage.drawText(fullName, {
			x: 250,
			y: 680,
			size: 10,
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

		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', 'inline; filename="preview-signed-form.pdf"');
		return res.send(Buffer.from(pdfInBytes));

	} catch (err) {
		console.log(err)
		return res.status(500).json({ error: `Internal Server error: ${err}` })
	}
}
