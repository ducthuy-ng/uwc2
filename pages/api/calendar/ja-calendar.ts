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
async function get_ja_calendar(req: NextApiRequest, res: NextApiResponse) {
  let month = req.query["month"];
  let year = req.query["year"];
  try {
    let results = await query(
      "SELECT id AS ja_id, full_name as ja_name, coalesce(count, 0)::INTEGER AS number_day_of_month FROM employee LEFT JOIN (SELECT id AS JA_ID, count(*) FROM employee RIGHT JOIN ja_calendar ON id = ja_calendar.ja_id and extract(month from work_date) = $1 and extract(year from work_date) = $2 where working_role = 'JA' GROUP BY id) abc ON id = abc.JA_ID where working_role = 'JA'"
    ,[month,year]);
    res.status(200).send(results.rows);
  } catch (e) {
    res.status(500).send({});
    return;
  }
}
async function delete_ja_calendar(req: NextApiRequest, res: NextApiResponse) {
  let month = req.query["month"];
  let year = req.query["year"];
  let day = req.query["day"];
  let mcp = req.query["mcp_id"];
  let ja = req.query["ja_id"];
  if (!month || !year || !day|| !mcp || !ja) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  let date = year + "/" + month + "/" + day;
  try {
    let results = await query(
      "SELECT * FROM ja_calendar \
      WHERE ja_id = $1 AND mcp_id = $2 AND work_date = $3",
      [ja, mcp, date]
    );
    //check if ja calendar is existed
    if (results.rows.length < 1) {
      res.status(400).send({ message: "There are no such calendar" });
      return;
    }
    //delete row
    await query("DELETE FROM ja_calendar WHERE ja_id = $1 AND mcp_id = $2 AND work_date = $3", [ja, mcp, date]);
  } catch (e) {
    res.status(500).send({});
    return;
  }
  res.status(200).send({});
}
export default async function set_ja_calendar(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      await create_ja_calendar(req, res);
      break;
    case "GET":
      await get_ja_calendar(req, res);
      break;
    case "DELETE":
      await delete_ja_calendar(req, res);
      break;
    default:
      res.status(404).send({ message: "Method not found" });
      break;
  }
}
