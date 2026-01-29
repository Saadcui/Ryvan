"use client";
import React, { useMemo, useState } from "react";
import { assets } from '../assets/assets.js';
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  
  const showBadge = useMemo(() => Number(cartCount || 0) > 0, [cartCount]);

  // Shared hover and link styles
  const linkStyle = "text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all duration-300";

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 pointer-events-none">
      {/* FLOATING GLASS NAV 
          'pointer-events-auto' allows interaction with the bar while the 
          header padding remains click-through to the background.
      */}
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-transparent shadow-2xl pointer-events-auto">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-2 group">
           <h1 className='text-xl font-extrabold tracking-tighter uppercase text-white group-hover:scale-105 transition-transform'>
             Accelerate
           </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-8">
          <Link href="/" className={linkStyle}>Home</Link>
          <Link href="/collection" className={linkStyle}>Collections</Link>
          <Link href="/#footer" className={linkStyle}>Contact</Link>
          <Link href="/#about" className={linkStyle}>About</Link>
        </div>

        {/* ACTIONS SECTION */}
        <div className="flex items-center gap-3">
          
          {/* Search Icon (Inverted for visibility on dark nav) */}
          <Link href="/collection" aria-label="Search" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Image src={assets.search_icon} alt="search" width={18} height={18} className="brightness-200" />
          </Link>

          {/* USER PROFILE / AUTH */}
          {user ? (
            <div className="group relative">
              <button type="button" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Image src={assets.profile_icon} alt="profile" width={18} height={18} className="brightness-200" />
              </button>
              
              {/* DROPDOWN */}
              <div className="hidden group-hover:block absolute right-0 top-full pt-3">
                <div className="w-48 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden py-2">
                  <Link href="/account" className="block px-5 py-2 text-[10px] font-bold uppercase text-gray-400 hover:text-white hover:bg-white/5">My Profile</Link>
                  <Link href="/orders" className="block px-5 py-2 text-[10px] font-bold uppercase text-gray-400 hover:text-white hover:bg-white/5">Orders</Link>
                  {user?.isAdmin && (
                    <Link href="/admin" className="block px-5 py-2 text-[10px] font-bold uppercase text-emerald-400 hover:bg-white/5">Admin Panel</Link>
                  )}
                  <button onClick={() => logout()} className="w-full text-left px-5 py-2 text-[10px] font-bold uppercase text-red-400 hover:bg-white/5 border-t border-white/5 mt-1">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-widest px-5 py-2.5 bg-white text-black rounded-full hover:bg-gray-200 transition-all active:scale-95">
              Sign In
            </Link>
          )}

          {/* CART */}
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <Image src={assets.cart_icon} alt="cart" width={18} height={18} className="brightness-200" />
            {showBadge && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center bg-white text-black text-[9px] font-black rounded-full ring-2 ring-black">
                {cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setVisible(true)} className="sm:hidden p-2 rounded-full hover:bg-white/10">
            <Image src={assets.menu_icon} alt="menu" width={18} height={18} className="brightness-200" />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setVisible(false)} />
        <div className={`absolute top-0 right-0 h-full w-full max-w-xs bg-black/95 border-l border-white/10 p-8 transition-transform duration-500 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-white font-black uppercase tracking-widest">Accelerate</h2>
            <button onClick={() => setVisible(false)} className="p-2 bg-white/5 rounded-full ring-1 ring-white/10">
              <Image src={assets.cross_icon} alt="close" width={16} height={16} className="brightness-200" />
            </button>
          </div>

          <div className="flex flex-col gap-6 text-2xl font-bold text-white italic">
            <Link href="/" onClick={() => setVisible(false)} className="hover:translate-x-2 transition-transform">Home</Link>
            <Link href="/collection" onClick={() => setVisible(false)} className="hover:translate-x-2 transition-transform">Collections</Link>
            <Link href="/cart" onClick={() => setVisible(false)} className="hover:translate-x-2 transition-transform">Cart</Link>
            
            <div className="h-px bg-white/10 my-4" />
            
            {user ? (
              <>
                <Link href="/orders" onClick={() => setVisible(false)} className="text-sm font-black uppercase not-italic text-gray-400">Orders</Link>
                <button onClick={() => {logout(); setVisible(false)}} className="text-left text-sm font-black uppercase not-italic text-red-500">Logout</button>
              </>
            ) : (
              <Link href="/login" onClick={() => setVisible(false)} className="bg-white text-black text-center py-4 rounded-2xl not-italic text-sm uppercase font-black tracking-widest">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}