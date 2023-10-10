import Modal from "react-modal";
import axios from 'axios';
import { useState } from 'react';
import {URL} from '../../config'

Modal.setAppElement("#root");

function BoardsModal({ board, setBoards, setIsOpenBoards, openBoards, user }) {
  const [updBoard, setUpdBoard] = useState({board_id:board});

  const editBoards = async () => {
    try {
      
      const response = await axios.post(`${URL}/boards/update`, updBoard, );
      if (response.data.ok) {
        const updatedBoards = {  ...updBoard };
        setBoards(updatedBoards);
        handleClose();
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleClose = () => {
    setIsOpenBoards(false);
    setUpdBoard({});
  }

  return (
    <Modal
      isOpen={openBoards} 
      onRequestClose={() => setIsOpenBoards(false)}
      contentLabel="Boards"
      overlayClassName="myoverlay1"
      className="myModal1"
    >
      <div className='modal'>
        <div className='modal-content'>
          <button className='close-btn' type='button' onClick={handleClose}>X</button>
          <form onSubmit={editBoards}>
            <label>
              Board Name:
              <input
                type='text'
                value={updBoard.name}
                onChange={(e) => setUpdBoard({...updBoard, name: e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              Board Description:
              <textarea
                value={updBoard.description}
                onChange={(e) => setUpdBoard({...updBoard,description: e.target.value })}
              />
            </label>
            <div className="button-container">
              <button className="button-modal" type='submit'>Update Board</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default BoardsModal;