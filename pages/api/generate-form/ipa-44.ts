import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { createPagesServerClient } from '@/lib/supabase/pager-server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { publicationId, awardId, user_id } = req.query;

  if (!publicationId) {
    return res.status(400).json({ message: 'publicationId is required' });
  }

  if (!user_id) {
    return res.status(400).json({ message: 'user_id is required' });
  }

  const awardIdNum = Number(awardId);
  if (!awardId || awardIdNum !== 2) {
    return res.status(400).json({ message: 'awardId must be 2 for form 4.4' });
  }

  try {
    const supabase = createPagesServerClient(req, res);

    const { data: existingDraft } = await supabase
      .from('draft_applications')
      .select('form44_path')
      .eq('user_id', user_id)
      .eq('publication_id', Number(publicationId))
      .eq('award_id', awardIdNum)
      .single();

    if (existingDraft?.form44_path) {
      const { data: urlData } = await supabase.storage
        .from('drafts-pdf')
        .createSignedUrl(existingDraft.form44_path, 3600);

      if (urlData?.signedUrl) {
        return res.redirect(urlData.signedUrl);
      }
    }

    const filePath = path.join(process.cwd(), 'public', '4.4-template.pdf');
    const buffer = fs.readFileSync(filePath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="4.4-template.pdf"');
    return res.send(buffer);

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
}
