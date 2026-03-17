import { createPagesServerClient } from "@/lib/supabase/pager-server";
import { NextApiRequest, NextApiResponse } from "next";

interface PublicationTypeRow {
  id: number;
  name: string;
  publication_type_id: number;
}

interface PublicationRow {
  doi: string | null;
  type: string;
  title: string;
  publisher: string;
  issue_number: string;
  journal_name: string;
  page_numbers: string;
  volume_number: string;
  date_published: string;
  publication_id: number;
  publication_status: string;
  publication_type_id: number;
}

export default async function func(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = createPagesServerClient(req, res);
    const { id: userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const { data: awardsData, error: awardsError } = await supabase
      .from("awards")
      .select("*");

    if (awardsError) {
      console.log("Awards error:", awardsError);
      return res.status(400).json({ error: awardsError.message });
    }

    const { data: publicationTypesData, error: ptError } = await supabase
      .from("publication_per_award")
      .select("*");

    if (ptError) {
      console.log("Publication types error:", ptError);
      return res.status(400).json({ error: ptError.message });
    }

    const { data: publicationsData, error: pubsError } = await supabase
      .from("publications")
      .select(`
        *,
        publication_authors!inner(*),
        users!inner(*),
        publication_award_applications(*)
      `)
      .eq("users.id", userId);

    if (pubsError) {
      console.log("Publications error:", pubsError);
      return res.status(400).json({ error: pubsError.message });
    }

    const filteredPublications = publicationsData?.filter(
      (p: any) => !p.publication_award_applications?.length
    ) || [];
    console.log(publicationsData)

    const result = awardsData.map((award: any) => {
      const awardPublicationTypes = publicationTypesData.filter(
        (pt: PublicationTypeRow) => pt.publication_type_id === award.award_id
      );

      const publicationTypesWithPublications = awardPublicationTypes.map(
        (pt: PublicationTypeRow) => {
          const userPubsOfType = filteredPublications
            .filter((p: PublicationRow) => p.publication_type_id === pt.publication_type_id)
            .map((p: PublicationRow) => ({
              doi: p.doi,
              type: p.type,
              title: p.title,
              publisher: p.publisher,
              issue_number: p.issue_number,
              journal_name: p.journal_name,
              page_numbers: p.page_numbers,
              volume_number: p.volume_number,
              date_published: p.date_published,
              publication_id: p.publication_id,
              publication_status: p.publication_status,
              publication_type_id: p.publication_type_id,
            }));


          // return {
          //   id: pt.id,
          //   name: pt.name,
          //   award_id: pt.publication_type_id,
          //   publications: userPubsOfType,
          // };
          return userPubsOfType[0]
        }
      );



      return {
        award_id: award.id,
        title: award.title,
        description: award.description,
        publication_per_award: publicationTypesWithPublications,
      };
    });

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
}
