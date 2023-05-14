import { NextApiRequest, NextApiResponse } from "next";
import projectsData from "../../data/projects.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(projectsData);
}
