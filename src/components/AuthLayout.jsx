import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth?.status)
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // true && true !== false
    //if  route is authenticated then its value is true and if user is not loged in then authstatus is false so true &&  false  !== true will always be true so it will go to login page because true && false = false is true  so this mean if route is protected and user is not logged in then it will go to login page
    if (authentication && authStatus !== authentication) {
      navigate("/login");  //at pprotetcted route if user is not logged in then it will go to login page
    }
    else if (authentication === false && authStatus !== authentication) {
      //runs like on login sigup page if usr is logged in so we will not show login page and navigate them to home
      //this runs if route is not protected like login and signup but if user is logged in then it will go to home page
      // if route is not protected then authentication is false and authstatus is true then true && false !=false (true) will run this block and user will navigate to / which have outlet which renders this route content whose child is authlayout which will render login page content because due to react coposition we are getting it as a children and user is not logged in then it will go to login page
      navigate("/"); //if route is not protected and user is logged in then it will go to home page

    }
    setLoading(false)
  }, [authStatus, navigate])

  return (
    <div>{loading ? "loading.." : children}</div>)  // runs when route is protected and user is lopgged in as well and fo unprotected routes we navigate them to login signup programatically
}

export default AuthLayout

// authentication = true means that this route is protected and for authenticated users only so by default it is true and if it is false then it is not protected

//does else if runs after if

// Yes, else if runs only if the preceding if (or another else if) condition evaluates to false.

//basicallywe have to handle two casees if user is trying to acess authenticated routes without logging in so we will navigate them to login and if he is logged in then and still trying to acesss login signup  then we will navigate them t home