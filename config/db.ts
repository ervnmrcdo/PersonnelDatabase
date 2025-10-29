import { neon, NeonQueryFunction } from "@neondatabase/serverless";

const sql: NeonQueryFunction<boolean, boolean> = neon(
  process.env.DATABASE_URL!,
);

export default sql;
