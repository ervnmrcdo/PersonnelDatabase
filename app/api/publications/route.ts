import { pool } from "@/lib/neon";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const authorId = searchParams.get("authorId");

  if (!authorId) return NextResponse.json({ error: "Missing authorId" }, { status: 400 });

  try {
    const pubRes = await pool.query(
      `SELECT p.* FROM publications p
       JOIN publication_authors pa ON pa.publication_id = p.publication_id
       WHERE pa.author_id = $1`,
      [authorId]
    );

    const publications = [];

    for (const pub of pubRes.rows) {
      const authorsRes = await pool.query(
        `SELECT * FROM authors a
         JOIN publication_authors pa ON pa.author_id = a.id
         WHERE pa.publication_id = $1`,
        [pub.publication_id]
      );

      const authors = authorsRes.rows.map(a => ({
        first_name: a.first_name,
        middle_name: a.middle_name,
        last_name: a.last_name,
        university: a.university,
        college: a.college,
        department: a.department,
        position: a.position,
        contact_no: a.contact_no,
        email: a.email
      }));

      publications.push({ ...pub, authors });
    }

    return NextResponse.json(publications);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}


export async function POST(req: Request) {
      try {
      const { title, authors, ...publicationFields } = await req.json();

  // Insert publication
  const pubRes = await pool.query(
    `INSERT INTO publications (title, type, publisher, publication_status, date_published, page_number, issue_number, page_numbers, journal_publication, volume_number, total_authors)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *`,
    [title, publicationFields.type, publicationFields.publisher, publicationFields.publication_status, publicationFields.date_published, publicationFields.page_number, publicationFields.issue_number, publicationFields.page_numbers, publicationFields.journal_publication, publicationFields.volume_number, publicationFields.total_authors]
  );

  const newPublication = pubRes.rows[0];

  // Insert authors & link to publication
  for (const author of authors) {
    // Insert author
    const authorRes = await pool.query(
      `INSERT INTO authors (first_name, middle_name, last_name, university, college, department, position, contact_no, email)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id`,
      [author.first_name, author.middle_name, author.last_name, author.university, author.college, author.department, author.position, author.contact_no, author.email]
    );

    const authorId = authorRes.rows[0].id;

    // Link publication <-> author
    await pool.query(
      `INSERT INTO publication_authors (publication_id, author_id) VALUES ($1,$2)`,
      [newPublication.publication_id, authorId]
    );
  }

  return NextResponse.json(newPublication);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}