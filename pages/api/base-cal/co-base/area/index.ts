import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../../lib/postgres";

export enum day_of_week {
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
}

export default async function AssignmentCOBaseCalendar(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await getCOBaseCalendar(req, res);
      break;
    default:
      res.status(404).send({ message: "Method not found" });
      break;
  }
}

async function getCOBaseCalendar(req: NextApiRequest, res: NextApiResponse) {
  try {
    let results = await query(
      "SELECT id AS area_id, coalesce(jbc.count, 0)::INTEGER AS number_day_of_week FROM area LEFT JOIN\
      (SELECT area_id, count(*) FROM co_base_calendar GROUP BY area_id ORDER BY area_id ASC) jbc ON area.id = jbc.area_id"
    );
    res.status(200).send(results.rows);
  } catch (e) {
    res.status(500).send({});
    return;
  }
}
