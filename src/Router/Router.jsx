import { createBrowserRouter } from "react-router";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import AuthenticationLayout from "../Layouts/AuthenticationLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import ServiceMap from "../Pages/service/ServiceMap";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/Send Parcel/SendParcel";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyParcel from "../Pages/Dashboard/my parcel/MyParcel";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/paymnet history/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/Track parcel/TrackParcel";
import BeARider from "../Pages/Dashboard/Be  a rider/BeARider";
import PendingRiders from "../Pages/Dashboard/Pending Riders/PendingRiders";
import ActiveRider from "../Pages/Dashboard/Active rider/ActiveRider";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Main,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'service',
                Component: ServiceMap,
                loader: () => fetch('./district.json')
            },
            {
                path: 'sendParcel',
                element: <PrivateRoute>
                    <SendParcel></SendParcel>
                </PrivateRoute>,
                loader: ()=> fetch('./district.json')
            },
            {
                path: 'beARider',
                element: <PrivateRoute>
                    <BeARider></BeARider>
                </PrivateRoute>,
                loader: ()=> fetch('./district.json')
            }
        ]
    },
    {
        path: '/',
        Component: AuthenticationLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
        ]
    },
    {
        path:'/dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                path: 'myParcels',
                element:<MyParcel></MyParcel>
            },
            {
                path:'payment/:parcelId',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'track',
                element: <TrackParcel></TrackParcel>
            },
            {
                path: 'pendingRiders',
                element: <PendingRiders></PendingRiders>
            },
            {
                path: 'activeRider',
                element: <ActiveRider></ActiveRider>
            }
        ]
    }
])