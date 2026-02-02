'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const mailRef = useRef();
  const passwordRef = useRef();
  
  const router = useRouter();
  const { login } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      
      const email = mailRef.current.value;
      const password = passwordRef.current.value;
      await login(email, password);
      router.push('/'); 
    } catch (err) {
      setError(err.message || 'Failed to login');
    }
    setLoading(false);
  }

  const inputStyle = "w-full bg-white/20 border-none outline-none text-white placeholder-gray-300 px-6 py-3 rounded-full mb-4 focus:ring-2 focus:ring-white/50 transition-all";

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden font-sans'>

      {/* Decorative Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* GLASS CARD CONTAINER */}
      <div className='relative w-full max-w-5xl h-auto md:h-[600px] bg-white/10 backdrop-blur-2xl rounded-[40px] border border-transparent shadow-2xl flex flex-col md:flex-row overflow-hidden p-6 md:p-8'>

        {/* LEFT COLUMN: Branding & Text */}
        <div className='w-full md:w-1/2 flex flex-col justify-between p-6 md:p-10 text-white z-10 mb-6 md:mb-0'>
          <h2 className='text-3xl font-extrabold tracking-wide uppercase'>Accelerate</h2>

          <div className='mt-6 md:mt-0'>
            <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-4'>
              Move Fast. <br /> Dress Bold.
            </h1>
            <p className='text-gray-300 text-sm md:text-base leading-relaxed max-w-sm'>
              Accelerate isn’t just clothing—it’s a lifestyle. Designed for those who chase adventure, embrace individuality, and never settle for ordinary.
            </p>
          </div>

        </div>

        {/* CENTER DIVIDER LINE */}
        <div className='hidden md:block w-1 h-[80%] bg-white rounded-full self-center mx-4'></div>

        {/* RIGHT COLUMN: Login Form */}
        <div className='w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12 z-10'>
          
          <h2 className='text-3xl text-white text-center mb-8 font-medium'>Login</h2>
          
          {error && <p className='bg-red-500/80 text-white text-sm p-2 rounded-lg text-center mb-4'>{error}</p>}

          <form onSubmit={handleSubmit} className='flex flex-col'>
            
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              className={inputStyle} 
              ref={mailRef}
            /> 
            
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              className={inputStyle} 
              ref={passwordRef}
            />
            
            <button 
              disabled={loading} 
              type="submit" 
              className='mt-4 w-full md:w-1/2 mx-auto bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-full transition duration-300 ease-in-out shadow-lg backdrop-blur-sm'
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className='text-center mt-6 text-gray-400 text-xs'>
            Dont have an account? <Link href="/signup" className='text-white underline hover:text-gray-200'>Sign Up Here</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
