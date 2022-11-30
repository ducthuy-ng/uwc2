import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";

export enum day_of_week{
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
}

export default async function AssignmentJATrolley(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await getBaseCalendar(req, res);
      break;
    case "POST":
      await createBaseCalendar(req, res);
      break;
    case "DELETE":
      await deleteBaseCalendar(req, res);
      break;
    default:
      res.status(404).send({ message: "Method not found" });
      break;
  }
}

async function getBaseCalendar(req: NextApiRequest, res: NextApiResponse) {
  try {
    let results = await query("select * from ja_base_calendar");
    res.status(200).send(results.rows);
  } catch (e) {
    res.status(500).send({});
    return;
  }
}

async function createBaseCalendar(req: NextApiRequest, res: NextApiResponse) {
  let mcp = req.query["mcp_id"];
  let ja = req.query["ja_id"];
  let day = req.query["day_of_week"];
  //check not null
  if (!mcp || !ja || !day) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  try {
    //select query
    let result_ja = await query("SELECT * FROM employee WHERE id = $1 and working_role = 'JA'", [ja]);
    let result_mcp = await query("SELECT * FROM trolley WHERE id = $1", [mcp]);
    //check if ja and mcp are existed
    if (result_ja.rows.length != 1 || result_mcp.rows.length != 1) {
      res.status(400).send({ message: "Mcp or ja is not correct" });
      return;
    }
    //check if day is valid
    if (!Object.values(day_of_week).includes(String(day))) {
      res.status(400).send({ message: "Day value is not valid" });
      return;
    }
    //check if mcp has already assigned in that day
    result_mcp = await query("SELECT * FROM ja_base_calendar\
    WHERE mcp_id = $1 and day_of_week = $2", [mcp, day]);
    if (result_mcp.rows.length != 0) {
      res.status(400).send({ message: "Mcp has already assign in this day" });
      return;
    }
    //insert values into ja_base_calendar
    await query("INSERT INTO ja_base_calendar(mcp_id, ja_id, day_of_week) values ($1, $2, $3);", [mcp, ja, day]);
  } catch (e) {
    res.status(400).send({ message: "Error" });
    return;
  }
  //200 success
  res.status(200).send({});
}

async function deleteBaseCalendar(req: NextApiRequest, res: NextApiResponse) {
  let mcp = req.query["mcp_id"];
  let ja = req.query["ja_id"];
  let day = req.query["day_of_week"];
  //check not null
  if (!mcp || !ja || !day) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  try {
    let results = await query("SELECT * FROM ja_base_calendar \
    WHERE ja_id = $1 and mcp_id = $2 and day_of_week = $3", [ja, mcp, day]);
    //check if ja base calendar is existed
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
    await query("DELETE FROM ja_base_calendar WHERE ja_id = $1 and mcp_id = $2 and day_of_week = $3", [ja, mcp, day]);
  } catch(e) {
    res.status(400).send({ message: "Error" });
    return;
  }
  //200 success
  res.status(200).send({});
}