import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";
import { parseCookies, setCookie, destroyCookie } from "nookies";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let cookie = parseCookies({req});
  console.log(cookie);
  if(cookie["API_TOKEN"]){
    destroyCookie({res},"API_TOKEN");
    res.status(400).send({});
    return;
  }
  try{
    let results = await query ('SELECT A.name as areaname,B.vehicle_id as vehicleid FROM area A,area_assignment B WHERE B.area_id=A.id');
    if(results.rows.length==0){
      res.send("Chua co area nao duoc gan vehicle");
      return;
    }
    for(var i = 0; i< results.rows.length; i++){
      console.log(results.rows[i].areaname);
      console.log(results.rows[i].vehicleid);
    }
  }
  catch{
    res.status(500).send({});
    return;
  }
  setCookie({res},"API_TOKEN","123456",{
    maxAge: 60*2
  })
  res.status(200).send({});
}

