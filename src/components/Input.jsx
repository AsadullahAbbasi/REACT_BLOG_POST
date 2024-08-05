import React, { useId, forwardRef } from "react";

// const Input = forwardRef(
//     ({},ref) =>{}
// )

// Using a named function within React.forwardRef can be beneficial for debugging purposes. When you use a named function, React's component stack traces in error messages and developer tools will display the function's name, making it easier to identify which component caused an issue.
const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});
export default Input;

//rest parmaeter by default wraps in array
// function sum(...theArgs) {
//   console.log(theArgs)
// let total = 0;
// for (const arg of theArgs) {
//   total += arg;
// }
// return total;
// }

// console.log(sum(1, 2, 3));
// VM71:2 (3) [1, 2, 3]0: 11: 22: 3length: 3[[Prototype]]: Array(0)
// VM71:10 6
