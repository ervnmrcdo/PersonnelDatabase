import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest, res: NextApiResponse
): Promise<void> {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}

	const { formUrl } = req.query

	if (!formUrl) {
		return res.status(400).json({ error: 'formUrl is required' })
	}

	try {
		const response = await fetch(formUrl as string);
		if (!response.ok) {
			return res.status(404).json({ error: 'Failed to fetch file from URL' });
		}

		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
		res.setHeader('Content-Disposition', 'inline; filename="form.docx"');
		return res.send(buffer);

	} catch (err) {
		return res.status(500).json({ error: `Internal Server error: ${err}` })
	}
}
