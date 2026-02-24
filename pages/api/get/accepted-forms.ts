import sql from '@/config/db'
import { createPagesServerClient } from '@/lib/supabase/pager-server'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function RetrieveAcceptedForms(
  req: NextApiRequest, res: NextApiResponse
) {
  // const { id, submitterType } = req.body // more correct need to fix later
  const { id, submitterType } = JSON.parse(req.body)

  try {
    const supabase = createPagesServerClient(req, res);
    
    // NEW: Use Supabase to query submissions with status VALIDATED
    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        authors:users!submitter_id(*),
        awards:awards!award_id(*)
      `)
      .eq('submitter_id', id)
      .eq('status', 'VALIDATED');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Add signed URL for each submission
    const dataWithUrls = data 
      ? await Promise.all(
          data.map(async (r: any) => {
            let pdfUrl = null;
            
            // NEW: Get signed URL from Supabase Storage
            if (r.attached_file_path) {
              const { data: signedUrlData } = await supabase.storage
                .from('submissions-documents')
                .createSignedUrl(r.attached_file_path, 3600); // 1 hour expiry
              
              pdfUrl = signedUrlData?.signedUrl || null;
            }

            return {
              submission_id: r.submission_id,
              first_name: r.authors?.first_name,
              last_name: r.authors?.last_name,
              date_submitted: r.date_submitted,
              title: r.awards?.title,
              logs: r.logs,
              pdfUrl,
              attached_files: r.attached_files, // Keep for backward compatibility
            };
          })
        )
      : [];

    // === OLD CODE (commented out) ===
    // if (submitterType === 'NONTEACHING') {
    //   const result = await sql`
    //     SELECT * FROM PendingAwards pa INNER JOIN NonTeachingPersonnel ntp
    //     ON pa.submitter_nonteaching_id = ntp.nonteaching_id INNER JOIN 
    //     Awards a ON pa.award_id = a.award_id
    //     WHERE submitter_nonteaching_id = ${id} AND status = 'VALIDATED'
    //   `
    //   return res.status(200).json(result)
    // } else if (submitterType === 'TEACHING') {
    //   const result = await sql`
    //     SELECT * FROM PendingAwards pa INNER JOIN TeachingPersonnel tp
    //     ON pa.submitter_teaching_id = tp.nonteaching_id INNER JOIN 
    //     Awards a ON pa.award_id = a.award_id
    //     WHERE submitter_teaching_id = ${id} AND status = 'VALIDATED'
    //   `
    //   return res.status(200).json(result)
    // }
    // === END OLD CODE ===

    return res.status(200).json(dataWithUrls);


  } catch (err) {
    return res.status(500).json(`Internal Server error: ${err}`)
  }

}
