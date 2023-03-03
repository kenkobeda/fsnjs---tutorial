import Link from "next/link"
import React from "react"
import {useRouter} from "next/router"
import Cookie from 'js-cookie'

export default function Nav() {

    const router = useRouter()

    function logMeOut(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        Cookie.remove('token')
        router.replace('/auth/login')
    }

    return (
        <>
            <Link href={'/posts/create'} style={{paddingRight:'20px'}}>Create</Link>
            <Link href={'/'} style={{paddingRight:'20px'}}>Home</Link>
            <button onClick={logMeOut}>Logout</button>
        </>
    )
}