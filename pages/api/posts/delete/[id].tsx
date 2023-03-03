import { Db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";
import Authorization from "@/middlewares/authorization";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'DELETE') return res.status(405).end()
    const auth = await Authorization(req, res)
    const { id } = req.query

    const Deleted = await Db('title')
    .where({id})
    .del()

    res.status(200)
    res.json({
        message : 'Post Successfully Deleted',
        data: Deleted
    })
}