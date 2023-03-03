

import { Db } from "@/libs/db"
import { NextApiRequest, NextApiResponse } from "next"
import Authorization from "@/middlewares/authorization"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') return res.status(405).end()
    const auth = await Authorization(req, res)
    // kita bisa extract dari objek req.body.title menjadi

    const { title, content , email } = req.body
    
    const checkEmail = await Db('title').where({ email }).first()
    if (checkEmail) {
      return res.status(401).json({
        message: 'Email sudah terdaftar, silahkan masukkan email yang lain'
      });
    }

    const create = await Db('title').insert({
      title,
      content,
      email
    }).returning('*')
     
     const createData = await Db('title').where('id', create[0].id).first()
     res.status(200)
     res.json({
         message: 'post successfully', 
         data: createData
     })
}