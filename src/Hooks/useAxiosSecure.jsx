import React from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL : 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const {user} = useAuth()

   axiosSecure.interceptors.request.use(async config => {
    if(user){
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error)
})

    return axiosSecure
};

export default useAxiosSecure;