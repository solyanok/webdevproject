import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
    return (
      <div className = 'navbar'>
       <ul>
        <li>
          <NavLink to="/boards/add">
            Create
          </NavLink>
          </li>
          <li>
          Profile
          </li>
          </ul>
      </div>
    );
  };

export default NavBar