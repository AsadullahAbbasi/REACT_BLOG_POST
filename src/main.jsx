import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Post from "./pages/Post";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import AllPosts from "./pages/AllPosts";
import Home from './pages/Home.jsx'
import AddPost from "./pages/AddPost";

import { AuthLayout, Login} from './components' //didnt included index file coz it detect auto from index
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug", //when user will click on post we will add slug at thgat time
            element: (
                <AuthLayout authentication>
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)

//on home and allposts we are  Displaying all the posts enclosed in the link and that link if you click on that link that link routes to slash post and followed by ID that is basically a slug so on /post we display postage we capture that slug and if the user is author then we show him edit button and on edit button and we navigate it to edit route where we capture that both slugs we get this post from back end and then we can display a edit form or we can pass that post to edit from and the and edit form will detect and so report form will detect that now I am in edit mode and we will be able to update