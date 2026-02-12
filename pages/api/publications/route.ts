import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function RetrievePublicationsPerUser(
  req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = req.query

    console.log(params)

  } catch (err) {
    return res.status(500).json(`Internal Server Error: ${err}`)
  }

}



// import { pool } from "@/lib/neon";
// import { NextResponse } from "next/server";
//
// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const authorId = searchParams.get("authorId");
//
//   if (!authorId) {
//     return NextResponse.json({ error: "Missing authorId" }, { status: 400 });
//   }
//
//   try {
//     const result = await pool.query(
//       `SELECT 
//         p.id,
//         p.title,
//         a.name AS author_name
//     FROM publications p
//     JOIN publication_authors pa
//         ON pa.publication_id = p.publication_id
//     JOIN authors a
//         ON a.id = pa.author_id
//     WHERE a.id = $1
//     `,
//     [authorId]
//     );
//
//     return NextResponse.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Database error" }, { status: 500 });
//   }
// }
