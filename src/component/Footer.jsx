"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer" className="relative mt-24 border-t border-gray-200/30 dark:border-white/10 bg-white dark:bg-black print:hidden">
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h4 className="text-2xl font-black uppercase tracking-tighter text-black dark:text-white">Accelerate</h4>
            <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
              Precision crafted apparel for those moving at the speed of tomorrow. Excellence in every stitch.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black dark:text-white mb-6">Discover</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-3">
              <li><Link href="/collection" className="hover:text-black dark:hover:text-white transition-colors">Latest Drops</Link></li>
              <li><Link href="/collection" className="hover:text-black dark:hover:text-white transition-colors">Menswear</Link></li>
              <li><Link href="/collection" className="hover:text-black dark:hover:text-white transition-colors">Performance</Link></li>
              <li><Link href="/collection" className="hover:text-black dark:hover:text-white transition-colors">Limited Series</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black dark:text-white mb-6">Support</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-3">
              <li><Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact Service</Link></li>
              <li><Link href="/shipping" className="hover:text-black dark:hover:text-white transition-colors">Tracking</Link></li>
              <li><Link href="/admin" className="hover:text-black dark:hover:text-white transition-colors text-black/40 dark:text-white/30">Portal</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black dark:text-white mb-6">Stay Connected</h4>
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 rounded-full px-5 py-3 text-sm text-black dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:border-gray-300/30 dark:focus:border-white/30 outline-none transition-all" 
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-white text-black rounded-full text-[10px] font-black uppercase hover:bg-gray-200 transition-colors">
                Join
              </button>
            </form>
            <div className="flex gap-4 mt-6">
               {/* Placeholders for Social Icons */}
              <div className="w-8 h-8 rounded-full bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 flex items-center justify-center hover:bg-white/10 dark:hover:bg-black/10 cursor-pointer transition-all">
                <span className="text-[10px] text-black dark:text-white italic">Ig</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 dark:bg-black/5 border border-gray-200/30 dark:border-white/10 flex items-center justify-center hover:bg-white/10 dark:hover:bg-black/10 cursor-pointer transition-all">
                <span className="text-[10px] text-black dark:text-white italic">Tw</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200/30 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} Accelerate Studios. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">
            <Link href="/privacy" className="hover:text-black dark:hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-black dark:hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}