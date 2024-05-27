import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "delete_token": process.env.DELETE_SESSION_TOKEN,
        "session_id": req.query.sessionId
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    const result = await fetch(`${process.env.NEXT_PUBLIC_TARS_ENDPOINT}/delete-session`, requestOptions);
    console.log("tars session delete request ", result.status);
    return res.status(result.status);
}