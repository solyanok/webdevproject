import React, {useState} from 'react'
import axios from "axios";

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
      try {const response = await axios.post('http://localhost:4040/user/register', reg);
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
        <div>
        <form onChange={handleChange} onSubmit={handleSubmit}>
        <div>
        <label>Email</label>
        <input
        type="email"
        name="email" />
        </div>
        <div>
        <label>Username</label>
        <input
        type="text"
        name="username" />
        </div>
        <div>
        <label>Password</label>
        <input
        type="password"
        name="password" />
        </div>
        <div>
        <label>Repeat your password</label>
        <input
        type="password"
        name="password2" />
        </div>
        <div>
        <button type="submit">Register</button>
        </div>
        </form>
        </div>

    )
    
}
export default Register