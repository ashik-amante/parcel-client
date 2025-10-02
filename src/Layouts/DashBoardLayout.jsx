import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ProfastLogo from '../Pages/Shared/Profast logo/ProfastLogo';
import { FaBox, FaClock, FaHistory, FaHome, FaMotorcycle, FaUserEdit, FaUserShield } from 'react-icons/fa';
import { IoNavigateOutline } from "react-icons/io5";
import { FaPersonRifle } from 'react-icons/fa6';
import useUserRole from '../Hooks/useUserRole';

const DashBoardLayout = () => {
    const { role, roleLoading } = useUserRole()
    console.log(role);
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-4 p-3 rounded-md transition-colors duration-300 ${isActive
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-100'
        }`;
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">

                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>

                </div>
                {/* Page content here */}
                <Outlet></Outlet>

            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-3">
                    {/* Sidebar content here */}
                    <ProfastLogo></ProfastLogo>

                    <li>
                        <NavLink to='/dashboard/home' className={linkClasses}>
                            <FaHome className="text-xl" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/myParcels' className={linkClasses}>
                            <FaBox className="text-xl" /> My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/paymentHistory' className={linkClasses}>
                            <FaHistory className="text-xl" /> Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/track' className={linkClasses}>
                            <IoNavigateOutline className="text-xl" /> Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/profile' className={linkClasses}>
                            <FaUserEdit className="text-xl" /> Update Profile
                        </NavLink>
                    </li>

                    {
                        !roleLoading && role === 'admin' && <>
                            <li>
                                <NavLink to='/dashboard/activeRider' className={linkClasses}>
                                    <FaMotorcycle className="text-xl" /> Active Rider
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/pendingRiders' className={linkClasses}>
                                    <FaClock className="text-xl" /> Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeAdmin" className={linkClasses}>
                                    <FaUserShield className="inline-block mr-2" />
                                    Make Admin
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/assignRider" className={linkClasses}>
                                    <FaMotorcycle className="inline-block mr-2" />
                                    Assign Rider
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;