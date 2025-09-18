import React from 'react';
import { Outlet } from 'react-router';
import authimg from '../assets/authImage.png'
import ProfastLogo from '../Pages/Shared/Profast logo/ProfastLogo';

const AuthenticationLayout = () => {
    return (
        <div className=" bg-base-200 p-12 ">
            <div>
                <ProfastLogo></ProfastLogo>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                <div className='flex-1'>
                    <img
                        src={authimg}
                        className="max-w-md rounded-lg "
                    />
                </div>

                <div className='flex-1'>
                   <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationLayout;