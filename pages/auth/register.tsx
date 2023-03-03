import React, {useState, ChangeEvent} from 'react'
import { NextPageContext } from 'next';
import { AuthPage } from '@/middlewares/authPage'




export async function getServerSideProps(ctx :NextPageContext){
    await AuthPage(ctx)
    return {
        props: {},
    };
}

const Register = () => {

    const [inputs, setFields] = useState({
        email:'',
        password: ''
    })

    const [status, setStatus] = useState('')
    async function registerHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        
        setStatus('Loading...')
        const registerRequest = await fetch('/api/auth/register', {
            method: 'POST',
            // karena inputs berupa objek maka wajib di JSON.string
            body: JSON.stringify(inputs),
            headers : {
                'Content-Type': 'application/json'
            }
        })
        const registerResponse = await registerRequest.json()
        setStatus('Succeed')
    }

    function fieldHandler(e: ChangeEvent<HTMLInputElement>) {
        const nama = e.target.name // or const nama = e.target.getAttribute('name')
        setFields({
            ...inputs,
            [nama]:e.target.value
        })
    }
  return (
    <>
        <h1>Register</h1>
        <form onSubmit={registerHandler.bind(this)}>
            <input type="text" name="email" placeholder='email' className='form-control' onChange={fieldHandler.bind(this)}/><br/>
            <input type="password" name="password" placeholder='password' className='form-control'onChange={fieldHandler.bind(this)} /><br/>
            <button type='submit' className='btn btn-sm btn-primary'>Register</button>
        </form>
        <div>{status}</div>
    </>
    
  )
}

export default Register