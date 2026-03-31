import { NextApiRequest, NextApiResponse } from 'next';
import { createServiceRoleClient } from '@/lib/supabase/service-role';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { pdfUrl } = req.query;

  if (!pdfUrl) {
    return res.status(400).json({ error: 'pdfUrl is required' });
  }

  try {
    const pdfUrlString = Array.isArray(pdfUrl) ? pdfUrl[0] : pdfUrl;
    const response = await fetch(pdfUrlString);
    if (!response.ok) {
      return res.status(404).json({ error: 'Failed to fetch PDF from URL' });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="preview-form.pdf"');
    return res.send(buffer);

  } catch (err) {
    console.error('Error in preview-signed-form:', err);
    return res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
}
