import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";

export default async function AssignmentJATrolley(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await get_ja_and_assignment(req, res);
      break;
    case "POST":
      await createAssignment(req, res);
      break;
    case "DELETE":
      await deleteAssignment(req, res);
      break;
    default:
      res.status(404).send({ message: "Method not found" });
      break;
  }
}

async function get_ja_and_assignment(req: NextApiRequest, res: NextApiResponse) {
  try {
    let results = await query("select id as \"ja_id\", full_name as \"ja_name\", trolley_id from employee left join\
        trolley_assignment\
        on employee.id = trolley_assignment.ja_id\
        where working_role = 'JA'");
    res.status(200).send(results.rows);
  } catch (e) {
    res.status(500).send({});
    return;
  }
}

async function deleteAssignment(req: NextApiRequest, res: NextApiResponse) {
  let trolley = req.query["trolley_id"];
  let ja = req.query["ja_id"];
  //check not null
  if (!trolley || !ja) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  try {
    let results = await query("SELECT * FROM trolley_assignment WHERE ja_id = $1 and trolley_id = $2", [ja, trolley]);
    //check if ja and trolley are existed
    if (results.rows.length < 1) {
      res.status(400).send({ message: "There are no such assign" });
      return;
    }
    //delete row
    await query("DELETE FROM trolley_assignment WHERE ja_id = $1 and trolley_id = $2", [ja, trolley]);
  } catch(e) {
    res.status(400).send({ message: "Error" });
    return;
  }
  //200 success
  res.status(200).send({});
}

async function createAssignment(req: NextApiRequest, res: NextApiResponse) {
  let trolley = req.query["trolley_id"];
  let ja = req.query["ja_id"];
  //check not null
  if (!trolley || !ja) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  try {
    //select query
    let result_ja = await query("SELECT * FROM employee WHERE id = $1", [ja]);
    let result_trolley = await query("SELECT * FROM trolley WHERE id = $1", [trolley]);
    //check if ja and trolley are existed
    if (result_ja.rows.length != 1 || result_trolley.rows.length != 1) {
      res.status(400).send({ message: "Trolley or ja is not correct" });
      return;
    }
    //check if ja has already assign
    result_ja = await query("SELECT * FROM trolley_assignment WHERE ja_id = $1", [ja]);
    if (result_ja.rows.length != 0) {
      res.status(400).send({ message: "Ja has already assign trolley" });
      return;
    }
    //check if trolley has already been assigned
    result_trolley = await query("SELECT * FROM trolley_assignment WHERE trolley_id = $1", [trolley]);
    if (result_trolley.rows.length != 0) {
      res.status(400).send({ message: "Trolley has already been assigned " });
      return;
    }
    //insert values into trolley_assignment
    await query("INSERT INTO trolley_assignment(trolley_id, ja_id) values ($1, $2);", [trolley, ja]);
  } catch (e) {
    res.status(400).send({ message: "Error" });
    return;
  }
  //200 success
  res.status(200).send({});
}