import { useQuery, useMutation } from "react-query";
import Ax from "../utils/Axios";

// CREATING QUERIES TO MY API FOR MY ACCOUNT INFO
const register = async (body) => {
  return await Ax.post("register", body);
};

const login = async (body) => {
  return await Ax.post("login", body);
};

const logout = async () => {
  return await Ax.post("logout");
};

const current = async () => {
  return await Ax.get("currentUser");
};

// const edit = async (body) => {
//   return await Ax.patch("edit", body);
// };

// const deleteAccount = async () => {
//   return await Ax.delete("delete");
// };

const useRegister = () => useMutation("register", register);
const useLogin = () => useMutation("login", login);
const useLogout = () => useMutation("logout", logout);
// const useEdit = () => useMutation("edit", edit);
// const useDelete = () => useMutation("delete", deleteAccount);

const useCurrent = () =>
  useQuery("current", current, {
    refetchOnWindowFocus: false,
    retry: false,
  });

export { useCurrent, useRegister, useLogin, useLogout };
