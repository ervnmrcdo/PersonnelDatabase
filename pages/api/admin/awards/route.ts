import { createPagesServerClient } from "@/lib/supabase/pager-server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function awardsHandler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createPagesServerClient(req, res);

  if (req.method === "GET") {
    try {
      const { data: awards, error: awardsError } = await supabase
        .from("awards")
        .select("*")
        .order("award_id", { ascending: true });

      if (awardsError) {
        return res.status(400).json({ error: awardsError.message });
      }

      const { data: publicationTypes, error: ptError } = await supabase
        .from("publication_type")
        .select("*")
        .order("id", { ascending: true });

      if (ptError) {
        return res.status(400).json({ error: ptError.message });
      }

      const { data: publicationPerAward, error: ppaError } = await supabase
        .from("publication_per_award")
        .select("*");

      if (ppaError) {
        return res.status(400).json({ error: ppaError.message });
      }

      const awardsWithTypes = awards.map((award: any) => ({
        ...award,
        allowed_publication_types: publicationPerAward
          .filter((ppa: any) => ppa.award_id === award.award_id)
          .map((ppa: any) => ppa.publication_type_id),
      }));

      return res.status(200).json({
        awards: awardsWithTypes,
        publication_types: publicationTypes,
      });
    } catch (err) {
      return res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  if (req.method === "PUT") {
    try {
      const { award_id, allowed_publication_type_ids } = req.body;


      if (!award_id || !Array.isArray(allowed_publication_type_ids)) {
        return res.status(400).json({
          error: "Invalid request: award_id and allowed_publication_type_ids are required",
        });
      }

      const { data: existing, error: fetchError } = await supabase
        .from("publication_per_award")
        .select("*")
        .eq("award_id", award_id);


      if (fetchError) {
        return res.status(400).json({ error: fetchError.message });
      }

      const existingIds = existing.map((item: any) => item.publication_type_id);
      const toAdd = allowed_publication_type_ids.filter(
        (id: number) => !existingIds.includes(id)
      );
      const toRemove = existingIds.filter(
        (id: number) => !allowed_publication_type_ids.includes(id)
      );

      if (toRemove.length > 0) {
        const { error: deleteError } = await supabase
          .from("publication_per_award")
          .delete()
          .eq("award_id", award_id)
          .in("publication_type_id", toRemove);

        if (deleteError) {
          return res.status(400).json({ error: deleteError.message });
        }
      }

      if (toAdd.length > 0) {
        const toInsert = toAdd.map((publication_type_id: number) => ({
          award_id,
          publication_type_id,
        }));

        const { error: insertError } = await supabase
          .from("publication_per_award")
          .upsert(toInsert, { onConflict: "award_id,publication_type_id" });

        if (insertError) {
          return res.status(400).json({ error: insertError.message });
        }
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
