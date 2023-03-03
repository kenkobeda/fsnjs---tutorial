import { NextPageContext } from "next";
import { AuthPost } from '../../middlewares/authPage';
import { useRouter } from "next/router";
import React, {useState, useEffect} from 'react';
import Nav from "@/components/nav";


export async function getServerSideProps(ctx :NextPageContext){


    const { token } = await AuthPost(ctx) as AuthResponse
    
    const postRequestKeAPi = await fetch('http://localhost:3000/api/posts/select', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const dataPost = await postRequestKeAPi.json()
    return {
        props: {
            dataPost : dataPost.data,
            token
        }
    };
}

export default function PostIndex({ dataPost, token } : PostIndexProps) {
    const router = useRouter()
    const [status, setStatus] = useState('')
    const [ posted, setPosted] = useState(dataPost)
    const handleEdit = (id :number) => {
        router.push(`/posts/edit/${id}`)
    }
    
    async function handleDelete(id:number, e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const ask = confirm('Apakah Data Akan Dihapus ?')
        if(ask){
            
            setStatus('Loading')
            const deletePost = await fetch(`/api/posts/delete/${id}`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${ token }`
                }
            })
            const resDeletePost = await deletePost.json()
            setStatus(`Post has been successfully deleted`)
            const filterPost = posted.filter(kontol => {
                return kontol.id !== id && kontol
            })
            setPosted(filterPost)
            // setTimeout(() => {
            //     router.push('/posts')
            // }, 1000)
        }
        
    }
    function onClose() {
        setStatus('')
    }
    return (
        <>
            <h1>Home Posts</h1>
            <Nav/>
            <div className="container">
            {status === "Loading" ? (
                <div className="spinner-border"></div>
                ) : status.includes("Post ") ? (
                <div className="alert alert-success alert-dismissible fade show">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
                    {status}
                </div>
                ) : ''}
                <table className="table table-responsive table-stripped">
                    <tbody>
                    {posted.map((data : Post)=>(
                        <tr key={data.id}>
                            <td>{data.title}</td>
                            <td>{data.content}</td>
                            <td>{data.email}</td>
                            <td>{data.created_at}</td>
                            <td>{data.updated_at}</td>
                            <td><button onClick={() => handleEdit(data.id)} className="btn btn-xs btn-outline-warning">edit</button></td>
                            <td><button onClick={(e) => handleDelete(data.id, e)} className="btn btn-xs btn-outline-danger">delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

interface AuthResponse {
    token: string;
}
interface Post {
    id: number
    title: string
    content: string
    email: string
    created_at: string
    updated_at: string
}

interface PostIndexProps {
    dataPost : Post[]
    token: string
}