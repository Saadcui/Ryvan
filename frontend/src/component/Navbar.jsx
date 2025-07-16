import React from "react";
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <nav className="bg-white flex justify-between px-4 py-1 shadow-md items-center">
      <img src={logo} alt="logo" className="w-36" />
      <div className="space-x-4 text-sm sm:text-base">
        <a href="/Home" className="hover:text-blue-600 underline">Home</a>
        <a href="/Collection" className="hover:text-blue-600 underline">Collection</a>
        <a href="/Contact" className="hover:text-blue-600 underline">Contact</a>
        <a href="/About" className="hover:text-blue-600 underline">About</a>
      </div>
    </nav>
  );
}
