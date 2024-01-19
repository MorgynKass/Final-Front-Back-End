/* eslint-disable no-unused-vars */
// TASK HOME PAGE
import { useAllTasks } from "../queries/tasks";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LogOutBtn from "../components/Logout";
import AddTask from "../components/TaskComp.jsx/AddTask";
import DeleteTask from "../components/TaskComp.jsx/DeleteTask";

import "../styles/Tasks.scss";

const Tasks = () => {
  const { data: task, isLoading, isError } = useAllTasks();
  const nav = useNavigate();

  return (
    <div className="container">
      <div className="task-container">
        <AddTask />
        <div className="tasks">
          <div className="task">
            <ul className="ul-tasks">
              {task?.data?.map((task, index) => {
                return (
                  <li className="li-tasks" key={index}>
                    {task.task}
                    <DeleteTask key={index} value={task.task} id={task.id} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="main-logout-div">
          <LogOutBtn />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
