import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Profile (props){
    const [profile, setProfile] = useState(props.user || { email: '', username: '' });
    const [message,setMessage] = useState("");
    const navigate = useNavigate();

  

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProfile({ ...profile, [name]: value });
      };

      const handleSubmit = async (e) => {
  
        e.preventDefault();
        try{const response = await axios.post('http://localhost:4040/user/update', profile);
     console.log(response)
     setMessage('Profile updated successfully!');
        }
        catch(e){
            console.log(e)
          }

         
    }
 const handleDelete = async (e) => {
            e.preventDefault();
            if (window.confirm('Are you sure you want to delete your profile?')) {
              try {
                await axios.delete('http://localhost:4040/user/delete', { data: profile });
                setMessage('Profile deleted successfully');
                props.logout();
                navigate('/user/login')
              } catch (e) {
                console.log(e);
              }
            }
          }
    return(
<>
<div className='register-container'>
    <h3>Hello! </h3>
    <h5>Manage your personal information here</h5>
    <form onChange={handleChange} onSubmit={handleSubmit}>
        <div>
        <label>Email</label>
        <input className='input'
        type="email"
        name="email"
        onFocus={() => setProfile({ ...profile, email: '' })} value={profile.email}         />
        </div>
        <div>
        <label>Username</label>
        <input  className='input'
        type="text"
        name="username"
        onFocus={() => setProfile({ ...profile, username: '' })}
        value= {profile.username} />
        </div>
        {/* <div>
        <label>Password</label>
        <input  className='input'
        type="password"
        name="password" 
        value={props.user.password}/>
        </div> */}
        <div>
        <button type="submit">Submit</button>
        </div>
      </form>  
      <div>
          <button onClick={handleDelete}>Delete Profile</button>
        </div>
        {message && <p>{message}</p>}
</div>
</>
    )
}
export default Profile