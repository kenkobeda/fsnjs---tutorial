

import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";


export default function Authorization(req: NextApiRequest, res : NextApiResponse) {
    return new Promise((resolve, rejects)=>{
        const { authorization } = req.headers
        if(!authorization) return res.status(402).end()
        const authSplit = authorization.split(' ')
        const [authType, authToken] = [authSplit[0], authSplit[1]]
        if(authType !== 'Bearer') return res.status(402).end()
        return jwt.verify(authToken, process.env.SECRETOFKEY as string, function(err,decoded){
            if(err) return res.status(402).end()
            return resolve(decoded)
        })

    })
    
}