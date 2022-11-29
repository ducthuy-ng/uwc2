import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";
async function getareanameandvehicleid(req:NextApiRequest,res:NextApiResponse) {
  let areaname =req.query["areaname"];
  let vehicleid = req.query["vehicleid"];
  try{
      let results = await query('SELECT A.name as area_name,B.area_id as area_id, B.vehicle_id as vehicle_id FROM area A,area_assignment B WHERE B.area_id=A.id')
      res.status(200).send(results.rows)   
  }
  catch(e){
      res.status(500).send({})
      return
  }
}
export default async function call_ja_assgin(req:NextApiRequest,res:NextApiResponse){
  if (req.method === 'GET') {
    getareanameandvehicleid(req, res)
    }
    else res.status(404).send({})
}