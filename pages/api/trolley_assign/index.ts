import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";
import { destroyCookie, parseCookies, setCookie } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let trolley_id = req.query['trolley_id'];
  let ja_id = req.query['ja_id'];
  
  let cookie = parseCookies ( {req} );

  let result = await query("SELECT * FROM employee WHERE username = $1;", [trolley_id]);
  
  let record = result.rows[1];
  console.log(record)
}
