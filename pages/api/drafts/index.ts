import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@/lib/supabase/pager-server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createPagesServerClient(req, res);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    return handleGet(req, res, supabase, user.id);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res, supabase, user.id);
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
  supabase: any,
  userId: string
) {
  const { publicationId, awardId } = req.query;

  if (!publicationId || !awardId) {
    return res
      .status(400)
      .json({ error: "publicationId and awardId are required" });
  }

  const { data: draft, error } = await supabase
    .from("draft_applications")
    .select("*")
    .eq("user_id", userId)
    .eq("publication_id", Number(publicationId))
    .eq("award_id", Number(awardId))
    .single();

  if (error && error.code !== "PGRST116") {
    return res.status(500).json({ error: error.message });
  }

  if (!draft) {
    return res.status(200).json(null);
  }

  const draftUrls: Record<string, string | null> = {};

  const pdfBucket = supabase.storage.from("drafts-pdf");
  const docxBucket = supabase.storage.from("drafts-docx");

  if (draft.form41_path) {
    const { data: urlData } = await pdfBucket.createSignedUrl(
      draft.form41_path,
      3600
    );
    draftUrls.form41 = urlData?.signedUrl || null;
  }

  if (draft.form42_path) {
    const { data: urlData } = await docxBucket.createSignedUrl(
      draft.form42_path,
      3600
    );
    draftUrls.form42 = urlData?.signedUrl || null;
  }

  if (draft.form43_path) {
    const { data: urlData } = await docxBucket.createSignedUrl(
      draft.form43_path,
      3600
    );
    draftUrls.form43 = urlData?.signedUrl || null;
  }

  if (draft.form44_path) {
    const { data: urlData } = await pdfBucket.createSignedUrl(
      draft.form44_path,
      3600
    );
    draftUrls.form44 = urlData?.signedUrl || null;
  }

  return res.status(200).json({
    ...draft,
    ...draftUrls,
  });
}

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse,
  supabase: any,
  userId: string
) {
  const { publicationId, awardId } = req.query;

  if (!publicationId || !awardId) {
    return res
      .status(400)
      .json({ error: "publicationId and awardId are required" });
  }

  const { data: draft, error: fetchError } = await supabase
    .from("draft_applications")
    .select("*")
    .eq("user_id", userId)
    .eq("publication_id", Number(publicationId))
    .eq("award_id", Number(awardId))
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return res.status(500).json({ error: fetchError.message });
  }

  if (!draft) {
    return res.status(200).json({ message: "No draft to delete" });
  }

  const filesToDelete: string[] = [];
  if (draft.form41_path) filesToDelete.push(draft.form41_path);
  if (draft.form42_path) filesToDelete.push(draft.form42_path);
  if (draft.form43_path) filesToDelete.push(draft.form43_path);
  if (draft.form44_path) filesToDelete.push(draft.form44_path);

  const pdfFiles = filesToDelete.filter((p) => p.endsWith(".pdf"));
  const docxFiles = filesToDelete.filter((p) => p.endsWith(".docx"));

  if (pdfFiles.length > 0) {
    await supabase.storage.from("drafts-pdf").remove(pdfFiles);
  }

  if (docxFiles.length > 0) {
    await supabase.storage.from("drafts-docx").remove(docxFiles);
  }

  const { error: deleteError } = await supabase
    .from("draft_applications")
    .delete()
    .eq("id", draft.id);

  if (deleteError) {
    return res.status(500).json({ error: deleteError.message });
  }

  return res.status(200).json({ message: "Draft deleted successfully" });
}
