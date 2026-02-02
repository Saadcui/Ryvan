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

  // Styles matched to the reference image
  const inputStyle = "w-full bg-white/20 border-none outline-none text-white placeholder-gray-300 px-6 py-3 rounded-full mb-4 focus:ring-2 focus:ring-white/50 transition-all";
  
  return (
    // MAIN BACKGROUND: Black with subtle green/blue gradients to match the waves in the image
    <div className='min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden font-sans'>
      
      {/* Decorative Gradient Blobs (Simulating the background waves) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      {/* GLASS CARD CONTAINER */}
      <div className='relative w-full max-w-5xl h-auto md:h-[600px] bg-white/10 backdrop-blur-2xl rounded-[40px] border border-transparent shadow-2xl flex flex-col md:flex-row overflow-hidden p-8'>
        
        {/* LEFT COLUMN: Branding & Text */}
        <div className='w-full md:w-1/2 flex flex-col justify-between p-6 md:p-10 text-white z-10'>
          {/* Logo Text */}
          <h2 className='text-3xl font-extrabold tracking-wide uppercase'>Accelerate</h2>
          
          {/* Middle Content */}
          <div className='mt-10 md:mt-0'>
            <h1 className='text-5xl font-bold leading-tight mb-6'>
              Move Fast. <br /> Dress Bold.
            </h1>
            <p className='text-gray-300 text-sm leading-relaxed max-w-sm'>
              Accelerate isn’t just clothing—it’s a lifestyle. Designed for those who chase adventure, embrace individuality, and never settle for ordinary. Our collection blends bold design, ultimate comfort, and unmatched quality—so you can look as fast as you feel.  
            </p>
          </div>

          {/* Footer Link */}
          <div className='mt-10'>
            <p className='text-sm text-gray-400'>www.acceleratebrand.com</p>
          </div>
        </div>


        {/* CENTER DIVIDER LINE */}
        <div className='hidden md:block w-1 h-[80%] bg-white rounded-full self-center mx-4'></div>

        {/* RIGHT COLUMN: Form */}
        <div className='w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12 z-10'>
          
          <h2 className='text-3xl text-white text-center mb-8 font-medium'>Sign Up</h2>
          
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
              className='mt-4 w-full md:w-1/2 mx-auto bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-full transition duration-300 ease-in-out shadow-lg backdrop-blur-sm'
            >
              {loading ? 'Processing...' : 'Sign Up'}
            </button>
          </form>

          <div className='text-center mt-6 text-gray-400 text-xs'>
             Already have an account? <a href="/login" className='text-white underline hover:text-gray-200'>Login Here</a>
          </div>

        </div>
      </div>
    </div>
  )
}