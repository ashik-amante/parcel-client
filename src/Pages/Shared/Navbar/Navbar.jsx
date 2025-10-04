import React from 'react';
import { Link, NavLink } from 'react-router';
import ProfastLogo from '../Profast logo/ProfastLogo';
import useAuth from '../../../Hooks/useAuth';




const Navbar = () => {
    const { user, logOut } = useAuth()
    const handleLogOut = async () => {
        await logOut()
    }
    const navItem = <>
        <li><NavLink>Home</NavLink></li>
        <li><NavLink to='/service'>Service</NavLink></li>
        <li><NavLink to='/sendParcel'>Send a parcel</NavLink></li>
        <li><NavLink to='/beARider'>Be A Rider</NavLink></li>
        {
            user && <>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
            </>
        }


    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItem}
                    </ul>
                </div>
                <span className="btn btn-ghost text-xl pl-0">
                    <ProfastLogo></ProfastLogo>
                </span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItem}
                </ul>
            </div>
            <div className="navbar-end gap-2 lg:gap-4">
                {
                    user ? <button onClick={handleLogOut} className='btn-xs sm:btn-sm md:btn btn-outline rounded-3xl'>Logout</button> : <Link className='btn btn-outlineg btn-sm md:btn px-3 sm:px-2 rounded-2xl' to='/login'>Login</Link>
                }

                <Link className='btn 
                 px-4 rounded-2xl bg-[#caeb66] font-semibold  ' to='/'>Be a rider </Link>
            </div>
        </div>
    );
};

export default Navbar;