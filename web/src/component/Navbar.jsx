'use client';
import React, { useState } from "react";
import { assets } from '../assets/assets.js';
import Link from "next/link";
import { useAuth} from "../context/AuthContext"; 
import Image from "next/image";
export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const { logout } = useAuth();

  return (
    <nav className="bg-white flex justify-between px-4 py-1 shadow-md items-center">
    <Link href="/">
    <Image src={assets.logo} alt="logo" className="w-36" />
    </Link>     
<div className="hidden sm:flex space-x-4 text-sm sm:text-base">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/signup" className="hover:text-blue-600">SignUp</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        <Link href="/about" className="hover:text-blue-600">About</Link>
      </div>
      <div className="flex items-center gap-6">
        <Image src={assets.search_icon} alt="search" className="w-5 cursor-pointer" />
        <div className="group relative">
          <Image src={assets.profile_icon} alt="profile" className="cursor-pointer w-5" />
          <div className="hidden group-hover:block absolute right-0 pt-0 text-gray-500 bg-slate-100 rounded">
            <div className="flex flex-col gap-2 w-36 py-3 text-center">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link href="cart" className="relative">
          <Image src={assets.cart_icon} alt="cart" className="w-5 cursor-pointer min-w-5" />
          <p className="absolute text-center bg-black text-white rounded-full w-4 text-[8px] right-[-5px] bottom-[-5px] leading-4 aspect-square">10</p>
        </Link>
        <Image onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu" className="w-5 cursor-pointer sm:hidden" />
      </div>

      {/* Side bar for Mobile */}
      <div className={`absolute top-0 right-0 bg-white bottom-0 overflow-hidden transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600" onClick={() => setVisible(false)}>
          <div className="flex items-center gap-4 p-3 cursor-pointer">
            <Image src={assets.dropdown_icon} alt="logo" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <Link href="/" className="py-2 pl-6 border">Home</Link>
          <Link href="/signup" className="py-2 pl-6 border">SignUp</Link>
          <Link href="/contact" className="py-2 pl-6 border">Contact</Link>
          <Link href="/about" className="py-2 pl-6 border">About</Link>
        </div>
      </div>
    </nav>
  );
}
