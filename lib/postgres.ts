import { Pool, QueryResult } from "pg";

if (!process.env.DB_CONN_STRING) {
  throw new Error("DB_CONN_STRING must be specified");
}

const pool = new Pool({
  connectionString: process.env.DB_CONN_STRING,
});

async function query(text: string, params?: any[]): Promise<QueryResult> {
  return pool.query(text, params);
}

export { query };
