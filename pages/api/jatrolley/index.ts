import { resolveSoa } from "dns";
import { NextApiRequest, NextApiResponse } from "next";
import { resourceLimits } from "worker_threads";
import { query } from "../../../lib/postgres";

export default async function get_trolley_ja(req:NextApiRequest,res:NextApiResponse) {
    let ja_id =req.query["ja_id"];
    let trolley_id = req.query["trolley_id"];
    try{
        let results = await query('select full_name, trolley_id from employee inner join\
        trolley_assignment\
        on employee.id = trolley_assignment.ja_id\
        where employee.id = $1', [ja_id]); 
        if(results.rows.length <1){
            res.status(403).send({message:"121"})
            return
        }
        let record = results.rows[0];
        res.status(200).send({record})
    }
    catch(e){
        res.status(500).send({})
        return
    }
}
