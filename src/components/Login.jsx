import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",  // Validation will run on each keystroke
  });;  // Access errors; // Get errors object from useForm
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setError(null);
      const session = await authService.Login(data); // email and password provided here
      if (session) {
        dispatch(authLogin(session));
        navigate("/");
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          {/* Email Input */}
          <Input
            placeholder="Enter Your Email"
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                return (
                  /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(
                    value
                  ) || "Please enter a valid email address"
                );
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600 mt-1">{errors.email.message}</p> // Display email errors
          )}

          {/* Password Input */}
          <Input
            type="password"
            label="Password"
            placeholder="Enter Your Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                ,
              },
              validate: {
                regex: (value) => {
                  return (
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                      value
                    ) ||
                    "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  );
                },
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600 mt-1">{errors.password.message}</p> // Display password errors
          )}

          <Button type="submit" className="w-full mt-5">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
