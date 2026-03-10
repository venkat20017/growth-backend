import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('admin_auth') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
