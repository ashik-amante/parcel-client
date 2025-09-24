import React from 'react';

import { Navigate } from 'react-router';
import useAuth from '../Hooks/useAuth';


const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth()

    if(loading) return <p>loading ...</p>

    if(!user) return <Navigate to='/login'></Navigate>
    
    return children
};

export default PrivateRoute;