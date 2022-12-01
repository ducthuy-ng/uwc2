import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lib/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method != 'GET') res.status(404).send({message: "method not found"})
    
    let { co_id } = req.query;
    //check not null
    if (!co_id) {
        res.status(400).send({message: "co_id must be specified"});
        return;
    }
    //check if string
    if (co_id instanceof Array<String>) {
        res.status(400).send({ message: "co_id should be a number" });
        return;
    }
    let co = parseInt(co_id);
    //check if number
    if (!co) {
        res.status(400).send({ message: "co_id should be a number" });
        return;
    }
    //check if co exist
    let result =await query("SELECT * FROM employee WHERE working_role = 'CO' AND id = $1;", [co_id]);
    if (result.rows.length < 1 ) {
        res.status(400).send({ message: `co_id: ${co_id} is no exist` });
        return;
    }
    try {
        //select query
        result = await query("SELECT week.unnest as day_of_week, area_id FROM \
        (SELECT unnest(enum_range(NULL::days_of_week))) week LEFT JOIN \
        (SELECT * FROM co_base_calendar WHERE co_id = $1) cbc ON week.unnest = cbc.day_of_week", [co_id]);
        res.status(200).send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
}