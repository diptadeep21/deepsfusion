import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const AdminRoute = ({ children }) => {
    const { token } = useContext(ShopContext);
    const storedToken = localStorage.getItem('token');

    if (!token && !storedToken) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminRoute;
