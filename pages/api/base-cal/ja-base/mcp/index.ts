import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../../lib/postgres";

export enum day_of_week{
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
}

export default async function AssignmentJABaseCalendar(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
      case "GET":
        await getJABaseCalendar(req, res);
        break;
      default:
        res.status(404).send({ message: "Method not found" });
        break;
    }
  }

  async function getJABaseCalendar(req: NextApiRequest, res: NextApiResponse) {
    try {
      let results = await query("SELECT id AS mcp_id, coalesce(jbc.count, 0)::INTEGER AS number_day_of_week FROM mcp LEFT JOIN\
      (SELECT mcp_id, count(*) FROM ja_base_calendar GROUP BY mcp_id ORDER BY mcp_id ASC) jbc ON mcp.id = jbc.mcp_id");
      res.status(200).send(results.rows);
    } catch (e) {
      res.status(500).send({});
      return;
    }
  }