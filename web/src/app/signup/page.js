'use client'
import React, { useState } from 'react'
import { useRef  } from "react";
import { useAuth } from '../../context/AuthContext'; 
import { useRouter } from 'next/navigation'; // <-- Import useRouter


export default function SignUp() {

let nameRef = useRef();
let mailRef = useRef();
let passwordRef =useRef();
let confirmPasswordRef =useRef();
  const router = useRouter(); // <-- Use the Next.js router
const { signup } = useAuth();
const [Error,setError]=useState('')

const[Loading,setLoading]=useState(false)


async function handleSubmit(e){
  e.preventDefault()

  if(passwordRef.current.value !==
     confirmPasswordRef.current.value){
      return setError("Password dont match")
  }
  try
  {
  setError('')
  setLoading(true)
  await signup(mailRef.current.value, passwordRef.current.value)
    router.push('/'); // <-- Use router.push() to navigate
  
}catch(err){
  setError(err.message);
}
  setLoading(false)
}




  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100 '>
      {Error && <p className='bg-red-500 text-white p-2 rounded'>{Error}</p>}
      <form action="Signup" onSubmit={handleSubmit} method='POST'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Sign Up</h1>
          <div>
            <label htmlFor="username" className='label-style'>Username</label>
            <input type="text" name="username" placeholder="Username" required className='input-style' ref={nameRef} />
          </div>
          <div>
            <label htmlFor="email" className='label-style'>Email</label>
            <input type="email" name="email" placeholder="Email" required className='input-style' ref={mailRef}/> 
          </div>   
          <div>
            <label htmlFor="password" className='label-style'>Password</label>
            <input type="password" name="password" placeholder="Password" required className='input-style' ref={passwordRef}/>
            <br />
            <label htmlFor="confirmPassword" className='label-style'>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required className='input-style' ref={confirmPasswordRef} />
          </div>
          <button disabled={Loading} type="submit" className='button-style'>Sign Up</button>
      </form>


      <div className='text-center mt-4'>
        Already have an account? <a href="/login">Login</a>
      </div>
      </div>
  )
}
