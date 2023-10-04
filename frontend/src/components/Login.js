import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as jose from "jose"

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
    try{const response = await axios.post('http://localhost:4040/user/login', login);
    if(response.data.ok){
        let decodedToken = jose.decodeJwt(response.data.token);
        console.log(
            "Email extracted from the JWT token after login: ",
            decodedToken.userId
          );  }
          setMessage(response.data.message)
          setTimeout(() => {
            props.login(response.data.token);
            setMessage("")
            navigate("/");
        }, 2000);
    }
    catch(e){
        console.log(e)
      }
}

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
        name="identifier" />
        </div>
        <div>
        <label>Password</label>
        <input className='input'
        type="password"
        name="password" />
        </div>
        <div>
        <button type="submit">Login</button>
        </div>
        </form>
        </div>
        <p>{message}</p>
        </>

    )
}
export default Login