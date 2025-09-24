import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const ProfastLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img src={logo} alt="" />
                <p className='text-3xl font-extrabold'> ProFast</p>
            </div>
        </Link>
    );
};

export default ProfastLogo;