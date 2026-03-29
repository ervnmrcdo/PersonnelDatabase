import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@/lib/supabase/pager-server";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createPagesServerClient(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = formidable({ maxFileSize: 50 * 1024 * 1024 });

  try {
    const [fields, files] = await form.parse(req);

    const publicationId = Array.isArray(fields.publication_id)
      ? fields.publication_id[0]
      : fields.publication_id;
    const awardId = Array.isArray(fields.award_id)
      ? fields.award_id[0]
      : fields.award_id;
    const formType = Array.isArray(fields.form_type)
      ? fields.form_type[0]
      : fields.form_type;

    if (!publicationId || !awardId || !formType) {
      return res
        .status(400)
        .json({ error: "publication_id, award_id, and form_type are required" });
    }

    const fileKey = `form${formType}`;
    const file = files[fileKey]?.[0];

    if (!file) {
      return res.status(400).json({ error: `form${formType} file is required` });
    }

    const fileBuffer = fs.readFileSync(file.filepath);
    const fileExt = formType === "41" || formType === "44" ? "pdf" : "docx";
    const bucket = fileExt === "pdf" ? "drafts-pdf" : "drafts-docx";

    const filePath = `drafts/${awardId}/${publicationId}/form${formType}.${fileExt}`;

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
      return res.status(400).json({ error: uploadError.message });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const existingDraft = await supabase
      .from("draft_applications")
      .select("*")
      .eq("user_id", user.id)
      .eq("publication_id", Number(publicationId))
      .eq("award_id", Number(awardId))
      .single();

    const updateData: Record<string, any> = {
      user_id: user.id,
      publication_id: Number(publicationId),
      award_id: Number(awardId),
      updated_at: new Date().toISOString(),
    };

    updateData[`form${formType}_path`] = uploadData.path;

    if (existingDraft.data) {
      const { error: updateError } = await supabase
        .from("draft_applications")
        .update(updateData)
        .eq("id", existingDraft.data.id);

      if (updateError) {
        await supabase.storage.from(bucket).remove([filePath]);
        return res.status(400).json({ error: updateError.message });
      }

      return res
        .status(200)
        .json({ message: "Draft updated successfully", path: uploadData.path });
    } else {
      updateData.status = "in_progress";
      updateData.created_at = new Date().toISOString();

      const { error: insertError } = await supabase
        .from("draft_applications")
        .insert([updateData]);

      if (insertError) {
        await supabase.storage.from(bucket).remove([filePath]);
        return res.status(400).json({ error: insertError.message });
      }

      return res
        .status(201)
        .json({ message: "Draft created successfully", path: uploadData.path });
    }
  } catch (err) {
    console.error("Error saving draft:", err);
    return res.status(500).json({ error: `Internal Server Error: ${err}` });
  }
}
