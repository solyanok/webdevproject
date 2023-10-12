import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskModal from "./components1/TaskModal";
import BoardsModal from "./components1/BoardsModal";
import trash from "../assets/2891491.png";
import add from "../assets/992651.png";
import edit from "../assets/7398464.png";
import { URL } from "../config";

function Boards({ isLoggedIn, user }) {
  const [boards, setBoards] = useState([]);
  const [open, setIsOpen] = useState(false);
  const [openBoards, setIsOpenBoards] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const getBoards = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      const response = await axios.get(`${URL}/boards/all`, {
        userId: userId,
      });
      console.log(response.data);
      setBoards(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get(`${URL}/tasks/home`);
      console.log(response);
      setTasks(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  const handleClick = (id) => {
    setIsOpen(true);
    setSelectedBoard(id);
  };

  const handleClickBoard = (id) => {
    setIsOpenBoards(true);
    setSelectedBoard(id);
  };

  const addTask = (newTask) => {
    setTasks((tasks) => [...tasks, newTask]);
    setIsOpen(false);
  };

  const handleDeleteBoard = async (id) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      try {
        const response = await axios.delete(`${URL}/boards/delete`, {
          data: { boardId: id },
        });
        if (response.data.ok) {
          setBoards((boards) => boards.filter((e) => e._id !== id));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await axios.delete(`${URL}/tasks/delete`, {
          data: { taskId: id },
        });
        if (response.data.ok) {
          setTasks((tasks) => tasks.filter((e) => e._id !== id));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const toggleTaskCompleted = async (taskId, completed) => {
    try {
      const response = await axios.post(`${URL}/tasks/complete`, {
        taskId,
        completed,
      });
      if (response.data.ok) {
        setTasks((tasks) =>
          tasks.map((task) => {
            if (task._id === taskId) {
              return { ...task, completed };
            }
            return task;
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="boards-container">
      {boards.length > 0 &&
        boards.map((board) => (
          <div className="board">
            <div className="board-wrapper">
              <div className="board-text">
                <h2>{board.name}</h2>
                <p>{board.description}</p>
              </div>
              <div className="icons">
                <button
                  type="button"
                  onClick={() => handleClickBoard(board._id)}
                >
                  <img className="icon" src={edit} alt="edit"></img>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteBoard(board._id)}
                >
                  {" "}
                  <img className="icon" src={trash} alt="trash"></img>{" "}
                </button>
              </div>
            </div>
            <div className="icon-add">
              <button type="button" onClick={() => handleClick(board._id)}>
                <img className="icon" src={add} alt="add"></img>
              </button>
            </div>
            <div className="tasks-container">
              {tasks.length > 0 &&
                tasks.map((task) =>
                  task.boards_id === board._id ? (
                    <div
                      className={`task ${task.completed ? "completed" : ""}`}
                    >
                      <div className="task-text">
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <p>
                          Due Date:{" "}
                          {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                        <button
                          className="icon1"
                          type="button"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          <img className="icon" src={trash} alt="trash"></img>
                        </button>
                      </div>

                      <button
                        type="button"
                        className="complete-btn"
                        onClick={() =>
                          toggleTaskCompleted(task._id, !task.completed)
                        }
                      >
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
                      </button>
                    </div>
                  ) : null
                )}
            </div>
          </div>
        ))}
      {selectedBoard && (
        <TaskModal
          open={open}
          setIsOpen={setIsOpen}
          board={selectedBoard}
          addTask={addTask}
        />
      )}
      {selectedBoard && (
        <BoardsModal
          openBoards={openBoards}
          setIsOpenBoards={setIsOpenBoards}
          board={selectedBoard}
          setBoards={setBoards}
          user={user}
        />
      )}
    </div>
  );
}
export default Boards;
