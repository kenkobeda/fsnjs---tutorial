import { Db } from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== 'POST') return res.status(405).end()
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    
    const registerUser = await Db('users').insert({ email, password: passwordHash }).returning('*')
    const registered = await Db('users').where('id', registerUser[0].id).first()

    res.status(200)
    res.json({
        message: 'User, registered Successfully',
        data: registered
    })
}