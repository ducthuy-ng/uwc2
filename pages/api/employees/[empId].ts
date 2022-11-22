import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/postgres";

type Data = {
  name: string;
};

type Error = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  let { empId } = req.query;

  if (!empId) {
    res.status(400).send({ message: "empId must be specified" });
    return;
  }

  if (empId instanceof Array<String>) {
    res.status(400).send({ message: "empId should be a number" });
    return;
  }

  let parsedEmpId = parseInt(empId);
  if (!parsedEmpId) {
    res.status(400).send({ message: "empId should be a number" });
    return;
  }

  try {
    let result = await query("SELECT * FROM employee WHERE emp_id=$1", [empId]);
    if (result.rows.length != 1) {
      res.status(400).send({ message: `Failed to find employee with ID: ${empId}` });
      return;
    }

    res.status(200).send({ name: result.rows[0]["fullname"] });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
