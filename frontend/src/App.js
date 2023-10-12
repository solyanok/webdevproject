import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Boards from "./components/Boards";
import Navbar from "./Navbar";
import Register from "./components/Register";
import Create from "./components/Create";
import Login from "./components/Login";
import Profile from "./components/Profile";
import axios from "axios";
import Private from "./components/Private";

import * as jose from "jose";
import Home from "./components/Home";
import { URL } from "./config";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/user/verify_token`);
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
      username: decodedToken.username,
      email: decodedToken.email,
      password: decodedToken.password,
    };
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn !== null && (
        <Router>
          {isLoggedIn ? (
            <Navbar isLoggedIn={isLoggedIn} logout={logout} />
          ) : (
            <Navbar isLoggedIn={false} />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/register" element={<Register />} />
            <Route
              path="/user/login"
              element={<Login isLoggedIn={isLoggedIn} login={login} />}
            />
            <Route
              path="/boards/home"
              element={
                isLoggedIn ? (
                  <Boards isLoggedIn={isLoggedIn} user={user} />
                ) : (
                  <Navigate to="/user/login" />
                )
              }
            />
            <Route
              path="/boards/add"
              element={
                isLoggedIn ? (
                  <Create isLoggedIn={isLoggedIn} login={login} user={user} />
                ) : (
                  <Navigate to="/user/login" />
                )
              }
            />
            <Route
              path="/user/update"
              element={
                <Private setIsLoggedIn={setIsLoggedIn} logout={logout} />
              }
            >
              <Route
                path="/user/update"
                element={
                  <Profile
                    isLoggedIn={isLoggedIn}
                    login={login}
                    user={user}
                    logout={logout}
                  />
                }
              />
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
