import React from 'react';

import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';


const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation()

    if(loading) return <p>loading ...</p>

    if(!user) return <Navigate to='/login' state={{from : location.pathname}}></Navigate>
    
    return children
};

export default PrivateRoute;