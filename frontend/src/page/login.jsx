import React, { useState } from 'react'
import { useRef  } from "react";
import { useAuth } from '../context/AuthContext';
import {useHistory} from 'react-router-dom';


export default function Login() {

let mailRef = useRef();
let passwordRef =useRef();
const { login } = useAuth();
const [Error,setError]=useState('')
const history = useHistory();

const[Loading,setLoading]=useState(false)


async function handleSubmit(e){
  e.preventDefault()

  try
  {
  setError('')
  setLoading(true)
  await login(mailRef.current.value, passwordRef.current.value) 
  history.push('/'); // Redirect to home page after login 
}catch(err){
  setError(err.message);
}
  setLoading(false)
}

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100 '>
      {Error && <p className='bg-red-500 text-white p-2 rounded'>{Error}</p>}
      <form action="Signup" onSubmit={handleSubmit} method='POST'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>

          <div>
            <label htmlFor="email" className='label-style'>Email</label>
            <input type="email" name="email" placeholder="Email" required className='input-style' ref={mailRef}/> 
          </div>   
          <div>
            <label htmlFor="password" className='label-style'>Password</label>
            <input type="password" name="password" placeholder="Password" required className='input-style' ref={passwordRef}/>
            <br />
           
          </div>
          <button disabled={Loading} type="submit" className='button-style'>Login</button>
      </form>


      <div className='text-center mt-4'>
        Need an account? <a href="/SignUp">Sign Up</a>
      </div>
      </div>
  )
}
