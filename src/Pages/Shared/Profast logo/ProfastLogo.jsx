import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const ProfastLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img className='w-6' src={logo} alt="" />
                <p className='lg:text-3xl font-extrabold '> Parcel</p>
            </div>
        </Link>
    );
};

export default ProfastLogo;