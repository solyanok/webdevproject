import React, {useState, useEffect} from 'react'
import axios from "axios";


function Boards (){
const [boards, setBoards] = useState(
  [])

    const getBoards = async () =>
{
  try {
    const response = await axios.get('http://localhost:4040/boards')
    console.log(response);
setBoards(response.data)
  }catch(e) {
    console.log(e)
  }
}

useEffect(()=>{
    getBoards()
}, [])

    return (
        <div className='boards'>
{boards.length !=0 && boards.map((e)=>{
    return <div>
      <h5>{e.name}</h5>
      <h5>{e.description}</h5>
    </div>
  })}
        </div>
    )

}
export default Boards