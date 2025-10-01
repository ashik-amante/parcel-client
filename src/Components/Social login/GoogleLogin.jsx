import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const GoogleLogin = () => {
    const {signInWithGoogle} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || '/'
    const axiosPublic  = useAxiosPublic()

    const handleGoogleSignIn =async ()=>{
        try{
            const result =  await signInWithGoogle()
            console.log(result.user);

            const userInfo = {
                email: result.user.email,
                role: 'user',
                createdAt : new Date().toISOString(),
                lastLogIn : new Date().toISOString()
            }
            const res = await axiosPublic.post('/users',userInfo)
            console.log(res.data,'user save info to db ');
            navigate(from)
        }catch(error){
            console.log(error);
        }
        
    }
    return (
        <div className='flex flex-col justify-center items-center mt-2'>
            <h1>Or</h1>
            <button onClick={handleGoogleSignIn} className='btn w-full bg-gray-200 mt-2 flex justify-center items-center'>
                <FcGoogle className=' text-2xl' />
                <span>Login with google</span>
            </button>
        </div>
    );
};

export default GoogleLogin;