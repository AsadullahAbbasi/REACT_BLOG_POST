import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";

const Signup = async (data) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const Signup = async (data) => {
    setError(null);
    try {
      const session = await authService.Signup(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        dispatch(authLogin(session));
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          SignUp in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
        </p>
      </div>
      <Link
        to="/signin"
        className="font-medium text-primary transition-all duration-200 hover:underline"
      >
        Sign Up
      </Link>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(Signup)}>
        <Input type="text" placeholder="Enter Your Name" label="Name" {...register("name", { required: "Name is required" })} />
        <Input
          type="email"
          placeholder="Enter Your Email"
          label="Email"
          {...register("email", {
            required: "Email is required",
            validate: {
              regex: (value) => {
                return (
                  /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(
                    value
                  ) || `Please enter a valid email address`
                );
              },
            },
          })}
        />
        <Input
          type="password"
          placeholder="Enter Your Password"
          label="Password"
          {...register("password", {
            required: "Password is required",
            validate: {
              regex: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                  value
                ) ||
                "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
            },
          })}
        />
        <Button type="submit" className="w-full">
              Sign in
            </Button>
      </form>
    </div>
  );
};

export default Signup;

// data recieved from handlesubmit is in object format
// {
//     "email": "a@gmail.com",
//     "password": "d,msajfbsaf"
// }
