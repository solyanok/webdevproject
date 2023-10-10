import React, {useState} from 'react'
import axios from "axios";
import { NavLink } from "react-router-dom";
import { URL } from '../config';

function Register (){

    const [reg, setReg] = useState({
        email: '',
        username: '',
        password: '',
        password2: '',
    })
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReg({ ...reg, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
      try {const response = await axios.post(`${URL}/user/register`, reg);
      if(response.data.ok){
        alert('Registration completed successfully')
      }
      else{
        alert(response.data.message)
      }}
      catch(e){
        console.log(e)
      }

      }
    
    return (
        <div className="register-container">
            <h3>Register</h3>
            <h5>Please fill in all the fields to create an account.</h5>
        <form onChange={handleChange} onSubmit={handleSubmit}>
        <div>
        <label>Email</label>
        <input className='input'
        type="email"
        name="email" />
        </div>
        <div>
        <label>Username</label>
        <input  className='input'
        type="text"
        name="username" />
        </div>
        <div>
        <label>Password</label>
        <input  className='input'
        type="password"
        name="password" />
        </div>
        <div>
        <label>Repeat your password</label>
        <input className='input'
        type="password"
        name="password2" />
        </div>
        <div>
        <button type="submit">Register</button>
        </div>
        </form>
        <h5>...or feel free to <NavLink to="/user/register">Login</NavLink> if you already have an account!</h5>
        </div>

    )
    
}
export default Register