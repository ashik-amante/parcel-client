import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GoogleLogin from '../../../Components/Social login/GoogleLogin';

import useAuth from '../../../Hooks/useAuth';

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || '/'
    
    const {signIn} = useAuth()
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm()

    const onSubmit =async (data) => {
        console.log(data);
        try{
            const response  = await signIn(data.email, data.password)
            console.log(response.user);
            navigate(from)
        }catch(error){
            console.log(error);
        }

    }
    return (
        <div>
            <div>
                <h1 className=' font-extrabold text-4xl'>Welcome Back</h1>
                <p>Login with Profast</p>
            </div>
            <form className='max-w-md w-full' onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input
                        {...register("email", { required: true })}
                        type="email"
                        name='email'
                        className="input w-full" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-600'>Email required</p>}

                    <label className="label">Password</label>
                    <input
                        {...register("password", { required: true })}
                        name='password'
                        type="password" className="input w-full" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-600'>Password required</p>}

                    <div><a className="link link-hover">Forgot password?</a></div>

                    <button type='submit' className="btn mt-4 bg-[#caeb66] text-black outline-none w-full">Login</button>
                </fieldset>
            </form>
            <p>Don’t have any account? <Link
                className='text-gray-500'
                to='/register'>Register</Link></p>
            <div className='w-full max-w-md'>
                <GoogleLogin></GoogleLogin>
            </div>
        </div>
    );
};

export default Login;