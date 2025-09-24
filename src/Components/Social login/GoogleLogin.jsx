import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';

const GoogleLogin = () => {
    const {signInWithGoogle} = useAuth()
    const navigate = useNavigate()

    const handleGoogleSignIn =async ()=>{
        try{
            const result =  await signInWithGoogle()
            console.log(result.user);
            navigate('/')
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