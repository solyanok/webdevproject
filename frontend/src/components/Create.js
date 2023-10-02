import React, {useEffect, useState} from 'react'
import axios from "axios";

function Create(){
const [boards, setBoards] = useState({name: '', description: ''})

const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBoards({ ...boards, [name]: value });
  };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         await axios.post('http://localhost:4040/boards/add',{...boards, userEmail:} ) // Second argument is a request body - data that we send to our backend
//        alert('New Board added')
//     setBoards({name: '', description: ''})
//       }catch(e) {
//         alert('Something went wrong')
//       }
//     }
 

  return (
   <div>

      <form onChange={handleChange} > 
        <fieldset>
          <legend>name</legend>
          <input name="name" value={boards.name} />
        </fieldset>
        <fieldset>
          <legend>description</legend>
          <input name="description" value={boards.description} />
        </fieldset>
        <button type="submit">Add Board</button>
      </form>
      </div>
   
  );

  }
export default Create;