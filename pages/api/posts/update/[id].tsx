import { Db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";
import Authorization from "@/middlewares/authorization";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== 'PUT') return res.status(405).end()
    
    const auth = await Authorization(req, res)

    const { id } = req.query
    let { title, content, email } = req.body
    let update = await Db('title')
    .where({ id })
    .update({
        title,
        content,
        email
    })
    res.status(200)
    res.json({
        message: "Updated Successfully",
        id
    })
}