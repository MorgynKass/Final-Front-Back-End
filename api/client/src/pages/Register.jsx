/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// REGISTRATION PAGE - CREATE AN ACCOUNT

import { Link } from "react-router-dom";
import { queryClient } from "../constants/config";
import { useRegister } from "../queries/account";
import { useLogin } from "../queries/account";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import "../styles/Register.scss";

const Register = () => {
  const Error = ({ error }) => {
    return (
      <span style={{ color: "red", marginBottom: "1rem" }}>
        {error && error}
      </span>
    );
  };

  const { mutateAsync: loginHandler, isLoading: loggingIn } = useLogin();
  const { mutate: registerUser, isLoading: registering } = useRegister();

  const schema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValidating: validating },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="container">
      <form
        className="form"
        action="submit"
        onSubmit={handleSubmit((d) =>
          registerUser(d, {
            onSuccess: async () => {
              await loginHandler({
                email: d.email,
                password: d.password,
              });
              queryClient.invalidateQueries("current");
            },
          })
        )}
      >
        <div className="sign-up-container">
          <h2>Sign Up</h2>

          <input
            placeholder="Email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          <Error error={errors?.email?.message} />
          <input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <Error error={errors?.password?.message} />

          {/* REGISTER BTN */}
          <button type="submit">Create Account</button>
        </div>
        <Link to="/auth" style={{ textAlign: "center" }}>
          Back to sign in
        </Link>
      </form>
    </div>
  );
};

export default Register;
