import { useQuery, useMutation } from "react-query";
import Ax from "../utils/Axios";

// CREATING QUERIES TO MY API FOR MY TASK INFO
const allTasks = async () => {
  return await Ax.get("allTasks");
};

const singleTask = async (params) => {
  return await Ax.get(`singleTask/${params}`);
};

const createTask = async (body) => {
  return await Ax.post("createTask", body);
};

const editTask = async (params, body) => {
  return await Ax.patch(`editTask/${params.id}`, body);
};

const deleteTask = async (params) => {
  return await Ax.delete(`deleteTask/${params}`);
};

const useCreateTask = () => useMutation("createTask", createTask);
const useEditTask = () => useMutation("editTask", editTask);
const useDeleteTask = () => useMutation("deleteTask", deleteTask);

const useAllTasks = () =>
  useQuery("allTasks", allTasks, {
    refetchOnWindowFocus: false,
    retry: false,
  });

const useSingleTask = () =>
  useQuery("singleTask", singleTask, {
    refetchOnWindowFocus: false,
    retry: false,
  });

export {
  useAllTasks,
  useSingleTask,
  useCreateTask,
  useEditTask,
  useDeleteTask,
};
