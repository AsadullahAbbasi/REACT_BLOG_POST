import React from "react";

const Button = ({
  children,
  type = "button",
  className = "",
  textColor = "text-white",
  bgColor = "bg-blue-600",
  ...props  //there we have gain or collected all extra props and below we have speaded
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${textColor} ${bgColor}`}  //braces {} are used when we have to embed js expression 
      {...props}
    >
      {children}
    </button> 
  );
};

export default Button;

// import React from "react";

// const Button = ({ children, ...props }) => {
//   // console.log(c, "ccc"); // This will log the children content
//   console.log(props, "props");
//   return <div>{"c"}</div>; // Rendering the children content inside the div
// };

// export default Button;

// import React from "react";

// const Button = ({ ...props }) => {
//   // console.log(c, "ccc"); // This will log the children content
//   console.log(props, "props");
//   return <div>{"c"}</div>; // Rendering the children content inside the div
// };

// export default Button;

{
  // "name": "pakistan",
  // "cl": [
  //     1,
  //     2,
  //     3
  // ],
  // "obj": {
  //     "a": 1,
  //     "b": 2,
  //     "c": 3
  // },
  // "children": [
  //     "ASad",
  //     " "
  // ]
}

// the second object is a log of ...props which mean that all the properties coming from the parent component will be pass to this rest parameter and in first snippet if we will destructure children which is coming to react composition then it will be excluded or not be included in props either we get as as it is or assign it to any variable children : x or any varibale but this will not come in props
