import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/postgres";

export default async function AssignmentMCPCurrentCap(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await getMCPCurrentCap(req, res);
      break;
    case "POST":
      await updateMCPCurrentCap(req, res);
      break;
    default:
      res.status(404).send({ message: "Method not found" });
      break;
  }
}

async function getMCPCurrentCap(req: NextApiRequest, res: NextApiResponse) {
  try {
    let results = await query("SELECT id as mcp_id, current_cap FROM mcp ORDER BY id ASC;");
    res.status(200).send(results.rows);
  } catch (e) {
    res.status(500).send({});
    return;
  }
}

async function updateMCPCurrentCap(req: NextApiRequest, res: NextApiResponse) {
  let mcp = req.query["mcp_id"];
  let current_cap = req.query["current_cap"];
  //check not null
  if (!mcp || !current_cap) {
    res.status(400).send({ message: "Input should not null" });
    return;
  }
  //check mcp string
  if (mcp instanceof Array<String>) {
    res.status(400).send({ message: "mcp should be a number" });
    return;
  }
  //check mcp is number
  let parsedNumber = parseInt(mcp);
  if (!parsedNumber) {
    res.status(400).send({ message: "mcp should be a number" });
    return;
  }
  //check current_cap is string
  if (current_cap instanceof Array<String>) {
    res.status(400).send({ message: "current_cap should be a number" });
    return;
  }
  //check current_cap is number not negative
  parsedNumber = parseInt(current_cap);
  if (parsedNumber < 0) {
    res.status(400).send({ message: "current_cap cannot be a negative number" });
    return;
  }
  try {
    //select query
    let result_mcp = await query("SELECT max_cap FROM mcp WHERE id = $1 ", [mcp]);
    //check if mcp are existed
    if (result_mcp.rows.length != 1) {
      res.status(400).send({ message: "mcp is not correct" });
      return;
    }
    //check if current_cap is larger than max_cap
    if (result_mcp.rows[0]["max_cap"] < current_cap) {
        res.status(400).send({ message: "current_cap can't over max_cap" })
    }
    //update current_cap into mcp
    await query("UPDATE mcp SET current_cap = $1 WHERE id = $2;", [current_cap, mcp]);
  } catch (e) {
    res.status(400).send({ message: "Error" });
    return;
  }
  //200 success
  res.status(200).send({});
}