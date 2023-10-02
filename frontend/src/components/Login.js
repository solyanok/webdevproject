import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as jose from "jose"

function Login () {
const [login, SetLogin] = useState(
    {identifier: "", password: ""})



    return(
        <div>
        <form onChange={handleChange} onSubmit={handleSubmit}>
        <div>
        <label>Email/Username</label>
        <input
        type="text"
        name="email/username" />
        </div>
        <div>
        <label>Password</label>
        <input
        type="password"
        name="password" />
        </div>
        <div>
        <div>
        <button type="submit">Register</button>
        </div>
        </form>
        </div>


    )
}
export default Login