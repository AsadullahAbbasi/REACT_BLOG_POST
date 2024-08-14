import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const Login = async (data) => {
    try {
      setError(null);
      const session = await authService.Login(data); //email,password tp be provided
      if (session) {
        dispatch(authLogin(response));
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
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          {/* handle submitvalidates our form and then run our custom function */}
          <form onSubmit={handleSubmit(Login)} className="mt-8">
            {/* props returns buy register are spread here and we recieve ref key sepratly in our custom componnet register is spreader on to input so we recieve it in our rest param ...props and spread that on our input inside our component */}
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
            <Input
              type="password"
              label="Password"
              placeholder="Enter Your Password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
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

            <Button type="submit" className="w-full">
              Sign
            </Button>
          </form>
        </p>
      </div>
    </div>
  );
}

export default Login;

// notes
//Use required: true if you are fine with the default error message or are handling errors globally.
// Use required: "Custom message" if you want to provide a specific message that might be more informative or user-friendly.
// When you set required to true, React Hook Form will validate that the input is not empty. If the input is empty, the form will consider it invalid, but the error message displayed will be a generic one, often "This field is required." so we can pass custom error mesaage to it
//  regex.test(string);
// The .test() method is a function provided by JavaScript's RegExp (regular expression) object. It is used to test whether a string matches the pattern defined by a regular expression

// The validate option within the register function's configuration object is provided by React Hook Form. However, the functions you define inside validate are custom functions that you create based on your specific validation needs.

// returning string from validate object function is consider as error or validation fails and if it returns true then validation passes
// When you use the validate option in React Hook Form, the library automatically passes the current value of the form input to each validation function you define.
// In React Hook Form, the validate object allows you to define custom validation rules for form inputs. You provide functions as the values in the validate object, where each function corresponds to a specific validation check. These functions should return true if the validation passes, or a string (typically an error message) if the validation fails.
// Yes, that's correct! In React Hook Form, if all the validation functions defined in the validate object return true, then the input passes validation.

// handle submit ensures that all the validation is done and then runs our custom function it validates collect data from form and if validation is run then it runs our custom function
// import React from 'react';

// function getInputProps(firstName) {
//   return {
//     name: firstName,
//     onChange: (e) => console.log("Changed:", e.target.value),
//     onBlur: () => console.log("Blurred"),
//     ref: (input) => console.log("Input ref:", input)
//   };
// }

// export default function App() {
//   return (
//     <div>
//       <h1>Spread Example</h1>
//       <input {...getInputProps()} placeholder="First Name" />
//     </div>
//   );
// }

// looks like this after spreading

{
  /* <input
  name="firstName"
  onChange={register("firstName").onChange}
  onBlur={register("firstName").onBlur}
  ref={register("firstName").ref}
  placeholder="First Name"
/>; */
}

// function getAdditionalProps() {
//   return {
//    name : "Asad"
//   };
// }

// const baseProps = {
//   type: "text",
//   placeholder: "Enter your name",
//   ...getAdditionalProps()
// };

// console.log(baseProps);

// VM63:13 {type: 'text', placeholder: 'Enter your name', name: 'Asad'}
