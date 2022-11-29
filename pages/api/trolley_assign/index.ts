import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //check req.method true -> 201/ false -> 404
  if (req.method === 'POST') {
    let trolley = req.query['trolley_id'];
    let ja = req.query['ja_id'];
    //check not null
    if (!trolley || !ja) {
      res.status(400).send({message: "Input should not null"});
      return;
    }
    //select query
    try {
      let result_ja = await query('SELECT * FROM employee WHERE id = $1', [ja]);
      let result_trolley = await query("SELECT * FROM trolley WHERE id = $1", [trolley]);
      //check if ja and trolley are existed
      if (result_ja.rows.length != 1 || result_trolley.rows.length != 1) {
        res.status(400).send({ message: "Trolley or ja is not correct" });
        return;
      }
      //check if ja has already assign
      result_ja = await query('SELECT * FROM trolley_assignment WHERE ja_id = $1', [ja]);
      if (result_ja.rows.length != 0) {
        res.status(400).send({ message: "Ja has already assign trolley" });
        return;
      }
      //check if trolley has already been assigned
      result_trolley = await query('SELECT * FROM trolley_assignment WHERE trolley_id = $1', [trolley]);
      if (result_trolley.rows.length != 0) {
        res.status(400).send({ message: "Trolley has already been assigned " });
        return;
      }
      //insert values into trolley_assignment
      await query('INSERT INTO trolley_assignment(trolley_id, ja_id) values ($1, $2);', [trolley, ja]);
    } catch(e) {
      res.status(400).send({message: "Error"});
      return;
    }
    //200 success
    res.status(201).send({})
  }
  else res.status(404).send({})
}
