import React from "react";
import { useState } from "react";
import {assets} from '../assets/assets.js';
import { NavLink } from "react-router-dom";

export default function Navbar() {

  const [visible, setVisible] = useState(false);
  return (
    <nav className="bg-white flex justify-between px-4 py-1 shadow-md items-center">
      <img src={assets.logo} alt="logo" className="w-36" />
      <div className="hidden sm:flex space-x-4  text-sm sm:text-base">
        <NavLink to="/Home" className="hover:text-blue-600">Home</NavLink>
        <NavLink to="/Collection" className="hover:text-blue-600">Collection</NavLink>
        <NavLink to="/Contact" className="hover:text-blue-600">Contact</NavLink>
        <NavLink to="/About" className="hover:text-blue-600">About</NavLink>
      </div>
      <div className="flex items-center gap-6">
          <img src={assets.search_icon} alt="search" className="w-5 cursor-pointer" />
          <div className="group relative">
            <img src={assets.profile_icon} alt="profile" className="cursor-pointer w-5" />
            <div className="hidden group-hover:block absolute dropdown-menu right-0 pt-0 text-gray-500 bg-slate-100 rounded">
              <div className="flex flex-col gap-2 w-36 py-3 text-center">
                <p className="cursor-pointer hover:text-black">MY Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          </div>
          <a href="/cart" className="relative">
            <img src={assets.cart_icon} alt="cart" className="w-5 cursor-pointer min-w-5" />
            <p className="absolute text-center bg-black text-white rounded-full w-4 text-[8px] right-[-5px] bottom-[-5px] leading-4 aspect--square ">10</p>
          </a>
          <img onClick={() => {setVisible(true)}} src={assets.menu_icon} alt="menu" className="w-5 cursor-pointer sm:hidden" />
      </div>


      {/*side bar for Mobile */}
        <div className={`absolute top-0 right-0 bg-white bottom-0 overflow-hidden transition-all ${visible ? 'w-full' : 'w-0'} `}>
          <div className="flex flex-col text-gray-600">
            <div onClick={() => {setVisible(false)}} className="flex items-center gap-4 p-3">
              <img src={assets.dropdown_icon} alt="logo" className="h-4 rotate-180" />
              <p>Back</p>
            </div>
            <NavLink onClick={() => {setVisible(false)}} to="/Home" className="py-2 pl-6 border">Home</NavLink>
            <NavLink onClick={() => {setVisible(false)}} to="/Collection" className="py-2 pl-6 border">Collection</NavLink>
            <NavLink onClick={() => {setVisible(false)}} to="/Contact" className="py-2 pl-6 border">Contact</NavLink>
            <NavLink onClick={() => {setVisible(false)}} to="/About" className="py-2 pl-6 border">About</NavLink>
          </div>
        </div>

    </nav>
  );
}
