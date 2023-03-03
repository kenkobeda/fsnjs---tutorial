import React, {ChangeEvent, useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next'
import { AuthPage } from '@/middlewares/authPage'

export async function getServerSideProps(ctx :NextPageContext){
    await AuthPage(ctx)
    return {
        props: {},
    };
}

export default function Login() {

    const [fields, setFields] = useState({
        email:'',
        password: ''
    })
    const router = useRouter()
    const [status, setStatus] = useState('')
  
    async function loginHandler(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setStatus('Loading....')
        const loginRequest = await fetch('/api/auth/login',{
            method: 'POST',
            body: JSON.stringify(fields),
            headers: { 'Content-Type': 'Application/json'}
        })
        if(!loginRequest.ok) {
            try {
                const errorResponse = await loginRequest.json()
                const errorMessage = errorResponse.message || 'Terjadi kesalahan'
                setStatus(`Error : ${loginRequest.status}: ${errorMessage}`)
            } catch(error) {
                setStatus('Error : Terjadi kesalahan saat mengambil respons dari server.');
            }
            return
        }

        const loginResponse = await loginRequest.json()
        setStatus(`Success`)
        Cookie.set('token', loginResponse.token)
        router.push('/posts')

    }
    function fildsHanler(e:ChangeEvent<HTMLInputElement>){
        const nama = e.target.name

        setFields({
            ...fields,
            [nama]:e.target.value
        })
    }
    return (
        <>
            <h1>Login</h1>
            {status === "Loading...." ? (
                <div className="spinner-border"></div>
                ) : status.includes("Success") ? (
                <div className="alert alert-success">{status}</div>
                ) : status.includes("Error ") ?(
                <div className="alert alert-danger">{status}</div>
                ): ''}
            <form onSubmit={loginHandler}>
                <input type="text" name='email' placeholder='email' className='form-control' onChange={fildsHanler}/>
                <input type="password" name='password' placeholder='password' className='form-control' onChange={fildsHanler}/>
                <button type='submit' >Login</button>
            </form>
        </>
    )
}