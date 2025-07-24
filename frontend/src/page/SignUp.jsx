import React from 'react'


export default function SignUp() {
  
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100 '>
      <form action="Signup" method='POST'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Sign Up</h1>
          <div>
            <label htmlFor="username" className='label-style'>Username</label>
            <input type="text" name="username" placeholder="Username" required className='input-style'/>
          </div>
          <div>
            <label htmlFor="email" className='label-style'>Email</label>
            <input type="email" name="email" placeholder="Email" required className='input-style'/> 
          </div>   
          <div>
            <label htmlFor="password" className='label-style'>Password</label>
            <input type="password" name="password" placeholder="Password" required className='input-style' />
            <br />
            <label htmlFor="confirmPassword" className='label-style'>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required className='input-style' />
          </div>
          <button type="submit" className='button-style'>Sign Up</button>
      </form>


      <div className='text-center mt-4'>
        Already have an account? <a href="/login">Login</a>
      </div>
      </div>
  )
}
