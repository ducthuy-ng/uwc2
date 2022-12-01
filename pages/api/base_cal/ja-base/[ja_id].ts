import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lib/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method != 'GET') res.status(404).send({message: "method not found"})
    
    let { ja_id } = req.query;
    //check not null
    if (!ja_id) {
        res.status(400).send({message: "ja_id must be specified"});
        return;
    }
    //check if string
    if (ja_id instanceof Array<String>) {
        res.status(400).send({ message: "ja_id should be a number" });
        return;
    }
    let ja = parseInt(ja_id);
    //check if number
    if (!ja) {
        res.status(400).send({ message: "ja_id should be a number" });
        return;
    }
    //check if ja exist
    let result =await query("SELECT * FROM employee WHERE working_role = 'JA' AND id = $1;", [ja_id]);
    if (result.rows.length < 1 ) {
        res.status(400).send({ message: `id: ${ja_id} is no exist` });
        return;
    }
    try {
        //select query
        result = await query("SELECT week.unnest as day_of_week, mcp_id FROM \
        (SELECT unnest(enum_range(NULL::days_of_week))) week LEFT JOIN \
        (SELECT * FROM ja_base_calendar WHERE ja_id = $1) jbc\
        ON week.unnest = jbc.day_of_week", [ja_id]);
        res.status(200).send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
}