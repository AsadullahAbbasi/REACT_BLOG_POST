import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;





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

// the second object is a log of ...props which mean that all the properties coming from the parent component will be pass to this rest parameter and in first snippet if we will destructure children which is coming to react composition then it will be excluded or not be included in props either we get as as it is or assign it toa  ny variable children : x or any varibale but this will not oow come in props