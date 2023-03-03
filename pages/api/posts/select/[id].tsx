import { Db } from "@/libs/db"
import { NextApiRequest, NextApiResponse } from "next"
import Authorization from '@/middlewares/authorization';



export default async function handler(req: NextApiRequest, res:NextApiResponse){
    if(req.method !== 'GET') return res.status(401).end()

    const auth = await Authorization(req, res)
    const { id }  = req.query
    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ message: 'Invalid ID' })
    }
    try {
        const tarikData = await Db('title').where({id}).first()
        if(!tarikData) return res.status(400).json({message: 'Data Not Found'})
        res.status(200)
        res.json({
            message: "Select By Id Successfully",
            data: tarikData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
    
}
