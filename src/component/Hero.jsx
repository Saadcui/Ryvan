import React from 'react';
import { assets } from '../assets/assets.js';
import Image from 'next/image';
import Link from 'next/link';

function Hero() {
  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
      
      {/* 1. BACKGROUND AESTHETIC - Matching your Accelerate theme */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 2. MAIN HERO CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-stretch rounded-[40px] border border-gray-200/30 dark:border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
        
        {/* LEFT CONTENT AREA */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-gradient-to-br from-white/5 to-transparent">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-px bg-emerald-400"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
                Performance Series 2026
              </p>
            </div>
            
             <h1 className="text-5xl md:text-7xl font-extrabold text-black dark:text-white tracking-tighter leading-[0.9] italic uppercase">
              Accelerate <br /> 
              <span className="text-gray-600 dark:text-gray-400 not-italic">Your Pace</span>
            </h1>

            <p className="max-w-md text-sm text-gray-400 leading-relaxed font-medium">
              Precision-engineered apparel designed for high-velocity movement. 
              Experience the fusion of glass-morphism aesthetics and elite performance fabric.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <Link 
                href="/collection" 
                className="px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Shop Collection
              </Link>
              <div className="flex items-center gap-2 group cursor-pointer">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white">View Lookbook</p>
                 <span className="w-8 h-px bg-white group-hover:w-12 transition-all"></span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL AREA */}
        <div className="flex-1 relative min-h-[400px] md:min-h-full overflow-hidden bg-black/40">
          {/* Using a high-quality placeholder that fits the dark/tech aesthetic */}
          <Image 
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
            src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg" 
            alt="High performance streetwear" 
            fill
            priority
          />
          {/* Glass Overlay on Image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent md:from-black/20"></div>
          
          {/* Floating Badge */}
          <div className="absolute bottom-8 right-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-gray-200/30 dark:border-white/20">
             <p className="text-[9px] font-black text-white uppercase tracking-tighter mb-1">New Drop</p>
             <p className="text-xl font-bold text-white italic">001_v2</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;

