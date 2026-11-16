'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext'; // Ensure this path is correct for your project

export default function SignUp() {
  const nameRef = useRef();
  const mailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  
  const router = useRouter();
  const { register } = useAuth();
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError('');
      setLoading(true);
      const email = mailRef.current.value;
      const name = nameRef.current.value || email.split('@')[0];
      await register(name, email, passwordRef.current.value);
      router.push('/'); 
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  // Styles: light-mode inputs are dark text, glass background; dark-mode preserved
  const inputStyle = "w-full bg-white/5 dark:bg-black/50 border border-gray-200/30 dark:border-white/10 text-black dark:text-white placeholder-gray-600 dark:placeholder-gray-300 px-6 py-3 rounded-full mb-4 outline-none focus:ring-2 focus:ring-emerald-200 transition-all";
  
  return (
    // MAIN BACKGROUND: light-mode matches other pages; dark-mode preserved
    <div className='min-h-screen w-full flex items-center justify-center bg-white text-black dark:bg-black dark:text-white relative overflow-hidden font-sans'>
      
      {/* Decorative Gradient Blobs (Simulating the background waves) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      {/* GLASS CARD CONTAINER */}
      <div className='relative w-full max-w-5xl h-auto md:h-[600px] bg-white/10 backdrop-blur-2xl rounded-[40px] border border-gray-200/30 dark:border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden p-8'>
        
        {/* LEFT COLUMN: Branding & Text */}
        <div className='w-full md:w-1/2 flex flex-col justify-between p-6 md:p-10 text-black dark:text-white z-10'>
          {/* Logo Text */}
          <h2 className='text-3xl font-extrabold tracking-wide uppercase'>Ryvan</h2>
          
          {/* Middle Content */}
          <div className='mt-10 md:mt-0'>
            <h1 className='text-5xl font-bold leading-tight mb-6'>
              Find Your Fit. <br /> Dress With Confidence.
            </h1>
            <p className='text-gray-300 text-sm leading-relaxed max-w-sm'>
              Build a wardrobe with premium fashion, comfortable fits, and versatile streetwear made for everyday life.
            </p>
          </div>

          
        </div>


        {/* CENTER DIVIDER LINE (theme-aware) */}
        <div className='hidden md:block w-1 h-[80%] bg-black/15 dark:bg-white/30 rounded-full self-center mx-4'></div>

        {/* RIGHT COLUMN: Form */}
        <div className='w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12 z-10'>
          
          <h2 className='text-3xl text-black dark:text-white text-center mb-8 font-medium'>Sign Up</h2>
          
          {error && <p className='bg-red-500/80 text-white text-sm p-2 rounded-lg text-center mb-4'>{error}</p>}

          <form onSubmit={handleSubmit} className='flex flex-col'>
            
            <input 
              type="text" 
              placeholder="Username" 
              required 
              className={inputStyle} 
              ref={nameRef} 
            />

            <input 
              type="email" 
              placeholder="Email" 
              required 
              className={inputStyle} 
              ref={mailRef}
            /> 
            
            <input 
              type="password" 
              placeholder="Password" 
              required 
              className={inputStyle} 
              ref={passwordRef}
            />
            
            <input 
              type="password" 
              placeholder="Confirm Password" 
              required 
              className={inputStyle} 
              ref={confirmPasswordRef} 
            />

            <button 
              disabled={loading} 
              type="submit" 
              className='mt-4 w-full md:w-1/2 mx-auto bg-white text-black dark:bg-emerald-400 dark:text-black font-semibold py-3 rounded-full transition duration-300 ease-in-out shadow-md backdrop-blur-sm'
            >
              {loading ? 'Processing...' : 'Sign Up'}
            </button>
          </form>

          <div className='text-center mt-6 text-gray-400 text-xs'>
             Already shopping with Ryvan? <a href="/login" className='text-gray-200 underline hover:text-gray-950'>Sign In Here</a>
          </div>

        </div>
      </div>
    </div>
  )
}