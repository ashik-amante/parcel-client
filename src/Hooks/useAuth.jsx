import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';

const useAuth = () => {
    const auth = use(AuthContext) 
    return auth
};

export default useAuth;