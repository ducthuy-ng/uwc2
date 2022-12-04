import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";

const dateMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

async function get_area_calendar(req: NextApiRequest, res: NextApiResponse) {
  let area = req.query["area_id"];
  let month = req.query["month"];
  let year = req.query["year"];
  if (!area || !month || !year) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  try {
    let results = await query(
      "SELECT extract(day from work_date) as day, co_id FROM co_calendar WHERE area_id = $1 and extract(month from work_date)= $2 and extract(year from work_date)= $3 order by day asc,co_id asc",
      [area, month, year]
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
      await get_area_calendar(req, res);
      break;
    default:
      res.status(404).send({ message: "Method not found" });
      break;
  }
}
