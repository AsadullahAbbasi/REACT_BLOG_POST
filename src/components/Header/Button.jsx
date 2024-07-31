import React from "react";

const Button = ({
  children,
  className = "bg-blue-500",
  textColor = "text-white",
  ...props
}) => {
  return <div>{children}</div>;
};

export default Button;
