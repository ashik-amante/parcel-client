import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;