import React from 'react'
import { NavLink, Navigate } from "react-router-dom";
import bubliks from '../assets/ezgif.com-webp-to-jpg_1.jpg'
import graph from '../assets/38888.png'
export default function Home() {


  return (
    <div className='homepage'>

        <div className="home-container">
        <div className="image-container">
        <img className='imagehome' src={bubliks} alt='cat'></img>
        <img className='imagehome2' src={graph} alt='graph'></img>
        </div>
      
        <div className="text-container"> 
            <h1>Hello! Welcome to the Productivity Portal!!</h1>
            <h3 >Please <NavLink className='link' to="/user/login">Login</NavLink> or <NavLink className='link'to="/user/register">Register</NavLink> to start working</h3>
        </div>
    </div>
    </div>
  )
}
