/* eslint-disable no-unused-vars */
// TASK HOME PAGE
import { useAllTasks } from "../queries/tasks";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import LogOutBtn from "../components/Logout";
import AddTask from "../components/TaskComp.jsx/AddTask";
import DeleteTask from "../components/TaskComp.jsx/DeleteTask";

const Tasks = () => {
  const { data: task, isLoading, isError } = useAllTasks();
  const nav = useNavigate();

  return (
    <div>
      <AddTask />
      <div className="tasks">
        <div className="task">
          <ul>
            {task?.data?.map((task, index) => {
              return (
                <li key={index}>
                  {task.task}
                  <DeleteTask key={index} value={task.task} id={task.id} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <LogOutBtn />
      </div>
    </div>
  );
};

export default Tasks;
