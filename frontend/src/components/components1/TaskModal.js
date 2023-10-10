import Modal from "react-modal";
import axios from 'axios'
import {useState} from 'react'
import {URL} from '../../config'



Modal.setAppElement("#root");
function TaskModal({open, setIsOpen, board, addTask}){
  const [addTaskName, setTaskName] = useState('')
  const [addTaskDesc, setTaskDesc ] = useState('')
  const [dueDate, setDueDate] = useState('');


  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
    
        const response = await axios.post(`${URL}/tasks/add`,
         { boards_id:board,
            name: addTaskName,
            description: addTaskDesc,
            dueDate: dueDate,
          });
          console.log(response)
          addTask(response.data);

          handleClose();
        } catch (error) {
          console.error(error)
          ;}}
        
  const handleClose =() => {setIsOpen(false); setTaskName(''); setTaskDesc(''); setDueDate('')}

return (
        <Modal
          isOpen={open}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Task"
          overlayClassName="myoverlay"
          className="myModal"
          >
        
            <div className='modal'>
           
              <div className='modal-content'>
                <button className='close-btn' type='button' onClick={handleClose}>X</button>
                <form onSubmit={handleTaskSubmit}>
                  <label>
                    Task Name:
                    <input
                      type='text'
                      value={addTaskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      required
                    />
                  </label>
                  <br />
                  <label>
                    Task Description:
                    <textarea
                      value={addTaskDesc}
                      onChange={(e) => setTaskDesc(e.target.value)}
                    />
                  </label>
                 
                  <br />
                  <label>
                  Due Date:
              <input
                type='date'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
                  </label>
                  <div className="button-container">
                  <button className="button-modal" type='submit'>Create Task</button>
                  </div>
                </form>    
                </div>
     </div>
          
          </Modal>
)
}

export default TaskModal
