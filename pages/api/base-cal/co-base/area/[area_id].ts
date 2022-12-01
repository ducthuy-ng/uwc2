import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../../lib/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "GET") res.status(404).send({ message: "method not found" });

  let { area_id } = req.query;
  //check not null
  if (!area_id) {
    res.status(400).send({ message: "area_id must be specified" });
    return;
  }
  //check if string
  if (area_id instanceof Array<String>) {
    res.status(400).send({ message: "area_id should be a number" });
    return;
  }
  let mcp = parseInt(area_id);
  //check if number
  if (!mcp) {
    res.status(400).send({ message: "area_id should be a number" });
    return;
  }
  //check if area exist
  let result = await query("SELECT * FROM area WHERE id = $1;", [area_id]);
  if (result.rows.length < 1) {
    res.status(400).send({ message: `area_id: ${area_id} is no exist` });
    return;
  }
  try {
    //select query
    result = await query(
      "SELECT jbc.unnest as day_of_week, co_id FROM \
        (SELECT unnest(enum_range(NULL::days_of_week))) jbc LEFT JOIN \
        (SELECT * FROM co_base_calendar WHERE area_id = $1) jca\
        ON unnest = jca.day_of_week",
      [area_id]
    );
    res.status(200).send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
