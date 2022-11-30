import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";
async function get_area_vehicle(req:NextApiRequest,res:NextApiResponse) {
  try{
      let results = await query('SELECT A.name as area_name,B.area_id as area_id, B.vehicle_id as vehicle_id FROM area A,area_assignment B WHERE B.area_id=A.id')
      res.status(200).send(results.rows)   
  }
  catch(e){
      res.status(500).send({})
      return
  }
}
async function createAssignment(req: NextApiRequest, res: NextApiResponse) {
  let vehicle = req.query["vehicle_id"];
  let area = req.query["area_id"];
  //check not null
  if (!vehicle || !area) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  try {
    //select query
    let result_area = await query("SELECT * FROM area WHERE id = $1", [area]);
    let result_vehicle = await query("SELECT * FROM trolley WHERE id = $1", [vehicle]);
    //check if area and vehicle are existed
    if (result_area.rows.length != 1 || result_vehicle.rows.length != 1) {
      res.status(400).send({ message: "Area or vehicle is not correct" });
      return;
    }
    //check if area has already assign
    result_area = await query("SELECT * FROM area_assignment WHERE area_id = $1", [area]);
    if (result_area.rows.length != 0) {
      res.status(400).send({ message: "Area has already assign vehicle" });
      return;
    }
    //check if vehicle has already been assigned
    result_vehicle = await query("SELECT * FROM area_assignment WHERE vehicle_id = $1", [vehicle]);
    if (result_vehicle.rows.length != 0) {
      res.status(400).send({ message: "Vehicle has already been assigned " });
      return;
    }
    //insert values into trolley_assignment
    await query("INSERT INTO area_assignment(area_id, vehicle_id) values ($1, $2);", [area, vehicle]);
  } catch (e) {
    res.status(400).send({ message: "Error" });
    return;
  }
  //200 success
  res.status(200).send({});
}
async function deleteAssignment(req: NextApiRequest, res: NextApiResponse) {
  let area = req.query["area_id"];
  let vehicle = req.query["vehicle_id"];
  //check not null
  if (!area || !vehicle) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  try {
    let results = await query("SELECT * FROM area_assignment WHERE area_id = $1 and vehicle_id = $2", [area, vehicle]);
    //if no assignment
    if (results.rows.length < 1) {
      res.status(400).send({ message: "There are no such assign" });
      return;
    }
    //delete row
    await query("DELETE FROM area_assignment WHERE area_id = $1 and vehicle_id = $2", [area, vehicle]);
  } catch (e) {
    res.status(400).send({ message: "Error" });
    return;
  }
  //200 success
  res.status(200).send({});
}
export default async function call_area_vehicle(req:NextApiRequest,res:NextApiResponse){
  switch (req.method) {
    case "GET":
      await get_area_vehicle(req, res);
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