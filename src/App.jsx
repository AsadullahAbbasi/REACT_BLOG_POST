import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Container, LogoutBtn } from "./components/index";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// {todos: Array(2)}
// const todos = useSelector((state) => state)
// useSelector returns us an object which have our state basicaly we pass it a callback  function and it gives that object as  we can see in you see todos to our function
const App = () => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status); //state return entire state wrapped in an object and our sttae is also an object with name auth which have property status
  //whatever we will dispatch we will get as it is we we get userdata as object from appwrite so payload we will get object anf if we enclose that object into braces then objectname like userdara will be key and its value will be value so action.payload will be having an object with thr KEY USERDATA
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Header />
          <main>{/* <Outlet/>  */}</main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
