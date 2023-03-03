
import React, { useState, ChangeEvent } from 'react'
import { AuthPost } from '@/middlewares/authPage'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import Cookie from 'js-cookie'

export async function getServerSideProps(ctx:NextPageContext){

    const { token } = await AuthPost(ctx) as AuthResponse
    return {
        props : {
            token
        }
    }
}

const CreatePost = ({token} : AuthResponse) => {
    const [fields, setFields] = useState({
        title: '',
        content: '',
        email: ''
    })
    const [status, setStatus] = useState('')
    const router = useRouter()

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setStatus('Loading')
        

        // const getToken  = Cookie.get('token')
        const cFrom = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : `application/json`
            },
            body: JSON.stringify(fields),
        })
        if(!cFrom.ok) {
            try {
                const errorRes = await cFrom.json()
                const errorPes = errorRes.message
                setStatus(`Error : ${cFrom.status}, ${errorPes}`)
            } catch (error) {
                setStatus('Error : Terjadi Kesalahan Mengambil Data di Server')
            }
        } else {
            const berhasil = await cFrom.json()
            setStatus('Success')
            router.push('/posts')
        }
        
    }

    function handleChange(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const namaInput = e.target.name
        setFields({
            ...fields,
            [namaInput]: e.target.value
        })
    }

    return (
        <>
            <h1>Create A Post</h1>
            <Link href={'/posts'}>Back to Posts</Link>
            {status === "Loading" ? (
                <div className="spinner-border"></div>
                ) : status.includes("Success") ? (
                <div className="alert alert-success">{status}</div>
                ) : status.includes("Error ") ?(
                <div className="alert alert-danger">{status}</div>
                ): ''}
            <form onSubmit={handleSubmit}>
                <input type="text" name='title' placeholder='title' className='form-control' onChange={handleChange} required/>
                <textarea name='content' placeholder='content' className='form-control' onChange={handleChange} required></textarea>
                <input type="text" name='email' placeholder='email' className='form-control' onChange={handleChange} required/>
                <button type='submit' className='btn btn-lg btn-dark'>Create</button>
            </form>
        </>
    )
}

export default CreatePost

interface AuthResponse {
    token: string;
}