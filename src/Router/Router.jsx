import { createBrowserRouter } from "react-router";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import AuthenticationLayout from "../Layouts/AuthenticationLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Main,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path:'/',
        Component: AuthenticationLayout,
        children:[
            {
                path:'login',
                Component: Login
            },
            {
                path:'register',
                Component: Register
            },
        ]
    }
])