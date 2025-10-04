// import React from 'react';
// import useUserRole from '../../../hooks/useUserRole';
// import Loading from '../../../components/Loading';
// import UserDashboard from './UserDashboard';
// import RiderDashboard from './RiderDashboard';
// import AdminDashboard from './AdminDashboard';
// import Forbidden from '../../Forbidden/Forbidden';

import Loading from "../../../Components/Loading";
import useUserRole from "../../../Hooks/useUserRole";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    else if(role === 'rider'){
        return <RiderDashboard></RiderDashboard>
    }
    else if(role ==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;