import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";

const dateMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

async function get_co_calendar(req: NextApiRequest, res: NextApiResponse) {
  let id = req.query["co_id"];
  let month = req.query["month"];
  let year = req.query["year"];
  if (!id || !month || !year) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  try {
    let results = await query(
      "SELECT extract(day from work_date) as day, area_id FROM co_calendar WHERE co_id = $1 and extract(month from work_date)= $2 and extract(year from work_date)= $3 order by day asc,area_id asc",
      [id, month, year]
    );
    if (results.rows.length < 1) {
      res.status(400).send({ message: "There are no such calendar" });
      return;
    }
    res.status(200).send(results.rows);
  } catch (e) {
    res.status(500).send({});
    return;
  }
}

export default async function set_co_calendar(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await get_co_calendar(req, res);
      break;
    default:
      res.status(404).send({ message: "Method not found" });
      break;
  }
}
