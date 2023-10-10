import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import * as jose from "jose"
import {URL} from '../config'

function Login (props) {
const [login, SetLogin] = useState(
    {identifier: "", password: ""})

const [message,setMessage] = useState("")

const navigate = useNavigate();
const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    SetLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try{const response = await axios.post(`${URL}/user/login`, login);
    if(response.data.ok){
        let decodedToken = jose.decodeJwt(response.data.token);
        console.log(
            "Email extracted from the JWT token after login: ",
            decodedToken.userId
          );  }

          setMessage(response.data.message)
          if (response.data.token) {
            props.login(response.data.token);
            setTimeout(() => {
              setMessage('');
              navigate('/boards/home');
            }, 2000);
          }
          else{
            SetLogin({ identifier:"", password:""})
          }
    }
    catch(e){
        console.log(e)
      }
}

useEffect(()=>{})

    return(
        <>
        <div className = "register-container">
        <h3>Welcome</h3>
        <h5>Please fill in all the fields to login into your account</h5>
        <form onChange={handleChange} onSubmit={handleSubmit}>
        <div>
        <label>Email or username</label>
        <input className='input'
        type="text"
        name="identifier"
        onFocus={() => SetLogin({ ...login, identifier: '' })} value={login.identifier}  />
        </div>
        <div>
        <label>Password</label>
        <input className='input'
        type="password"
        name="password"
        onFocus={() => SetLogin({ ...login, password: '' })} value={login.password} />
        </div>
        <div>
        <button type="submit">Login</button>
        </div>
        </form>
        </div>
        <h5>...or feel free to <NavLink to="/user/register">Register</NavLink> if you don't have an account yet!</h5>
        <p>{message}</p>
        </>

    )
}
export default Login