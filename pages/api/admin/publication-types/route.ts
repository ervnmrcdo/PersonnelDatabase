import { createPagesServerClient } from "@/lib/supabase/pager-server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function publicationTypesHandler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createPagesServerClient(req, res);

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("publication_type")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  if (req.method === "POST") {
    try {
      const { name } = req.body;


      if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ error: "Name is required" });
      }

      const { data, error } = await supabase
        .from("publication_type")
        .insert([{ name: name.trim() }])
        .select()
        .single();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, name } = req.body;

      if (!id || !name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ error: "ID and name are required" });
      }

      const { data, error } = await supabase
        .from("publication_type")
        .update({ name: name.trim() })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const { error } = await supabase
        .from("publication_type")
        .delete()
        .eq("id", parseInt(id as string));

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
