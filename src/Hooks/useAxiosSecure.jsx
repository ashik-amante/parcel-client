import React from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: 'https://parcel-server-phi.vercel.app'
    // http://localhost:5000
})
const useAxiosSecure = () => {
    const { user,logOut } = useAuth()
    const navigate = useNavigate()

    axiosSecure.interceptors.request.use(async config => {
        if (user) {
            const token = await user.getIdToken();
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error)
    })

   axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })


        return axiosSecure
    };

    export default useAxiosSecure;