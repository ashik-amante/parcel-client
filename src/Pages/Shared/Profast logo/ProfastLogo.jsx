import React from 'react';
import logo from '../../../assets/logo.png'

const ProfastLogo = () => {
    return (
        <div className='flex items-end'> 
            <img src={logo} alt="" />
            <p className='text-3xl font-extrabold'> ProFast</p>
        </div>
    );
};

export default ProfastLogo;