import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";

const dateMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

async function create_co_calendar(req: NextApiRequest, res: NextApiResponse) {
  let month = req.query["month"];
  let year = req.query["year"];
  try {
    let number_days = new Date(Number(year), Number(month), 0).getDate();
    for (let i = 1; i <= number_days; i++) {
      let x = new Date(Number(year), Number(month) - 1, i).getDay();
      let y = dateMap[x];
      let results = await query("SELECT co_id, area_id FROM co_base_calendar WHERE day_of_week = $1", [y]);
      for (let j = 1; j <= results.rows.length; j++) {
        let date = year + "/" + month + "/" + i;
        await query("INSERT INTO co_calendar (area_id,work_date,co_id) VALUES ($1,TO_DATE($2,'YYYY/MM/DD'),$3)", [
          results.rows[j - 1].area_id,
          date,
          results.rows[j - 1].co_id,
        ]);
      }
    }
  } catch (e) {
    res.status(500).send({});
    return;
  }
  res.status(200).send({});
}
async function get_co_calendar(req: NextApiRequest, res: NextApiResponse) {
  let month = req.query["month"];
  let year = req.query["year"];
  try {
    let results = await query(
      "SELECT id AS co_id, full_name as co_name, coalesce(count, 0)::INTEGER AS number_day_of_month FROM employee LEFT JOIN (SELECT id AS co_ID, count(*) FROM employee RIGHT JOIN co_calendar ON id = co_calendar.co_id and extract(month from work_date) = $1 and extract(year from work_date) = $2 where working_role = 'CO' GROUP BY id) abc ON id = abc.co_ID where working_role = 'CO'",
      [month, year]
    );
    res.status(200).send(results.rows);
  } catch (e) {
    res.status(500).send({});
    return;
  }
}
async function delete_co_calendar(req: NextApiRequest, res: NextApiResponse) {
  let month = req.query["month"];
  let year = req.query["year"];
  let day = req.query["day"];
  let area = req.query["area_id"];
  let co = req.query["co_id"];
  if (!month || !year || !day || !area || !co) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  let date = year + "/" + month + "/" + day;
  try {
    let results = await query("SELECT * FROM co_calendar \
      WHERE co_id = $1 AND area_id = $2 AND work_date = $3", [
      co,
      area,
      date,
    ]);
    //check if co calendar is existed
    if (results.rows.length < 1) {
      res.status(400).send({ message: "There are no such calendar" });
      return;
    }
    //delete row
    await query("DELETE FROM co_calendar WHERE co_id = $1 AND area_id = $2 AND work_date = $3", [co, area, date]);
  } catch (e) {
    res.status(500).send({});
    return;
  }
  res.status(200).send({});
}
export default async function set_co_calendar(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      await create_co_calendar(req, res);
      break;
    case "GET":
      await get_co_calendar(req, res);
      break;
    case "DELETE":
      await delete_co_calendar(req, res);
      break;
    default:
      res.status(404).send({ message: "Method not found" });
      break;
  }
}
