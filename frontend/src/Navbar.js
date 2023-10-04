import React from "react";
import { NavLink } from "react-router-dom";
import './App.css'
import logo from './assets/ezgif.com-webp-to-jpg.jpg'
const NavBar = (props) => {
    return (
      <div className = 'nav'>
       <ul >
        <div className="left-side">
            <img src={logo} alt='logo'></img>
        <li>
          <NavLink to="/boards/add">
            Create
          </NavLink>
          </li>
          </div>
          <div className="right-side">
            <li>
          <NavLink to="/user/login">
            Login
            </NavLink>
          </li>
          <li>
          <NavLink to="/user/register">
          Register
          </NavLink>
          </li>
          
          </div>
          </ul>
      </div>
    );
  };

export default NavBar