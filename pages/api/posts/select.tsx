
import { Db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";
import Authorization from "@/middlewares/authorization";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'GET') return res.status(405).end()

    const auth = await Authorization(req, res)
    const ambilData = await Db('title')
    res.status(200)
    res.json({
        message: "Post Data",
        data: ambilData
    })
}