/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

// DELETE BUTTON AND FUNCTONALITY

import { queryClient } from "../../constants/config";
import { useState, useEffect } from "react";
import { useDeleteTask } from "../../queries/tasks";
import { useAllTasks } from "../../queries/tasks";
import { useEditTask } from "../../queries/tasks";
import { useNavigate } from "react-router-dom";
import { GoTrash } from "react-icons/go";

const DeleteTask = ({ id }) => {
  const {
    data: tasks,
    isLoading: tasksLoading,
    isRefetching: tasksRefetching,
    isSuccess: tasksSuccess,
  } = useAllTasks();

  const {
    mutate: deleteTask,
    isLoading: deletingTask,
    isError,
    isSuccess,
    error,
  } = useDeleteTask();

  const [task, setTask] = useState([]);

  useEffect(() => {
    setTask(tasks?.data);
  }, [tasks]);

  return (
    <div className="delete">
      {tasks?.data.length > 0 &&
      tasksSuccess &&
      !tasksLoading &&
      !tasksRefetching ? (
        <button
          onClick={() => {
            deleteTask(id, {
              onSuccess: () => {
                queryClient.invalidateQueries("allTasks");
              },
            });
          }}
        >
          <GoTrash />
        </button>
      ) : tasksLoading || tasksRefetching ? (
        <span>Loading Tasks... </span>
      ) : (
        <span>No Tasks</span>
      )}
    </div>
  );
};

export default DeleteTask;
