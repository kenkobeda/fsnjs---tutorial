import { Db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') return res.status(405).end()

    const { email, password } = req.body
    const checkUser = await Db('users').where({ email }).first()
    if(!checkUser) return res.status(401).json({message:"Email tidak ditemukan atau salah email"})

    const checkPassword = await bcrypt.compare(password, checkUser.password)
    if(!checkPassword) return res.status(401).json({
        message: "Email atau Password Salah"
    })

    const token = jwt.sign({
        id: checkUser.id,
        email: checkUser.email
    }, process.env.SECRETOFKEY as string ,{
        expiresIn: '7d'
    })
    res.status(200)
    res.json({
        message : "Login Successfully",
        token
    })
}