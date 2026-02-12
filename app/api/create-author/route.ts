import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const { id, first_name, middle_name, last_name } = await req.json();

  await sql`
    insert into authors (id, first_name, middle_name, last_name)
    values (${id}, ${first_name}, ${middle_name}, ${last_name})
    on conflict (id)
    do update set
      first_name = excluded.first_name,
      middle_name = excluded.middle_name,
      last_name = excluded.last_name
  `;

  return NextResponse.json({ success: true });
}
