import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const repoUrl = req.query.repoUrl;
    // @ts-ignore
    const starsRes = await fetch(repoUrl, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: "token " + process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        },
      });
    if (!starsRes.ok) {
        return res.status(200).json(0);
    }
    const projectDetail = await starsRes.json();

    return res.status(200).json({
        stars: projectDetail.stargazers_count,
        html_url: projectDetail.html_url,
    });
}