/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { queryClient } from "../constants/config";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../queries/account";

const LogOutBtn = () => {
  const { mutate: logout } = useLogout();
  const nav = useNavigate();

  return (
    <div>
      <button
        onClick={() =>
          logout(null, {
            onSuccess: () => {
              queryClient.removeQueries();
              queryClient.cancelQueries();
              queryClient.cancelMutations();
              nav("/auth");
            },
          })
        }
      >
        Logout
      </button>
    </div>
  );
};

export default LogOutBtn;
