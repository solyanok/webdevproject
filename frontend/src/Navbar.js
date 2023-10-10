import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import './App.css'
import logo from './assets/ezgif.com-webp-to-jpg.jpg'
const NavBar = (props) => {
    
    return (
        <div className="nav">
        <ul>
          <div className="left-side">
         {props.isLoggedIn && <img className='imagenavbar' src={logo} alt='logo'></img>}
              <li>
              <NavLink to={props.isLoggedIn ? "/boards/add" : "/user/login"}>
              Create
            </NavLink>
              </li>
            
          </div>
          <div className="right-side">
            {props.isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/user/update">Profile</NavLink>
                </li>
                <li>
                  <button className='logout' onClick={props.logout} type="button">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/user/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/user/register">Register</NavLink>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    );
  };
  
export default NavBar