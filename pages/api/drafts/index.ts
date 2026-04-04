import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@/lib/supabase/pager-server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabaseUser = createPagesServerClient(req, res);
  const supabase = createServiceRoleClient();

  const {
    data: { user },
  } = await supabaseUser.auth.getUser();

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

  const basePath = `${userId}/${awardId}/${publicationId}`;

  const { data: pdfFiles } = await supabase.storage
    .from("drafts-pdf")
    .list(basePath, { limit: 10 });


  const { data: docxFiles } = await supabase.storage
    .from("drafts-docx")
    .list(basePath, { limit: 10 });



  const draftUrls: Record<string, string | null> = {};
  const draftPaths: Record<string, string | null> = {};

  const pdfBucket = supabase.storage.from("drafts-pdf");
  const docxBucket = supabase.storage.from("drafts-docx");

  for (const file of pdfFiles || []) {
    const path = `${basePath}/${file.name}`;
    const { data: urlData } = await pdfBucket.createSignedUrl(path, 3600);
    const formType = file.name.replace(".pdf", "");
    draftUrls[formType] = urlData?.signedUrl || null;
    draftPaths[`${formType}_path`] = path;
  }

  for (const file of docxFiles || []) {
    const path = `${basePath}/${file.name}`;
    const { data: urlData } = await docxBucket.createSignedUrl(path, 3600);
    const formType = file.name.replace(".docx", "");
    draftUrls[formType] = urlData?.signedUrl || null;
    draftPaths[`${formType}_path`] = path;
  }

  return res.status(200).json({
    publication_id: Number(publicationId),
    award_id: Number(awardId),
    ...draftPaths,
    ...draftUrls,
  });
}

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse,
  supabase: any,
  userId: string
) {
  try {
    const { publicationId, awardId } = req.query;

    if (!publicationId || !awardId) {
      return res
        .status(400)
        .json({ error: "publicationId and awardId are required" });
    }

    const basePath = `${userId}/${awardId}/${publicationId}`;

    const pdfFiles = [
      `${basePath}/form41.pdf`,
      `${basePath}/form44.pdf`,
    ];

    const docxFiles = [
      `${basePath}/form42.docx`,
      `${basePath}/form43.docx`,
    ];

    await supabase.storage.from("drafts-pdf").remove(pdfFiles);
    await supabase.storage.from("drafts-docx").remove(docxFiles);

    return res.status(200).json({ message: "Draft deleted successfully" });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error deleting draft" });
  }

}
