import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  return <div>Login</div>;
}

export default Login;

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
