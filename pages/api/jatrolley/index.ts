import { values } from "cypress/types/lodash";
import { resolveSoa } from "dns";
import { NextApiRequest, NextApiResponse } from "next";
import { resourceLimits } from "worker_threads";
import { query } from "../../../lib/postgres";

async function get_ja_and_assignment(req:NextApiRequest,res:NextApiResponse) {
    let ja_id =req.query["ja_id"];
    let trolley_id = req.query["trolley_id"];
    try{
        let results = await query('select id as "ja_id", full_name as "ja_name", trolley_id from employee left join\
        trolley_assignment\
        on employee.id = trolley_assignment.ja_id')
        res.status(200).send(results.rows)   
    }
    catch(e){
        res.status(500).send({})
        return
    }
}
export default get_ja_and_assignment;
