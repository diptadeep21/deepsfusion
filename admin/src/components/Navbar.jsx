import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const { setToken } = useContext(ShopContext);

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
    };

    return (
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shadow-sm sticky top-0 z-50 w-full">
            <div className="flex items-center gap-4">
                <img src={assets.logo} alt="Logo" className="h-8 w-auto object-contain" />
                <span className="hidden sm:block text-gray-300 text-2xl font-light">|</span>
                <span className="hidden sm:block text-sm font-medium text-gray-500 uppercase tracking-wider">Admin Panel</span>
            </div>
            <button 
                onClick={logout}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;