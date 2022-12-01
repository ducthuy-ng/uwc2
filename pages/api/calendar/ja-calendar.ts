import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";

const dateMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

async function create_ja_calendar(req: NextApiRequest, res: NextApiResponse) {
  let month = req.query["month"];
  let year = req.query["year"];
  try {
    let number_days = new Date(Number(year), Number(month), 0).getDate();
    for (let i = 1; i <= number_days; i++) {
      let x = new Date(Number(year), Number(month) - 1, i).getDay();
      let y = dateMap[x];
      let results = await query("SELECT ja_id, mcp_id FROM ja_base_calendar WHERE day_of_week = $1", [y]);
      for (let j = 1; j <= results.rows.length; j++) {
        let date = year + "/" + month + "/" + i;
        await query("INSERT INTO ja_calendar (mcp_id,work_date,ja_id) VALUES ($1,TO_DATE($2,'YYYY/MM/DD'),$3)", [
          results.rows[j - 1].mcp_id,
          date,
          results.rows[j - 1].ja_id,
        ]);
      }
    }
  } catch (e) {
    res.status(500).send({});
    return;
  }
  res.status(200).send({});
}

export default async function set_ja_calendar(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await create_ja_calendar(req, res);
      break;
    default:
      res.status(404).send({ message: "Method not found" });
      break;
  }
}
