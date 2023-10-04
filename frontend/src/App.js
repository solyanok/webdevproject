import React, {useEffect, useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Boards from './components/Boards';
import Navbar from './Navbar'
import Register from './components/Register'
import Create from './components/Create'
import Login from './components/Login'
import axios from "axios";

import * as jose from "jose"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post('http://localhost:4040/user/verify_token');
          return response.data.ok ? login(token) : logout();
        }
        } catch (error) {
          console.log(error);
        }
    };
      verify_token();
    }, [token]);

    const login = (token) => {
      let decodedToken = jose.decodeJwt(token);
    let user = {
      userId: decodedToken.userId,
    };
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
   
        <Router>
          <Navbar isLoggedIn={isLoggedIn} />
    <Routes>
    <Route path='/' element={<Boards /> } />
    <Route path='/boards/add' element={isLoggedIn ? (<Create isLoggedIn={isLoggedIn} login={login} user={user} />) : (<Navigate to='/user/login' />) } />
    <Route path='/user/register' element={<Register /> } />
    <Route path='/user/login' element={<Login isLoggedIn={isLoggedIn} login={login} /> } />
   
      

    </Routes>
  </Router>
 

    </div>
  );
}

export default App;
