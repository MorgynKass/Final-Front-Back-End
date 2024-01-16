/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useCurrent } from "../queries/account";
import { queryClient } from "../constants/config";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const AuthGuard = ({ children }) => {
  const {
    data: user,
    isLoading: userLoading,
    isRefetching: userRefetching,
  } = useCurrent();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.data?.userId) {
      if (pathname === "/auth" || pathname === "/register") {
        navigate("/");
      } else navigate(pathname);
    }

    if (!userLoading && !user?.data && !userRefetching) {
      if (pathname !== "/auth" && pathname !== "/register") {
        queryClient.removeQueries();
        navigate("/auth");
        return;
      }
      return;
    }
  }, [user, userLoading, userRefetching, pathname, navigate]);

  return (
    <>
      {userLoading ? <Spinner background={"tranparent"} fullPage /> : children}
    </>
  );
};

export default AuthGuard;
