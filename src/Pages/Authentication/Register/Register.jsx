import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../../Components/Social login/GoogleLogin';
import useAuth from '../../../Hooks/useAuth';

const Register = () => {
    const {createUser} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || '/'
    const {
        register,
        handleSubmit,
       
        formState: { errors },
    } = useForm()

    const onSubmit =async (data) => {
        console.log(data);
        try{
            const result = await createUser(data.email,data.password)
            console.log(result.user);
            navigate(from)
        }catch(error){
            console.log(error);
        }
        
    }
    return (
        <div>
            <div>
                <h1 className=' font-extrabold text-4xl'>Create an Account</h1>
                <p>Register with Profast</p>
            </div>
            <form className='max-w-md w-full' onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    {/* name */}
                    <label className="label">Name</label>
                    <input 
                    {...register("name", {required: true})}
                    type="text" 
                    name='name'
                    className="input w-full" placeholder="Name" />
                    {errors.name?.type === 'required' && <p className='text-red-600'>name required</p> }

                    {/* email */}
                    <label className="label">Email</label>
                    <input 
                    {...register("email", {required: true})}
                    type="email" 
                    name='email'
                    className="input w-full" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-600'>Email required</p> }
                    
                    {/* password */}
                    <label className="label">Password</label>
                    <input 
                    {...register("password", {required: true, minLength:6})}
                    name='password'
                    type="password" className="input w-full" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-600'>Password required</p> }
                    {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 charecter long</p> }

                   


                    <button type='submit' className="btn w-full  mt-4 bg-[#caeb66] text-black outline-none">Register</button>
                </fieldset>
            </form>
            <p>Already have an account?  <Link  
            className='text-gray-500 '
            to='/login'>Login</Link></p>
            <div className='max-w-md w-full '>
                <GoogleLogin></GoogleLogin>
            </div>
        </div>
    );
};

export default Register;