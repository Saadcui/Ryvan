import React from "react";
import {assets} from "../assets/assets"
export default function Navbar() {
return(
    <div className="navbar">
        <img src={assets.logo} className = "w-36" />
    </div>
)
}