import React, { useId, forwardRef } from "react";

// const Input = forwardRef(
//     ({},ref) =>{}
// )

// Using a named function within React.forwardRef can be beneficial for debugging purposes. When you use a named function, React's component stack traces in error messages and developer tools will display the function's name, making it easier to identify which component caused an issue.
const Input = forwardRef(
  // Yes, that's correct. When you use forwardRef, it returns a new component that can forward its ref to a child component.so forward ref returns component and input variable hold it <div className=""></div>
  function Input( //like here  const ComponentA = () => <div>Component A hun mn</div>; and we can render <ComponentA/>
    // so we have to return ui inside a function
    // Ans:
    // Yes, in React, when you define a functional component, the function should return a piece of JSX, which represents the UI that the component should render. This return value is what React will use to construct and update the DOM.
    // so we have to return ui inside a function
    // ChatGPT
    // Yes, in React, when you define a functional component, the function should return a piece of JSX, which represents the UI that the component should render. This return value is what React will use to construct and update the DOM.
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
  }
);
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
