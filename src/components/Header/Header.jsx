import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { login, logout } from "../../store/authSlice";
import { Container, LogoutBtn } from "../../components/index";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
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

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav>
          <div className="mr-4">
            <Link>
              <Logo width="50px" />
            </Link>
          </div>
          <ul>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.slug}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>{" "}
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
