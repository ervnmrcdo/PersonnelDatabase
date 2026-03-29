import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@/lib/supabase/pager-server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const supabase = createPagesServerClient(req, res);

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

      const { data: uploadData, error: uploadError } = await supabase.storage
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

      const { data: existingDraft } = await supabase
        .from("draft_applications")
        .select("*")
        .eq("user_id", user_id)
        .eq("publication_id", Number(publicationId))
        .eq("award_id", Number(awardId))
        .single();

      const updateData: Record<string, unknown> = {
        user_id: user_id as string,
        publication_id: Number(publicationId),
        award_id: Number(awardId),
        updated_at: new Date().toISOString(),
      };

      updateData[`form${formType}_path`] = uploadData.path;

      if (existingDraft) {
        const { error: updateError } = await supabase
          .from("draft_applications")
          .update(updateData)
          .eq("id", existingDraft.id);

        if (updateError) {
          await supabase.storage.from(bucket).remove([filePath]);
          console.log(updateError);
          return res.status(400).json({ error: updateError.message });
        }

        return res
          .status(200)
          .json({ error: 0, message: "Draft updated successfully", path: uploadData.path });
      } else {
        updateData.status = "in_progress";
        updateData.created_at = new Date().toISOString();

        const { error: insertError } = await supabase
          .from("draft_applications")
          .insert([updateData]);

        if (insertError) {
          await supabase.storage.from(bucket).remove([filePath]);
          console.log(insertError);
          return res.status(400).json({ error: insertError.message });
        }

        return res
          .status(200)
          .json({ error: 0, message: "Draft created successfully", path: uploadData.path });
      }
    }
    return res.status(200).json({ error: 0 });
  } catch (err) {
    console.error("Error saving draft:", err);
    return res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
}
