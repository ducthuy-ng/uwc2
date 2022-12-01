import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lib/postgres";

export enum day_of_week {
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
}

export default async function AssignmentCoBaseCalendar(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await getCoBaseCalendar(req, res);
      break;
    case "POST":
      await createCoBaseCalendar(req, res);
      break;
    case "DELETE":
      await deleteCoBaseCalendar(req, res);
      break;
    default:
      res.status(404).send({ message: "Method not found" });
      break;
  }
}

async function getCoBaseCalendar(req: NextApiRequest, res: NextApiResponse) {
  try {
    let results = await query("SELECT id AS co_id, full_name as co_name, coalesce(count, 0)::INTEGER \
    AS number_day_of_week FROM employee LEFT JOIN (SELECT id AS co_id, count(*) FROM employee \
    RIGHT JOIN co_base_calendar ON id = co_base_calendar.co_id where working_role = 'CO' GROUP BY id) abc \
    ON id = abc.co_id where working_role = 'CO'");
    res.status(200).send(results.rows);
  } catch (e) {
    res.status(500).send({});
    return;
  }
}

async function createCoBaseCalendar(req: NextApiRequest, res: NextApiResponse) {
  let area = req.query["area_id"];
  let co = req.query["co_id"];
  let day = req.query["day_of_week"];
  //check not null
  if (!area || !co || !day) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  try {
    //select query
    let result_co = await query("SELECT * FROM employee WHERE id = $1 and working_role = 'CO'", [co]);
    let result_area = await query("SELECT * FROM area WHERE id = $1", [area]);
    //check if co and area are existed
    if (result_co.rows.length != 1 || result_area.rows.length != 1) {
      res.status(400).send({ message: "area or co is not correct" });
      return;
    }
    //check if day is valid
    if (!Object.values(day_of_week).includes(String(day))) {
      res.status(400).send({ message: "Day value is not valid" });
      return;
    }
    //check if area has already assigned in that day
    result_area = await query("SELECT * FROM co_base_calendar\
    WHERE area_id = $1 and day_of_week = $2", [
      area,
      day,
    ]);
    if (result_area.rows.length != 0) {
      res.status(400).send({ message: "area has already assigned in this day" });
      return;
    }
    //insert values into co_base_calendar
    await query("INSERT INTO co_base_calendar(area_id, co_id, day_of_week) values ($1, $2, $3);", [area, co, day]);
  } catch (e) {
    res.status(400).send({ message: "Error" });
    return;
  }
  //200 success
  res.status(200).send({});
}

async function deleteCoBaseCalendar(req: NextApiRequest, res: NextApiResponse) {
  let area = req.query["area_id"];
  let co = req.query["co_id"];
  let day = req.query["day_of_week"];
  //check not null
  if (!area || !co || !day) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  try {
    let results = await query(
      "SELECT * FROM co_base_calendar \
    WHERE co_id = $1 and area_id = $2 and day_of_week = $3",
      [co, area, day]
    );
    //check if co base calendar is existed
    if (results.rows.length < 1) {
      res.status(400).send({ message: "There are no such calendar" });
      return;
    }
    //check if day is valid
    if (!Object.values(day_of_week).includes(String(day))) {
      res.status(400).send({ message: "Day value is not valid" });
      return;
    }
    //delete row
    await query("DELETE FROM co_base_calendar WHERE co_id = $1 and area_id = $2 and day_of_week = $3", [co, area, day]);
  } catch (e) {
    res.status(400).send({ message: "Error" });
    return;
  }
  //200 success
  res.status(200).send({});
}
