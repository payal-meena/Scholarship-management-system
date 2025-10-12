import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ role }) => {
    const tokenKey = role === 'admin' ? 'adminToken' : 'studentToken';
    const loginPath = role === 'admin' ? '/admin-login' : '/student-login';

    const token = localStorage.getItem(tokenKey);

    if(!token) {
        toast.error(`Please log in as a ${role} to view the dashboard.`);
        return <Navigate to={loginPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;