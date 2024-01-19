/* eslint-disable no-unused-vars */

// LOGIN PAGE

import { useState } from "react";
import { useLogin } from "../queries/account";
import { Link } from "react-router-dom";
import { queryClient } from "../constants/config";
import Spinner from "../components/Spinner";

import "../styles/SignIn.scss";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  let body = {
    email: email,
    password: pw,
  };

  // const { data: user, isSuccess } = useLogin();

  const {
    mutate: loginHandler,
    isLoading: loggingIn,
    isError,
    error,
  } = useLogin();

  // console.log(email);

  return (
    <div className="container">
      <form
        className="form"
        action="submit"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="sign-in-container">
          <h2>Sign In</h2>
          <input
            placeholder="Email"
            type="email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            autoComplete="password"
          />

          {/* LOGIN BTN */}
          <button
            onClick={() =>
              loginHandler(body, {
                onSuccess: () => queryClient.invalidateQueries("current"),
              })
            }
          >
            Login
          </button>
        </div>
        <h4>Dont have an Account?</h4>
        <Link style={{ textAlign: "center" }} to="/register">
          Create an Account
        </Link>
        {isError && (
          <p style={{ color: "red", textAlign: "center" }}>
            {JSON.stringify(error?.response?.data?.message)}
          </p>
        )}
      </form>
      {loggingIn && <Spinner fullPage />}
    </div>
  );
};

export default Auth;
