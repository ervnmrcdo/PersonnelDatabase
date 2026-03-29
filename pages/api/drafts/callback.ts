import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@/lib/supabase/pager-server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const supabase = createPagesServerClient(req, res);
    const supabaseAdmin = createServiceRoleClient();

    const { publicationId, awardId, formType, user_id } = req.query;
    const body = req.body;

    if (!publicationId || !awardId || !formType || !user_id) {
      return res
        .status(400)
        .json({ error: "publication_id, award_id, form_type, and user_id are required" });
    }

    if (body.status === 2 || body.status === 6) {
      const resp = await fetch(body.url);
      if (!resp.ok) return res.status(500).json({ message: 'Downloading the file failed.' });

      const arrayBuffer = await resp.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);

      const fileExt = formType === "41" || formType === "44" ? "pdf" : "docx";
      const bucket = fileExt === "pdf" ? "drafts-pdf" : "drafts-docx";

      const filePath = `drafts/${user_id}/${awardId}/${publicationId}/form${formType}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(filePath, fileBuffer, {
          contentType:
            fileExt === "pdf"
              ? "application/pdf"
              : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          upsert: true,
        });

      if (uploadError) {
        console.log(uploadError);
        return res.status(400).json({ error: uploadError.message });
      }

      return res
        .status(200)
        .json({ error: 0, message: "Draft saved successfully", path: uploadData.path });
    }
    return res.status(200).json({ error: 0 });
  } catch (err) {
    console.error("Error saving draft:", err);
    return res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
}
