
import React, { useState, ChangeEvent } from 'react'
import { AuthPost } from '@/middlewares/authPage'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import Cookie from 'js-cookie'

export async function getServerSideProps(ctx:NextPageContext){

    const { token } = await AuthPost(ctx) as AuthResponse
    const { id } = ctx.query
    const getPost = await fetch(`http://localhost:3000/api/posts/select/${id}`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    const updateSuccess = await getPost.json()
    return {
        props : {
            token,
            data : updateSuccess.data
        }
    }
}

const PostEdit = ({token, data} : AuthResponse) => {
    const [fields, setFields] = useState({
        title: data.title,
        content: data.content,
        email: data.email
    })
    const [status, setStatus] = useState('')
    const router = useRouter()
    async function updateSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setStatus('Loading')
        

        // const getToken  = Cookie.get('token')
        const update = await fetch(`/api/posts/update/${data.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : `application/json`
            },
            body: JSON.stringify(fields),
        })
        if(!update.ok) {
            try {
                const errorRes = await update.json()
                const errorPes = errorRes.message
                setStatus(`Error : ${update.status}, ${errorPes}`)
            } catch (error) {
                setStatus('Error : Terjadi Kesalahan Mengambil Data di Server')
            }
        } else {
            const berhasil = await update.json()
            setStatus(`Yeay, ${berhasil.message}`)
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
            <h1>Edit Post ID: {data.id}</h1>
            <Link href={'/posts'}>Back to Posts</Link>
            {status === "Loading" ? (
                <div className="spinner-border"></div>
                ) : status.includes("Yeay") ? (
                <div className="alert alert-success">{status}</div>
                ) : status.includes("Error ") ?(
                <div className="alert alert-danger">{status}</div>
                ): ''}
            <form onSubmit={updateSubmit}>
                <input type="text" name='title' placeholder='title' defaultValue={data.title} className='form-control' onChange={handleChange} required/>
                <textarea name='content' placeholder='content' defaultValue={data.content} className='form-control' onChange={handleChange} required></textarea>
                <input type="text" name='email' defaultValue={data.email} placeholder='email' className='form-control' onChange={handleChange} required/>
                <button type='submit' className='btn btn-lg btn-dark'>Edit Post</button>
            </form>
        </>
    )
}

export default PostEdit

interface AuthResponse {
  token: string
  data: Post
}


interface Post {
  id: number
  title: string
  content: string
  email: string
  created_at: string
  updated_at: string
}